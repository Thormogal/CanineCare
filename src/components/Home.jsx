import React from 'react';
import '../CSS/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-description">
        <p className="home-subtitle">
          <span className="highlight-title">CanineCare</span>: "Where happy paws are everywhere"
        </p>
        <p>
          At CanineCare, your furry friends are treated like family.<br />
          We ensure that every wagging tail is happy, and every bark is heard.<br /><br />
          Check out our happy customers in the "Catalog" tab or the left button below.
  </p>
</div>
      <div className="cta-buttons">
        <a href="/catalog" className="cta-button">View Our Dogs</a>
        <a href="/contact" className="cta-button cta-secondary">Contact Us</a>
      </div>
    </div>
  );
}

export default Home;
