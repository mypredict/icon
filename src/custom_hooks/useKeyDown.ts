import { useEffect } from 'react';

function useKeyDown(callback: Function, keyCode: number = 13): void {
  useEffect(() => {
    const keyDown: EventListener = (e: any): void => {
      if (e.keyCode === keyCode) {
        callback();
      }
    }
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
  }, [callback, keyCode]);
}

export default useKeyDown;
