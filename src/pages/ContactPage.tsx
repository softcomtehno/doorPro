import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChevronRight, Truck, CreditCard, Info } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Главная</Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-gray-700">Контакты</span>
      </nav>
      
      <h1 className="text-3xl font-bold text-[#3A2618] mb-8">Контакты</h1>
      
      {/* Contact info and map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3A2618] mb-4">Наши контакты</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">+7 (495) 123-45-67</p>
                  <p className="text-sm text-gray-500">Отдел продаж</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">+7 (495) 765-43-21</p>
                  <p className="text-sm text-gray-500">Служба поддержки</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 text-[#D4AF37]" />
                <div>
                  <a href="mailto:info@dveripro.ru" className="font-medium hover:text-[#D4AF37] transition-colors">
                    info@dveripro.ru
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">г. Москва, ул. Дверная, д. 123</p>
                  <p className="text-sm text-gray-500">ТЦ "МебельХолл", 2 этаж</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-3 mt-1 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">Пн-Вс: 9:00 - 20:00</p>
                  <p className="text-sm text-gray-500">Без выходных</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-bold text-[#3A2618] mb-4">Мы на карте</h2>
            <div className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Здесь будет карта с местоположением магазина</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-xl font-bold text-[#3A2618] mb-6" id="contact-form">Обратная связь</h2>
        
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя*
              </label>
              <input
                type="text"
                id="name"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="example@mail.ru"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Тема обращения
              </label>
              <select
                id="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              >
                <option value="order">Заказ</option>
                <option value="consultation">Консультация</option>
                <option value="complaint">Жалоба</option>
                <option value="cooperation">Сотрудничество</option>
                <option value="other">Другое</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение*
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="Напишите ваш вопрос или комментарий"
              ></textarea>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="privacy"
              required
              className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
            />
            <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
              Я согласен с <a href="#" className="text-[#D4AF37] hover:underline">политикой конфиденциальности</a>*
            </label>
          </div>
          
          <button
            type="submit"
            className="bg-[#3A2618] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Отправить сообщение
          </button>
        </form>
      </div>
      
      {/* Delivery section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12" id="delivery">
        <div className="flex items-center mb-6">
          <Truck size={24} className="text-[#D4AF37] mr-3" />
          <h2 className="text-xl font-bold text-[#3A2618]">Доставка и оплата</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">Доставка</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Доставка по Москве: от 1000 ₽ (зависит от зоны доставки)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Доставка по Московской области: от 1500 ₽</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Доставка в регионы: рассчитывается индивидуально</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Подъем на этаж: от 500 ₽ (зависит от этажа и наличия лифта)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Самовывоз из магазина: бесплатно</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Оплата</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Оплата наличными при получении</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Оплата банковской картой</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Безналичный расчет (для юридических лиц)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D4AF37] font-bold mr-2">•</span>
                <span>Рассрочка и кредит (подробности у менеджера)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Guarantee section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12" id="guarantee">
        <div className="flex items-center mb-6">
          <Shield size={24} className="text-[#D4AF37] mr-3" />
          <h2 className="text-xl font-bold text-[#3A2618]">Гарантия</h2>
        </div>
        
        <div className="text-gray-700 space-y-4">
          <p>
            Компания "ДвериПро" предоставляет гарантию на все двери от 1 года. Гарантия распространяется на производственные дефекты и качество материалов.
          </p>
          <p>
            Для получения гарантийного обслуживания необходимо предоставить товарный чек или иной документ, подтверждающий покупку.
          </p>
          <p>
            Гарантия не распространяется на повреждения, вызванные неправильной эксплуатацией, нарушением условий хранения или механическими воздействиями.
          </p>
          <p>
            В случае обнаружения дефекта в течение гарантийного срока, мы обязуемся бесплатно устранить его или заменить товар на аналогичный.
          </p>
        </div>
      </div>
      
      {/* About company section */}
      <div className="bg-white rounded-lg shadow-md p-6" id="about">
        <div className="flex items-center mb-6">
          <Info size={24} className="text-[#D4AF37] mr-3" />
          <h2 className="text-xl font-bold text-[#3A2618]">О компании</h2>
        </div>
        
        <div className="text-gray-700 space-y-4">
          <p>
            "ДвериПро" — это компания с многолетним опытом работы на рынке межкомнатных и входных дверей. Мы предлагаем широкий ассортимент дверей от ведущих производителей, а также услуги по установке и обслуживанию.
          </p>
          <p>
            Наша миссия — обеспечить каждого клиента качественными дверями, которые идеально впишутся в его интерьер и прослужат долгие годы.
          </p>
          <p>
            Преимущества работы с нами:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Более 10 лет опыта на рынке</li>
            <li>Только сертифицированная продукция</li>
            <li>Собственная служба доставки и монтажа</li>
            <li>Индивидуальный подход к каждому клиенту</li>
            <li>Гарантия на все двери и установку</li>
            <li>Постоянные акции и специальные предложения</li>
          </ul>
          <p>
            Будем рады видеть вас в нашем салоне и помочь с выбором идеальных дверей для вашего дома или офиса!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;