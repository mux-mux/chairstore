import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, onClose]);
};

export default useClickOutside;
