import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    /* -------- LENIS -------- */
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    /* -------- HERO TEXT -------- */
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power4.out" }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, delay: 0.3, duration: 1 }
    );

    /* -------- HERO IMAGE -------- */
    gsap.fromTo(
      ".hero-image img",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    /* -------- SKILLS -------- */
    gsap.fromTo(
      "#skils li",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: "#skils",
          start: "top 70%",
        },
      }
    );

    /* -------- PROJECTS -------- */
    gsap.fromTo(
      "#project li",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
          trigger: "#project",
          start: "top 70%",
        },
      }
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  /* -------- BUTTON SCROLL -------- */
  const handleViewProjects = () => {
    lenisRef.current?.scrollTo("#project", {
      offset: -40,
      duration: 1.2,
    });
  };

  return (
    <div className="container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">👋 Hello, I’m</span>

          <h1 className="hero-title">
            Bharat <span>Mahajan</span>
          </h1>

          <p className="hero-subtitle">
            Full-Stack Developer & Computer Science Engineer building modern,
            scalable web applications.
          </p>

          <div className="hero-actions">
            <button className="btn primary" onClick={handleViewProjects}>
              View Projects
            </button>

            <a
              href="mailto:mahajanbharat175@gmail.com"
              className="btn outline"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/ChatGPT Image Jan 4, 2026, 11_17_00 AM.png"
            alt="Bharat Mahajan"
          />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skils">
        <h2>Skills</h2>
        <ul>
          <li>HTML, JavaScript, Python, Java, PHP</li>
          <li>React.js, Next.js, Express.js, Laravel</li>
          <li>MySQL, MongoDB</li>
          <li>Git, GitHub, CNN, Deep Learning</li>
        </ul>
      </section>

      {/* PROJECTS */}
      <section id="project">
        <h2>Projects</h2>
        <ul>
          <li><b>Crop Disease Detection App</b> – React, Node, Python, CNN</li>
          <li><b>Online Table Booking System</b> – JSP, Servlet, MySQL</li>
          <li><b>Online Appointment Booking</b> – Next.js, Clerk, MySQL</li>
          <li><b>Student Information System</b> – PHP, Laravel, MySQL</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer>
        <h2>Contact</h2>
        <p>Email: mahajanbharat175@gmail.com</p>
        <p>LinkedIn: linkedin.com/in/bharat-mahajan-49aa2a245</p>
      </footer>
    </div>
  );
}

export default App;
