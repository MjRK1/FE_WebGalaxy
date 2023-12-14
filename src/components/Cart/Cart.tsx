import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Drawer, Button, message } from 'antd';
import { GLX } from '../../services/GLX/GLX';
import useAuthStore from '../../services/zustandStores/authStore';
import useUserStore from '../../services/zustandStores/userStore';

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [isOpen, setOpen] = useState(false);
  const { isAuth } = useAuthStore.getState();
  const { user } = useUserStore.getState();

  useEffect(() => {
    GLX.getProductCart(isAuth, user?.id)
      .then((response) => {
        setCartProducts([...response?.data?.cartItems]);
      })
      .catch((e) => {
        message.error(e?.message);
      });
  }, [isOpen]);

  const getCartProductsCount = () => {
    let count = 0;
    if (cartProducts?.length) cartProducts?.forEach((item: any) => { count += item.quantity; });
    return count;
  };
  const handleChangeCount = (isQuantityIncrease:any, id:any) => {
    GLX.changeProductQuantity(isAuth, user?.id, { isQuantityIncrease, cartItemId: id })
      .then((response) => {
        setCartProducts([...response?.data?.cartItems]);
      })
      .catch((e) => {
        message.error(e?.message);
      });
  };

  const handleDeleteCartItem = (id: any) => {
    GLX.deleteCartItem(isAuth, user?.id, id)
      .then((response) => {
        setCartProducts([...response?.data?.cartItems]);
        message.success('Товар удален из корзины');
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const getCartSummary = () => {
    let sum = 0;
    if (cartProducts?.length) cartProducts?.forEach((item:any) => { sum += item.cost * item?.quantity; });
    return sum;
  };

  const renderCartInfo = () => {
    if (!cartProducts?.length) {
      return (
        <div className="cart-drawer-container__title">
          Корзина пуста
        </div>
      );
    }
    return (
      <div className="cart-drawer-container">
        <div className="cart-drawer-container__title">
          Ваш заказ
        </div>
        <Button
          // theme="black"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            // flexWrap: 'no-wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div className="make-order-button__title">
            Оформление заказа
          </div>
          <div className="make-order-button__cost">
            {getCartSummary()}
            {' '}
            ₽
          </div>
        </Button>
        <div className="cart-drawer-container__products-list">
          {cartProducts?.map((item: any) => (
            <div className="products-list__products-item">
              <img src={`${process.env.PUBLIC_URL}/images/${item?.img}`} alt="Услуга" className="products-item__product-image" />
              <div className="products-item__product-info">
                <div className="product-info__title-wrapper">
                  <div className="product-info__product-title">
                    {item?.name}
                  </div>
                  <div
                    className="product-info__delete-cart-product-button"
                    onClick={() => { handleDeleteCartItem(item?.id); }}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
                <div className="product-info__payment-info">
                  <div className="payment-info__product-count">
                    <motion.div
                      className="product-count__button-minus"
                      whileTap={{ scale: 1.2, transition: { duration: 0.2 } }}
                      onClick={() => handleChangeCount(false, item?.id)}
                    >
                      <div className="button-minus--minus" />
                    </motion.div>
                    <div className="product-count__count">{item?.quantity}</div>
                    <motion.div
                      className="product-count__button-plus"
                      whileTap={{ scale: 1.2, transition: { duration: 0.2 } }}
                      onClick={() => handleChangeCount(true, item?.id)}
                    >
                      <div className="button-plus--plus" />
                      <div className="button-plus--line" />
                    </motion.div>
                  </div>
                  <div className="payment-info__cost">
                    {item.cost * item.quantity}
                    {' '}
                    ₽
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="cart-wrapper">
      <div
        className="cart-wrapper__cart-button"
        onClick={() => setOpen(true)}
      >
        <span className="cart-button__icon">
          <ShoppingCartOutlined className="icon-cart" />
        </span>
        <span className="cart-button__products-count">{getCartProductsCount()}</span>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setOpen(false)}
        width={380}
      >
        {renderCartInfo()}
      </Drawer>
    </div>
  );
};
