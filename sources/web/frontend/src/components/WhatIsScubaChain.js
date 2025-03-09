import React, { useEffect } from "react";

const WhatIsScubaChain = () => {
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
      <section id="two" className="spotlight style2 right">
        <span className="image fit main">
          <img src="/images/uw12.jpg" alt="Underwater Scuba Image 2" />
        </span>
        <div className="content">
          <header>
            <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              What is ScubaChain?
            </h2>
            <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              ScubaChain is a decentralized and reliable dive management system
              designed to simplify the lives of diving enthusiasts. It combines
              features such as certification verification, dive log recording,
              and NFT-based rewards, ensuring transparency and security in the
              underwater world.
            </p>
          </header>
        </div>
        <a href="#three" className="goto-next scrolly">
          Next
        </a>
      </section>
    </div>
  );
};

export default WhatIsScubaChain;