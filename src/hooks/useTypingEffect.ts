import {useEffect, useState} from "react";

export const useTypingEffect = (
  texts: string[],
  speed: number = 100,
  startDelay: number = 500,
  deleteSpeed: number = 50,
  pauseDuration: number = 2000
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentText.length) {
        // Печатаем текст
        setDisplayedText(currentText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        setIsComplete(false);
      } else if (!isDeleting && currentIndex === currentText.length) {
        // Текст напечатан полностью, пауза перед удалением
        setIsComplete(true);
        setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else if (isDeleting && currentIndex > 0) {
        // Удаляем текст
        setCurrentIndex(currentIndex - 1);
        setDisplayedText(currentText.slice(0, currentIndex - 1));
        setIsComplete(false);
      } else if (isDeleting && currentIndex === 0) {
        // Текст удален, переходим к следующему
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, currentIndex === 0 && !isDeleting ? startDelay : (isDeleting ? deleteSpeed : speed));

    return () => clearTimeout(timeout);
  }, [texts, currentTextIndex, currentIndex, isDeleting, speed, startDelay, deleteSpeed, pauseDuration]);

  return { displayedText, isComplete };
};

