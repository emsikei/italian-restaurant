import useFetch from '../../hooks/useFetch';
import { IBanner } from '../../types/banner';
import BannerSlider from '../Sliders/BannerSlider';

const BannerContainer = () => {
    const { loading, data: banners } = useFetch<IBanner[]>([], `${process.env.NEXT_PUBLIC_API_URL}/banners/all`);

    return (
        <div className="container mx-auto mb-16 w-screen md:w-full mt-24">
            <BannerSlider id="633876e1e26452c4d2057553" banners={banners} />
        </div>
    );
};

export default BannerContainer;
