function handleCopy(content: string) {
  const ele = document.createElement('textarea');
  ele.value = content;
  document.body.appendChild(ele);
  ele.select();
  document.execCommand('copy');
  document.body.removeChild(ele);
}

function useCopy(): Function {
  return handleCopy;
}

export default useCopy;
