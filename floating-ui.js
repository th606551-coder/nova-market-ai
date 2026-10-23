(function () {
  "use strict";
  const GLOBAL_KEY = "__NOVA_MARKET_AI_PHASE1__";
  if (window[GLOBAL_KEY]) {
    window[GLOBAL_KEY].toggle();
    return;
  }

  const css = `
    :host{all:initial;color-scheme:dark;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
    *{box-sizing:border-box}
    .launcher{position:fixed;right:18px;bottom:22px;z-index:2147483646;width:62px;height:62px;border:1px solid #5edbff;border-radius:50%;background:radial-gradient(circle at 35% 25%,#2b9dff,#07162d 70%);box-shadow:0 0 0 4px #168aff24,0 0 28px #078dff70;color:white;cursor:pointer;display:grid;place-items:center}
    .launcher .n{font-size:26px;font-weight:950;text-shadow:0 0 13px #36dfff}
    .launcher .dot{position:absolute;right:2px;top:2px;width:12px;height:12px;border:2px solid #071426;background:#32e6a1;border-radius:50%}
    .panel{position:fixed;right:18px;bottom:96px;z-index:2147483647;width:min(370px,calc(100vw - 24px));height:min(590px,calc(100dvh - 125px));min-height:390px;display:flex;flex-direction:column;overflow:hidden;border:1px solid #1d9fff80;border-radius:20px;background:linear-gradient(150deg,#0d2038,#050c18 70%);box-shadow:0 20px 70px #000b,0 0 30px #078dff30;color:#f4f8ff}
    .hidden{display:none!important}
    .head{display:flex;align-items:center;gap:10px;padding:14px;border-bottom:1px solid #6daaff24;background:#0a1729;cursor:move;touch-action:none}
    .mark{width:37px;height:37px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#1c9dff,#061326);border:1px solid #45d5ff;color:white;font-size:20px;font-weight:900;box-shadow:0 0 18px #078dff55;flex:none}
    .brand{font-size:12px;font-weight:850;letter-spacing:.1em}.sub{font-size:10px;color:#8ba8c8;margin-top:4px}
    .spacer{flex:1}.iconbtn{border:1px solid #234466;background:#0c1c30;color:#c8e4ff;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:17px}
    .body{padding:14px;overflow:auto;flex:1}.welcome{padding:14px;border:1px solid #187bdc55;border-radius:14px;background:linear-gradient(130deg,#0b2a4a,#0b1728);margin-bottom:12px}
    .welcome h3{margin:0 0 7px;font-size:15px}.welcome p{margin:0;color:#a8bfd9;font-size:11px;line-height:1.6}
    .status{display:flex;align-items:center;gap:7px;font-size:10px;color:#ffc76b;margin:12px 0}.status i{width:6px;height:6px;border-radius:50%;background:#ffb443}
    .quick{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}
    .quick button{border:1px solid #1b568a;background:#0a1b30;color:#d9edff;border-radius:10px;padding:10px 8px;font-size:11px;cursor:pointer}
    .quick button:hover{border-color:#25cfff;background:#0d2742}
    .messages{display:flex;flex-direction:column;gap:8px;margin:12px 0}
    .msg{max-width:94%;padding:10px 11px;border-radius:12px;background:#0d2035;border:1px solid #204466;color:#d6e7f8;font-size:12px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}
    .msg.user{align-self:flex-end;background:#10396b;border-color:#1677ff;color:#fff}
    .compose{display:flex;gap:7px;padding:12px;border-top:1px solid #6daaff24;background:#081322}
    .compose input{min-width:0;flex:1;background:#0c1d31;border:1px solid #234466;border-radius:10px;padding:11px;color:#fff;font-size:12px;outline:none}
    .compose input:focus{border-color:#19baff}.send{border:0;border-radius:10px;background:linear-gradient(120deg,#1677ff,#0bbfdf);color:white;font-weight:800;padding:0 13px;cursor:pointer}
    .tiny{font-size:9px;color:#6f8aa8;padding:0 13px 10px;background:#081322}
    @media(max-width:480px){.panel{right:8px;bottom:82px;width:calc(100vw - 16px);height:min(590px,calc(100dvh - 100px));border-radius:17px}.launcher{right:13px;bottom:13px;width:56px;height:56px}}
  `;

  const host = document.createElement("div");
  host.id = "nova-market-ai-host";
  host.style.all = "initial";
  (document.body || document.documentElement).appendChild(host);
  const root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  const style = document.createElement("style"); style.textContent = css; root.appendChild(style);
  const launcher = document.createElement("button");
  launcher.className = "launcher"; launcher.type = "button"; launcher.setAttribute("aria-label","Open NOVA MARKET AI");
  launcher.innerHTML = '<span class="n">N</span><span class="dot"></span>';
  const panel = document.createElement("section");
  panel.className = "panel hidden"; panel.setAttribute("role","dialog"); panel.setAttribute("aria-label","NOVA MARKET AI assistant");
  panel.innerHTML = `
    <header class="head">
      <div class="mark">N</div><div><div class="brand">NOVA MARKET AI</div><div class="sub">TALK TO THE MARKET · PHASE 1</div></div>
      <div class="spacer"></div><button class="iconbtn minimize" aria-label="Minimize">−</button><button class="iconbtn close" aria-label="Close">×</button>
    </header>
    <div class="body">
      <div class="welcome"><h3>Your market companion.</h3><p>Ask a question or explore the interface. Live market data and validated signals are not connected yet.</p></div>
      <div class="status"><i></i><span>DEMO MODE · NO LIVE MARKET FEED</span></div>
      <div class="quick"><button data-prompt="Explain RSI in simple Bengali">Explain RSI</button><button data-prompt="What is multi-timeframe analysis?">Multi-timeframe</button><button data-prompt="Explain support and resistance">Support / Resistance</button><button data-prompt="What does WAIT mean in trading analysis?">UP / DOWN / WAIT</button></div>
      <div class="messages" aria-live="polite"><div class="msg">Hi! আমি NOVA। এই Phase-এ UI ও chat interaction পরীক্ষা করা যাচ্ছে। বাস্তব market data সংযুক্ত নয়, তাই আমি live signal দেব না।</div></div>
    </div>
    <form class="compose"><input aria-label="Message" placeholder="Ask NOVA something…" autocomplete="off"><button class="send" type="submit">Send</button></form>
    <div class="tiny">Analysis assistant only · Auto-trading OFF</div>`;
  root.appendChild(launcher); root.appendChild(panel);

  const body = panel.querySelector(".body");
  const messages = panel.querySelector(".messages");
  const input = panel.querySelector("input");
  function showPanel(show) { panel.classList.toggle("hidden", !show); launcher.classList.toggle("hidden", show); }
  function addMessage(text, who) {
    const el = document.createElement("div"); el.className = "msg" + (who === "user" ? " user" : "");
    el.textContent = text; messages.appendChild(el); body.scrollTop = body.scrollHeight;
  }
  function localReply(text) {
    const t = text.toLowerCase();
    if (t.includes("rsi")) return "RSI হলো momentum indicator। সাধারণভাবে 70-এর ওপরে overbought এবং 30-এর নিচে oversold হিসেবে দেখা হয়, তবে একে একা buy/sell signal ধরা উচিত নয়।";
    if (t.includes("support") || t.includes("resistance")) return "Support হলো এমন price area যেখানে buying interest দেখা যেতে পারে; resistance হলো এমন area যেখানে selling pressure আসতে পারে। এগুলো নিশ্চিত price barrier নয়।";
    if (t.includes("multi") || t.includes("timeframe")) return "Multi-timeframe analysis-এ বড় timeframe-এর trend এবং ছোট timeframe-এর setup একসঙ্গে দেখা হয়। এই demo-তে live candles নেই, তাই কোনো বর্তমান market conclusion দেওয়া হচ্ছে না।";
    if (t.includes("wait") || t.includes("signal") || t.includes("up") || t.includes("down")) return "WAIT মানে পর্যাপ্ত, যাচাইকৃত evidence না থাকলে trade setup না নেওয়া। এই Phase-এ live data নেই, তাই কোনো বাস্তব UP/DOWN signal তৈরি করা হচ্ছে না।";
    return "আমি এখন Phase 1 demo mode-এ আছি। এই প্রশ্নের live market-specific উত্তর দিতে পরবর্তী Phase-এ secure AI backend ও verified market data যুক্ত করতে হবে। তুমি indicator বা trading concept সম্পর্কে সাধারণ প্রশ্ন করতে পারো।";
  }
  launcher.addEventListener("click", () => showPanel(true));
  panel.querySelector(".close").addEventListener("click", () => { showPanel(false); });
  panel.querySelector(".minimize").addEventListener("click", () => showPanel(false));
  panel.querySelectorAll("[data-prompt]").forEach(b => b.addEventListener("click", () => {
    const text = b.getAttribute("data-prompt"); addMessage(text,"user"); addMessage(localReply(text),"bot");
  }));
  panel.querySelector(".compose").addEventListener("submit", e => {
    e.preventDefault(); const text = input.value.trim(); if (!text) return;
    addMessage(text,"user"); input.value = ""; addMessage(localReply(text),"bot");
  });

  // Drag by the header; keep the panel inside the visible viewport.
  const header = panel.querySelector(".head");
  let dragging = false, startX = 0, startY = 0, originRight = 18, originBottom = 96;
  header.addEventListener("pointerdown", e => {
    if (e.target.closest("button")) return;
    dragging = true; startX = e.clientX; startY = e.clientY;
    const rect = panel.getBoundingClientRect();
    originRight = window.innerWidth - rect.right; originBottom = window.innerHeight - rect.bottom;
    header.setPointerCapture?.(e.pointerId);
  });
  header.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    const right = Math.max(4, Math.min(window.innerWidth - 100, originRight - dx));
    const bottom = Math.max(4, Math.min(window.innerHeight - 100, originBottom - dy));
    panel.style.right = right + "px"; panel.style.bottom = bottom + "px";
    launcher.style.right = Math.max(4, Math.min(window.innerWidth - 70, right)) + "px";
    launcher.style.bottom = Math.max(4, Math.min(window.innerHeight - 70, bottom - 74)) + "px";
  });
  const stopDrag = () => { dragging = false; };
  header.addEventListener("pointerup", stopDrag); header.addEventListener("pointercancel", stopDrag);

  // Optional browser speech recognition; unsupported browsers keep text chat.
  let recognition = null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const voiceBtn = document.createElement("button");
    voiceBtn.className = "iconbtn"; voiceBtn.type = "button"; voiceBtn.title = "Voice input"; voiceBtn.setAttribute("aria-label","Voice input"); voiceBtn.textContent = "🎙";
    panel.querySelector(".compose").insertBefore(voiceBtn, input);
    voiceBtn.addEventListener("click", () => {
      try {
        recognition = new SpeechRecognition(); recognition.lang = "bn-BD"; recognition.interimResults = false; recognition.maxAlternatives = 1;
        voiceBtn.textContent = "…";
        recognition.onresult = event => { input.value = event.results[0][0].transcript || ""; input.focus(); };
        recognition.onerror = () => { addMessage("Voice input unavailable. Please type your message instead.","bot"); };
        recognition.onend = () => { voiceBtn.textContent = "🎙"; };
        recognition.start();
      } catch (_) { voiceBtn.textContent = "🎙"; addMessage("Could not start microphone. Please type instead.","bot"); }
    });
  }

  window[GLOBAL_KEY] = {
    open: () => showPanel(true),
    close: () => showPanel(false),
    toggle: () => showPanel(panel.classList.contains("hidden")),
    destroy: () => { host.remove(); delete window[GLOBAL_KEY]; }
  };
  // Standalone page preview opens the panel; on arbitrary pages, keep it minimized initially.
  if (location.protocol === "file:" || /github\.io$/.test(location.hostname) || document.body?.dataset?.novaAutoOpen === "true") {
    showPanel(true);
  }
})(); 
