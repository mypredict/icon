// import { useEffect } from 'react';

interface Message {
  [key: string]: string
}

function useUpload() {
  const request = (
    message: Message,
    file: File,
    successCallback: Function,
    errorCallback: Function
  ) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    for (let item in message) {
      formData.append(item, message[item]);
    }
    formData.append('file', file);
    xhr.open('POST', '/uploadFiles');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (JSON.parse(xhr.responseText).state === 'success') {
          successCallback(100, JSON.parse(xhr.responseText).result);
        } else {
          errorCallback(JSON.parse(xhr.responseText));
        }
      }
    }
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        successCallback(percentComplete);
      }
    }
    xhr.send(formData);
  }
  return request;
}

export default useUpload;
