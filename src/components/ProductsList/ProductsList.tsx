import React, { useState } from 'react';
import { message } from 'antd';
import { IProduct } from '../../pages/ProductsPage/IProducts/IProduct';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { GLX } from '../../services/GLX/GLX';
import useAuthStore from '../../services/zustandStores/authStore';
import useUserStore from '../../services/zustandStores/userStore';
import { IProductModal } from './interfaces/IProductModal';

interface IProductsListProps {
  products: IProduct[],
  setProducts: (state: IProduct[]) => void
}

export const ProductsList = ({ products, setProducts } :IProductsListProps) => {
  const [isProductOpen, setProductOpen] = useState<IProductModal>({ product: null, isOpen: false });
  const { isAuth } = useAuthStore.getState();
  const { user } = useUserStore.getState();
  const handleAddFeedback = (userId: number | undefined, productId: string | undefined, comment:string) => {
    GLX.addProductReview(isAuth, { userId, productId, comment })
      .then(() => {
        message.success('Отзыв оставлен!');
        GLX.getProductsList()
          .then((response) => {
            setProducts([...response?.data]);
          })
          .catch((e) => {
            message.error(e?.message);
          });
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleAddToCart = (product: IProduct | null | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    GLX.addProductToCart(isAuth, user?.id, product?.id)
      .then(() => {
        message.success('Товар добавлен в корзину');
      })
      .catch(() => {
        message.error('Ошибка добавления товара');
      });
  };

  const handleDeleteReview = (reviewId: string | null) => {
    GLX.deleteProductReview(isAuth, reviewId)
      .then(() => {
        message.success('Отзыв удален');
        GLX.getProductsList()
          .then((response) => {
            setProducts([...response?.data]);
          })
          .catch((e) => {
            message.error(e?.message);
          });
      })
      .catch((e) => {
        message.error(e?.message);
      });
  };

  return (
    <>
      <div className="products-list-wrapper">
        <div className="products-list-wrapper__products-list">
          {products.map((item) => (
            <ProductCard product={item} setProductOpen={setProductOpen} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      <ProductModal
        products={products}
        isProductOpen={isProductOpen}
        setProductOpen={setProductOpen}
        onSuccess={handleAddFeedback}
        onAddToCart={handleAddToCart}
        onReviewDelete={handleDeleteReview}
      />
    </>
  );
};
