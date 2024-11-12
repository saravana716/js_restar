import React from 'react';
import "./Favorites.css";
import Cartprops from '../../Component/favorite/Cartprops';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import sl1 from "../../Assets/slider/1229655.jpg";
import sl2 from "../../Assets/slider/b.jpg";
import sl3 from "../../Assets/slider/b1.jpg";
import sl4 from "../../Assets/slider/OIP.jpeg";
import sl5 from "../../Assets/slider/sl1.jpg";
import sl6 from "../../Assets/slider/sl2.jpg";
import sl7 from "../../Assets/slider/b2.jpg";
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay'; // Import Autoplay
import { EffectCreative, Autoplay } from 'swiper/modules'; // Import Autoplay

const Favorites = () => {
  const selector = useSelector((data) => data.fav);
  console.log(selector);
  
  return (
    <div className='fav'>
      <div className='favinner'>
        <div className='favleft'>
          <Cartprops myfav={selector} />
        </div>
        <div className='favright123'>
          <Swiper
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            autoplay={{
              delay: 3000, // Adjust the delay as needed
              disableOnInteraction: false, // Prevent autoplay from stopping on user interactions
            }}
            modules={[EffectCreative, Autoplay]} // Add Autoplay to modules
            className="mySwiper"
          >
            <SwiperSlide><img src={sl1} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl2} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl3} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl4} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl5} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl6} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl1} alt="" /></SwiperSlide>
            <SwiperSlide><img src={sl7} alt="" /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
