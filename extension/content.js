chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "EXPLAIN_ERROR") {
    const explanation = msg.explanation || "No explanation available.";
    alert("📘 Gemini Explanation:\n\n" + explanation);
  }
});
