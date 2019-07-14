type Unit = 'Byte' | 'KB' | 'MB' | 'GB' | 'TB';

function autoUnit(size: number, unit?: Unit): string {
  if (unit) {
    switch (unit) {
      case 'Byte':
        return `${size}Byte`;
      case 'KB':
        return `${(size / 2 ** 10).toFixed(2)}KB`;
      case 'MB':
        return `${(size / 2 ** 20).toFixed(2)}MB`;
      case 'GB':
        return `${(size / 2 ** 30).toFixed(2)}GB`;
      default:
        return `${(size / 2 ** 40).toFixed(2)}TB`;
    }
  }
  if (size < 2 ** 10) {
    return `${size}Byte`;
  }
  if (size < 2 ** 20) {
    return `${(size / 2 ** 10).toFixed(2)}KB`;
  }
  if (size < 2 ** 30) {
    return `${(size / 2 ** 20).toFixed(2)}MB`;
  }
  if (size < 2 ** 40) {
    return `${(size / 2 ** 30).toFixed(2)}GB`;
  }
  return `${(size / 2 ** 40).toFixed(2)}TB`;
}

function useFileSize(): Function {
  return autoUnit;
}

export default useFileSize;
