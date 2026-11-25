// Boucla Cafe support chat widget.
// Add to any page with:  <script src="https://YOUR-SITE/widget.js" defer></script>
(function () {
  if (window.__bbWidgetLoaded) return;
  window.__bbWidgetLoaded = true;

  // The chat page lives next to this script.
  const scriptSrc = (document.currentScript && document.currentScript.src) || "";
  const base = scriptSrc ? scriptSrc.slice(0, scriptSrc.lastIndexOf("/") + 1) : "";
  const chatUrl = base + "chat.html?embed=1";

  const css = `
    .bb-widget-launcher {
      position: fixed; right: 24px; bottom: 24px; z-index: 2147483000;
      width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
      background: #f28c28; color: #fff; box-shadow: 0 8px 24px rgba(43, 63, 102, 0.35);
      display: grid; place-items: center; transition: transform 0.15s ease;
    }
    .bb-widget-launcher:hover { transform: scale(1.06); }
    .bb-widget-launcher svg { width: 28px; height: 28px; }
    .bb-widget-panel {
      position: fixed; right: 24px; bottom: 96px; z-index: 2147483000;
      width: min(370px, calc(100vw - 32px)); height: min(560px, calc(100vh - 120px));
      border-radius: 18px; overflow: hidden; background: #f4f6fa;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
      opacity: 0; transform: translateY(16px) scale(0.98); pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .bb-widget-panel.bb-widget-open { opacity: 1; transform: none; pointer-events: auto; }
    /* !important so a host site's own iframe styles can't stretch the chat full screen */
    .bb-widget-panel iframe {
      position: static !important; inset: auto !important;
      width: 100% !important; height: 100% !important;
      border: 0 !important; display: block !important;
    }
    .bb-widget-teaser {
      position: fixed; right: 96px; bottom: 34px; z-index: 2147483000;
      background: #fff; color: #2b3f66; font: 600 14px "Segoe UI", system-ui, sans-serif;
      padding: 10px 14px; border-radius: 14px 14px 4px 14px; cursor: pointer;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18); border-left: 3px solid #f28c28;
      animation: bb-widget-pop 0.25s ease;
    }
    @keyframes bb-widget-pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    /* Small screens: still a compact floating card, so the page stays visible behind it */
    @media (max-width: 480px) {
      .bb-widget-launcher { right: 16px; bottom: 16px; width: 54px; height: 54px; }
      .bb-widget-panel { right: 16px; bottom: 82px; height: min(520px, calc(100vh - 110px)); }
      .bb-widget-teaser { right: 80px; bottom: 24px; }
    }
  `;

  const chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function init() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const panel = document.createElement("div");
    panel.className = "bb-widget-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Boucla Cafe support chat");

    const launcher = document.createElement("button");
    launcher.className = "bb-widget-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open chat");
    launcher.innerHTML = chatIcon;

    document.body.append(panel, launcher);

    let open = false;
    let teaser = null;

    function removeTeaser() {
      if (teaser) { teaser.remove(); teaser = null; }
    }

    function setOpen(next) {
      open = next;
      if (open && !panel.firstChild) {
        const frame = document.createElement("iframe");
        frame.src = chatUrl;
        frame.title = "Boucla Cafe support chat";
        panel.appendChild(frame);
      }
      panel.classList.toggle("bb-widget-open", open);
      launcher.innerHTML = open ? closeIcon : chatIcon;
      launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat");
      removeTeaser();
    }

    launcher.addEventListener("click", () => setOpen(!open));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) setOpen(false); });

    // Friendly nudge once, after 3 seconds.
    setTimeout(() => {
      if (open) return;
      teaser = document.createElement("div");
      teaser.className = "bb-widget-teaser";
      teaser.textContent = "Hi! Need help? 👋";
      teaser.addEventListener("click", () => setOpen(true));
      document.body.appendChild(teaser);
    }, 3000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
