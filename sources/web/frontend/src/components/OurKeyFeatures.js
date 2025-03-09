import React, { useEffect }from "react";

const OurKeyFeatures = () => {
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
    <section id="three" className="spotlight style3 left">
      <span className="image fit main bottom">
        <img src="/images/uw3.jpg" alt="Underwater Scuba Image 3" />
      </span>
      <div className="content">
        <header>
          <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            Our Key Features
          </h2>
        </header>
        <dl style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <dt>
            <b>Secure Certifications:</b>
          </dt>
          <dd>Safeguard your diving certifications with blockchain.</dd>
          <dt>
            <b>NFT Rewards:</b>
          </dt>
          <dd>Immortalize your unique diving experiences with NFTs.</dd>
          <dt>
            <b>User-Friendly Mobile App:</b>
          </dt>
          <dd>Manage your diving information anytime, anywhere.</dd>
          <dt>
            <b>Social Connections:</b>
          </dt>
          <dd>Interact with the diving community and share your achievements.</dd>
          <dt>
            <b>Data Storage with IPFS:</b>
          </dt>
          <dd>Decentralized storage for your documents and records.</dd>
        </dl>
        <a href="#four" className="goto-next scrolly">
          Next
        </a>
      </div>
    </section>
  </div>
  );
};

export default OurKeyFeatures;