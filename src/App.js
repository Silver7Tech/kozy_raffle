import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Live from './Pages/Live';
import Closed from './Pages/Closed';
import Winners from './Pages/Winners';
import Purchase from './Pages/Purchase';
import Header from './Layout/Header';

import { Connection,  clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from './idl.json';
// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed"
}

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [vaultAccount, setVaultAccount] = useState(null);
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
      console.error(error);
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

  const initializeVault = async() => {
    try {

      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log(provider,program.programId)

      const [_pda, _nonce] = await PublicKey.findProgramAddress(
        [
          Buffer.from("vault"),
          program.ProgramId.toBuffer(),
        ],
        program.ProgramId
      );
      console.log(_pda, _nonce)
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
      initializeVault()
    }
  },[walletAddress])
  
  return (
    <div className='App'>
      <Header 
        connectWallet={connectWallet}
        setWalletAddress={setWalletAddress}
        walletAddress={walletAddress}
      />
      <Routes>
        <Route path="/" exact element={<Live/>} />
        <Route path="/closed" exact element={<Closed/>} />
        <Route path="/winners" exact element={<Winners/>} />
        <Route path="/purchase" exact element={<Purchase/>} />
      </Routes>
    </div>
  );
}

export default App;
