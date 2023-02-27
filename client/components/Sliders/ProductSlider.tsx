import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { Dispatch, SetStateAction } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Product from '../Menu/Product';
import SliderButton from '../shared/SliderButton';
import { IProduct } from '../../types/product';

SwiperCore.use([Navigation]);

export interface ISliderProps {
    id: string;
    products: IProduct[];
    activeProduct: IProduct | undefined;
    setActiveProduct: Dispatch<SetStateAction<IProduct | undefined>>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Slider = ({ id, products, setActiveProduct, showModal, setShowModal }: ISliderProps) => (
    <div className="relative">
        <Swiper
            navigation={{
                prevEl: `.prev-${id}`,
                nextEl: `.next-${id}`,
            }}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={{
                300: {
                    slidesPerView: 1.5,
                },
                // when window width is >= 640px
                // 640: {
                //     slidesPerView: 2.5,
                // },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2.5,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3.5,
                },
                // when window width is >= 1280px
                1280: {
                    slidesPerView: 4.5,
                },
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={Math.random() * 100}>
                    <Product
                        setShowModal={setShowModal}
                        showModal={showModal}
                        product={product}
                        setActiveProduct={setActiveProduct}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        <SliderButton location="product" type="prev" cls={`prev-${id}`}>
            <BsChevronLeft size={10} />
        </SliderButton>

        <SliderButton location="product" type="next" cls={`next-${id}`}>
            <BsChevronRight size={10} />
        </SliderButton>
    </div>
);
export default Slider;
