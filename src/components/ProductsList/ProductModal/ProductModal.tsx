import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import {
  Modal, Input, Skeleton, Button,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IProduct } from '../../../pages/ProductsPage/IProducts/IProduct';
import { IProductModal } from '../interfaces/IProductModal';
import useUserStore from '../../../services/zustandStores/userStore';

interface IProductModalProps {
  products: IProduct[],
  isProductOpen: { product: IProduct | null | undefined, isOpen: boolean },
  setProductOpen: Dispatch<SetStateAction<IProductModal>>,
  onSuccess: (userId: number | undefined, productId: string | undefined, comment: string) => void,
  onAddToCart: (product: IProduct | null | undefined, e: React.MouseEvent) => void,
  onReviewDelete: (reviewId: string | null) => void
}

export const ProductModal = (props:IProductModalProps) => {
  const {
    products,
    isProductOpen,
    setProductOpen,
    onSuccess,
    onAddToCart,
    onReviewDelete,
  } = props;
  const [commentValue, setCommentValue] = useState('');
  const { user } = useUserStore.getState();
  const product = isProductOpen?.product;
  const isOpen = isProductOpen?.isOpen;

  useEffect(() => {
    setProductOpen({ product: products?.find((item) => item?.id === isProductOpen?.product?.id), isOpen: isProductOpen?.isOpen });
  }, [products]);

  const handleAddToCart = (e: React.MouseEvent) => {
    setCommentValue('');
    onAddToCart(product, e);
    setProductOpen({ product: null, isOpen: false });
  };

  const handleCancel = () => {
    setCommentValue('');
    setProductOpen({ product: null, isOpen: false });
  };

  const handleSuccess = () => {
    onSuccess(user?.id, product?.id, commentValue);
    setCommentValue('');
    setProductOpen({ product: null, isOpen: false });
  };

  const renderProductImg = () => {
    if (!product?.img) {
      return (
        <Skeleton.Input active style={{ width: 200, height: 180 }} />
      );
    }
    return (
      <img src={`${process.env.PUBLIC_URL}/images/${product?.img}`} alt={product?.category} />
    );
  };

  return (
    <Modal
      open={isOpen}
      width={800}
      onOk={handleSuccess}
      onCancel={handleCancel}
      cancelText="Закрыть"
      okText="Оставить отзыв"
      okButtonProps={{ disabled: !user }}
      cancelButtonProps={{ danger: true }}
    >
      <div className="product-modal">
        <div className="product-modal__product-info">
          <div className="product-info__product-preview">
            {renderProductImg()}
          </div>
          <div className="product-info__product-details">
            <div className="product-details__title">
              {product?.name}
            </div>
            <div className="product-details__description-wrapper">
              <div className="description-wrapper__title">Описание:</div>
              <div className="description-wrapper__body">
                {product?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="product-modal__feedback-wrapper">
          <div className="feedback-wrapper__title">
            Напишите отзыв о товаре/услуге
          </div>
          <div className="feedback-wrapper__feedback-input">
            <div className="feedback-input__textarea">
              <Input.TextArea
                style={{ height: 100 }}
                disabled={!user}
                value={commentValue}
                placeholder="Напишите отзыв о товаре/услуге"
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </div>
          </div>
          <div className="feedback-wrapper__feedback-list">
            <div className="feedback-list__title">Отзывы:</div>
            {product?.reviews.map((item) => (
              <div key={`product-feedback_${item?.id}`} className="feedback-list__feedback-wrapper">
                <div className="feedback-wrapper__feedback-sender-wrapper">
                  <div className="feedback-wrapper__feedback-sender">
                    <div className="feedback-sender__avatar">{item?.user_name?.charAt(0)}</div>
                    <div className="feedback-sender__name">{item?.user_name}</div>
                  </div>
                  {user?.roles?.includes('ADMIN') && (
                  <div
                    className="feedback-sender-wrapper__delete-review-button"
                    onClick={() => { onReviewDelete(item?.id); }}
                  >
                    <DeleteOutlined />
                  </div>
                  )}
                </div>
                <div className="feedback-wrapper__comment-body">
                  <div className="comment-body__value">{item?.comment}</div>
                </div>
              </div>
            ))}
            {!product?.reviews?.length && 'Нет отзывов :('}
          </div>
          <Button
            style={{ position: 'absolute', bottom: 20, width: 200 }}
            disabled={!user}
            onClick={(e) => handleAddToCart(e)}
          >
            В корзину
          </Button>
        </div>
      </div>
    </Modal>
  );
};
