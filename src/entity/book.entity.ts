import { IBorrow } from './borrowed.entity';

export interface IBook {
  readonly _id: string;
  name: string;
  code: string;
  author: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
}
