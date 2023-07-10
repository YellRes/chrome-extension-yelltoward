// 查询chrome中所有标签
export const getAllChromeTabs = async () => {
  return await chrome.tabs.query({ currentWindow: true });
};
