import IBanner from '@/resources/banner/banner.interface';

export default class BannerDto {
    public _id: string;

    public publicId: string;

    public bannerUrl: string;

    constructor(banner: IBanner) {
        this._id = banner._id.toString();
        this.publicId = banner.publicId;
        this.bannerUrl = banner.bannerUrl;
    }
}
