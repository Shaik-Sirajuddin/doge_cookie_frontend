import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer, Sidebar, } from './components';
import { Home, DogeCookie, Staking } from './pages';
import './index.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import {  configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bsc, bscTestnet, sepolia, mainnet } from 'wagmi/chains'

const chains = [bsc, bscTestnet, sepolia, mainnet]
const projectId = 'a9da85a71b9681b6a3ef7950d068cb4a'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const App = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>

        <div className="relative sm:-8 p-8 bg-primary-black min-h-screen overflow-hidden ">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>


          <div className="max-sm:w-full max-w-[1280px] lg:mx-24 sm:pr-5">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/presale" element={<DogeCookie />} />
              <Route path="/staking" element={<Staking />} />
            </Routes>


            <Footer />
          </div>

        </div>

      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>

  )
}

export default App;