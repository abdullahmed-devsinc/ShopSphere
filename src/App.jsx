import Routes from './Routes';
import './theme.css';
import { FilterProvider } from './Context/FilterContext';

export default function App() {
  return (
    <FilterProvider>
      <Routes />
    </FilterProvider>
  );
}
