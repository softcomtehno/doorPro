import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, Check, SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getFilteredProducts } from "../data/products";
import { Product } from "../types/product";

const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // Initialize filters from URL parameters
  useEffect(() => {
    const newFilters: Record<string, any> = {};

    const type = searchParams.get("type");
    if (type) newFilters.type = type;

    const search = searchParams.get("search");
    if (search) newFilters.search = search;

    const sale = searchParams.get("sale");
    if (sale === "true") newFilters.sale = true;

    setFilters(newFilters);
  }, [searchParams]);

  // Apply filters and get products
  useEffect(() => {
    let filteredProducts = getFilteredProducts(filters);

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => a.price - b.price
        );
        break;
      case "price-desc":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.price - a.price
        );
        break;
      case "rating":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.rating - a.rating
        );
        break;
      case "newest":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
        break;
      default:
        // Default sorting (featured)
        break;
    }

    setProducts(filteredProducts);
  }, [filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      // Toggle boolean filters
      if (typeof value === "boolean") {
        if (prev[key] === value) {
          const newFilters = { ...prev };
          delete newFilters[key];
          return newFilters;
        }
        return { ...prev, [key]: value };
      }

      // Replace other filters
      if (value === null || value === "") {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }

      return { ...prev, [key]: value };
    });
  };

  const clearFilters = () => {
    const typeFilter = filters.type ? { type: filters.type } : {};
    const searchFilter = filters.search ? { search: filters.search } : {};
    setFilters({ ...typeFilter, ...searchFilter });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3A2618] mb-6">
        {filters.type === "interior"
          ? "Межкомнатные двери"
          : filters.type === "entrance"
          ? "Входные двери"
          : filters.type === "sliding"
          ? "Раздвижные двери"
          : filters.type === "glass"
          ? "Стеклянные двери"
          : filters.sale
          ? "Акции и спецпредложения"
          : filters.search
          ? `Поиск: ${filters.search}`
          : "Каталог дверей"}
      </h1>

      {/* Mobile filters toggle */}
      <div className="lg:hidden mb-4">
        <button
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-3 shadow-sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <Filter size={16} />
          <span>Фильтры и сортировка</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div
          className={`
          lg:w-1/4 bg-white rounded-lg shadow-md p-4 transition-all duration-300
          ${isFiltersOpen ? "block" : "hidden lg:block"}
        `}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#3A2618] flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Фильтры
            </h2>
            <button
              className="text-gray-500 hover:text-[#D4AF37] transition-colors lg:hidden"
              onClick={() => setIsFiltersOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {Object.keys(filters).length > 0 &&
            !(
              Object.keys(filters).length === 1 &&
              (filters.type || filters.search)
            ) && (
              <button
                className="mb-4 text-sm text-[#D4AF37] hover:text-[#3A2618] transition-colors"
                onClick={clearFilters}
              >
                Сбросить все фильтры
              </button>
            )}

          {/* Filter sections */}
          <div className="space-y-6">
            {/* Door type */}
            <div>
              <h3 className="font-medium mb-2">Тип дверей</h3>
              <div className="space-y-2">
                <FilterCheckbox
                  label="Межкомнатные"
                  checked={filters.type === "interior"}
                  onChange={() => handleFilterChange("type", "interior")}
                />
                <FilterCheckbox
                  label="Входные"
                  checked={filters.type === "entrance"}
                  onChange={() => handleFilterChange("type", "entrance")}
                />
                <FilterCheckbox
                  label="Раздвижные"
                  checked={filters.type === "sliding"}
                  onChange={() => handleFilterChange("type", "sliding")}
                />
                <FilterCheckbox
                  label="Стеклянные"
                  checked={filters.type === "glass"}
                  onChange={() => handleFilterChange("type", "glass")}
                />
              </div>
            </div>

            {/* Price range */}
            <div>
              <h3 className="font-medium mb-2">Цена, сом</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minPrice",
                      parseInt(e.target.value) || ""
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="До"
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPrice",
                      parseInt(e.target.value) || ""
                    )
                  }
                />
              </div>
            </div>

            {/* Special filters */}
            <div>
              <h3 className="font-medium mb-2">Специальные предложения</h3>
              <div className="space-y-2">
                <FilterCheckbox
                  label="Акции"
                  checked={filters.sale === true}
                  onChange={() => handleFilterChange("sale", true)}
                />
                <FilterCheckbox
                  label="Новинки"
                  checked={filters.new === true}
                  onChange={() => handleFilterChange("new", true)}
                />
                <FilterCheckbox
                  label="В наличии"
                  checked={filters.inStock === true}
                  onChange={() => handleFilterChange("inStock", true)}
                />
              </div>
            </div>
          </div>

          {/* Mobile sorting */}
          <div className="mt-6 pt-4 border-t border-gray-200 lg:hidden">
            <h3 className="font-medium mb-2">Сортировка</h3>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating">По рейтингу</option>
              <option value="newest">Сначала новинки</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Sorting and results count */}
          <div className="mb-6 flex flex-wrap items-center justify-between bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-600">
              Найдено: <span className="font-medium">{products.length}</span>{" "}
              товаров
            </p>

            <div className="hidden lg:flex items-center">
              <span className="mr-2 text-gray-600">Сортировать:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-transparent border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="rating">По рейтингу</option>
                  <option value="newest">Сначала новинки</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {Object.keys(filters).length > 0 &&
            !(
              Object.keys(filters).length === 1 &&
              (filters.type || filters.search)
            ) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.minPrice && (
                  <ActiveFilter
                    label={`От ${filters.minPrice} сом`}
                    onRemove={() => handleFilterChange("minPrice", "")}
                  />
                )}
                {filters.maxPrice && (
                  <ActiveFilter
                    label={`До ${filters.maxPrice} сом`}
                    onRemove={() => handleFilterChange("maxPrice", "")}
                  />
                )}
                {filters.sale && (
                  <ActiveFilter
                    label="Акции"
                    onRemove={() => handleFilterChange("sale", false)}
                  />
                )}
                {filters.new && (
                  <ActiveFilter
                    label="Новинки"
                    onRemove={() => handleFilterChange("new", false)}
                  />
                )}
                {filters.inStock && (
                  <ActiveFilter
                    label="В наличии"
                    onRemove={() => handleFilterChange("inStock", false)}
                  />
                )}
              </div>
            )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-[#3A2618] mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600 mb-4">
                К сожалению, по вашему запросу ничего не найдено. Попробуйте
                изменить параметры поиска.
              </p>
              <button
                className="text-[#D4AF37] hover:text-[#3A2618] transition-colors"
                onClick={clearFilters}
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <div
        className={`
        w-5 h-5 flex items-center justify-center mr-2 border rounded
        ${
          checked
            ? "bg-[#D4AF37] border-[#D4AF37]"
            : "border-gray-300 group-hover:border-[#D4AF37]"
        }
        transition-colors
      `}
      >
        {checked && <Check size={14} className="text-white" />}
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

interface ActiveFilterProps {
  label: string;
  onRemove: () => void;
}

const ActiveFilter: React.FC<ActiveFilterProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
      <span className="text-sm text-gray-700 mr-1">{label}</span>
      <button
        className="text-gray-500 hover:text-[#D4AF37] transition-colors"
        onClick={onRemove}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default CatalogPage;
