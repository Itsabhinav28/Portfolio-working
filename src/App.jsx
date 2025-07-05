import React from "react";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-none">
          <About />
          <Projects />
          <Experiences />
          <Testimonial />
          <Contact />
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default App;
