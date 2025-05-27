import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  BarChart2,
  ShoppingCart,
  Truck,
  Shield,
  ArrowLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "../data/products";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useComparison } from "../context/ComparisonContext";
import ProductCard from "../components/ProductCard";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {}
  );
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);

      if (foundProduct) {
        setProduct(foundProduct);
        // Initialize selected options
        const initialOptions: Record<string, any> = {};
        if (foundProduct.options?.colors) {
          initialOptions.color = foundProduct.options.colors[0];
        }
        if (foundProduct.options?.handles) {
          initialOptions.handle = foundProduct.options.handles[0];
        }
        setSelectedOptions(initialOptions);

        // Get related products
        setRelatedProducts(getRelatedProducts(productId, foundProduct.type));
      }
    }
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedOptions);
    }
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;

    let total = product.price;

    // Add handle price if selected
    if (selectedOptions.handle && selectedOptions.handle.price) {
      total += selectedOptions.handle.price;
    }

    return total * quantity;
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600">Товар не найден</p>
        <Link
          to="/catalog"
          className="mt-4 inline-block text-[#D4AF37] hover:text-[#3A2618] transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link
          to="/"
          className="text-gray-500 hover:text-[#D4AF37] transition-colors"
        >
          Главная
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <Link
          to="/catalog"
          className="text-gray-500 hover:text-[#D4AF37] transition-colors"
        >
          Каталог
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-gray-700 truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Back to catalog */}
      <Link
        to="/catalog"
        className="inline-flex items-center text-[#3A2618] hover:text-[#D4AF37] transition-colors mb-6"
      >
        <ArrowLeft size={16} className="mr-1" /> Вернуться в каталог
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`rounded-md overflow-hidden border-2 ${
                  activeImage === index
                    ? "border-[#D4AF37]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-[#3A2618] mb-2">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-500">
                  ({product.reviewCount} отзывов)
                </span>
              </div>

              <div className="ml-auto flex space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Добавить в избранное"
                >
                  <Heart
                    size={20}
                    className="text-gray-500 hover:text-[#D4AF37]"
                  />
                </button>
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isInComparison(product.id)
                      ? "bg-[#D4AF37] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => addToComparison(product)}
                  title="Добавить к сравнению"
                >
                  <BarChart2
                    size={20}
                    className={
                      isInComparison(product.id)
                        ? "text-white"
                        : "text-gray-500 hover:text-[#D4AF37]"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 line-through mr-2">
                    {product.oldPrice.toLocaleString()} сом
                  </span>
                )}
                <span className="text-3xl font-bold text-[#3A2618]">
                  {product.price.toLocaleString()} сом
                </span>
              </div>

              <span
                className={`ml-4 px-3 py-1 rounded-full text-sm ${
                  product.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {product.inStock ? "В наличии" : "Под заказ"}
              </span>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {product.options?.colors && (
                <div>
                  <h3 className="font-medium mb-2">Цвет:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.options.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-3 py-1 border rounded-full transition-colors ${
                          selectedOptions.color === color
                            ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                            : "border-gray-300 hover:border-[#D4AF37]"
                        }`}
                        onClick={() =>
                          setSelectedOptions({ ...selectedOptions, color })
                        }
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.options?.handles && (
                <div>
                  <h3 className="font-medium mb-2">Ручка:</h3>
                  <div className="space-y-2">
                    {product.options.handles.map((handle) => (
                      <label
                        key={handle.name}
                        className="flex items-center cursor-pointer group"
                      >
                        <div
                          className={`
                          w-5 h-5 flex items-center justify-center mr-2 border rounded-full
                          ${
                            selectedOptions.handle?.name === handle.name
                              ? "bg-[#D4AF37] border-[#D4AF37]"
                              : "border-gray-300 group-hover:border-[#D4AF37]"
                          }
                          transition-colors
                        `}
                        >
                          {selectedOptions.handle?.name === handle.name && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="text-gray-700 mr-2">
                          {handle.name}
                        </span>
                        {handle.price > 0 && (
                          <span className="text-sm text-gray-500">
                            +{handle.price.toLocaleString()} сом
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and add to cart */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="px-3 py-2 text-gray-500 hover:text-[#D4AF37] transition-colors"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-center border-none focus:outline-none"
                />
                <button
                  className="px-3 py-2 text-gray-500 hover:text-[#D4AF37] transition-colors"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="flex-grow bg-[#3A2618] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Добавить в корзину за {calculateTotalPrice().toLocaleString()}{" "}
                сом
              </button>
            </div>

            {/* Delivery info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <Truck size={18} className="mr-2 text-[#D4AF37] mt-1" />
                <div>
                  <p className="font-medium">Доставка</p>
                  <p className="text-sm text-gray-600">
                    Доставка по Москве: от 1000 сом
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={18} className="mr-2 text-[#D4AF37] mt-1" />
                <div>
                  <p className="font-medium">Гарантия</p>
                  <p className="text-sm text-gray-600">1 год на все двери</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-bold text-[#3A2618] mb-6">
          Характеристики
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Тип двери</td>
                  <td className="py-3 font-medium">
                    {product.type === "interior"
                      ? "Межкомнатная"
                      : product.type === "entrance"
                      ? "Входная"
                      : product.type === "sliding"
                      ? "Раздвижная"
                      : "Стеклянная"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Материал</td>
                  <td className="py-3 font-medium">{product.material}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Цвет</td>
                  <td className="py-3 font-medium">{product.color}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Ширина, см</td>
                  <td className="py-3 font-medium">{product.features.width}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Высота, см</td>
                  <td className="py-3 font-medium">
                    {product.features.height}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Толщина, см</td>
                  <td className="py-3 font-medium">
                    {product.features.thickness}
                  </td>
                </tr>
                {product.features.soundproofing && (
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Шумоизоляция, дБ</td>
                    <td className="py-3 font-medium">
                      {product.features.soundproofing}
                    </td>
                  </tr>
                )}
                {product.features.heatInsulation && (
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">
                      Теплоизоляция, м²•°C/Вт
                    </td>
                    <td className="py-3 font-medium">
                      {product.features.heatInsulation}
                    </td>
                  </tr>
                )}
                {product.features.lockType && (
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Тип замка</td>
                    <td className="py-3 font-medium">
                      {product.features.lockType}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-bold text-[#3A2618] mb-4">Описание</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#3A2618] mb-6">
            Похожие товары
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
