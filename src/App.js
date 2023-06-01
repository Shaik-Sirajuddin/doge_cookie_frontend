import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer, Sidebar, } from './components';
import { Home, DogeCookie, Staking, ReturnsCal } from './pages';
import './index.css';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bsc, sepolia, mainnet } from 'wagmi/chains'
import Signup from './components/Authentication/Signup';
import Signin from './components/Authentication/Signin';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';

const chains = [bsc, mainnet]
const projectId = 'a9da85a71b9681b6a3ef7950d068cb4a'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

toast.configure()
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
              <Route path="/returnscal" element={<ReturnsCal />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

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