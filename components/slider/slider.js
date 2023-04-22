import { useState, Fragment } from 'react';
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function Slider({ img }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiper = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  return (
    <Fragment>
      <Swiper
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        thumbs={{ swiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className='mySwiper2'
        data-test-id='slide-big'
      >
        {img.map(({ url }) => (
          <SwiperSlide key={uuidv4()}>
            <img src={`https://strapi.cleverland.by${url}`} alt='slide' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={4}
        freeMode={false}
        watchSlidesProgress={true}
        scrollbar={{
          hide: true,
        }}
        slidesPerGroup={4}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className='mySwiper'
      >
        {img.map(({ url }) => (
          <SwiperSlide data-test-id='slide-mini' key={uuidv4()}>
            <img src={`https://strapi.cleverland.by${url}`} alt='slide' />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
}
