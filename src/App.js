import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import ForgetPass from "./pages/auth/ForgetPass";
import ResetPass from "./pages/auth/ResetPass";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import HowTo from "./pages/how-to/HowTo";
import MyAccount from "./pages/my-account/MyAccount";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import useAuth from "./Hooks/useAuth";
import AdminRoute from "./Routes/AdminRoute";
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'
import CookieStaking from "./pages/cookie-staking/CookieStaking";



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

function App() {

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };


  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Toaster />
        <AuthProvider>
          <BrowserRouter>
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-to" element={<HowTo />} />
                <Route path="/staking" element={<CookieStaking />} />
                <Route path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <MyAccount />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/forget-password" element={<ForgetPass />} />
                <Route path="/reset-password" element={<ResetPass />} />
              </Routes>
            </Wrapper>
          </BrowserRouter>
        </AuthProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
