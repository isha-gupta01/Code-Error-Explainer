chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explainError",
    title: "Explain Error with Gemini",
    contexts: ["selection"]
  });
});
const BACKEND_URL = "http://localhost:3000"; // your running API

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "explainError" && info.selectionText) {
    const errorMessage = info.selectionText;

    try {
      const response = await fetch(`${BACKEND_URL}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ errorMessage })
      });
      const data = await response.json();

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (result) => alert("📘 Gemini Explanation:\n\n" + result),
        args: [data.explanation]
      });
    } catch (err) {
      console.error("Extension error:", err);
    }
  }
});
