import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Routes from './Routes';
import './theme.css';
import Navbar from './Components/Navbar';
import Breadcrumbs from './Components/Breadcrumbs';
import ScrollToTop from './Components/ScrollToTop';

export default function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar
        onFilterToggle={() => setIsFilterOpen((prev) => !prev)}
        isFilterOpen={isFilterOpen}
      />
      <main className='app-shell'>
        <div className='app-bg' />
        <div className='app-content'>
          <ScrollToTop />
          <Breadcrumbs />
          <Routes isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        </div>
      </main>
    </BrowserRouter>
  );
}
