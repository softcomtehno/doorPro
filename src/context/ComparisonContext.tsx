import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

interface ComparisonContextType {
  items: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const savedComparison = localStorage.getItem('comparison');
    return savedComparison ? JSON.parse(savedComparison) : [];
  });

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(items));
  }, [items]);

  const addToComparison = (product: Product) => {
    if (!isInComparison(product.id) && items.length < 4) {
      setItems(prevItems => [...prevItems, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearComparison = () => {
    setItems([]);
  };

  const isInComparison = (productId: number) => {
    return items.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      items,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};