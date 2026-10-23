(function () {
  "use strict";
  const launch = document.getElementById("openAssistant");
  if (launch) launch.addEventListener("click", function () {
    const api = window.__NOVA_MARKET_AI_PHASE1__;
    if (api) api.open();
  });
})(); 
