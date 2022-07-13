import React, { useEffect, useState } from "react";
import SwiperComponent from "../Components/Swiper/SwiperComponent";
import { FaDiscord,FaTwitter } from "react-icons/fa"
import Footer from "../Components/Footer";

const Live = ({vaultAccountData,entrantAccountData,walletAddress}) => {
    const [currentRaffleIndex, setCurrentRaffleIndex] = useState(0);
    const [countTime, setCountTime] = useState(0);
    const [liveRaffles, setLiveRaffles] = useState([]);

    useEffect(()=> {
        if(vaultAccountData!==null){
            let liveRaffle = [];
            // eslint-disable-next-line
            vaultAccountData.raffles.map((item) => {
                if(Number(item.endTimestamp)>Date.now()/1000){
                    liveRaffle.push(item);
                }
            })
            setLiveRaffles(liveRaffle);
            if(liveRaffle.length !== 0){
                let time = liveRaffle[currentRaffleIndex].endTimestamp;
                setCountTime(Number(time))
            }
        }
        
    },[currentRaffleIndex,vaultAccountData]);

   
    return(
        <div className="flex flex-col items-center w-full">
            <p className="text-white font-bold text-2sm sm:text-3sm">KOZY KLUB <span className="text-green">LIVE</span></p>
                {
                    liveRaffles.length!==0
                    ?
                    <>
                        <SwiperComponent vaultAccountData={liveRaffles} currentRaffleIndex={currentRaffleIndex} setCurrentRaffleIndex={setCurrentRaffleIndex} activeTab={"live"}/>

                        <div className="flex flex-col sm:flex-row text-white items-center font-bold text-1sm sm:text-2sm mt-5">
                            {liveRaffles[currentRaffleIndex].name}
                            <div className="flex flex-row justify-center mt-2 sm:mt-0">
                                <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-0 sm:ml-5" href={liveRaffles[currentRaffleIndex].twitter}><FaTwitter/></a>
                                <a className="text-black text-1sm my-auto rounded-full bg-white p-2 ml-5" href={liveRaffles[currentRaffleIndex].discord}><FaDiscord/></a>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row text-white font-bold text-1sm mt-5">
                            <div className="text-center">NO. OF TICKETS SOLD :&nbsp; <span className="text-green">{liveRaffles[currentRaffleIndex].ticketIndex}/{liveRaffles[currentRaffleIndex].collection}</span></div>
                            <div className="text-center"><span className="hidden sm:inline">&nbsp;|</span> NO. OF WINNERS :&nbsp; <span className="text-bitblue">{Number(liveRaffles[currentRaffleIndex].winnerNumber)}</span></div>
                        </div>
                            {
                                countTime > 0
                                ?
                                <Footer  vaultAccountData={liveRaffles} entrantAccountData={entrantAccountData} currentRaffleIndex={currentRaffleIndex} countTime={countTime} walletAddress={walletAddress} activeTab={"live"}/>
                                :
                                <></>
                            }
                    </>
                :
                <div className="text-white flex items-center justify-center text-1sm">No Live Raffles</div>
            }
            </div>
                
    )
    
}

export default Live;