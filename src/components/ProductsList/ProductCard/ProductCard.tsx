import React, { Dispatch, SetStateAction } from 'react';
import { Button, Skeleton, Tooltip } from 'antd';
import { IProduct } from '../../../pages/ProductsPage/IProducts/IProduct';
import { truncateString } from '../../../utils/helpers';
import { IProductModal } from '../interfaces/IProductModal';

interface IProductCardProps {
  product: IProduct,
  setProductOpen: Dispatch<SetStateAction<IProductModal>>,
  onAddToCart: (product: IProduct | null | undefined, e: React.MouseEvent) => void,
}

export const ProductCard = ({ product, setProductOpen, onAddToCart }:IProductCardProps) => {
  const renderCardImg = () => {
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
    <div
      className="product-card"
      key={product?.id}
      onClick={() => setProductOpen({ product, isOpen: true })}
    >
      <div className="product-card__image">
        {renderCardImg()}
      </div>
      <div className="product-card__title">
        {product?.name}
      </div>
      <Tooltip title={product?.description}>
        <div className="product_card__description">
          {truncateString(product?.description, 40)}
        </div>
      </Tooltip>
      <div className="product-card__pay-button-wrapper">
        <div className="pay-button-wrapper__button">
          <Button
            style={{ width: 200, height: 30 }}
            onClick={(e) => onAddToCart(product, e)}
          >
            {product?.cost}
            {' '}
            ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
