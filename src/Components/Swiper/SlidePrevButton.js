import React from "react";
import Prev from '../../assets/prev.svg';

import { useSwiper } from 'swiper/react';

export default function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <img onClick={() => swiper.slidePrev()} src={Prev} alt="button" className="mr-5"/>
  );
}