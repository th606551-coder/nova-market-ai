
(function () {
  "use strict";

  const KEY = "__NOVA_MARKET_AI_PHASE2__";

  if (window[KEY]) {
    window[KEY].toggle();
    return;
  }

  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; }
    .robot {
      position: fixed; right: 16px; bottom: 20px;
      width: 60px; height: 60px; border-radius: 50%;
      border: 1px solid #5edbff; background: #07366a;
      color: white; font-size: 24px; font-weight: 900;
      box-shadow: 0 0 25px #078dff80;
      z-index: 2147483647; cursor: pointer;
    }
    .panel {
      position: fixed; z-index: 2147483647;
      right: 12px; bottom: 92px;
      width: min(370px, calc(100vw - 24px));
      max-height: calc(100dvh - 115px); overflow: auto;
      padding: 17px; border-radius: 18px;
      color: #eef7ff; background: #071426;
      border: 1px solid #1d9fff;
      box-shadow: 0 0 30px #078dff55;
      font: 14px system-ui, sans-serif;
    }
    .hidden { display: none; }
    h3 { margin: 0 0 5px; color: #61dfff; }
    .sub { color: #91a9c5; font-size: 11px; }
    label { display: block; margin-top: 15px; color: #91caff; }
    input, select {
      width: 100%; padding: 11px; margin-top: 6px;
      color: white; background: #10243b;
      border: 1px solid #315273; border-radius: 9px;
    }
    button { cursor: pointer; }
    .scan {
      width: 100%; margin-top: 15px; padding: 13px;
      color: white; font-weight: 800;
      border: 0; border-radius: 10px;
      background: linear-gradient(100deg,#1268ec,#06b5d0);
    }
    .result {
      margin-top: 13px; padding: 13px;
      border: 1px solid #234466; border-radius: 12px;
      background: #0b1b2e; overflow-wrap: anywhere;
    }
    .signal { font-size: 23px; font-weight: 900; }
    .info { margin-top: 8px; color: #b5c9df; line-height: 1.5; font-size: 12px; }
    .close { float: right; background: #152c45; color: white; border: 0; padding: 7px 11px; border-radius: 7px; }
    .warning { color: #ffc76b; font-size: 10px; margin-top: 13px; }
  `;
  root.appendChild(style);

  const robot = document.createElement("button");
  robot.className = "robot";
  robot.textContent = "N";
  robot.setAttribute("aria-label", "Open NOVA MARKET AI");

  const panel = document.createElement("section");
  panel.className = "panel hidden";
  panel.innerHTML = `
    <button class="close">✕</button>
    <h3>NOVA MARKET AI</h3>
    <div class="sub">QUOTEX CHART ASSISTANT · MANUAL MODE</div>

    <label for="nova-asset">Asset / Chart</label>
    <input id="nova-asset" placeholder="Example: EUR/USD OTC">

    <label for="nova-tf">Chart timeframe</label>
    <select id="nova-tf">
      <option>1 minute</option>
      <option>5 minutes</option>
      <option>15 minutes</option>
      <option>Other / Unknown</option>
    </select>

    <button class="scan">▶ START SCAN</button>

    <div class="result" aria-live="polite">
      <div class="signal">READY</div>
      <div class="info">Open your chart, then press START SCAN.</div>
    </div>

    <div class="warning">
      Analysis only · Auto-trading OFF · No verified candle feed connected.
    </div>
  `;

  root.append(robot, panel);

  const result = panel.querySelector(".result");
  const scanButton = panel.querySelector(".scan");

  function toggle() {
    const opening = panel.classList.contains("hidden");
    panel.classList.toggle("hidden", !opening);
    robot.classList.toggle("hidden", opening);
  }

  robot.addEventListener("click", toggle);
  panel.querySelector(".close").addEventListener("click", toggle);

  scanButton.addEventListener("click", function () {
    scanButton.disabled = true;
    scanButton.textContent = "CHECKING CHART...";

    result.replaceChildren();

    const heading = document.createElement("div");
    heading.className = "signal";
    heading.textContent = "SCANNING";

    const message = document.createElement("div");
    message.className = "info";
    message.textContent =
      "Checking page visibility. This does not yet read verified candle data.";

    result.append(heading, message);

    setTimeout(function () {
      const text = document.body.innerText || "";
      const chartVisible =
        /\b(chart|candlestick|candle|price|OTC)\b/i.test(text);

      heading.textContent = "WAIT";

      message.textContent = chartVisible
        ? "Chart-related text was found, but verified OHLC candle data is not connected. No UP/DOWN prediction can be justified yet."
        : "Readable chart information was not found. The chart may be rendered inside a canvas or protected component.";

      const stamp = document.createElement("div");
      stamp.className = "info";
      stamp.textContent =
        "Asset: " +
        (panel.querySelector("#nova-asset").value.trim() || "Unspecified") +
        " · Scanned: " + new Date().toLocaleTimeString();

      result.appendChild(stamp);
      scanButton.disabled = false;
      scanButton.textContent = "↻ SCAN AGAIN";
    }, 500);
  });

  window[KEY] = {
    toggle,
    open: () => {
      panel.classList.remove("hidden");
      robot.classList.add("hidden");
    },
    destroy: () => {
      host.remove();
      delete window[KEY];
    }
  };
})();
