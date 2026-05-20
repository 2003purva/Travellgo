import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../style/LandingPage.css";

// 🟢 Move data OUTSIDE to prevent recreation on every render
const categories = ["Destinations", "Experiences", "Adventures"];
const sentences = [
  "Explore destinations crafted for unforgettable journeys",
  "Immerse yourself in authentic local experiences",
  "Discover adventures beyond the tourist trail",
];

const items = {
  Destinations: [
    "/LandingPage/agra.jpg", "/LandingPage/delhi.jpg", "/LandingPage/goa.jpg",
    "/LandingPage/jaipur.jpg", "/LandingPage/kashmir.jpg", "/LandingPage/manali.jpg", "/LandingPage/mumbai.jpg",
  ],
  Experiences: [
    "/LandingPage/Agra_Video.mp4", "/LandingPage/Delhi_City.mp4", "/LandingPage/goa.mp4",
    "/LandingPage/jaipur.mp4", "/LandingPage/kashmir.mp4", "/LandingPage/manali.mp4", "/LandingPage/Mumbai_City.mp4",
  ],
  Adventures: [
    "/LandingPage/jaipur-8131863_1920.jpg", "/LandingPage/dessertsafari.png", "/LandingPage/para.png",
    "/LandingPage/rivar.png", "/LandingPage/rope.png", "/LandingPage/snow.png", "/LandingPage/water.jpg",
  ],
};

// Optimized Memoized Card
const GalleryItem = memo(({ media, index }) => {
  const isVideo = media.endsWith(".mp4");
  return (
    <motion.div
      className={`image-item image-${index % 2 === 0 ? "up" : "down"}`}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
    >
      {isVideo ? (
        <video 
          src={media} autoPlay loop muted playsInline 
          preload="metadata" className="media-content" 
        />
      ) : (
        <div className="media-content" style={{ backgroundImage: `url(${media})` }} />
      )}
    </motion.div>
  );
});
GalleryItem.displayName = "GalleryItem";

function LandingPage() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="hero-title">Travel Beyond Maps</h1>
        <p className="hero-subtitle">Personalized journeys, local experiences, seamless planning</p>
        <motion.p 
          key={selected} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="hero-sentence"
        >
          {sentences[selected]}
        </motion.p>
      </motion.div>

      <div className="category-selector">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`category-dot ${selected === index ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="gallery-container">
        <motion.div
          key={selected}
          className="image-gallery"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {items[categories[selected]].map((media, index) => (
            <GalleryItem 
              key={`${categories[selected]}-${index}`} 
              media={media} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>

      <div className="cta-container">
        <motion.button
          onClick={() => navigate("/login")}
          className="btn-get-started"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}

export default LandingPage;