import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const BackToTopButton: React.FC = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  // Show the button when the user scrolls down
  const handleScroll = () => {
    console.log('srolling')
    if (window.scrollY > 300) {
      setIsDisplayed(true);
    } else {
      setIsDisplayed(false);
    }
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
   

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top of the page when the button is clicked
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed right-6 bottom-6 z-50 bg-blue-500 p-2 rounded-full ${
        isDisplayed ? "visible" : "invisible"
      }`}
      onClick={handleBackToTop}
    >
      <ChevronUpIcon className="h-6 w-6 text-white" />
    </button>
  );
};

export default BackToTopButton;
