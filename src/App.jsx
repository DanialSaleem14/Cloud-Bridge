import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeatureBar from './components/FeatureBar.jsx';
import Services from './components/Services.jsx';
import Destinations from './components/Destinations.jsx';
import About from './components/About.jsx';
import Packages from './components/Packages.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Testimonials from './components/Testimonials.jsx';
import Partners from './components/Partners.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <Services />
        <Destinations />
        <About />
        <Packages />
        <WhyChooseUs />
        <Testimonials />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
