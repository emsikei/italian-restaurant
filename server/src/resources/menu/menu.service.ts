import CategoryModel from '@/resources/category/category.model';
import ICategory from '@/resources/category/category.interface';
import HttpException from '@/utils/exceptions/http.exception';

class MenuService {
    private _categoryModel = CategoryModel;

    public getOnlineMenu = async (): Promise<ICategory[]> => {
        const menu = await this._categoryModel
            .find({ products: { $exists: true, $ne: [] } })
            .select('translations _id slug')
            .populate({
                path: 'products',
                match: { 'status.onlineMenu': true },
                select: 'discount defaultPriceAndSize translations _id publicId imageUrl recommendedProducts category',
                populate: [
                    {
                        path: 'recommendedProducts',
                        match: { 'status.onlineMenu': true },
                        select: 'discount defaultPriceAndSize translations _id publicId imageUrl',
                        populate: [
                            {
                                path: 'defaultPriceAndSize.size',
                            },
                            { path: 'category', select: 'translations' },
                        ],
                    },
                    {
                        path: 'defaultPriceAndSize.size',
                        select: '_id translations',
                    },
                    { path: 'category', select: 'translations' },
                ],
            })
            .sort('createdAt');

        return menu.filter((m) => m.products.length !== 0);
    };

    public getOfflineMenu = async (): Promise<ICategory[]> => {
        const menu = await this._categoryModel
            .find({ products: { $exists: true, $ne: [] } })
            .select('translations _id slug')
            .populate({
                path: 'products',
                match: { 'status.offlineMenu': true },
                select: 'discount pricesAndSizes translations _id',
                populate: [
                    {
                        path: 'pricesAndSizes.size',
                        select: '_id translations',
                    },
                ],
            });

        return menu.filter((m) => m.products.length !== 0);
    };

    public getOneOnline = async (slug: string): Promise<ICategory> => {
        const category = await this._categoryModel
            .findOne({ slug })
            .select('translations _id slug')
            .populate({
                path: 'products',
                match: { 'status.onlineMenu': true },
                select: 'discount defaultPriceAndSize _id translations publicId imageUrl recommendedProducts',
                populate: [
                    {
                        path: 'recommendedProducts',
                        match: { 'status.onlineMenu': true },
                        select: 'discount defaultPriceAndSize translations _id publicId imageUrl',
                        populate: [
                            {
                                path: 'defaultPriceAndSize.size',
                            },
                            { path: 'category', select: 'translations' },
                        ],
                    },
                    {
                        path: 'defaultPriceAndSize.size',
                        select: '_id translations',
                    },
                ],
            });

        if (!category) throw HttpException.NotFound();

        return category;
    };
}

export default MenuService;
