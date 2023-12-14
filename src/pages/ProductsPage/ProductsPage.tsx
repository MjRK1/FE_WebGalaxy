import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message, AutoComplete, Input } from 'antd';
import { GLX } from '../../services/GLX/GLX';
import { ProductsList } from '../../components/ProductsList';
import { IProduct } from './IProducts/IProduct';

type ProductsEnum = {
  AUTOMATIZATION: string | null;
  PO: string | null;
  SERVICES: string | null;
};

export const ProductsPage = () => {
  const { category } = useParams<{ category?: keyof ProductsEnum }>();
  const [products, setProducts] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>();
  const [searchSuggestions, setSearchSuggestions] = useState<any>();
  const [query, setQuery] = useState('');

  const PRODUCTS_ENUM: ProductsEnum = {
    AUTOMATIZATION: 'Автоматизация',
    PO: 'ПО',
    SERVICES: 'Услуга',
  };

  const PRODUCTS_LIST_NAMES: ProductsEnum = {
    AUTOMATIZATION: 'Автоматизация',
    PO: 'ПО',
    SERVICES: 'Услуги',
  };

  useEffect(() => {
    GLX.getProductsList()
      .then((response) => {
        setProducts([...response?.data]);
      })
      .catch((e) => {
        message.error(e?.message);
      });
  }, []);

  const handleChangeSearch = (value: string) => {
    setQuery(value);
    GLX.getSearchBarSuggestions(query)
      .then((response) => {
        const newSearchSuggestions = response?.data?.data
          .filter((item: IProduct) => item?.category === PRODUCTS_ENUM[category?.toUpperCase() as keyof ProductsEnum])
          .map((item: any) => ({ label: item?.name, value: item?.name }));
        setSearchSuggestions([...newSearchSuggestions]);
      })
      .catch(() => {
        message.error('Ошибка поиска');
      });
  };

  const handleSearch = (value: string) => {
    GLX.getSearchBarProducts(value)
      .then((response) => {
        setProducts([...response?.data?.data]);
        setQuery('');
        setSearchOpen(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <div className="products-page">
      <div className="products-page__title">
        {PRODUCTS_LIST_NAMES[category?.toUpperCase() as keyof ProductsEnum]}
      </div>
      <div className="products-page__search-bar">
        <AutoComplete
          open={searchOpen}
          style={{
            width: '70%',
          }}
          options={searchSuggestions}
          onClear={() => handleSearch('')}
          onSelect={handleSearch}
          size="large"
        >
          <Input.Search
            size="large"
            placeholder="Введите название"
            onChange={(e) => { handleChangeSearch(e.target.value); }}
            enterButton
            onSearch={handleSearch}
          />
        </AutoComplete>
      </div>
      <div className="products-page__products-wrapper">
        <ProductsList
          products={
            products
              .filter((item) => item?.category === PRODUCTS_ENUM[category?.toUpperCase() as keyof ProductsEnum])
          }
          isLoading={false}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
};
