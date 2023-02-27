import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import SliderButton from '../shared/SliderButton';
import ProductCard from '../ProductModal/ProductCard';
import { IProduct } from '../../types/product';

SwiperCore.use([Navigation]);

interface IProductModalSliderProps {
    id: string;
    products?: IProduct[];
}

const ProductModalSlider = ({ id, products }: IProductModalSliderProps) => (
    <div className="relative">
        <Swiper
            navigation={{
                prevEl: `.prev-${id}`,
                nextEl: `.next-${id}`,
            }}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={{
                // when window width is >= 640px
                300: {
                    slidesPerView: 1.5,
                },
                440: {
                    slidesPerView: 1.5,
                },
                // when window width is >= 768px
                // 768: {
                //     slidesPerView: 2.5,
                // },
            }}
        >
            {products?.map((product) => (
                <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
        <SliderButton location="modal" type="prev" cls={`prev-${id}`}>
            <BsChevronLeft size={10} />
        </SliderButton>

        <SliderButton location="modal" type="next" cls={`next-${id}`}>
            <BsChevronRight size={10} />
        </SliderButton>
    </div>
);

export default ProductModalSlider;
