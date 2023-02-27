import CategoryModel from '@/resources/category/category.model';
import ICategory from '@/resources/category/category.interface';
import ProductModel from '@/resources/product/product.model';
import { CategoriesWithPagination, CategoryCreation, CategoryUpdate } from '@/utils/types';
import { PaginationQuery } from '@/utils/types/common.types';

class CategoryService {
    private _categoryModel = CategoryModel;

    private _productModel = ProductModel;

    public getAllWithPagination = async (query: PaginationQuery): Promise<CategoriesWithPagination> => {
        const startIndex = (query.page - 1) * query.limit;
        const total = await this._categoryModel.countDocuments({});

        const categories: ICategory[] = await this._categoryModel
            .find({})
            .select('-createdAt -updatedAt -__v')
            .sort({ _id: -1 })
            .limit(query.limit)
            .skip(startIndex);

        return {
            data: categories,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public getAllCategoryNames = async (): Promise<ICategory[]> => {
        const categories = await this._categoryModel.find({}).select('_id translations');

        return categories;
    };

    public getAllCategorySlugs = async (): Promise<ICategory[]> => {
        const slugs = await this._categoryModel.find({}).select('slug');
        return slugs;
    };

    public create = async (category: CategoryCreation): Promise<ICategory> => {
        const newCategory: ICategory = await this._categoryModel.create(category);
        return newCategory;
    };

    public update = async (category: CategoryUpdate): Promise<ICategory | null> => {
        const updatedCategory = await this._categoryModel
            .findByIdAndUpdate(category._id, category, { new: true })
            .select('-createdAt -updatedAt -__v');
        return updatedCategory;
    };

    public delete = async (id: string): Promise<ICategory | null> => {
        const category = await this._categoryModel.findById(id);

        if (!category) return null;

        for (const item of category.products) {
            const productsThatHaveThisInRecommended = await this._productModel.find({
                recommendedProducts: item._id,
            });

            for (const product of productsThatHaveThisInRecommended) {
                const array = product.recommendedProducts.filter((p) => !p.equals(item._id));
                product.recommendedProducts = array;
                product.save();
            }

            await this._productModel.findByIdAndDelete(item._id);
        }
        await this._categoryModel.findByIdAndDelete(category._id);

        return category;
    };
}

export default CategoryService;
