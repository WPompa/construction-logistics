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
      <h1>Homepage</h1>

      <p>UNDER CONSTRUCTION</p>
      <div className="homepage-svgs">
        <img
          src={safetyHelmet}
          alt="safety helmet"
          className="helmet homepage-svg"
        />
        <img src={cogs} alt="cogs" className="cogs homepage-svg" />
      </div>

      <section className="homepage-section">
        <h2 className="homepage-h2">Welcome</h2>
        <p className="homepage-p">Thank you for visiting my project!</p>

        <h3 className="homepage-h3">Purpose</h3>
        <p className="homepage-p">
          With this project I wanted to try out different React features and as
          an end result put together a frontend I could showcase.
        </p>

        <h3 className="homepage-h3">Details</h3>
        <p className="homepage-p">
          It is a frontend client that connects to a backend through API
          endpoints. The backend end feeds the frontend with data queried from a
          database. The client can also use the API endpoints to modify the data
          stored on the database.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Login Page</h2>
        <p className="homepage-p">
          For now, there is a simple login page that is a work-in-progress for
          more complex features like authentication and JWTs. Click "Show Image"
          for a visual aid.
        </p>

        <ShowImage
          img={login}
          alt={loginAlt}
          callback={() => dispatch({ type: "showImageOne" })}
        />

        <p className="homepage-p">
          Currently there is no need to input a username or password. The{" "}
          <span className={state.showImageOne ? "red bold" : "bold"}>
            Login
          </span>{" "}
          has been disabled while more complex features are added behind the
          scenes. For now simply click on{" "}
          <span className={state.showImageOne ? "green bold" : "bold"}>
            Bypass
          </span>{" "}
          to begin interacting with the app.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Dashboard Page</h2>
        <p className="homepage-p">
          The main user experience. Data is retrieved by the backend and sent to
          the dashboard. For the time being, the dashboard has a simple
          interface that renders the data and allows additions, changes, and
          deletions to the data stored in the database. It is very much a
          work-in-progress with future features and modifications.
        </p>

        <ShowImage
          img={dashboard}
          alt={dashboardAlt}
          callback={() => dispatch({ type: "showImageTwo" })}
        />

        <p className="homepage-p">
          The{" "}
          <span className={state.showImageTwo ? "blue bold" : "bold"}>
            Main Buttons
          </span>{" "}
          allow a user to add, change, or delete data stored on the database.
          API endpoints handle the changes if the user submits the required info
          with a respective button. The reload button will fetch more current
          data and display any new changes in a selected table. The{" "}
          <span className={state.showImageTwo ? "green bold" : "bold"}>
            Page Buttons
          </span>{" "}
          on the bottom right and left of the blue screen allow the user to look
          through pages of data. The{" "}
          <span className={state.showImageTwo ? "yellow bold" : "bold"}>
            Table Selector and Page Options
          </span>{" "}
          allow the user to choose what data to render, the page, and items per
          page they would like to see. The{" "}
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

        <p className="homepage-p">
          The{" "}
          <span className={state.showImageThree ? "green bold" : "bold"}>
            Input Field
          </span>{" "}
          is where the user fills in at minimum the required information needed
          to add, change, or delete date from the database. The change and
          delete forms allow for multiple simultaneous entries separated by
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
