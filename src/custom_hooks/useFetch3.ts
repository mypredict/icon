// import { useEffect } from 'react';

const defaultOptions = {
  method: 'GET',
  headers: {
    'content-type': 'application/json'
  }
}

function useFetch3(baseUrl: string = '', options: object = {}) {
  const request = {
    get: (url: string, callback: Function) => {
      fetch(`${baseUrl}${url}`, { ...defaultOptions, ...options })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => callback(err));
    },
    post: (url: string, requestData: object, callback: Function) => {
      const newOptions = {
        ...defaultOptions,
        ...options,
        method: 'POST',
        body: JSON.stringify(requestData)
      }
      fetch(`${baseUrl}${url}`, newOptions)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => callback(err));
    }
  };

  return request;
}

export default useFetch3;
