import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);
  const typedRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    /* ---------------- LENIS ---------------- */
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    /* ---------------- HERO ANIMATION ---------------- */
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

    /* ---------------- SKILLS ---------------- */
    gsap.fromTo(
      "#skills li",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
        },
      }
    );

    /* ---------------- PROJECTS ---------------- */
    gsap.fromTo(
      "#projects li",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 70%",
        },
      }
    );

    /* ---------------- TYPED ---------------- */
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "React Developer",
        "Next.js Developer",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1000,
      loop: true,
    });

    /* ---------------- CLEANUP ---------------- */
    return () => {
      cancelAnimationFrame(rafId.current);
      typed.destroy();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---------------- SCROLL BUTTON ---------------- */
  const handleViewProjects = () => {
    lenisRef.current?.scrollTo("#project", {
      offset: -40,
      duration: 1.2,
    });
  };

  /* ---------------- CONTACT ---------------- */
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const contactLink = isMobile
    ? "mailto:mahajanbharat175@gmail.com"
    : "https://mail.google.com/mail/?view=cm&fs=1&to=mahajanbharat175@gmail.com";

  return (
    <div className="container">
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">👋 Hello, I’m</span>

          <h1 className="hero-title">
            Bharat <span>Mahajan</span>
          </h1>

          <p className="hero-subtitle">
            I am a <span ref={typedRef} className="typed-text"></span>
          </p>

          <div className="hero-actions">
            <button className="btn primary" onClick={handleViewProjects}>
              View Projects
            </button>

            <a
              href={contactLink}
              target={isMobile ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Contact Me
            </a>

            <a
              href="https://wa.me/918817492898"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp Me
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

      {/* ---------------- SKILLS ---------------- */}
      <section id="skils">
        <h2>Skills</h2>
        <ul>
          <li>HTML, CSS, JavaScript, Java, Python, PHP</li>
          <li>React.js, Next.js, Express.js, Laravel</li>
          <li>MySQL, MongoDB</li>
          <li>Git, GitHub, CNN, Deep Learning</li>
        </ul>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section id="project">
        <h2>Projects</h2>
        <ul>
          <li>
            <a
              href="https://crops-dieasese-detection-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Crop Disease Detection App</b> – React, Node, Python, CNN
            </a>
          </li>

          <li>
            <b>Online Table Booking System</b>
            <p className="muted">Under development</p>
          </li>

          <li>
            <b>Online Appointment Booking</b>
            <p className="muted">Under development</p>
          </li>

          <li>
            <a
              href="https://github.com/Bharat21e/laravel_feedback_Application"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Feedback Submission</b> – PHP, Laravel, MySQL
            </a>
          </li>
        </ul>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer>
        <h2>Contact</h2>
        <p>Email: mahajanbharat175@gmail.com</p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/bharat-mahajan-49aa2a245"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
