import { useEffect, useRef } from 'react';

function useUserScroll(callback) {
  const isUserInitiated = useRef(false);

  useEffect(() => {
    const handleWheel = () => (isUserInitiated.current = true);
    const handleTouchMove = () => (isUserInitiated.current = true);
    const handleMouseDown = () => (isUserInitiated.current = true);
    const handleKeyDown = (e) => {
      // Стрелки, PageUp/Down, Home/End могут вызывать скролл
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
        isUserInitiated.current = true;
      }
    };

    const handleScroll = () => {
      if (isUserInitiated.current) {
        callback(); // Только если скролл от пользователя
        isUserInitiated.current = false; // Сброс после обработки
      }
      // Если флаг не установлен — игнорируем (программный скролл)
    };

    // Слушаем "триггеры" пользовательского скролла
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Слушаем сам scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
}