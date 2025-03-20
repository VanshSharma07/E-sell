import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ThemeProvider from './context/ThemeContext';
import FuturisticBackground from './components/common/FuturisticBackground';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const SellItemPage = React.lazy(() => import('./pages/SellItemPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const MainLayout = React.lazy(() => import('./components/layout/MainLayout'));

function App() {
  return (
    <ThemeProvider>
      <FuturisticBackground particleCount={120} opacity={0.4} />
      <BrowserRouter>
        <React.Suspense fallback={<LoadingSpinner fullScreen message="Loading E-Cycle..." />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/auth/*" element={<AuthPage />} />
              
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="sell" element={<SellItemPage />} />
                <Route path="dashboard/*" element={<DashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
