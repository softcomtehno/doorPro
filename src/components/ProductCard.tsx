import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BarChart2, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useComparison } from '../context/ComparisonContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Новинка</span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Скидка</span>
          )}
          {product.isPopular && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Хит продаж</span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-[#D4AF37] hover:text-white transition-colors"
            title="Добавить в избранное"
          >
            <Heart size={16} />
          </button>
          <button 
            className={`bg-white rounded-full p-2 shadow-md transition-colors ${isInComparison(product.id) ? 'bg-[#D4AF37] text-white' : 'hover:bg-[#D4AF37] hover:text-white'}`}
            onClick={() => addToComparison(product)}
            title="Добавить к сравнению"
          >
            <BarChart2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-[#3A2618] mb-2 hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          
          <span className="ml-auto text-sm text-gray-500">
            {product.type === 'interior' ? 'Межкомнатная' : 
             product.type === 'entrance' ? 'Входная' : 
             product.type === 'sliding' ? 'Раздвижная' : 'Стеклянная'}
          </span>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center">
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through mr-2">
                  {product.oldPrice.toLocaleString()} ₽
                </span>
              )}
              <span className="text-xl font-bold text-[#3A2618]">
                {product.price.toLocaleString()} ₽
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {product.inStock ? 'В наличии' : 'Под заказ'}
            </p>
          </div>
          
          <button 
            className="bg-[#3A2618] hover:bg-[#D4AF37] text-white rounded-lg px-3 py-2 flex items-center transition-colors"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingCart size={16} className="mr-1" />
            <span className="hidden sm:inline">В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;