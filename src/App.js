import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Live from './Pages/Live';
import Closed from './Pages/Closed';
import Winners from './Pages/Winners';
import Purchase from './Pages/Purchase';
import Admin from './Pages/Admin';

import Header from './Layout/Header';

import { Connection,  clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from './idl.json';
import { BN } from "bn.js";
// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;
const rentSysvar = web3.SYSVAR_RENT_PUBKEY;

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed"
}


window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [owner, setOwner] = useState(null)
  const [vaultAccount, setVaultAccount] = useState(null);
  const [vaultBump, setVaultBump] = useState(null);
  const [entrantAccount, setEntrantAccount] = useState(null);
  const [entrantBump, setEntrantBump] = useState(null);

  const [name, setName] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [price, setPrice] = useState(0);
  const [winners, setWinners] = useState(0);
  const [collectionSize, setCollectionSize] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [image, setImage] = useState('');

  const [vaultAccountData, setVaultAccountData] = useState(null);
  const [entrantAccountDatas, setEntrantAccountData] = useState(null);


  // const []
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
  
      if (solana) {
        if (solana.isPhantom) {

          const response = await solana.connect();
          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment,);
    return provider;
  }
  const getVaultAccount = async() => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      const [_pda, _bump] = 
        await PublicKey.findProgramAddress(
          [
            Buffer.from("vaults"),
            programID.toBuffer(),
          ],
          programID
        );
      setVaultAccount(_pda);
      setVaultBump(_bump);

    } catch (error) {
      console.log("error", error);
    }
  }
  const initializeVault = async() => {
    try {

      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      
      await program.rpc.initializeVault(
        vaultBump,
        {
          accounts : {
            owner: provider.wallet.publicKey,
            vaultAccount: vaultAccount,
            systemProgram: SystemProgram.programId,
          },
        }
      )
      const vaultAccountDatas = await program.account.vaultAccount.fetch(vaultAccount);
      setVaultAccountData(vaultAccountDatas);
    } catch (error) {
      console.log("error", error);
    }
  }

  const getEntrantAccount = async() => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);


    try {
      const [_pda, _bump] = 
        await PublicKey.findProgramAddress(
          [
            Buffer.from("entrants"),
            programID.toBuffer(),
          ],
          programID
        );
        setEntrantAccount(_pda);
        setEntrantBump(_bump);
    } catch (error) {
      console.log("error", error);
    }
  }

  const initializeEntrant = async() => {
    try {

      const provider = getProvider();
      const program = new Program(idl, programID, provider);


      await program.rpc.initializeEntrant(
        entrantBump,
        {
          accounts : {
            owner: provider.wallet.publicKey,
            entrantAccount: entrantAccount,
            systemProgram: SystemProgram.programId,
          },
        }
      )

      const entrantAccountDatas = await program.account.entrants.fetch(entrantAccount);
      setEntrantAccountData(entrantAccountDatas);

    } catch (error) {
      console.log("error", error);
    }
  }
  const createRaffle = async(name, image, discord, twitter, end_timestamp, ticket_price, collection) => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      let tx = await program.rpc.createRaffle(
        name,
        image,
        discord,
        twitter,
        new BN(end_timestamp),
        ticket_price.toString(),
        new BN(collection),
        {
          accounts: {
            vaultAccount: vaultAccount,
            entrantAccount: entrantAccount,
            owner: provider.wallet.publicKey,
          },
        }
      )
      

      const vaultAccountDatas = await program.account.vaultAccount.fetch(vaultAccount);
      setVaultAccountData(vaultAccountDatas);
      const entrantAccountDatas = await program.account.entrants.fetch(entrantAccount);
      setEntrantAccountData(entrantAccountDatas);


    } catch (error) {
      console.log(error)
    }
  }
  const buyTicket = async(index,amount) => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      await program.rpc.buyTickets(
        new BN(index),
        new BN(amount),
        {
          accounts: {
            vaultAccount: vaultAccount,
            entrantAccount: entrantAccount,
            owner: provider.wallet.publicKey,
          },
        }
      )
    } catch (error) {
      
    }
  }


  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if(walletAddress!=null){    
      getVaultAccount();
      getEntrantAccount();
    }
  },[walletAddress])
  
  useEffect(() => {
    const setVaultAccountDataFromProgram = async() => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const vaultAccountDatas = await program.account.vaultAccount.fetch(vaultAccount);
        setVaultAccountData(vaultAccountDatas);
      } catch (error) {
        if(walletAddress == "E6necYBrzVVgixdeupTVUtRsU7UQf7nLCg8q913xxADY") {
          initializeVault();
        }
      }
    }
    if(vaultAccount!=null && vaultBump!=null) {
      setVaultAccountDataFromProgram();
    }
  },[vaultAccount, vaultBump])

  
  useEffect(() => {
    const setEntrantsAccountDataFromProgram = async() => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const entrantAccountDatas = await program.account.entrants.fetch(entrantAccount);
        setEntrantAccountData(entrantAccountDatas);
      } catch (error) {

        if(walletAddress == "E6necYBrzVVgixdeupTVUtRsU7UQf7nLCg8q913xxADY") {
          initializeEntrant();
        }
      }
    }

    if(entrantAccount!=null && entrantBump!=null) {
      setEntrantsAccountDataFromProgram();
    }

  },[entrantAccount, entrantBump])

  useEffect(()=>{
    if(name !='' && twitterLink!='' && discordLink!='' && price !=0 && collectionSize!=0 && image!='' && day>=0 && hour>=0 && minute>=0){
        let end_timestamp = Math.floor(Date.now()/1000 + 3600 * 24 * Number(day) + 3600 * Number(hour) + Number(minute) * 60)
        createRaffle(
            name,
            image,
            discordLink,
            twitterLink,
            end_timestamp,
            price,
            collectionSize
        )
        setName('');
        setTwitterLink('');
        setDiscordLink('');
        setPrice(0);
        setWinners(0);
        setCollectionSize(0);
        setDay(0);
        setHour(0);
        setMinute(0);
        setImage('');
      }
  },[name, twitterLink,discordLink,price,winners,collectionSize,day,hour,minute,image]);
  
  return (
    <div className='App'>
      <Header 
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        setName={setName}
        setTwitterLink={setTwitterLink}
        setDiscordLink={setDiscordLink}
        setPrice={setPrice}
        setWinners={setWinners}
        setCollectionSize={setCollectionSize}
        setDay={setDay}
        setHour={setHour}
        setMinute={setMinute}
        setImage={setImage}
      />
      <Routes>
        <Route path="/" exact element={<Live vaultAccountData={vaultAccountData}/>} />
        <Route path="/closed" exact element={<Closed vaultAccountData={vaultAccountData}/>} />
        <Route path="/winners" exact element={<Winners/>} />
        <Route path="/purchase" exact element={<Purchase/>} />
        <Route path="/admin" exact element={<Admin vaultAccountData={vaultAccountData}/>} />
      </Routes>
    </div>
  );
}

export default App;
