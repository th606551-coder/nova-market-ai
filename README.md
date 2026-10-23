# NOVA MARKET AI — Phase 1

**Tagline:** Talk to the Market.  
**Phase:** Floating UI foundation; auto-trading OFF.

## Included

- Responsive dark navy / electric blue / cyan landing page
- 3D-inspired NOVA robot mark drawn in CSS
- Floating assistant with open, close, minimize and drag behavior
- Small local educational demo replies (not AI-generated)
- Optional Bengali browser speech recognition where supported
- Bookmarklet loader instructions
- Basic test checklist

## Important limitations

This phase does **not** connect to live market data, AI APIs, brokers, or real trading. Demo replies are static educational explanations, not live signals. Do not use them to make trades.

A bookmarklet injects UI into the current webpage only when the browser and target site permit it. It cannot float over other Android apps or keep running after the page closes. A separate Android app with appropriate overlay permission would be needed for system-wide floating behavior.

## Run locally

Open `index.html` in a modern browser. For a more reliable local setup, run a static server from this directory, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public GitHub repository named `nova-market-ai`.
2. Upload all files and folders from this project to the repository root.
3. Open **Settings → Pages**.
4. Under build and deployment, choose **Deploy from a branch**.
5. Choose branch `main`, folder `/ (root)`, then save.
6. Wait for the Pages deployment to finish.
7. Open `https://YOUR-USERNAME.github.io/nova-market-ai/`.
8. Test the landing page and click **Launch Assistant**.

## Create the bookmarklet

1. Edit `bookmarklet.txt` and replace `USERNAME` with your GitHub username.
2. Verify that the URL `https://YOUR-USERNAME.github.io/nova-market-ai/js/floating-ui.js` opens in a browser.
3. Create a browser bookmark. Name it `NOVA MARKET AI`.
4. Edit the bookmark and paste the entire `javascript:(()=>{...})();` line from `bookmarklet.txt` into its URL field.
5. On a compatible webpage, tap the address bar and type the bookmark name, then select the bookmark. Browser-specific steps vary.
6. Test on a simple page before trying a site with strict security rules.

If the browser strips the `javascript:` prefix, that browser may not support this method. Do not try to bypass website security restrictions.

## Phase 1 test checklist

- [ ] Landing page loads without missing local assets.
- [ ] Launch Assistant opens the floating panel.
- [ ] Panel can be minimized and reopened.
- [ ] Close hides the panel and launcher can reopen it.
- [ ] Panel can be dragged by its header.
- [ ] Quick prompts return static demo explanations.
- [ ] Empty chat messages are ignored.
- [ ] Mobile layout fits a narrow screen.
- [ ] Voice input appears only when the browser supports it and handles permission errors.
- [ ] Bookmarklet loads on a compatible test page.
- [ ] No live signal or auto-trading claim is displayed as operational.

## Next phases

- Phase 2: polish floating UI and add dedicated logo assets.
- Phase 3: secure AI backend and real chat integration.
- Phase 4: verify and integrate licensed market-data providers.
- Phase 5: technical indicators and data-quality tests.
- Phase 6: explainable signal engine, history and paper trading.

Keep secrets out of Git. Use `.env` locally and add it to `.gitignore` before introducing a backend.
