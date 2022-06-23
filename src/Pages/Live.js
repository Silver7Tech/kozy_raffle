import React from "react";
import SwiperComponent from "../Components/Swiper/SwiperComponent";
import { FaDiscord,FaTwitter } from "react-icons/fa"
import Footer from "../Components/Footer";
import Header from "../Layout/Header";

const Live = () => {
    return (
        <>
            <Header/>
            <div className="flex flex-col items-center w-full">
                <p className="text-white font-bold text-2sm sm:text-3sm">KOZY KLUB <span className="text-green">LIVE</span></p>
                <SwiperComponent activeTab={"live"}/>
                <div className="flex flex-col sm:flex-row text-white font-bold text-1sm sm:text-2sm mt-5">
                    KOZY KOALA #278
                    <div className="flex flex-row justify-center mt-2 sm:mt-0">
                        <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-0 sm:ml-5" href="#twitter"><FaTwitter/></a>
                        <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-5" href="#discord"><FaDiscord/></a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row text-white font-bold text-1sm mt-5">
                    <div className="text-center">NO. OF TICKETS SOLD :&nbsp; <span className="text-green">500/2500</span></div>
                    <div className="text-center"><span className="hidden sm:inline">&nbsp;|</span> NO. OF WINNERS :&nbsp; <span className="text-green">25</span></div>
                </div>
                <Footer activeTab={"live"}/>
            </div>
        </>
    )
}

export default Live;