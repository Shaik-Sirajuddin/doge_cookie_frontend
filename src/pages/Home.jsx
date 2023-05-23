import { About, Explore, Feedback, Hero, Insights, WhatsNew, World , AuditSpace } from '../sections';


const Home = () => {
    return (
        <div>
        <Hero className='m-0' />
      <AuditSpace />
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    <div className="relative">
     
      <div className="gradient-04 z-0" />
      <WhatsNew />
    </div>
    <World />
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      <Feedback />
    </div>
    </div>
    )
}

export default Home;