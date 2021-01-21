import React, { useEffect } from "react";
import "./carousel.styles.scss";

const Carousel = ({ images }) => {
  // simulates a click to the next image button
  const nextCarousel = () => {
    document.querySelector("#carousel-next").click();
  };

  useEffect(() => {
    // changes caroussel image each 5 secs
    const carouselInterval = setInterval(nextCarousel, 5000);
    return () => clearInterval(carouselInterval);
  }, []);


  //Bootstrap caroussel with some changes to display any number of existent pics in an Array
  return (
    <div
      id="carousel-component"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {images.map((img, index) => (
          <li
            key={index}
            data-target="#carousel-component"
            data-slide-to={index}
            className={`${index === 0 ? "active" : ""}`}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            key={index}
            className={`${index === 0 ? "active" : ""} carousel-item`}
          >
            <img src={img} className="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carousel-component"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carousel-component"
        role="button"
        data-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          id="carousel-next"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
