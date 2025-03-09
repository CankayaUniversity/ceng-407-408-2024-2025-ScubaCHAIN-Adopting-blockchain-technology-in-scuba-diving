import React from "react";

const TeamSection = () => {
  return (
    <div id="page-wrapper">
      <section id="four" className="wrapper style1 special fade-up">
        <header className="major">
          <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Team Members</h2>
        </header>
        <div className="box alt" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div className="row gtr-uniform" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "20px" }}>
            {[
              {
                name: "Deniz KAR",
                id: "202011042",
                image: "dedeniz.jpg",
                linkedin: "https://www.linkedin.com/in/deniz-kar-41933524b/",
                github: "https://github.com/vaieldep"
              },
              {
                name: "Mustafa Arda ERDİNÇ",
                id: "202011073",
                image: "arda.jpg",
                linkedin: "https://www.linkedin.com/in/mustafa-arda-erdinç-b1b31b295",
                github: "https://github.com/mardaerdinc"
              },
              {
                name: "Arda Celal KAPLAN",
                id: "202111013",
                image: "celal.jpg",
                linkedin: "https://www.linkedin.com/in/arda-celal-kaplan-698749235/",
                github: "https://github.com/Celalius"
              },
              {
                name: "Ahmet Berk EROĞLU",
                id: "202011411",
                image: "berk.jpeg",
                linkedin: "https://www.linkedin.com/in/erogluberk/",
                github: "https://github.com/b3rkeroglu"
              },
              {
                name: "İclal Sezin GÜRSES",
                id: "202111017",
                image: "sezin.jpg",
                linkedin: "https://www.linkedin.com/in/iclal-sezin-g%C3%BCrses-a824b3226/",
                github: "https://github.com/isezin"
              }
            ].map((member, index) => (
              <section key={index} className="col-4 col-6-medium col-12-xsmall" style={{ textAlign: "center" }}>
                <img src={`assets/images/${member.image}`} className="icon solid alt major" alt={member.name} />
                <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{member.name}</h3>
                <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{member.id}</p>
                <ul className="icons">
                  <li><a href={member.linkedin} className="icon brands alt fa-linkedin-in" target="_blank" rel="noreferrer"><span className="label">LinkedIn</span></a></li>
                  <li><a href={member.github} className="icon brands alt fa-github" target="_blank" rel="noreferrer"><span className="label">GitHub</span></a></li>
                </ul>
              </section>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <header className="major">
          <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Advisors</h2>
        </header>
        <div className="box alt">
          <div className="row gtr-uniform">
            {[
              {
                name: "Gül TOKDEMİR",
                image: "gul-tokdemir.jpg",
                linkedin: "https://www.linkedin.com/in/g%C3%BCl-tokdemir-925998b/"
              },
              {
                name: "Alper Ateş",
                image: "alper-ates.png",
                linkedin: "https://www.linkedin.com/in/alperates1923/"
              },
              {
                name: "Mustafa Bilal Demirkan",
                image: "mustafa-bilal-demirkan.jpeg",
                linkedin: "https://www.linkedin.com/in/mustafabilaldemirkan/"
              }
            ].map((advisor, index) => (
              <section key={index} className="col-4 col-6-medium col-12-xsmall" style={{ textAlign: "center" }}>
                <img src={`assets/images/${advisor.image}`} className="icon solid alt major" alt={advisor.name} />
                <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{advisor.name}</h3>
                <ul className="icons">
                  <li><a href={advisor.linkedin} className="icon brands alt fa-linkedin-in" target="_blank" rel="noreferrer"><span className="label">LinkedIn</span></a></li>
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamSection;