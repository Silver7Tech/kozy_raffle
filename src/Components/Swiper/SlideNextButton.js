import React from "react";
import Next from '../../assets/next.svg';

import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <img onClick={() => swiper.slideNext()} src={Next} alt="next" className="ml-5"/>
  );
}