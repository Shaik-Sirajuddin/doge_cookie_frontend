import { About, Explore, Feedback, Hero, Insights, WhatsNew, World, AuditSpace , ComingSoon } from '../sections';
import Roadmap from '../sections/Roadmap';


const Home = () => {
  return (
    <div>
      <Hero className='m-0' />
      <AuditSpace /><br/>
      <About /><br/>
      <div className="gradient-03 z-0" />
      <Explore /><br/>
      <div className="relative">

        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      <World />
      <div className="relative">
        <Insights />
        <div className="gradient-04 z-0" />
        <Feedback /><br/>
      </div>
      <div className="relative">
        <div className="gradient-04 z-0" />
        <Roadmap /><br/>
        <ComingSoon />
      </div>
    </div>
  )
}

export default Home;