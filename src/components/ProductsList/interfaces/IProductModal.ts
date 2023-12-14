import { IProduct } from '../../../pages/ProductsPage/IProducts/IProduct';

export interface IProductModal {
  product: IProduct | null | undefined,
  isOpen: boolean
}
