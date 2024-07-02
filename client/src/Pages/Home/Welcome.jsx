import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/Appassests/bg-video.mp4";

const Welcome = () => {
  const [introText, setIntroText] = useState("");
  const introMessages = [
    "Connect with friends and share your thoughts.",
    "Discover new content and ideas.",
    "Join a community of like-minded individuals.",
    "Experience social networking like never before!",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    let typingEffectInterval = null;
    let timeoutId = null;

    const typeMessage = () => {
      if (introText === introMessages[currentMessageIndex]) {
        // If current message is fully typed, wait for 2 seconds before moving to the next
        timeoutId = setTimeout(() => {
          setCurrentMessageIndex(
            (prevIndex) => (prevIndex + 1) % introMessages.length
          );
        }, 2000);
      } else if (introText.length < introMessages[currentMessageIndex].length) {
        // If message is being typed, continue typing
        setIntroText((prevText) =>
          introMessages[currentMessageIndex].substring(0, prevText.length + 1)
        );
      } else {
        // If all messages are typed, clear intervals and timeouts
        clearInterval(typingEffectInterval);
        clearTimeout(timeoutId);
      }
    };

    // Start typing effect
    typingEffectInterval = setInterval(typeMessage, 100); // Typing speed

    return () => {
      clearInterval(typingEffectInterval);
      clearTimeout(timeoutId);
    };
  }, [introText, currentMessageIndex, introMessages]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-60 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-sky-400 mt-[-300px]">
          Welcome to G0verse
        </h1>
        <div className="mb-16 text-white">
          <p className="text-2xl mb-6 max-w-4xl mx-auto">{introText}</p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="absolute bottom-4 text-white text-sm text-center w-full">
          <p>© 2024 G0verse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
