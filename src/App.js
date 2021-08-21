import { BrowserRouter, Switch, Route } from "react-router-dom";
import Collection from "./components/Collection";
import Home from "./components/Home";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import background from "./assets/bg.jpg";
function App() {
  return (
    <BrowserRouter>
      <div
        className=" min-h-screen bg-gray-100 flex flex-col justify-center"
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="relative  px-20"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="  rounded-3xl bg-white shadow-lg  bg-clip-padding bg-opacity-60 border border-gray">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/library" component={Library} />
              <Route exact path="/collection" component={Collection} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
