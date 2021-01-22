import React from "react";
import "./home-page.styles.scss";

import { withRouter } from "react-router-dom";

import SIDEBAR_ROUTES from "../../datas/routes.data";

// carrousel images 
import Cover1 from "../../assets/ct1.jpg";
import Cover2 from "../../assets/ct2.jpg";
import Cover3 from "../../assets/ct3.jpg";

import Carousel from "../../components/carousel/carousel.component";

const Home = ({ history }) => {
  
  const pages = SIDEBAR_ROUTES.filter(
    (route) => route.homepage
  );

  // carousel will show on Homepage as many pics as you add to this array
  const carouselImages = [Cover1, Cover2, Cover3];

  return (
    <section className="home_">
      <div className="home__cover">
        <Carousel images={carouselImages} />
      </div>

      <section className="home__icons">
        {pages.map((page) => (
          <div
            key={page.id}  
            className="home__icon"
            onClick={() => {history.push(`${page.linkUrl}`)}}
          >
            <i className={page.icon}/>
            <h6 className="home__icon--text   mt-2">{page.label.toUpperCase()}</h6>
          </div>
        ))}
      </section>
    </section>
  );
};

export default withRouter(Home);
