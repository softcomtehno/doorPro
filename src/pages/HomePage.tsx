import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, CreditCard, Shield, BarChart2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.isPopular || product.isNew).slice(0, 4);
  const onSaleProducts = products.filter(product => product.isOnSale).slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn">
              Двери для вашего дома
            </h1>
            <p className="text-xl text-white mb-8 animate-fadeIn animation-delay-200">
              Широкий выбор межкомнатных и входных дверей от лучших производителей
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-400">
              <Link 
                to="/catalog?type=interior"
                className="bg-white text-[#3A2618] hover:bg-[#D4AF37] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Межкомнатные двери
              </Link>
              <Link 
                to="/catalog?type=entrance"
                className="bg-[#D4AF37] text-white hover:bg-white hover:text-[#3A2618] px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Входные двери
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#3A2618] mb-8">Категории дверей</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Межкомнатные двери" 
              image="https://images.pexels.com/photos/534183/pexels-photo-534183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              link="/catalog?type=interior"
              count={products.filter(p => p.type === 'interior').length}
            />
            <CategoryCard 
              title="Входные двери" 
              image="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              link="/catalog?type=entrance"
              count={products.filter(p => p.type === 'entrance').length}
            />
            <CategoryCard 
              title="Раздвижные двери" 
              image="https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              link="/catalog?type=sliding"
              count={products.filter(p => p.type === 'sliding').length}
            />
            <CategoryCard 
              title="Стеклянные двери" 
              image="https://images.pexels.com/photos/3316925/pexels-photo-3316925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              link="/catalog?type=glass"
              count={products.filter(p => p.type === 'glass').length}
            />
          </div>
        </div>
      </section>
      
      {/* Popular Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#3A2618]">Популярные модели</h2>
            <Link 
              to="/catalog" 
              className="flex items-center text-[#D4AF37] hover:text-[#3A2618] transition-colors"
            >
              Смотреть все <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Sale Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#3A2618]">Акции и спецпредложения</h2>
            <Link 
              to="/catalog?sale=true" 
              className="flex items-center text-[#D4AF37] hover:text-[#3A2618] transition-colors"
            >
              Все акции <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#3A2618] mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard 
              icon={<Truck size={40} className="text-[#D4AF37]" />}
              title="Доставка"
              description="Быстрая доставка по всей России. Бережная транспортировка и подъем на этаж."
            />
            <BenefitCard 
              icon={<CreditCard size={40} className="text-[#D4AF37]" />}
              title="Оплата"
              description="Удобные способы оплаты. Наличный и безналичный расчет, рассрочка."
            />
            <BenefitCard 
              icon={<Shield size={40} className="text-[#D4AF37]" />}
              title="Гарантия"
              description="Гарантия на все двери от 1 года. Сервисное обслуживание."
            />
            <BenefitCard 
              icon={<BarChart2 size={40} className="text-[#D4AF37]" />}
              title="Качество"
              description="Только проверенные производители и сертифицированная продукция."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#3A2618] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Нужна помощь с выбором?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Наши специалисты помогут подобрать двери, которые идеально подойдут для вашего интерьера
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-[#D4AF37] hover:bg-white hover:text-[#3A2618] text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link, count }) => {
  return (
    <Link to={link} className="group block relative rounded-lg overflow-hidden h-64 shadow-md">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-200">{count} моделей</p>
      </div>
    </Link>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:translate-y-[-5px]">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#3A2618] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;