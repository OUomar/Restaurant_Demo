import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
}
