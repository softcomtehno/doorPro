import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  ShoppingCart,
  Search,
  Phone,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-3xl font-bold text-[#3A2618]">
            ДвериПро
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <Link
              to="/cart"
              className="p-2 hover:text-[#D4AF37] transition-colors relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              href="tel:+74951234567"
              className="hidden md:flex items-center text-[#3A2618] hover:text-[#D4AF37] transition-colors"
            >
              <Phone size={16} className="mr-2" />
              <span>+996 500 90-90-90</span>
            </a>

            <button
              className="md:hidden p-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-3 border-t border-gray-200 animate-fadeDown">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeDown">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLinks isMobile />
            </nav>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <a
                href="tel:+74951234567"
                className="flex items-center text-[#3A2618]"
              >
                <Phone size={16} className="mr-2" />
                <span>+996 500 90-90-90</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const menuItems = [
    {
      id: "doors",
      label: "Каталог дверей",
      hasDropdown: true,
      dropdownItems: [
        { label: "Межкомнатные двери", link: "/catalog?type=interior" },
        { label: "Входные двери", link: "/catalog?type=entrance" },
        { label: "Раздвижные двери", link: "/catalog?type=sliding" },
        { label: "Стеклянные двери", link: "/catalog?type=glass" },
      ],
    },
    { id: "sale", label: "Акции", link: "/catalog?sale=true" },
    { id: "delivery", label: "Доставка и оплата", link: "/contact#delivery" },
    { id: "about", label: "О компании", link: "/contact#about" },
  ];

  return (
    <>
      {menuItems.map((item) => (
        <div key={item.id} className={`relative ${isMobile ? "" : "group"}`}>
          {item.hasDropdown ? (
            <>
              <button
                className={`px-3 py-2 ${
                  isMobile ? "flex justify-between w-full" : ""
                } rounded hover:text-[#D4AF37] transition-colors flex items-center`}
                onClick={() => isMobile && handleDropdownToggle(item.id)}
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    openDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  ${
                    isMobile
                      ? "static mt-2 mb-2 space-y-2 pl-4 border-l-2 border-gray-200"
                      : "absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  }
                  ${
                    isMobile && openDropdown === item.id
                      ? "block"
                      : isMobile
                      ? "hidden"
                      : ""
                  }
                `}
              >
                {item.dropdownItems?.map((dropdownItem, index) => (
                  <Link
                    key={index}
                    to={dropdownItem.link}
                    className={`
                      ${
                        isMobile
                          ? "block py-2"
                          : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      }
                      hover:text-[#D4AF37] transition-colors
                    `}
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <Link
              to={item.link || "#"}
              className="px-3 py-2 rounded hover:text-[#D4AF37] transition-colors block"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default Header;
