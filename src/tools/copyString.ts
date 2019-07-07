function copyString(content: string): void {
  const input = document.createElement('input');
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export default copyString;
