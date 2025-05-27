import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    delivery: 'courier',
    payment: 'card'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the actual order submission logic
    
    // For demonstration purposes, just show an alert
    alert('Заказ успешно оформлен! С вами свяжется наш менеджер.');
    clearCart();
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#3A2618] mb-8">Корзина</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-[#3A2618] mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-600 mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Главная</Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-gray-700">Корзина</span>
      </nav>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3A2618]">Корзина</h1>
        <Link to="/catalog" className="flex items-center text-[#3A2618] hover:text-[#D4AF37] transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Продолжить покупки
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Товар</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Кол-во</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.product.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded mr-3"
                        />
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium text-[#3A2618] hover:text-[#D4AF37] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.options && (
                            <div className="text-sm text-gray-500 mt-1">
                              {item.options.color && <div>Цвет: {item.options.color}</div>}
                              {item.options.handle && <div>Ручка: {item.options.handle.name}</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-900">{item.product.price.toLocaleString()} ₽</span>
                      {item.options?.handle?.price > 0 && (
                        <div className="text-xs text-gray-500">
                          +{item.options.handle.price.toLocaleString()} ₽
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button 
                          className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                          className="w-12 mx-2 text-center border border-gray-300 rounded"
                        />
                        <button 
                          className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {(
                        (item.product.price + (item.options?.handle?.price || 0)) * item.quantity
                      ).toLocaleString()} ₽
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between mb-8">
            <button 
              className="text-red-500 hover:text-red-700 transition-colors"
              onClick={clearCart}
            >
              Очистить корзину
            </button>
            <div className="text-xl font-bold">
              Итого: <span className="text-[#3A2618]">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>
        
        {/* Order form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3A2618] mb-4">Оформление заказа</h2>
            
            <form onSubmit={handleSubmitOrder}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Имя*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    placeholder="example@mail.ru"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Адрес доставки*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                  />
                </div>
                
                <div>
                  <label htmlFor="delivery" className="block text-sm font-medium text-gray-700 mb-1">
                    Способ доставки*
                  </label>
                  <select
                    id="delivery"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  >
                    <option value="courier">Курьером</option>
                    <option value="pickup">Самовывоз</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
                    Способ оплаты*
                  </label>
                  <select
                    id="payment"
                    name="payment"
                    value={formData.payment}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  >
                    <option value="card">Банковской картой</option>
                    <option value="cash">Наличными при получении</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Комментарий к заказу
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    placeholder="Дополнительная информация к заказу"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit"
                  className="w-full bg-[#3A2618] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Оформить заказ
                </button>
              </div>
              
              <p className="mt-4 text-sm text-gray-500">
                Нажимая кнопку "Оформить заказ", вы соглашаетесь с политикой конфиденциальности и условиями продажи
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;