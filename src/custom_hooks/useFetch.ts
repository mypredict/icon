import { useEffect } from 'react';

function useFetch(props: object): Array<string | object> {
  console.log(props);
  useEffect(() => {
    
  }, [props]);
  return [];
}

export default useFetch;
