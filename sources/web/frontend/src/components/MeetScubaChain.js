import React, { useEffect } from "react";
//import uw1Image from "../images/uw1.jpg";

const MeetScubaChain = () => {
  useEffect(() => {
    const smoothScroll = (targetPosition, duration) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
  
      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
  
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
  
      requestAnimationFrame(animation);
    };
  
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const duration = 2000;
        smoothScroll(targetPosition, duration);
      }
    };
  
    const links = document.querySelectorAll(".scrolly");
    links.forEach((link) => link.addEventListener("click", handleScroll));
  
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll));
    };
  }, []);

  return (
  <div id="page-wrapper">
    <section id="one" className="spotlight style1 bottom">
      <span className="image fit main">
      <img src={"/images/uw1.jpg"} alt="Underwater Scuba Image 1" />
      </span>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-4 col-12-medium">
              <header>
                <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Meet ScubaChain!
                </h2>
                <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  A New Era in the Underwater World
                </p>
              </header>
            </div>
            <div className="col-4 col-12-medium">
              <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                Welcome to an innovative platform that combines your underwater
                adventures and diving experiences with modern technology.
                ScubaChain secures your diving certifications, logs, and all
                related information using the power of blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </div>
      <a href="#two" className="goto-next scrolly">
        Next
      </a>
    </section>
  </div>
  );
};

export default MeetScubaChain;