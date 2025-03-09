import { Trophy, Users, Medal, Target, Calendar, MapPin } from "lucide-react";
import { useRef, useEffect } from "react";
import styles from "../styles/About.module.css";
import logo from "../assets/cec_logo_300.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin for animaiton
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  //ANIMATION START
  const textRef = useRef(null); // Ref for the text animation

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    // Split the text into letters and wrap each letter in a <span>
    const text = textRef.current;
    const letters = text.innerText.split("");
    text.innerHTML = letters
      .map(
        (letter, index) =>
          `<span key=${index} style="opacity: 0;" class="animated-letter">${letter}</span>`
      )
      .join("");

    // Create the scroll-based staggered animation
    gsap.to(text.querySelectorAll(".animated-letter"), {
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: text,
        start: "top 95%",
        end: "top 50%",
        scrub: !isMobile,
      },
    });
  }, []);
  //ANIMATION END

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee} data-aos="slide-left">
          <span>
            About Campeon • About Campeon • About Campeon • About Campeon •
            About Campeon • About Campeon • About Campeon • About Campeon •
            About Campeon • About Campeon • About Campeon • About Campeon •
            About Campeon • About Campeon • About Campeon • About Campeon •
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <h1 ref={textRef} className={styles.title}>
          About CAMPION
        </h1>
        <div className={styles.innercontent}>
          <div className={styles.highlightSection}>
            <p className={styles.cardText}>
              CAMPEON is Kerala's premier inter-college sports tournament,
              bringing together athletic talent from across the state in a
              celebration of sportsmanship, competition, and excellence. This
              highly anticipated event serves as a platform for students to
              showcase their skills, foster teamwork, and build lifelong
              connections through the spirit of sports. With a diverse lineup of
              events, including County Cricket, 7's Football, Table Tennis, and
              Volleyball, CAMPEON provides an electrifying atmosphere where
              colleges compete for ultimate glory. The tournament is not just
              about winning—it’s about pushing limits, embracing challenges, and
              creating unforgettable moments on and off the field.
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Colleges</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>6</div>
                <div className={styles.statLabel}>Sports</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>400+</div>
                <div className={styles.statLabel}>Athletes</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>39K+</div>
                <div className={styles.statLabel}>Prize Pool</div>
              </div>
            </div>
          </div>

          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Trophy className={styles.cardIcon} size={32} />
            <h3 className={styles.cardTitle}>Excellence</h3>
            <p className={styles.cardText}>
              Showcasing the highest level of collegiate sports competition with
              state-of-the-art facilities and professional organization.
            </p>
          </div>

          <div className={styles.card}>
            <Users className={styles.cardIcon} size={32} />
            <h3 className={styles.cardTitle}>Community</h3>
            <p className={styles.cardText}>
              Building lasting connections between colleges and athletes,
              fostering a spirit of healthy competition and camaraderie.
            </p>
          </div>

          <div className={styles.card}>
            <Medal className={styles.cardIcon} size={32} />
            <h3 className={styles.cardTitle}>Achievement</h3>
            <p className={styles.cardText}>
              Recognizing and rewarding outstanding athletic performance across
              multiple sports disciplines.
            </p>
          </div>

          <div className={styles.card}>
            <Target className={styles.cardIcon} size={32} />
            <h3 className={styles.cardTitle}>Vision</h3>
            <p className={styles.cardText}>
              Becoming the benchmark for collegiate sports events in India,
              inspiring the next generation of athletes.
            </p>
          </div>
          <div className={styles.card}>
            <MapPin className={styles.cardIcon} size={32} />
            <h3 className={styles.cardTitle}>Venue</h3>
            <p className={styles.cardText}>
              Hosted at world-class facilities across Kerala, providing the
              perfect stage for exceptional sporting moments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
