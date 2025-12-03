//Needs decorations and explanation on what the project is about. Mostly filler.
import safetyHelmet from "../assets/helmet-safety.svg";
import cogs from "../assets/cogs.svg";
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        rerum, commodi cumque debitis dolore ipsam dolorum cupiditate
        exercitationem modi fugit dolores alias corporis libero ut, provident
        distinctio quod. Sit, quaerat!
      </p>
      <div className="img-container">
        <img src="null" alt="placeholder" />
      </div>

      <div className="img-container">
        <img src="null" alt="placeholder" />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        magnam, atque unde porro consequatur ipsa hic? In ipsum eveniet sequi,
        omnis libero ad tenetur, officiis magnam minima nostrum maiores aliquid.
        Ipsum, architecto perferendis? Minus ipsam molestiae, inventore enim
        dicta quae aspernatur at, id autem nihil laborum? Esse voluptatibus
        accusantium dolores, quis in quam explicabo deleniti. Omnis eius aliquam
        dolor deserunt?
      </p>
      <div className="img-container">
        <img src="null" alt="placeholder" />
      </div>
    </div>
  );
};

export default Home;
