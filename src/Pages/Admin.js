import React, { useEffect,useState } from "react";
import TableComponent, { TwitterFill,DiscrodFill, ImgFill, EditFill, ViewFill } from "../Components/Table";
import './admin.css'
const Admin = ({vaultAccountData}) => {
  const [raffleData, setCurrentRaffles] = useState(null);

  useEffect(() => {
    if(vaultAccountData!=null){
      let temp_data = [];
      vaultAccountData.raffles.map((item) => {
        if(Number(item.endTimestamp) > Date.now()/1000){
          let single_raffle = {
            image: item.image,
            name: item.name,
            twitter: item.twitter,
            discord: item.discord,
            price_per_ticket: Number(item.ticketPrice),
            collection_size: Number(item.collection),
            winners: 0,
          }
          temp_data.push(single_raffle)
        }
      })
      setCurrentRaffles(temp_data)
    }
  },[vaultAccountData])

  
  const data = React.useMemo(
    () => {
      if(raffleData!=null){
        return raffleData
      }
    },
    [raffleData]
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
        Header: 'TWITTER',
        accessor: 'twitter',
        Cell: TwitterFill,
      },
      {
        Header: 'DISCORD',
        accessor: 'discord',
        Cell: DiscrodFill,
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
    ],
    []
  )
  if(raffleData!=null){
    return (
      <>
          <p className="text-white text-5sm sm:text-2sm font-bold text-center my-5">KOZY KOALA CURRENT RAFFLES</p>
          <div className="admin w-11/12 mx-auto p-5 border-2 border-white rounded-3xl">
              <TableComponent columns={columns} data={data}/>
          </div>
      </>
    )
  }

  
}
export default Admin;