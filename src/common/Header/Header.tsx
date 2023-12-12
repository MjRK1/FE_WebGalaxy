import React, { useState } from 'react';
import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoPng from '../../assets/images/logo.png';
import useAuthStore from '../../services/zustandStores/authStore';
import { AuthModal } from '../../commonComponents/AuthModal';
import { GLX } from '../../services/GLX/GLX';
import { IAuth } from '../../services/GLX/IGLX';
import useUserStore from '../../services/zustandStores/userStore';

export function Header() {
  const user = useUserStore((state) => state?.user);
  const setUser = useUserStore((state) => state?.setUser);
  const isAuth = useAuthStore((state) => state?.isAuth);
  const setAuth = useAuthStore((state) => state?.setAuth);
  const navigator = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [registrationUserData, setRegistrationUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginUserData, setLoginUserData] = useState<IAuth>({
    email: '',
    password: '',
  });

  const handleChangeRegistrationUserData = (type: string, value: string) => {
    const newRegistrationUserData = registrationUserData;
    newRegistrationUserData[type as keyof IAuth] = value;
    setRegistrationUserData({ ...newRegistrationUserData });
  };

  const handleChangeLoginUserData = (type: string, value: string) => {
    const newLoginUserData = loginUserData;
    newLoginUserData[type as keyof IAuth] = value;
    setLoginUserData({ ...newLoginUserData });
  };

  const handleRegistration = (userData: IAuth | undefined) => {
    setLoading(true);
    GLX.registration(userData)
      .then(async (response) => {
        setAuth(response?.data?.token);
        localStorage.setItem('token', response?.data?.token);
        await GLX.getMe(response?.data?.token)
          .then((r) => {
            setUser(r?.data);
            localStorage.setItem('user', JSON.stringify(r?.data));
          })
          .catch(() => message.error('Ошибка получения пользователя'));
        setLoading(false);
        setRegistrationModalOpen(false);
        setRegistrationUserData({
          name: '',
          email: '',
          password: '',
        });
        await message.success(`Добро пожаловать, ${useUserStore.getState()?.user?.name}`);
      })
      .catch(async (e) => {
        await message.error(`${e}`);
      });
  };

  const handleLogin = (userData: IAuth | undefined) => {
    setLoading(true);
    GLX.login(userData)
      .then(async (response) => {
        await setAuth(response?.data?.token);
        localStorage.setItem('token', response?.data?.token);
        await GLX.getMe(response?.data?.token)
          .then((r) => {
            setUser(r?.data);
            localStorage.setItem('user', JSON.stringify(r?.data));
          })
          .catch(() => message.error('Ошибка получения пользователя'));
        setLoading(false);
        setLoginModalOpen(false);
        setLoginUserData({
          email: '',
          password: '',
        });
        message.success(`Добро пожаловать, ${useUserStore.getState().user?.name}`);
      })
      .catch(async (e) => {
        await message.error(e?.message);
      });
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    setUser(null);
    message.success('Вы вышли из аккаунта');
  };

  const renderAuthButtons = () => {
    if (isAuth) {
      return (
        <div className="auth-actions-container__logout-button">
          <div className="logout-button__user-name">
            {user?.name}
          </div>
          <Button
            type="primary"
            size="large"
            danger
            onClick={handleLogout}
          >
            Выйти из профиля
          </Button>
        </div>
      );
    }
    return (
      <div className="actions-container__auth-actions-container">
        <div className="auth-actions-container__login-button">
          <Button
            type="primary"
            size="large"
            onClick={() => setLoginModalOpen(true)}
          >
            Логин
          </Button>
        </div>
        <div className="auth-actions-container__registration_button">
          <Button type="default" size="large" onClick={() => setRegistrationModalOpen(true)}>Регистрация</Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header-container">
        <div className="header-logo">
          <img src={LogoPng} alt="Логотип" />
        </div>
        <div className="header-title-container" onClick={() => navigator('/main')}>
          <div className="header-title-container__title">Galaxy Store</div>
        </div>
        <div className="header-container__actions-container">
          {renderAuthButtons()}
          <div className="actions-container__cart-button">
            <ShoppingCartOutlined className="cart-button__icon" style={{ fontSize: 35 }} />
          </div>
        </div>
      </div>
      <AuthModal
        title="Авторизация"
        type="LOGIN"
        isLoading={isLoading}
        userData={loginUserData}
        changeUserData={handleChangeLoginUserData}
        isOpen={isLoginModalOpen}
        onOk={handleLogin}
        onCancel={() => setLoginModalOpen(false)}
        okText="Авторизоваться"
        cancelText="Отмена"
      />
      <AuthModal
        title="Регистрация"
        isLoading={isLoading}
        userData={registrationUserData}
        changeUserData={handleChangeRegistrationUserData}
        isOpen={isRegistrationModalOpen}
        onOk={handleRegistration}
        onCancel={() => setRegistrationModalOpen(false)}
        okText="Зарегистрироваться"
        cancelText="Отмена"
      />
    </>
  );
}
