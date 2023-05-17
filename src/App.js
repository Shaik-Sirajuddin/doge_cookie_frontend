import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer, Sidebar, } from './components';
import { Home, DogeCookie, Staking } from './pages';
import './index.css';
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import trustModule from '@web3-onboard/trust'
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const App = () => {

  const INFURA_KEY = '30145ab7ed4f48f29d2638565511d94e'

  const injected = injectedModule()
  const coinbase = coinbaseModule()
  const walletConnect = walletConnectModule()
  const ledger = ledgerModule()
  const trust = trustModule()

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com'
  }


  const wallets = [
    injected,
    trust,
    ledger,
    coinbase,
    walletConnect,
  ]

  const chains = [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0xaa36a7',
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`
    },
  ]

  const appMetadata = {
    name: 'Doge Coolie',
    icon: '<svg>My App Icon</svg>',
    description: 'Connect to Doge Cookie.',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  }

  const web3Onboard = init({
    wallets,
    chains,
    appMetadata
  })


  return (
    <>
       <Web3OnboardProvider web3Onboard={web3Onboard}>  
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

        </Web3OnboardProvider>
    </>

  )
}

export default App;