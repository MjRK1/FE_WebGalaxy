import axios from 'axios';
import { GLX_URL } from '../../utils/services';
import { IAuth } from './IGLX';
import { IAddReview } from '../../interfaces/IAddReview';

export class GLX {
  static getMe(token: string | null): Promise<any> {
    return axios.get(`${GLX_URL}users/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static registration(params: IAuth | undefined): Promise<any> {
    return axios.post(`${GLX_URL}auth/registration`, { ...params });
  }

  static login(params: IAuth | undefined): Promise<any> {
    return axios.post(`${GLX_URL}auth/login`, { ...params });
  }

  static getProductsList(): Promise<any> {
    return axios.get(`${GLX_URL}products`);
  }

  static getSearchBarSuggestions(query: string): Promise<any> {
    return axios.get(`${GLX_URL}search/suggestions`, { params: { query } });
  }

  static getSearchBarProducts(query: string): Promise<any> {
    return axios.get(`${GLX_URL}search/products`, { params: { query } });
  }

  static addProductReview(token: string | null, params: IAddReview): Promise<any> {
    return axios.post(`${GLX_URL}reviews/add`, { ...params }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static deleteProductReview(token: string | null, reviewId: string | null): Promise<any> {
    return axios.post(`${GLX_URL}reviews/remove/${reviewId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static addProductToCart(token: string | null, userId: number | undefined, productId: string | undefined): Promise<any> {
    return axios.post(`${GLX_URL}cart/add/${userId}`, { productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getProductCart(token: string | null, userId: number | undefined): Promise<any> {
    return axios.get(`${GLX_URL}cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static changeProductQuantity(token: string | null, userId: number | undefined, params: any): Promise<any> {
    return axios.post(`${GLX_URL}cart/${userId}`, { ...params }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static deleteCartItem(token: string | null, userId: number | undefined, cartItemId: any): Promise<any> {
    return axios.post(`${GLX_URL}cart/delete/${userId}`, { cartItemId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
