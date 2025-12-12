import { useState, useReducer } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import safetyHelmet from "../assets/SVG/helmet-safety.svg";
import cogs from "../assets/SVG/cogs.svg";
import {
  login,
  loginAlt,
  dashboard,
  dashboardAlt,
  dashboardInput,
  dashboardInputAlt,
} from "../assets";
import "./css/home.css";

const initialState = {
  showImageOne: false,
  showImageTwo: false,
  showImageThree: false,
};

const reducer = (state, action) => {
  if (action.type === "showImageOne") {
    return { ...state, showImageOne: !state.showImageOne };
  }

  if (action.type === "showImageTwo") {
    return { ...state, showImageTwo: !state.showImageTwo };
  }

  if (action.type === "showImageThree") {
    return { ...state, showImageThree: !state.showImageThree };
  }

  throw Error("Unknown Action: " + action.type);
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="home">
      <section className="homepage-section">
        <h2 className="homepage-h1">Welcome</h2>

        <p className=" homepage-p">Thank you for visiting my project!</p>

        <div className="svg-container">
          <img src={cogs} alt="cogs" className="cogs homepage-svg" />
        </div>

        <h3 className="homepage-h3">Purpose</h3>
        <p className=" homepage-p">
          The intended use for this app is to have a way to coordinate and share
          information regarding "construction logistics". Information about
          material types, material amounts, related storage location, and how
          much & where per jobsite, alongside who is removing or adding material
          is all sent to this frontend. In bringing about this intended use, I
          am testing, learning, and implementing various React features,
          libraries that build on React, Node JS, Express JS, and NPM packages
          that make database manipulation on the backend a breeze.
        </p>

        <h3 className="homepage-h3">Details</h3>
        <p className=" homepage-p">
          As of December 2025, the app is very much so a <i>work-in-progress</i>{" "}
          with current and future features subject to change. <br /> <br />
          The app's frontend is built with React and React Router, the backend
          is built with Express JS and MySQL2, and the database uses MySQL. For
          more general information and which other packages or libraries were
          used check out the project's Github{" "}
          <a
            href="https://github.com/WPompa/construction-logistics"
            target="_blank"
            rel="noopener"
          >
            repository
          </a>
          .
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Login Page</h2>
        <p className=" homepage-p">
          For now, there is a simple login page that is a placeholder for a
          future implementation of JSON Web Tokens.
        </p>

        <ShowImage
          img={login}
          alt={loginAlt}
          callback={() => dispatch({ type: "showImageOne" })}
        />

        <p className=" homepage-p">
          Currently there is no need to input a username or password. The{" "}
          <span className={state.showImageOne ? "red bold" : "bold"}>
            Login
          </span>{" "}
          has been disabled until future features are added behind the scenes.
          Simply click on{" "}
          <span className={state.showImageOne ? "green bold" : "bold"}>
            Bypass
          </span>{" "}
          to begin interacting with the app.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Dashboard Page</h2>
        <p className=" homepage-p">
          The main user experience. The dashboard has a simple interface that
          renders the data and allows additions, changes, and deletions to the
          data stored in the database. It is the part of the frontend that
          connects to a backend through API endpoints. The backend feeds the
          frontend with data queried from a database. There is much more planned
          with future features and modifications to be added over time.
        </p>

        <ShowImage
          img={dashboard}
          alt={dashboardAlt}
          callback={() => dispatch({ type: "showImageTwo" })}
        />

        <p className=" homepage-p">
          The{" "}
          <span className={state.showImageTwo ? "blue bold" : "bold"}>
            Main Buttons
          </span>{" "}
          allow a user to add, change, or delete data stored on the database.
          API endpoints handle the changes if the user submits the required info
          within a respective button. The reload button will reload data and
          display any new changes in the selected table. The{" "}
          <span className={state.showImageTwo ? "green bold" : "bold"}>
            Page Buttons
          </span>{" "}
          on the bottom right and bottom left of the blue window allow the user
          to look through pages of data. The{" "}
          <span className={state.showImageTwo ? "yellow bold" : "bold"}>
            Table Selector and Page Options
          </span>{" "}
          allow the user to choose what data to render, the current page, and
          items per page they would like to see. The{" "}
          <span className={state.showImageTwo ? "red bold" : "bold"}>
            Reset Queries
          </span>{" "}
          button is currently disabled until more functionality is introduced in
          the backend.
        </p>

        <ShowImage
          img={dashboardInput}
          alt={dashboardInputAlt}
          callback={() => dispatch({ type: "showImageThree" })}
        />

        <p className=" homepage-p">
          The{" "}
          <span className={state.showImageThree ? "green bold" : "bold"}>
            Input Field
          </span>{" "}
          is where the user fills in, at minimum, the required information
          needed to add, change, or delete data from the database. The change
          and delete forms allow for multiple simultaneous entries separated by
          commas. A message will pop up on the screen if there was an error
          during submission or while requesting a table.
        </p>
      </section>
    </div>
  );
};

const ShowImage = ({ img, alt, callback }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setShowImage(!showImage);
            callback();
          }}
        >
          {showImage ? "Hide" : "Show"} Image
        </button>
      </div>

      {showImage && (
        <div className="img-container">
          <LazyLoadImage
            src={img}
            placeholderSrc={alt}
            alt="LQPI Alt"
            effect="blur"
          />
        </div>
      )}
    </>
  );
};

export default Home;
