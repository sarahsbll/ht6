import React from "react";

const Library = () => {
  return (
    <div className="container h-screen ">
      <div className="h-full flex flex-col pb-4">
        <input
          type="text"
          name="search"
          placeholder="Search by title, author, name"
          style={{
            width: "90vh",
            position: "absolute",
            top: "100px",
            right: "500px",
            height: "40px",
            padding: "10px",

            borderRadius: "10px",
          }}
        />
        <div
          className="bg-gray-50 shadow-xl"
          style={{
            width: "125vh",
            position: "absolute",
            top: "200px",
            right: "400px",
            height: "200px",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h1 className="font-bold text-indigo-900 text-3xl">
            Collect and View in AR
          </h1>

          <p className="text-indigo-900 text-xl">Earn rewards by reading!</p>
          <br />
          <button className="font-bold text-white bg-indigo-500 py-2 px-5 text-xl rounded-full">
            View all
          </button>
        </div>
        <div
          className="text-3xl font-bold"
          style={{
            width: "125vh",
            position: "absolute",
            bottom: "200px",
            right: "400px",
            height: "200px",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          Popular
        </div>
      </div>
    </div>
  );
};

export default Library;
