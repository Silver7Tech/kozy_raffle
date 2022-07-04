import React from "react";
import Prev from '../../assets/prev.svg';

import { useSwiper } from 'swiper/react';

export default function SlidePrevButton({setPrevIndex}) {
  const swiper = useSwiper();
  const f = () => {
    swiper.slidePrev();
    setPrevIndex()
  }

  return (
    <img onClick={() =>f()} src={Prev} alt="button" className="mr-5"/>
  );
}