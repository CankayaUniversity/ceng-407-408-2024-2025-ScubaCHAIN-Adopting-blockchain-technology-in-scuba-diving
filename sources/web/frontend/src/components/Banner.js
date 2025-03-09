import React, { useEffect } from "react";

const Banner = () => {
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
    <section id="banner">
      <div className="content">
        <header>
          <h2>ScubaChain</h2>
          <p>Digitize Your Diving Experience</p>
        </header>
        <span className="image">
          <img src="assets/images/logo.png" alt="ScubaChain Logo" />
        </span>
      </div>
      <a href="#one" className="goto-next scrolly">Next</a>
    </section>
  </div>
  );
};

export default Banner;