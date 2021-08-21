import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
const Home = () => {
  return (
    <section id="hero" className="">
      <img
        src={hero}
        style={{
          position: "absolute",
          right: "400px",
          bottom: "300px",
          height: "auto",
          width: "600px",
        }}
      />
      <div className="container h-screen relative z-20">
        <div className="h-full flex flex-col justify-end pb-4 lg:pb-0 lg:w-96 lg:justify-center">
          <div className="h-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
            <h1
              style={{ fontSize: "70px" }}
              className="text-indigo-900 lg:text-5xl font-bold text-primary-dark-blue pb-5"
            >
              Read books with more Passion
            </h1>
            <br />
            <p className="text-indigo-900 text-md text-neutral-grayish-blue leading-5 mb-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              interdum dignissim quam, hendrerit tincidunt ipsum. Nunc venenatis
            </p>
            <br />
            <button className="shadow-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-4 text-white rounded-full">
              <Link to="/register">Get Started Free</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
