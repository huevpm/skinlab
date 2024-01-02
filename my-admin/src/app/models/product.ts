import { Category } from "./category";
export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    price?: number;
    brand?: string;
    image?: string;
    category?: Category;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    dataCreated?: string;
}