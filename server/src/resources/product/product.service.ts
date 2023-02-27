import { Express } from 'express';

import ProductModel from '@/resources/product/product.model';
import CategoryModel from '@/resources/category/category.model';
import IProduct from '@/resources/product/product.interface';
import { ProductCreation, ProductsWithPagination, ProductUpdate } from '@/utils/types';
import HttpException from '@/utils/exceptions/http.exception';
import ImageService from '@/resources/image/image.service';
import { ProductsQuery } from '@/utils/types/product.types';

class ProductService {
    private _productModel = ProductModel;

    private _categoryModel = CategoryModel;

    private _imageService = new ImageService();

    public getAll = async (query: ProductsQuery): Promise<ProductsWithPagination | IProduct[]> => {
        if (query.all) {
            const products = await this._productModel
                .find({})
                .populate(
                    'category defaultPriceAndSize.size recommendedProducts pricesAndSizes.size',
                    '-products -__v -updatedAt -createdAt'
                );

            return products;
        }

        const startIndex = (query.page - 1) * query.limit;
        const total = await this._productModel.countDocuments({});

        const products = await this._productModel
            .find({})
            .populate(
                'category defaultPriceAndSize.size recommendedProducts pricesAndSizes.size',
                '-products -__v -updatedAt -createdAt'
            )
            .sort({ _id: -1 })
            .limit(query.limit)
            .skip(startIndex);

        return {
            data: products,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public getOne = async (id: string): Promise<IProduct> => {
        const product = await this._productModel.findById(id);

        if (!product) throw HttpException.NotFound();

        return product;
    };

    public create = async (product: ProductCreation, image: Express.Multer.File): Promise<IProduct> => {
        const { filename } = image;
        const { secureUrl, publicId } = await this._imageService.uploadImage(filename, 'products');

        const newProduct: IProduct = await (
            await this._productModel.create({
                ...product,
                imageUrl: secureUrl,
                publicId,
            })
        ).populate([{ path: 'category', select: 'translations _id' }, { path: 'pricesAndSizes.size' }]);

        const category = await this._categoryModel.findById(newProduct.category);

        if (!category) throw HttpException.NotFound('CATEGORY_NOT_FOUND');

        category.products.push(newProduct._id);

        await this._categoryModel.findByIdAndUpdate(category?._id, { ...category }, { new: true });

        return newProduct;
    };

    public update = async (product: ProductUpdate, image?: Express.Multer.File): Promise<IProduct> => {
        const oldProduct = await this._productModel.findById(product._id);

        if (!oldProduct) throw HttpException.NotFound();

        if (product.category.toString() !== oldProduct.category.toString()) {
            const oldCategory = await this._categoryModel.findById(oldProduct.category);

            if (!oldCategory) throw HttpException.BadRequest('INVALID_PREVIOUS_CATEGORY');

            const newCategory = await this._categoryModel.findById(product.category);

            if (!newCategory) throw HttpException.NotFound('NO_SUCH_CATEGORY');

            await this._categoryModel.findByIdAndUpdate(product.category, {
                $addToSet: { products: product._id },
            });

            await this._categoryModel.findByIdAndUpdate(oldProduct.category, {
                $pull: { products: product._id },
            });
        }

        if (image) {
            const { filename } = image;
            const { secureUrl, publicId: newPublicId } = await this._imageService.uploadImage(filename, 'products');

            const result = await this._imageService.destroyImage(product.publicId, 'ir/products/');

            if (result === 'not found') throw HttpException.NotFound('NO_PRODUCT_IMAGE_FOUND_CLOUDINARY');

            const updatedProduct = await this._productModel
                .findByIdAndUpdate(
                    product._id,
                    {
                        ...product,
                        imageUrl: secureUrl,
                        publicId: newPublicId,
                    },
                    {
                        new: true,
                    }
                )
                .populate([
                    { path: 'category', select: 'translations _id' },
                    { path: 'pricesAndSizes.size' },
                    { path: 'recommendedProducts', select: 'translations imageUrl _id' },
                ]);

            if (!updatedProduct) throw HttpException.NotFound();

            return updatedProduct;
        }

        const updatedProduct = await this._productModel
            .findByIdAndUpdate(product._id, product, {
                new: true,
            })
            .populate([
                { path: 'category', select: 'translations _id' },
                { path: 'pricesAndSizes.size' },
                { path: 'recommendedProducts', select: 'translations imageUrl _id' },
            ]);

        // const updatedProduct = await this._productModel.findByIdAndUpdate(product._id, product);

        if (!updatedProduct) throw HttpException.NotFound();

        return updatedProduct;
    };

    public delete = async (id: string): Promise<IProduct> => {
        const deletedProduct = await this._productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw HttpException.NotFound();
        }

        const result = await this._imageService.destroyImage(deletedProduct.publicId, 'ir/products/');

        const category = await this._categoryModel.findById(deletedProduct.category);

        if (!category) throw HttpException.BadRequest();

        const newProducts = category.products.filter((item) => !item.equals(deletedProduct._id));
        category.products = newProducts;
        category.save();

        const productsThatHaveDeletedOneInRecommended = await this._productModel.find({ recommendedProducts: id });

        for (const product of productsThatHaveDeletedOneInRecommended) {
            const filteredProducts = product.recommendedProducts.filter((item) => !item.equals(id));
            product.recommendedProducts = filteredProducts;
            product.save();
        }

        return deletedProduct;
    };
}

export default ProductService;
