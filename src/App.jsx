import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import IndiviEvent from "./pages/IndiviEvent";
//animations
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register ScrollTrigger plugin
gsap.registerPlugin(TextPlugin, ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smooth: true, // Enable smooth scrolling
    });

    // Update Lenis on each frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    //scroling to top
    window.scrollTo(0, 0);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
    });
    //loading screen
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 2800); // Slightly longer to ensure glitch effect is visible
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Loader className={!loading ? "loaderHidden" : ""} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events/:id" element={<IndiviEvent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
