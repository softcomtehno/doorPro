import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3A2618] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ДвериПро</h3>
            <p className="mb-4 text-gray-300">
              Мы предлагаем широкий ассортимент качественных межкомнатных и входных дверей от лучших производителей.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?type=interior" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Межкомнатные двери
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=entrance" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Входные двери
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=sliding" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Раздвижные двери
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=glass" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Стеклянные двери
                </Link>
              </li>
              <li>
                <Link to="/catalog?sale=true" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Акции и спецпредложения
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact#delivery" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/contact#guarantee" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link to="/contact#about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">+7 (495) 123-45-67</p>
                  <p className="text-sm text-gray-300">Пн-Вс: 9:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-[#D4AF37]" />
                <div>
                  <a href="mailto:info@dveripro.ru" className="hover:text-[#D4AF37] transition-colors">
                    info@dveripro.ru
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-[#D4AF37]" />
                <div>
                  <p>г. Москва, ул. Дверная, д. 123</p>
                  <p className="text-sm text-gray-300">ТЦ "МебельХолл", 2 этаж</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>© 2025 ДвериПро — Интернет-магазин межкомнатных и входных дверей. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;