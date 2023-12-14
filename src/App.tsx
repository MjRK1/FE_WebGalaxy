import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GLX } from './services/GLX/GLX';
import useUserStore from './services/zustandStores/userStore';
import useAuthStore from './services/zustandStores/authStore';
import { Header } from './common/Header';
import { Nav } from './common/Nav';
import { Footer } from './common/Footer';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  const user = useUserStore((state) => state?.user);
  const setUser = useUserStore((state) => state?.setUser);
  const isAuth = useAuthStore((state) => state?.isAuth);
  const setAuth = useAuthStore((state) => state?.setAuth);

  useEffect(() => {
    if (!isAuth) {
      setAuth(localStorage.getItem('token'));
    }
    if (!user) {
      GLX.getMe(useAuthStore.getState().isAuth)
        .then((response) => {
          setUser({ ...response?.data });
          localStorage?.setItem('user', JSON.stringify(response?.data));
        })
        .catch(async () => {
          setAuth(null);
          // localStorage.setItem('token', '');
          localStorage.setItem('user', '');
          setUser(null);
          localStorage?.setItem('user', JSON.stringify(null));
        });
    }
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-wrapper__header-container">
        <Header />
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />}>
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/main" element={<MainPage />} />
        <Route path="/products/:category" element={<ProductsPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
