import { useEffect } from 'react';

export function useOutsideClick(refs, handler) {
  useEffect(() => {
    const handleClick = (event) => {
      // Проверяем, находится ли клик внутри ЛЮБОГО из переданных ref'ов
      const isInsideAny = Array.isArray(refs)
        ? refs.some(ref => ref.current && ref.current.contains(event.target))
        : refs.current && refs.current.contains(event.target);

      if (!isInsideAny) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [refs, handler]);
}