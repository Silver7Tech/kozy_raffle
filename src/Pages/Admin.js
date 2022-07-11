import React, { useEffect,useState } from "react";
import TableComponent, { TwitterFill,DiscrodFill, ImgFill, EditFill, ViewFill } from "../Components/Table";
import './admin.css'
const Admin = ({vaultAccountData,closeRaffle}) => {
  const [liveRaffleData, setCurrentRaffles] = useState(null);
  const [closedRaffleData, setClosedRaffles] = useState(null);

  const [option, setOption] = useState(1);

  useEffect(() => {
    if(vaultAccountData!=null){
      let temp_live_data = [];
      let temp_closed_data = [];
      vaultAccountData.raffles.map((item) => {
        if(Number(item.endTimestamp) > Date.now()/1000){

          let time = Number(item.endTimestamp) -  Date.now()/1000;
          const day = (time-time%(3600 * 24))/(3600 * 24);
          time = time - day * 3600 * 24;
          const hour = (time -time%3600)/3600;
          time = time - hour * 3600;
          const minute = (time -time%60)/60;
          const timeString = day.toString() + "D: " + hour.toString() + "H: " + minute.toString() + "M";

          let single_raffle = {
            image: item.image,
            name: item.name,
            twitter: item.twitter,
            discord: item.discord,
            price_per_ticket: String(Number(item.ticketPrice)/100)+"$KOZY",
            collection_size: Number(item.collection),
            winners: 0,
            time: timeString
          }
          temp_live_data.push(single_raffle)
        } else {
          let single_raffle = {
            image: item.image,
            name: item.name,
            twitter: item.twitter,
            discord: item.discord,
            price_per_ticket: String(Number(item.ticketPrice)/100)+"$KOZY",
            collection_size: Number(item.collection),
            winners: 1,
            option: "Delete"
          }
          temp_closed_data.push(single_raffle)
        }
      })
      setCurrentRaffles(temp_live_data);
      setClosedRaffles(temp_closed_data);
    }
  },[vaultAccountData])

  
  const livedata = React.useMemo(
    () => {
      if(liveRaffleData!=null){
        return liveRaffleData
      }
    },
    [liveRaffleData]
  )
  const closeddata = React.useMemo(
    () => {
      if(closedRaffleData!=null){
        return closedRaffleData
      }
    },
    [closedRaffleData]
  )

  const livecolumns = React.useMemo(
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
      {
        Header: 'TIME',
        accessor: 'time',
      },
    ],
    []
  )

  const closedcolumns = React.useMemo(
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
      {
        Header: 'OPTION',
        accessor: 'option',
      },
    ],
    []
  )
  if(liveRaffleData!=null && option == 1){
    return (
      <>
          <p className="text-white text-5sm sm:text-2sm font-bold text-center my-5">KOZY KOALA CURRENT RAFFLES</p>
          <div className="flex justify-center">
              <div className="flex items-center mr-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={()=>setOption(1)}/>
                  <label for="inline-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Live Raffles</label>
              </div>
              <div className="flex items-center mr-4">
                  <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={()=>setOption(0)}/>
                  <label for="inline-2-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Closed Raffles</label>
              </div>

          </div>
          <div className="admin w-11/12 mx-auto p-5 border-2 border-white rounded-3xl">
              <TableComponent columns={livecolumns} data={livedata}/>
          </div>
      </>
    )
  }

  if(closedRaffleData!=null && option == 0){
    return (
      <>
          <p className="text-white text-5sm sm:text-2sm font-bold text-center my-5">KOZY KOALA CLOSED RAFFLES</p>
          <div className="flex justify-center">
              <div className="flex items-center mr-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={()=>setOption(1)}/>
                  <label for="inline-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Live Raffles</label>
              </div>
              <div className="flex items-center mr-4">
                  <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={()=>setOption(0)}/>
                  <label for="inline-2-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Closed Raffles</label>
              </div>

          </div>
          <div className="admin w-11/12 mx-auto p-5 border-2 border-white rounded-3xl">
              <TableComponent columns={closedcolumns} data={closeddata}/>
          </div>
      </>
    )
  }

  
}
export default Admin;