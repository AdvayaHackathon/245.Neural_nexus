import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ isDarkMode }) => {
  const texts = [
    'AI-Powered Healthcare Solutions',
    'empowering patients with Next-Gen AI',
  ];
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const accentColor = isDarkMode ? 'text-indigo-300' : 'text-indigo-600';

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const delayBetweenTexts = 1500;

    const handleTyping = () => {
      const currentText = texts[currentTextIndex];

      if (!isDeleting && charIndex < currentText.length) {
        // Typing forward
        setDisplayedText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        setDisplayedText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      } else if (isDeleting && charIndex === 0) {
        // Move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentTextIndex, texts]);

  return (
    <span className={`${accentColor} inline-block`} style={{ fontSize: '0.75em' }}>
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypingAnimation;