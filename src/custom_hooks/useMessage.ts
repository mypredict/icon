interface Message {
  tooltip: Function
}

function useMessage(): Message {
  function tooltip(title: string, icon = '', rootStyle = {}, iconStyle = {}): void {
    alert(title);
  }

  return {
    tooltip
  };
}

export default useMessage;
