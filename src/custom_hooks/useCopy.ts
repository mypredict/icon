import { useEffect } from 'react';

function handleCopy(content: string) {
  const input = document.createElement('input');
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

function useCopy(props: string): Function {
  useEffect(() => {
    
  }, [props]);
  
  return handleCopy;
}

export default useCopy;
