import { IBanner } from '../../types/banner';

interface IBannerProps {
    banner: IBanner;
    id: number;
}

const Banner = ({ banner, id }: IBannerProps) => (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 540">
            <defs>
                <pattern id={`banner-img-${id}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                    <image href={banner.bannerUrl} x="0" y="0" width="100%" height="100%" />
                </pattern>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
                <g fill="#fff" id="Layer_1-2" data-name="Layer 1">
                    <path
                        className="cls-1"
                        fill={`url(#banner-img-${id})`}
                        d="M1280,437.18c0-89.58-17.15-271.86-43.65-358.74-5.35-17.55-13.14-35.67-28.81-46.34-12-8.16-27-10.91-41.59-13C1026.29-1,884.13,19.94,742.87,21.42,563,23.3,383.73,0,203.8,0,90.32,0,42.79,73.46,27.74,116.13S10.35,204.41,8.14,249.35Q4.33,327,.51,404.65c-1.62,33-.92,71.21,26.18,92,17.47,13.4,41.4,15.61,63.82,17.27l160.88,11.93c97.94,7.27,196,14.53,294.25,14.12,103.83-.43,207.37-9.44,310.76-18.45C955,513,1061,536.64,1159.54,528.05c23.11-2,46.59-4.1,68.12-12.31s41.19-23.53,48.39-44.41C1279.81,460.39,1280,448.68,1280,437.18Z"
                    />
                </g>
            </g>
        </svg>
    </div>
);

export default Banner;
