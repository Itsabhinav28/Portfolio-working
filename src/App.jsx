import React, { useState, useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Achievements from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import PortfolioLoader from "./components/portfolio-loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - you can adjust this or remove it for instant loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Show loader for 5 seconds for testing

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PortfolioLoader />;
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-none">
          <About />
          <Projects />
          <Experiences />
          <Achievements />
          <Contact />
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default App;
