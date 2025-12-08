//Needs decorations and explanation on what the project is about. Mostly filler.
import { lazy, Suspense, useState } from "react";
import safetyHelmet from "../assets/helmet-safety.svg";
import cogs from "../assets/cogs.svg";
import { login, dashboard, dashboardInput } from "../assets";
import "./css/home.css";

const Home = () => {
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
        <p className="homepage-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, eius
          debitis? Nesciunt consequatur voluptatem veritatis. Aspernatur,
          repellendus beatae, eligendi eum facilis dignissimos nulla possimus
          animi, enim officia soluta recusandae amet? Fugit autem possimus in
          perspiciatis dolores nesciunt neque, architecto facilis ipsa excepturi
          eum quaerat amet molestiae repudiandae inventore ipsum obcaecati
          tempora quisquam minus? Molestias consectetur in omnis quam blanditiis
          similique!
        </p>

        <h3 className="homepage-h3">Purpose</h3>
        <p className="homepage-p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
          laudantium ipsa exercitationem, voluptatum aut ea aliquid tempora et,
          ratione odit ipsum quaerat officia quis obcaecati ad neque modi rerum!
          Consequuntur!
        </p>

        <h3 className="homepage-h3">Details</h3>
        <p className="homepage-p">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic alias
          incidunt odio earum atque sunt natus optio perspiciatis ipsa. Nostrum
          sapiente nulla optio veritatis consequatur libero odit fugit dolorem
          voluptates.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Login Page</h2>
        <p className="homepage-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et placeat
          pariatur nihil sit quaerat sunt necessitatibus provident nobis rem
          nisi incidunt at quod ut qui aperiam, deserunt iste vel veniam?
        </p>

        <ShowImage img={login} />

        <p className="homepage-p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ipsam
          nihil, laboriosam omnis explicabo amet veniam saepe vero facere quidem
          nostrum? Unde aut consequatur dicta accusantium molestiae ex libero
          iusto.
        </p>
      </section>

      <section className="homepage-section">
        <h2 className="homepage-h2">The Dashboard Page</h2>
        <p className="homepage-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et placeat
          pariatur nihil sit quaerat sunt necessitatibus provident nobis rem
          nisi incidunt at quod ut qui aperiam, deserunt iste vel veniam?
        </p>

        <ShowImage img={dashboard} />

        <p className="homepage-p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ipsam
          nihil, laboriosam omnis explicabo amet veniam saepe vero facere quidem
          nostrum? Unde aut consequatur dicta accusantium molestiae ex libero
          iusto.
        </p>

        <ShowImage img={dashboardInput} />
      </section>
    </div>
  );
};

const ShowImage = ({ img }) => {
  const [showImage, setShowImage] = useState(false);

  if (showImage) {
    return (
      <>
        <div>
          <button type="button" onClick={() => setShowImage(!showImage)}>
            toggle
          </button>
        </div>

        <div className="img-container">
          <img src={img} alt="placeholder" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <button type="button" onClick={() => setShowImage(!showImage)}>
            toggle
          </button>
        </div>
      </>
    );
  }
};

export default Home;
