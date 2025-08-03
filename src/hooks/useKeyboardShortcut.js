import { useEffect } from 'react';
import { BLOCKED_TAGS, KEY_DOWN } from '../constants';

function useKeyboardShortcut(key = '', cb = () => {}) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === key && !BLOCKED_TAGS.includes(e.target.tagName)) {
        e.preventDefault();
        cb();
      }
    };

    window.addEventListener(KEY_DOWN, handleKeyDown);
    return () => window.removeEventListener(KEY_DOWN, handleKeyDown);
  }, [key, cb]);
}

export default useKeyboardShortcut;
