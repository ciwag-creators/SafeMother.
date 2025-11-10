import heroImg from "../assets/mother.png";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">

        <div className="hero-text">
          <h2>
            Welcome to <span>SafeMother</span>
          </h2>
          <p>Supporting mothers with guidance, community and care.</p>
          <a href="/tips" className="btn-start">Get Started</a>
        </div>

        <img src={heroImg} alt="Mother and baby" className="hero-img" />
      </div>
    </div>
  );
}
