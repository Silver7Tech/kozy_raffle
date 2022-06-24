import React from "react";
import Header from "../Layout/Header";
import Win from '../assets/win.svg'
import NFT1 from '../assets/1.png';
import { FaDiscord,FaTwitter } from "react-icons/fa"
import Blur1 from '../assets/Blur1.svg';
import TableComponent, { StatusPill } from "../Components/Table";
import './Winners.css'
const Winners = () => {
    const data = React.useMemo(
        () => [
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '27',
            claim_status: 'Claimed',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '30',
            claim_status: '',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '23',
            claim_status: '',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '30',
            claim_status: '',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '30',
            claim_status: '',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '30',
            claim_status: '',
          },
          {
            wallet_address: 'AnxcjLJDFVWEVBGkkd23ffg78ggfd09',
            entries: '30',
            claim_status: '',
          },
        ],
        []
    )
   
    const columns = React.useMemo(
        () => [
          {
            Header: 'Wallet',
            accessor: 'wallet_address', // accessor is the "key" in the data
          },
          {
            Header: 'Entries',
            accessor: 'entries',
          },
          {
            Header: 'Claims',
            accessor: 'claim_status',
            Cell: StatusPill, // accessor is the "key" in the data
          },
        ],
        []
    )
    return (
        <>
            <Header/>
            <p className="flex flex-col sm:flex-row justify-center items-center text-white font-bold text-2sm sm:text-3sm">
                <img src={Win} alt="win" className="hidden sm:inline"/>
                <span className="hidden sm:inline">&nbsp;</span>KOZY KLUB
                <div className="flex flex-row justify-center items-center">
                    <img src={Win} alt="win" className="inline sm:hidden"/>
                    <span className="text-white">&nbsp;WINNERS&nbsp;</span>
                    <img src={Win} alt="win"/>
                </div>
            </p>
            <div className="flex flex-col md:flex-row items-center justify-evenly sm:mt-10">
                <div className="flex flex-col items-center justify-center">
                    <img src={NFT1} alt="NFT1" className="rounded-full w-NFTW" />
                    <p className="text-white font-bold text-5sm sm:text-2sm mt-3 sm:mt-0">KOZY KOALA #278</p>
                    <div className="flex flex-row justify-center mt-2 sm:mt-0">
                        <a className="text-black text-5sm sm:text-2sm my-auto rounded-full bg-white p-3" href="#twitter"><FaTwitter/></a>
                        <a className="text-black text-5sm sm:text-2sm my-auto rounded-full bg-white p-3 ml-5" href="#discord"><FaDiscord/></a>
                    </div>
                </div>
                <div className="winner_list p-5 border-2 border-white rounded-3xl">
                    <TableComponent columns={columns} data={data}/>
                </div>
            </div>
            <div className="py-20 flex justify-center items-center">
                <img src={Blur1} alt="blur1"/>
            </div>
        </>
    )
}
export default Winners;