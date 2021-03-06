import { useState, useEffect } from 'react';
import { Response } from '../interface';

type Method = 'GET' | 'POST';

function useFetch(url: string, method: Method = 'GET', postData?: object | null): Response {
  const [response, setResponse]: [Response, Function] = useState({ state: 'error', result: 'unFetch' });
  
  useEffect(() => {
    if (url && method === 'GET') {
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then((data: Response) => {
          setResponse(data);
        })
        .catch(error => {
          setResponse({ state: 'error', result: error });
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
          setResponse(data);
        })
        .catch(error => {
          setResponse({ state: 'error', result: error });
        })
    }
  }, [url, method, postData]);

  return response;
}

export default useFetch;
