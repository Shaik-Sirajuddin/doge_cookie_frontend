import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navbar, Footer, Sidebar, } from './components';
import {Home, DogeCookie, Staking} from './pages';
import './index.css';


const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-primary-black min-h-screen overflow-hidden flex flex-col">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      

      <div className="flex max-sm:w-full max-w-[1280px] sm:pr-5">
        
          <Navbar />
  
          
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/presale" element={<DogeCookie/>} />
              <Route path="/staking" element={<Staking/>} />
            </Routes>

         
      </div>
      <div className='p-100px'>
      <Footer/>
      </div>
    
    </div>

  )
  }

export default App;