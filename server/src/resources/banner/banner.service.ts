import { Express } from 'express';
import IBanner from '@/resources/banner/banner.interface';
import BannerModel from '@/resources/banner/banner.model';
import ImageService from '@/resources/image/image.service';
import HttpException from '@/utils/exceptions/http.exception';
import { BannersWithPagination } from '@/utils/types/banner.types';
import { PaginationQuery } from '@/utils/types/common.types';

class BannerService {
    private _bannerModel = BannerModel;

    private _imageService = new ImageService();

    public getAll = async (): Promise<IBanner[]> => {
        const banners = await this._bannerModel.find({}).select('-createdAt -updatedAt -__v');
        return banners;
    };

    public getAllWithPagination = async (query: PaginationQuery): Promise<BannersWithPagination> => {
        const startIndex = (query.page - 1) * query.limit;
        const total = await this._bannerModel.countDocuments({});

        const banners = await this._bannerModel.find({}).sort({ _id: -1 }).limit(query.limit).skip(startIndex);

        return {
            data: banners,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public uploadOne = async (file: Express.Multer.File): Promise<IBanner> => {
        const { filename } = file;
        const { secureUrl, publicId } = await this._imageService.uploadImage(filename, 'banners');

        const banner = await this._bannerModel.create({ publicId, bannerUrl: secureUrl });

        return banner;
    };

    public updateOne = async (publicId: string, file: Express.Multer.File): Promise<IBanner> => {
        const { filename } = file;
        const { secureUrl, publicId: newPublicId } = await this._imageService.uploadImage(filename, 'banners');
        const result = await this._imageService.destroyImage(publicId, 'ir/banners/');

        if (result === 'not found') throw HttpException.NotFound('NO_BANNER_FOUND_CLOUDINARY');

        const banner = await this._bannerModel
            .findOneAndUpdate({ publicId }, { publicId: newPublicId, bannerUrl: secureUrl }, { returnOriginal: false })
            .select('-createdAt -updatedAt -__v');

        if (!banner) throw HttpException.NotFound();

        return banner;
    };

    public deleteOne = async (publicId: string): Promise<IBanner> => {
        const result = await this._imageService.destroyImage(publicId, 'ir/banners/');

        if (result === 'not found') throw HttpException.NotFound('NO_BANNER_FOUND_CLOUDINARY');

        const banner = await this._bannerModel.findOneAndDelete({ publicId }).select('-createdAt -updatedAt -__v');

        if (!banner) throw HttpException.NotFound();

        return banner;
    };
}

export default BannerService;
