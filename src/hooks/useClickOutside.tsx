import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClose: (() => void) | Dispatch<SetStateAction<boolean>>,
  ignoreRef?: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !(ignoreRef?.current && ignoreRef.current.contains(e.target as Node))
      ) {
        if (typeof onClose === 'function') {
          (onClose as Dispatch<SetStateAction<boolean>>)(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, onClose, ignoreRef]);
};

export default useClickOutside;
