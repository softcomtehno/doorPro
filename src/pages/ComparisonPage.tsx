import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, X, ShoppingCart } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';

const ComparisonPage: React.FC = () => {
  const { items, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#3A2618] mb-8">Сравнение товаров</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-medium text-[#3A2618] mb-4">Список сравнения пуст</h2>
          <p className="text-gray-600 mb-6">
            Добавьте товары для сравнения их характеристик
          </p>
          <Link 
            to="/catalog" 
            className="inline-block bg-[#3A2618] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }
  
  // Get all unique feature keys from all products
  const allFeatureKeys = new Set<string>();
  items.forEach(product => {
    Object.keys(product.features).forEach(key => {
      allFeatureKeys.add(key);
    });
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Главная</Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-gray-700">Сравнение товаров</span>
      </nav>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3A2618]">Сравнение товаров</h1>
        <div className="flex items-center gap-4">
          <Link to="/catalog" className="flex items-center text-[#3A2618] hover:text-[#D4AF37] transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Вернуться в каталог
          </Link>
          {items.length > 1 && (
            <button 
              className="text-red-500 hover:text-red-700 transition-colors"
              onClick={clearComparison}
            >
              Очистить сравнение
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px] z-10">
                  Характеристики
                </th>
                
                {items.map(product => (
                  <th key={product.id} className="px-6 py-3 text-center min-w-[250px]">
                    <div className="relative">
                      <button 
                        className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromComparison(product.id)}
                      >
                        <X size={16} />
                      </button>
                      
                      <Link 
                        to={`/product/${product.id}`} 
                        className="flex flex-col items-center"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded mb-2"
                        />
                        <h3 className="font-medium text-[#3A2618] hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-2 flex justify-center">
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                        <span className="font-bold text-[#3A2618]">
                          {product.price.toLocaleString()} ₽
                        </span>
                      </div>
                      
                      <button
                        className="mt-2 bg-[#3A2618] hover:bg-[#D4AF37] text-white px-3 py-1 rounded text-sm flex items-center justify-center mx-auto transition-colors"
                        onClick={() => addToCart(product, 1)}
                      >
                        <ShoppingCart size={14} className="mr-1" />
                        В корзину
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {/* Basic info */}
              <tr>
                <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                  Тип двери
                </td>
                {items.map(product => (
                  <td key={product.id} className="px-6 py-3 text-sm text-gray-500 text-center">
                    {product.type === 'interior' ? 'Межкомнатная' : 
                     product.type === 'entrance' ? 'Входная' : 
                     product.type === 'sliding' ? 'Раздвижная' : 'Стеклянная'}
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                  Материал
                </td>
                {items.map(product => (
                  <td key={product.id} className="px-6 py-3 text-sm text-gray-500 text-center">
                    {product.material}
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                  Цвет
                </td>
                {items.map(product => (
                  <td key={product.id} className="px-6 py-3 text-sm text-gray-500 text-center">
                    {product.color}
                  </td>
                ))}
              </tr>
              
              {/* Features */}
              {Array.from(allFeatureKeys).map(key => (
                <tr key={key}>
                  <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                    {key === 'width' ? 'Ширина, см' :
                     key === 'height' ? 'Высота, см' :
                     key === 'thickness' ? 'Толщина, см' :
                     key === 'soundproofing' ? 'Шумоизоляция, дБ' :
                     key === 'heatInsulation' ? 'Теплоизоляция, м²•°C/Вт' :
                     key === 'lockType' ? 'Тип замка' : key}
                  </td>
                  {items.map(product => (
                    <td key={product.id} className="px-6 py-3 text-sm text-gray-500 text-center">
                      {product.features[key as keyof typeof product.features] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Rating */}
              <tr>
                <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                  Рейтинг
                </td>
                {items.map(product => (
                  <td key={product.id} className="px-6 py-3 text-sm text-gray-500 text-center">
                    <div className="flex items-center justify-center">
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
                      <span className="ml-1">({product.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Availability */}
              <tr>
                <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-gray-900 z-10">
                  Наличие
                </td>
                {items.map(product => (
                  <td key={product.id} className="px-6 py-3 text-sm text-center">
                    <span className={product.inStock ? 'text-green-600' : 'text-orange-600'}>
                      {product.inStock ? 'В наличии' : 'Под заказ'}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;