import React from "react";
import Header from "../Layout/Header";
import TableComponent, { LinkFill, ImgFill, EditFill, ViewFill } from "../Components/Table";
import NFT1 from '../assets/1.png';
import './admin.css'
const Admin = ( ) => {
    const data = React.useMemo(
        () => [
          {
            image: NFT1,
            name: 'Kozy Koala #278',
            links: 'links',
            price_per_ticket: '3.33 $KOZY',
            collection_size: '11',
            winners: '20',
            time:'11 D : 10 Hrs : 15 Min',
            edit:'',
            view:'',
          },
          {
            image: NFT1,
            name: 'Kozy Koala #278',
            links: 'links',
            price_per_ticket: '3.33 $KOZY',
            collection_size: '11',
            winners: '20',
            time:'11 D : 10 Hrs : 15 Min',
            edit:'',
            view:'',
          },
          
        ],
        []
    )
   
    const columns = React.useMemo(
        () => [
          {
            Header: 'IMG',
            accessor: 'image',
            Cell:ImgFill,
          },
          {
            Header: 'NAME',
            accessor: 'name',
          },
          {
            Header: 'LINKS',
            accessor: 'links',
            Cell: LinkFill,
          },
          {
            Header: 'PRICE PER TICKET',
            accessor: 'price_per_ticket',
          },
          {
            Header: 'COLLECTION SIZE',
            accessor: 'collection_size',
          },
          {
            Header: 'NO. OF WINNERS',
            accessor: 'winners',
          },
          {
            Header: 'TIME',
            accessor: 'time',
          },
          {
            Header: 'EDIT',
            accessor: 'edit',
            Cell: EditFill,
          },
          {
            Header: 'VIEW',
            accessor: 'view',
            Cell: ViewFill,
          },
        ],
        []
    )
    return (
        <>
            <Header/>
            <p className="text-white text-5sm sm:text-2sm font-bold text-center my-5">KOZY KOALA CURRENT RAFFLES</p>
            <div className="admin w-11/12 mx-auto p-5 border-2 border-white rounded-3xl">
                <TableComponent columns={columns} data={data}/>
            </div>
        </>
    )
}

export default Admin;