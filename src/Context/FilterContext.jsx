import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
      {children}
    </FilterContext.Provider>
  );
};
export const useFilter = () => useContext(FilterContext);
