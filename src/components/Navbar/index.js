import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="text-indigo-900 fixed z-50 top-50 w-full ">
        <nav className="container flex justify-between items-center z-20">
          <div className="my-5 lg:my-6">
            <h1 className="text-2xl text-indigo-500 font-bold">Imagine</h1>
          </div>

          <div className="hidden lg:block text-lg text-neutral-grayish-blue">
            <a className="mx-10 py-5 hover:gradient-border-bottom">
              <Link to="/">Home</Link>
            </a>
            <a className="mx-10 py-5 hover:gradient-border-bottom">
              <Link to="/library">Library</Link>
            </a>
            <a className="mx-10 py-5 hover:gradient-border-bottom">
              <Link to="/collection">Collection</Link>
            </a>
          </div>

          <button className="border border-indigo-900 text-indigo-900 rounded-full py-2 px-6">
            <Link to="/register">Sign up</Link>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
