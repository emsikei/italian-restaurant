import HttpException from '@/utils/exceptions/http.exception';
import SizeModel from '@/resources/size/size.model';
import ISize from '@/resources/size/size.interface';
import { SizeCreate, SizesWithPagination } from '@/utils/types/size.types';
import { PaginationQuery } from '@/utils/types/common.types';

class SizeService {
    private _sizeModel = SizeModel;

    public getAll = async (): Promise<ISize[]> => {
        const sizes = await this._sizeModel.find({}).select('-createdAt -updatedAt -__v');
        return sizes;
    };

    public getAllWithPagination = async (query: PaginationQuery): Promise<SizesWithPagination> => {
        const startIndex = (query.page - 1) * query.limit;
        const total = await this._sizeModel.countDocuments({});

        const sizes = await this._sizeModel.find({}).sort({ _id: -1 }).limit(query.limit).skip(startIndex);

        return {
            data: sizes,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public create = async (payload: SizeCreate): Promise<ISize> => {
        const { _id, translations } = await this._sizeModel.create(payload);
        return { _id, translations };
    };

    public update = async (payload: ISize): Promise<ISize> => {
        const size = await this._sizeModel
            .findByIdAndUpdate(payload._id, payload, { new: true })
            .select('-createdAt -updatedAt -__v');

        if (!size) throw HttpException.NotFound();

        return size;
    };
}

export default SizeService;
