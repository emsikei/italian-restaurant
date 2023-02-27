import CategoryModel from '../resources/category/category.model';
import ProductModel from '../resources/product/product.model';
import TokenModel from '../resources/token/token.model';
import LocalityModel from '../resources/locality/locality.model';
import SizeModel from '../resources/size/size.model';

export const models: Record<string, unknown>[] = [
    { name: 'categories', model: CategoryModel },
    { name: 'products', model: ProductModel },
    { name: 'refreshTokens', model: TokenModel },
    { name: 'localities', model: LocalityModel },
    { name: 'sizes', model: SizeModel },
];
