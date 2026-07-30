import Hero from '../components/Hero.jsx';
import FeatureBar from '../components/FeatureBar.jsx';
import Services from '../components/Services.jsx';
import Destinations from '../components/Destinations.jsx';
import About from '../components/About.jsx';
import Packages from '../components/Packages.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Partners from '../components/Partners.jsx';

export default function Home() {
  return (
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
  );
}
