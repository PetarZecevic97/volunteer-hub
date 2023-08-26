import vbatocaninAvatar from "../../images/vbatocanin-avatar.jpg";
import AleksandraRuzicAvatar from "../../images/AleksandraRuzic-avatar.jpg";
import PetarZecevicAvatar from "../../images/PetarZecevic-avatar.png";
import backspacer303Avatar from "../../images/backspacer303-avatar.jpg";

interface Creator {
  username: string;
  name: string;
  avatar: string;
  title: string;
  firm: string;
  description: string;
}

const creatorsData: Creator[] = [
  {
    username: "AleksandraRuzic",
    name: "Aleksandra Ruzic",
    title: "Software Developer",
    avatar: AleksandraRuzicAvatar,
    firm: "Qualtrics",
    description:
      "Hello! I'm informatics graduate in search for new challenges. One of such past challenges was participating in the SYM-OP-IS 2020 symposium with a research paper about an original cluster method. I have worked as Junior Business Intelligence developer. Programming languages I'm comfortable with are Python, Java, C and SQL while the programming language that I'm familiar with are JavaScript, C++ and Haskell. I've got a CAE (Cambridge Advanced English) certificate. I am quite interested in machine learning, data science, math and web development. ",
  },
  {
    username: "PetarZecevic97",
    name: "Petar Zecevic",
    avatar: PetarZecevicAvatar,
    title: "Software Developer",
    firm: "Tenderly",
    description:
      "Greetings! I proudly serve as a software engineer at Zühlke Group, contributing to cutting-edge solutions. Concurrently, I'm a Computer Science master's student at the University of Belgrade. My achievements include presenting a clustering method research paper at SYM-OP-IS 2020. I'm well-versed in languages like C, C++, Python, Java, and JavaScript, and skilled in tools like git, LaTeX, Visual Studio, IntelliJ IDEA, and MySQL Workbench. Holding a CAE certificate underscores my English proficiency. I'm passionate about Machine Learning, Game Development, and Web Programming. Explore my work on GitHub: PetarZecevic97.",
  },
  {
    username: "vbatocanin",
    name: "Vladimir Batocanin",
    avatar: vbatocaninAvatar,
    title: "Fullstack Engineer",
    firm: "EnergySage",
    description:
      "Dedicated Computer Scientist at heart, I stand as an accomplished Software Engineer with an unyielding passion for the intricacies of science. Equipped with a master's degree in Computer Science and a track record that spans EnergySage, Schneider Electric Hub, and beyond, my career is a testament to my commitment to intellectual exploration. Proficient in mathematics and deeply rooted in scientific principles, I approach each coding endeavor with precision and depth. Beyond programming languages, I embody the essence of Computer Science in every innovation.. ",
  },
  {
    username: "backspacer303",
    name: "Nikola Peric",
    avatar: backspacer303Avatar,
    title: "Compiler Engineer",
    firm: "FIS",
    description:
      "Nikola Peric is a math major and precision-driven mind. Currently crafting compiler tools at FIS, his meticulous nature and devotion to detail shine through. Nikola's fusion of mathematics and coding expertise results in flawlessly crafted solutions that embody his pursuit of perfection.",
  },
];

export default creatorsData;
