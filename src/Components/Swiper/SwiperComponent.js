import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import NFT1 from '../../assets/1.png';
import NFT2 from '../../assets/2.png';
import NFT3 from '../../assets/3.png';
import NFT4 from '../../assets/4.png';
import NFT5 from '../../assets/1.png';
import LiveCircle from '../../assets/live.svg';
import ClosedCircle from '../../assets/closed.svg';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./myswiper.css";
import SlideNextButton from "./SlideNextButton";
import SlidePrevButton from "./SlidePrevButton";
import { BigNumber } from "bignumber.js";

const NFTList = [NFT1, NFT2, NFT3, NFT4, NFT5];
const SwiperComponent = ({vaultAccountData,currentRaffleIndex,setCurrentRaffleIndex,activeTab,flag}) => {
    const [NFTList, setNFTList] = useState([]);
    const [liveIndexs, setLiveIndexs] = useState([]);

    const setPrevIndex = () => {
        if(liveIndexs.length==1){
            setCurrentRaffleIndex(liveIndexs[0]-1)
        } else {
            let temp_index = 0;
            liveIndexs.map((item,index) => {
                if(item-1 == currentRaffleIndex){
                    if(index == 0){
                        setCurrentRaffleIndex(liveIndexs[liveIndexs.length-1]-1)
                    } else {
                        setCurrentRaffleIndex(temp_index-1);
                    }
                }
                temp_index = item;
            })
        }
    }

    const setNextIndex = () => {
        if(liveIndexs.length==1){
            setCurrentRaffleIndex(liveIndexs[0]-1)
        } else {
            let temp_index = 0;
            liveIndexs.map((item,index) => {
                temp_index = item;
                if(item-1 == currentRaffleIndex){
                    if(index+1 == liveIndexs.length){
                        setCurrentRaffleIndex(liveIndexs[0]-1)
                    } else {
                        setCurrentRaffleIndex(temp_index);
                    }
                }
            })
        }
    }

    useEffect(()=> {
        if(vaultAccountData!=null){
            let images = [];
            let indexs = [];
            vaultAccountData.raffles.map((item) => {
                if(flag==1){
                    if(Number(item.endTimestamp)>Date.now()/1000){
                        images.push(item.image)
                        indexs.push(item.index)
                    }
                } else {
                    if(Number(item.endTimestamp)<Date.now()/1000){
                        images.push(item.image)
                        indexs.push(item.index)
                    }
                }
            })

            setNFTList(images);
            setLiveIndexs(indexs);
            if(indexs.length!=0){
                setCurrentRaffleIndex(indexs[0]-1);
            } else {
                setCurrentRaffleIndex(null);
            }
        }
    },[vaultAccountData])
    
    return (
        <div className="w-full lg:w-11/12 mx-auto">
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                loop={true}
                centeredSlides={true}
                breakpoints = {{
                    320: {
                        width: 320,
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        width: 640,
                        slidesPerView: 2,
                        spaceBetween: 150
                    },
                    850: {
                        slidesPerView: 3,
                        spaceBetween: 200
                    },
                    1050: {
                        slidesPerView: 4,
                        spaceBetween: 200
                    }
                  }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="mySwiper"
            >
                {
                    NFTList.map((item, index) => {
                       return <SwiperSlide key={index}>
                            {({ isActive, isPrev, isNext }) => 
                                    isActive 
                                    ?
                                    <div className="flex flex-row items-center">
                                        <SlidePrevButton setPrevIndex={setPrevIndex}/>
                                        <img src={item} alt="NFT" className="w-imgSW sm:w-imgW"/>
                                        <img src={activeTab==="live" ? LiveCircle : ClosedCircle} alt="live" className="absolute left-imgSPad sm:left-imgPad" />
                                        <SlideNextButton setNextIndex={setNextIndex}/>
                                    </div>
                                    :
                                    isPrev || isNext
                                    ?
                                    <img src={item} alt="NFT" className="scale-90 w-imgSW sm:w-imgW"/>
                                    :
                                    <img src={item} alt="NFT" className="scale-75 w-imgSW sm:w-imgW"/>
                            }
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

export default SwiperComponent;