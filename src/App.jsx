import { useState, useEffect, useRef } from "react";
import "./App.css";
import Scene from "./components/MainKv";
import Cards from "./components/Cards"
import Menu from "./components/Menu";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

// Logo
import myLogo from './assets/timothytan_logo.png';

// Data
import { workData } from "./data/workData";
import { aboutData } from "./data/aboutData";
import { titleData } from "./data/titleData";

// Image
import timProfile from './assets/tim_profile.png';

// Components
import About from './components/About';
import Contact from './components/Contact';



function Title3D({ isMobile, scrollToWork, scrollToAbout, scrollToContact }) {

  const linkEmail = () => {
    window.location.href = 'mailto:timothy.tan.sandbox@gmail.com';
  }

  return (
    <div className="absolute top-0 left-0 h-screen w-screen" style={{ height: '100vh' }}>

      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
      <div className="about-bg">

        <Cards data={workData} title={titleData} scrollToWork={scrollToWork} />

        <About data={aboutData} profile={timProfile} title={titleData} scrollToAbout={scrollToAbout} />
      </div>
      <div className="contact">
        <div ref={scrollToContact}></div>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
          }}
          camera={{
            fov: 55,
            near: 0.1,
            far: 200,
          }}
        ><Contact title={titleData} isMobile={isMobile} />

        </Canvas>
        <div className="contact-details">
          <a href="https://www.linkedin.com/in/timothy-tan-7957b9173" target="_blank">LINKEDIN</a>
          <a target="_blank" onClick={linkEmail}>EMAIL</a>
        </div>

        <div className="footer">
          ©\ (T . T )
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <a href="./">
        <img src={myLogo} />
      </a>
    </div>
  )
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollToWork = useRef(null);
  const scrollToAbout = useRef(null);
  const scrollToContact = useRef(null);

  useEffect(() => {
    const onLoadMobile = () => {
      window.innerWidth <= 680 ? setIsMobile(true) : setIsMobile(false);
    };

    onLoadMobile();

    window.addEventListener('resize', onLoadMobile);
    return () => {
      window.removeEventListener('resize', onLoadMobile);
    }
  }, []);

  const triggerScroll = (event) => {
    let target = event.currentTarget.getAttribute("value");
    if (target === "WORKS") {
      scrollToWork.current.scrollIntoView({ behavior: 'smooth' });
    } else if (target === "ABOUT") {
      scrollToAbout.current.scrollIntoView({ behavior: 'smooth' });
    } else if (target === "CONTACT") {
      scrollToContact.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <Header />
      <Menu triggerScroll={triggerScroll} />
      <Leva
        collapsed={false}
        flat={true}
        hidden
        theme={{
          sizes: {
            titleBarHeight: "28px",
          },
          fontSizes: {
            root: "10px",
          },
        }}
      />
      <main className="font-sans">
        <Title3D isMobile={isMobile} scrollToWork={scrollToWork} scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />
      </main>
    </>
  );
}

export default App;