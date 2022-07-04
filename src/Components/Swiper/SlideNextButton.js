import React from "react";
import Next from '../../assets/next.svg';

import { useSwiper } from 'swiper/react';

export default function SlideNextButton({setNextIndex}) {
  const swiper = useSwiper();
  const f = () => {
    swiper.slideNext();
    setNextIndex()
  }
  return (
    <img onClick={() => f()} src={Next} alt="next" className="ml-5"/>
  );
}