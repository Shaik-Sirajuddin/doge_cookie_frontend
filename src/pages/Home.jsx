/** @format */

import {
  About,
  Explore,
  Feedback,
  Hero,
  Insights,
  WhatsNew,
  World,
  AuditSpace,
  ComingSoon,
} from "../sections";
import Roadmap from "../sections/Roadmap";

const Home = () => {
  return (
    <div>
      <Hero className="m-0" />
      <AuditSpace />
      <br />
      <section id="about">
        <About />
      </section>
      <br />
      <div className="gradient-03 z-0" />
      {/* <Explore /><br/> */}
      <div className="relative">
        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      {/* <World /> */}
      <div className="relative">
        <section id="mission">
          <Insights />
        </section>
        <div className="gradient-04 z-0" />
        <Feedback />
        <br />
      </div>
      <div className="relative">
        <div className="gradient-04 z-0" />
        <section id="roadmap">
          <Roadmap />
        </section>
        <br />
        <ComingSoon />
      </div>
    </div>
  );
};

export default Home;
