import { IReview } from './IReview';

export interface IProduct {
  category: string,
  cost: number,
  id: string,
  img: string,
  description: string,
  name: string,
  reviews: IReview[]

}
