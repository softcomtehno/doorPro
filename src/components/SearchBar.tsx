import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      if (onClose) onClose();
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Поиск дверей..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#3A2618] hover:text-[#D4AF37] transition-colors"
        >
          Найти
        </button>
      </div>
    </form>
  );
};

export default SearchBar;