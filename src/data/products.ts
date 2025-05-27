import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Классика венге",
    type: "interior",
    price: 12500,
    oldPrice: 15000,
    inStock: true,
    images: [
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    material: "МДФ",
    color: "Венге",
    description:
      "Межкомнатная дверь в классическом стиле из МДФ с покрытием экошпон. Идеальное решение для любого интерьера.",
    features: {
      width: 80,
      height: 200,
      thickness: 4,
    },
    options: {
      colors: ["Венге", "Дуб сонома", "Белый"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Премиум", price: 1500 },
      ],
    },
    isOnSale: true,
    rating: 4.7,
    reviewCount: 54,
  },
  {
    id: 2,
    name: "Модерн белый",
    type: "interior",
    price: 14900,
    inStock: true,
    images: [
      "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    material: "МДФ",
    color: "Белый",
    description:
      "Межкомнатная дверь в современном стиле из МДФ с белым покрытием. Подойдет для минималистичных интерьеров.",
    features: {
      width: 80,
      height: 200,
      thickness: 4,
    },
    options: {
      colors: ["Белый", "Серый", "Черный"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Минимализм", price: 2000 },
      ],
    },
    isNew: true,
    rating: 4.9,
    reviewCount: 32,
  },
  {
    id: 3,
    name: "Стальной страж",
    type: "entrance",
    price: 35000,
    inStock: true,
    images: [
      "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    material: "Сталь",
    color: "Коричневый",
    description:
      "Надежная входная дверь с многослойной стальной конструкцией и тепло-шумоизоляцией. Оснащена современными системами безопасности.",
    features: {
      width: 96,
      height: 205,
      thickness: 8,
      soundproofing: 32,
      heatInsulation: 1.5,
      lockType: "Многоточечный",
    },
    options: {
      colors: ["Коричневый", "Черный", "Серый"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Антивандальная", price: 3000 },
      ],
    },
    isPopular: true,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: 4,
    name: "Раздвижная стеклянная",
    type: "sliding",
    price: 28900,
    oldPrice: 32000,
    inStock: true,
    images: ["https://images.prom.ua/3279349711_w600_h600_3279349711.jpg"],
    material: "Стекло, алюминий",
    color: "Прозрачный, серебро",
    description:
      "Современная раздвижная дверь из закаленного стекла с алюминиевой фурнитурой. Экономит пространство и выглядит стильно.",
    features: {
      width: 90,
      height: 200,
      thickness: 1,
    },
    options: {
      glasses: ["Прозрачное", "Матовое", "Тонированное"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Премиум", price: 2500 },
      ],
    },
    isOnSale: true,
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: 5,
    name: "Стеклянная классика",
    type: "glass",
    price: 22500,
    inStock: true,
    images: [
      "https://images.pexels.com/photos/3316925/pexels-photo-3316925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3316925/pexels-photo-3316925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    material: "Закаленное стекло",
    color: "Прозрачный",
    description:
      "Элегантная дверь из закаленного стекла для ванных комнат, душевых и других помещений. Создает ощущение простора.",
    features: {
      width: 70,
      height: 190,
      thickness: 0.8,
    },
    options: {
      glasses: ["Прозрачное", "Матовое", "С узором"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Премиум", price: 1800 },
      ],
    },
    isNew: true,
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: 6,
    name: "Премиум дуб",
    type: "interior",
    price: 18900,
    inStock: true,
    images: [
      "https://www.polarwood.ru/wp-content/uploads/2019/11/%D0%94%D1%83%D0%B1-Premium-Sirius-Oiled_inter.jpg",
    ],
    material: "Массив дуба",
    color: "Натуральный дуб",
    description:
      "Премиальная межкомнатная дверь из массива дуба с натуральным шпоном. Экологичность и долговечность гарантированы.",
    features: {
      width: 80,
      height: 200,
      thickness: 4.5,
    },
    options: {
      colors: ["Натуральный дуб", "Темный дуб", "Медовый дуб"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Латунь", price: 3500 },
      ],
    },
    isPopular: true,
    rating: 4.9,
    reviewCount: 74,
  },
  {
    id: 7,
    name: "Броня-люкс",
    type: "entrance",
    price: 42000,
    oldPrice: 49000,
    inStock: true,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIG4H0Y4timheFTKyczlpsmsMcq-uhu8wwZQ&s",
    ],
    material: "Сталь, МДФ",
    color: "Венге",
    description:
      "Премиальная входная дверь повышенной безопасности с отделкой из МДФ. Оснащена биометрическим замком и системой видеонаблюдения.",
    features: {
      width: 96,
      height: 205,
      thickness: 10,
      soundproofing: 42,
      heatInsulation: 1.2,
      lockType: "Биометрический",
    },
    options: {
      colors: ["Венге", "Орех", "Белый"],
      handles: [
        { name: "Стандарт", price: 0 },
        { name: "Умная ручка", price: 8000 },
      ],
    },
    isOnSale: true,
    rating: 4.9,
    reviewCount: 53,
  },
  {
    id: 8,
    name: "Купе лофт",
    type: "sliding",
    price: 26500,
    inStock: true,
    images: [
      "https://fiesta-mebel.ru/assets/images/products/92721/item-1896.png",
    ],
    material: "Металл, стекло",
    color: "Черный, прозрачный",
    description:
      "Раздвижная дверь в стиле лофт с металлическим каркасом и стеклянными вставками. Идеальное решение для современных интерьеров.",
    features: {
      width: 100,
      height: 220,
      thickness: 3,
    },
    options: {
      glasses: ["Прозрачное", "Тонированное"],
      handles: [
        { name: "Лофт", price: 0 },
        { name: "Индастриал", price: 2800 },
      ],
    },
    isNew: true,
    rating: 4.7,
    reviewCount: 31,
  },
];

export const getProductById = (id: number) => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (id: number, type: string, limit = 4) => {
  return products
    .filter((product) => product.id !== id && product.type === type)
    .slice(0, limit);
};

export const getFilteredProducts = (filters: Record<string, any>) => {
  return products.filter((product) => {
    // Filter by type
    if (filters.type && product.type !== filters.type) {
      return false;
    }

    // Filter by search term
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !product.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    // Filter by material
    if (filters.material && !product.material.includes(filters.material)) {
      return false;
    }

    // Filter by availability
    if (filters.inStock && !product.inStock) {
      return false;
    }

    // Filter by sale
    if (filters.sale && !product.isOnSale) {
      return false;
    }

    // Filter by new
    if (filters.new && !product.isNew) {
      return false;
    }

    return true;
  });
};
