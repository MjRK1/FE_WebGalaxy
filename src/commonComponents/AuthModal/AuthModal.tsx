import React from 'react';
import { Input, Modal } from 'antd';
import { IAuth } from '../../services/GLX/IGLX';

interface IAuthModal {
  title: string,
  userData: {
    name?: string,
    email: string,
    password: string,
  },
  changeUserData: (type: string, value: string) => void,
  type?: string,
  isOpen: boolean,
  okText: string,
  isLoading: boolean,
  cancelText: string,
  onOk: (userData?: IAuth) => void,
  onCancel: () => void
}

export function AuthModal(props: IAuthModal) {
  const {
    title,
    isOpen,
    userData,
    changeUserData,
    type = 'REGISTRATION',
    isLoading,
    onOk,
    onCancel,
    okText,
    cancelText,
  } = props;

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={() => onOk(userData)}
      onCancel={() => onCancel()}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={isLoading}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <div className="auth-modal">
        {type === 'REGISTRATION' && (
          <div className="auth-modal__name-input">
            <div className="name-input__title">
              Имя пользователя
            </div>
            <Input
              placeholder="Введите ваше имя"
              value={userData?.name}
              onChange={(e) => changeUserData('name', e.target.value)}
            />
          </div>
        )}
        <div className="auth-modal__email-input">
          <div className="email-input__title">
            e-mail пользователя
          </div>
          <Input
            placeholder="Введите ваш email"
            value={userData?.email}
            onChange={(e) => changeUserData('email', e.target.value)}
          />
        </div>
        <div className="auth-modal__password-input">
          <div className="password-input__title">
            Пароль пользователя
          </div>
          <Input.Password
            placeholder="Введите ваш пароль"
            value={userData?.password}
            onChange={(e) => changeUserData('password', e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
