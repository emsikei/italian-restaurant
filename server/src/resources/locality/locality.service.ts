import LocalityModel from '@/resources/locality/locality.model';
import HttpException from '@/utils/exceptions/http.exception';
import { LocalityCreation, LocalitiesWithPagination } from '@/utils/types/locality.types';
import ILocality from '@/resources/locality/locality.interface';
import { PaginationQuery } from '@/utils/types/common.types';

class LocalityService {
    private _localityModel = LocalityModel;

    public getAll = async (): Promise<ILocality[]> => {
        const localities = await this._localityModel.find({}).select('-createdAt -updatedAt -__v');
        return localities;
    };

    public getAllWithPagination = async (query: PaginationQuery): Promise<LocalitiesWithPagination> => {
        const startIndex = (query.page - 1) * query.limit;
        const total = await this._localityModel.countDocuments({});

        const localities = await this._localityModel.find({}).sort({ _id: -1 }).limit(query.limit).skip(startIndex);

        return {
            data: localities,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public create = async (locality: LocalityCreation): Promise<ILocality> => {
        const newLocality = await this._localityModel.create({ ...locality });
        return newLocality;
    };

    public update = async (locality: ILocality): Promise<ILocality> => {
        const updatedLocality = await this._localityModel
            .findByIdAndUpdate(locality._id, { ...locality }, { new: true })
            .select('-createdAt -updatedAt -__v');

        if (!updatedLocality) throw HttpException.NotFound();

        return updatedLocality;
    };

    public deleteOne = async (id: string): Promise<ILocality> => {
        const deletedLocality = await this._localityModel.findByIdAndDelete(id).select('-createdAt -updatedAt -__v');

        if (!deletedLocality) throw HttpException.NotFound();

        return deletedLocality;
    };
}

export default LocalityService;
