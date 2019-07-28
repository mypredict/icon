import { useEffect } from 'react';

type Method = 'GET' | 'POST';

function useFetch2(
  callback: Function,
  url: string,
  method: Method = 'GET',
  postData?: object | null) {
  
  useEffect(() => {
    if (url && method === 'GET') {
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then((data: Response) => {
          callback(data);
        })
        .catch(error => {
          callback({ state: 'error', result: error });
        });
    }
    if (url && method === 'POST' && postData) {
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then((data: Response) => {
          callback(data);
        })
        .catch(error => {
          callback({ state: 'error', result: error });
        })
    }
  }, [callback, url, method, postData]);
}

export default useFetch2;
