import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import SliderButton from '../shared/SliderButton';
import { Banner } from '../Banner';
import { IBanner } from '../../types/banner';

SwiperCore.use([Pagination, Navigation, Autoplay]);

const PaginationContainer = () => <div className="swiper-pagination !absolute !-bottom-5 !h-5 !w-full" />;

interface IBannerSliderProps {
    id: string;
    banners: IBanner[];
}

const BannerSlider = ({ id, banners }: IBannerSliderProps) => (
    <div className="relative">
        <Swiper
            loop
            slidesPerView={1}
            navigation={{
                prevEl: `.prev-${id}`,
                nextEl: `.next-${id}`,
            }}
            autoplay={{ delay: 3000 }}
            pagination={{
                clickable: true,
                el: '.swiper-pagination',
                renderBullet(index, className) {
                    return `<span class=${className}></span>`;
                },
            }}
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <Banner banner={banner} id={index} />
                </SwiperSlide>
            ))}
        </Swiper>
        <SliderButton location="banner" type="prev" cls={`prev-${id}`}>
            <BsChevronLeft size={10} />
        </SliderButton>

        <SliderButton location="banner" type="next" cls={`next-${id}`}>
            <BsChevronRight size={10} />
        </SliderButton>
        <PaginationContainer />
    </div>
);

export default BannerSlider;
