import React, { useEffect, useState } from "react";
import SwiperComponent from "../Components/Swiper/SwiperComponent";
import { FaDiscord,FaTwitter } from "react-icons/fa"
import Footer from "../Components/Footer";
const Closed = ({vaultAccountData}) => {
    const [currentRaffleIndex, setCurrentRaffleIndex] = useState(0);
    const [flag, setFlag] = useState(0);
    const [closedRaffles, setClosedRaffles] = useState(null);

    useEffect(()=> {
        if(vaultAccountData!=null && currentRaffleIndex!=null){

            let closedRaffle = [];
            vaultAccountData.raffles.map((item) => {
                if(Number(item.endTimestamp)<Date.now()/1000){
                    closedRaffle.push(item)
                }
                setClosedRaffles(closedRaffle);
            })
        }
    },[currentRaffleIndex]);

    if(closedRaffles!=null && currentRaffleIndex!=null){
        return(
            <>
                <div className="flex flex-col items-center w-full">
                    <p className="flex flex-col sm:flex-row justify-center items-center text-white font-bold text-2sm sm:text-3sm">KOZY KLUB <span className="text-red">CLOSED</span></p>
                    <SwiperComponent vaultAccountData={vaultAccountData} currentRaffleIndex={currentRaffleIndex} setCurrentRaffleIndex={setCurrentRaffleIndex} activeTab={"closed"} flag={flag}/>
                    <div className="flex flex-col sm:flex-row text-white font-bold text-1sm sm:text-2sm mt-5">
                        {vaultAccountData.raffles[currentRaffleIndex].name}
                        <div className="flex flex-row justify-center mt-2 sm:mt-0">
                            <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-0 sm:ml-5" href={vaultAccountData.raffles[currentRaffleIndex].twitter}><FaTwitter/></a>
                            <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-5" href={vaultAccountData.raffles[currentRaffleIndex].discord}><FaDiscord/></a>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row text-white font-bold text-1sm mt-5">
                        <div className="text-center">NO. OF TICKETS SOLD :&nbsp; <span className="text-green">{vaultAccountData.raffles[currentRaffleIndex].ticketIndex}/{vaultAccountData.raffles[currentRaffleIndex].collection}</span></div>
                        <div className="text-center"><span className="hidden sm:inline">&nbsp;|</span> NO. OF WINNERS :&nbsp; <span className="text-bitblue">1</span></div>
                    </div> 
                    <Footer vaultAccountData={vaultAccountData} currentRaffleIndex={currentRaffleIndex} countTime={0} activeTab={"closed"}/>
                </div>
            </>
        )
    }

}

export default Closed;