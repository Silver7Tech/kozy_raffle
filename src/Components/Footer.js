import React from "react";
import Blur from '../assets/Blur.svg';
import Win from '../assets/win.svg';
import Timer from "./Timer";
import { useNavigate } from 'react-router-dom';

const Footer = ({activeTab}) => {
    const navigate = useNavigate()
    const nextPageHandler = () => {
        if(activeTab === "live") {
            navigate('/purchase');
        }
        else if(activeTab === "closed") {
            navigate('/winners')
        }
    }
    return(
        <>
        <div className="footer flex flex-col sm:flex-row items-center mt-10 bg-white rounded-full w-fit px-16 sm:px-10 py-2 sm:py-5 mb-10 lg:mb-0">
            {
                activeTab === "live"
                ?
                <>
                    <Timer/>
                </>
                :
                <div className="flex flex-row text-2sm sm:text-4sm z-10 font-bold text-red">
                    CLOSED
                    <img src={Win} alt="win" className="ml-2"/>
                </div>
            }
            
            <div className="flex flex-col items-center justify-center ml-0 sm:ml-10 z-10">
                <p className="text-black text-tiny sm:text-0sm ">ENTER RAFFLE</p>
                <button className="bg-green rounded-full px-8 py-1 text-white mt-3 font-bold text-tiny sm:text-0sm hover:bg-transparent border-green hover:text-green border-4" onClick={nextPageHandler}>CLICK HERE</button>
            </div>
            
        </div>
        <img src={Blur} className="absolute bottom-0 hidden lg:inline"/>
        </>
    )
}

export default Footer;