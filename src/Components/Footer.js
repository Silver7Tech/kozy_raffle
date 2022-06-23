import React from "react";
import Countdown from 'react-countdown';
import Blur from '../assets/Blur.svg';
import Win from '../assets/win.svg';
const Footer = ({activeTab}) => {
    const renderer = ({ days, hours, minutes, completed }) => {
        if (completed) {
          return '';
        } else {
          // Render a countdown
          
          return <div className="flex flex-row items-center z-10 mb-countB sm:mb-0">
                <div className="flex flex-col items-center">
                    <div className="text-black text-0sm font-bold mb-countB mt-countT">
                        DAYS
                    </div>
                    <div className="text-black text-2sm sm:text-4sm font-bold">
                    {days}
                    </div>
                </div>
                <div className="text-black text-2sm sm:text-4sm font-bold mt-4">&nbsp;:&nbsp;</div>
                <div className="flex flex-col items-center">
                    <div className="text-black text-0sm font-bold mb-countB mt-countT">
                        HOURS
                    </div>
                    <div className="text-black text-2sm sm:text-4sm font-bold">
                        {hours}
                    </div>
                </div>
                <div className="text-black text-4sm font-bold mt-4">&nbsp;:&nbsp;</div>
                <div className="flex flex-col items-center">
                    <div className="text-black text-0sm font-bold mb-countB mt-countT">
                        MINS
                    </div>
                    <div className="text-black text-2sm sm:text-4sm font-bold">
                    {minutes}
                    </div>
                </div>

            </div>;
        }
      };
    return(
        <>
        <div className="footer flex flex-col sm:flex-row items-center mt-10 bg-white rounded-full w-fit px-16 sm:px-10 py-2 sm:py-5 mb-10 lg:mb-0">
            {
                activeTab === "live"
                ?
                <>
                    <Countdown 
                        date={Date.now() + 900180000}
                        renderer={renderer}
                    />
                </>
                :
                <div className="flex flex-row text-2sm sm:text-4sm z-10 font-bold text-red">
                    CLOSED
                    <img src={Win} alt="win" className="ml-2"/>
                </div>
            }
            
            <div className="flex flex-col items-center justify-center ml-0 sm:ml-10 z-10">
                <p className="text-black text-tiny sm:text-0sm ">ENTER RAFFLE</p>
                <button className="bg-green rounded-full px-8 py-2 text-white mt-3 font-bold text-tiny sm:text-0sm">CLICK HERE</button>
            </div>
            
        </div>
        <img src={Blur} className="absolute bottom-0 hidden lg:inline"/>
        </>
    )
}

export default Footer;