import { Footer, Navbar } from './components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, DogeCookie, WhatsNew, World } from './sections';
import './index.css';


function App() {
  return (
      <div className="bg-primary-black overflow-hidden">
    <Navbar className='mb-0' />
    <Hero className='m-0' />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
       <DogeCookie />
      <div className="gradient-04 z-0" />
     
      <WhatsNew />
    </div>
    <World />
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      <Feedback />
    </div>
    <Footer />
  </div>
  );
}

export default App;
