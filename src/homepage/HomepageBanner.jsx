import { useState, useEffect } from 'react';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';
import carousel3 from '../assets/carousel3.jpg';

export function HomepageBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Example carousel images - replace with your kung fu images
  const carouselImages = [carousel1, carousel2, carousel3];

  // Auto-scroll carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % carouselImages.length
        ),
      3000
    );

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section id="home" className="pt-16">
      <div className="relative h-[600px] overflow-hidden">
        {/* Carousel Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Kung Fu ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Banner Overlay Text */}
        <div className="absolute inset-0 bg-[url(/assets/carousel1.jpg)] bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">
              Master the Art of Kung Fu
            </h2>
            <p className="text-2xl mb-8">Discipline • Strength • Harmony</p>
            <button className="bg-red-900 hover:bg-red-800 text-white px-8 py-4 rounded-lg text-xl font-semibold transition">
              Start Your Journey
            </button>
          </div>
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
