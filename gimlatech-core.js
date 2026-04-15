/**
 * gimlatech-core.js
 * ספריית ליבה משותפת לכל אפליקציות GimlaTech
 * גרסה 1.0
 * https://prevital-eng.github.io/gimlatech-core/gimlatech-core.js
 */

// ===== הגדרות ברירת מחדל =====
const GT_DEFAULTS = {
  apiUrl: "https://script.google.com/macros/s/AKfycbziw5JD4UTjz4idl45Xwf5EnUuB_NVnI0JUUibOd2XefAFn9kdISJVKkP46_ZirHeez/exec",
  model: "gemini-2.0-flash-lite",
  logoUrl: "https://prevital-eng.github.io/GT-GDSH/logo.png",
  homeUrl: "https://prevital-eng.github.io/GTA/",
  whatsapp: "972503960685",
  colors: {
    primary: "#1a5276",
    secondary: "#2980b9",
    accent: "#f39c12",
    background: "#eaf4fb",
    surface: "#ffffff",
    text: "#1a252f"
  }
};

// ===== הזרקת CSS גלובלי =====
function gtInjectStyles() {
  if (document.getElementById("gt-core-styles")) return;
  const style = document.createElement("style");
  style.id = "gt-core-styles";
  style.textContent = `
    :root {
      --gt-primary: ${GT_DEFAULTS.colors.primary};
      --gt-secondary: ${GT_DEFAULTS.colors.secondary};
      --gt-accent: ${GT_DEFAULTS.colors.accent};
      --gt-bg: ${GT_DEFAULTS.colors.background};
      --gt-surface: ${GT_DEFAULTS.colors.surface};
      --gt-text: ${GT_DEFAULTS.colors.text};
      --gt-radius: 12px;
      --gt-shadow: 0 2px 12px rgba(26,82,118,0.10);
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--gt-bg);
      color: var(--gt-text);
      direction: rtl;
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }

    /* עיצוב כהה — מופעל כשהאפליקציה מגדירה darkTheme: true */
    body.gt-dark {
      background: #0f172a;
      color: #f1f5f9;
      --bg:#0f172a; --surface:#1e293b; --surface2:#273549;
      --accent:#38bdf8; --accent2:#818cf8;
      --text:#f1f5f9; --muted:#94a3b8; --border:#334155;
      --wa:#25d366; --yellow:#fbbf24;
    }

    /* ===== כותרת ===== */
    .gt-header {
      background: var(--gt-primary);
      color: white;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }

    .gt-header-logos {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .gt-logo {
      height: 44px;
      width: auto;
    }

    /* לוגו מט"ב — מוסתר עד לאישור */
    .gt-matb-logo {
      height: 38px;
      width: auto;
      display: none; /* יוצג כשיתקבל אישור: style="display:block" */
      opacity: 0.92;
      border-right: 2px solid rgba(255,255,255,0.3);
      padding-right: 12px;
    }

    .gt-header-title {
      flex: 1;
      text-align: center;
    }

    .gt-header-title h1 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .gt-header-title p {
      margin: 2px 0 0;
      font-size: 0.8rem;
      opacity: 0.85;
    }

    /* ===== גוף ===== */
    .gt-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 16px;
    }

    /* ===== כרטיס ===== */
    .gt-card {
      background: var(--gt-surface);
      border-radius: var(--gt-radius);
      box-shadow: var(--gt-shadow);
      padding: 16px;
      margin-bottom: 14px;
    }

    /* ===== כפתורים ===== */
    .gt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s, transform 0.12s;
      font-family: inherit;
    }

    .gt-btn:active { transform: scale(0.97); }

    .gt-btn-primary {
      background: var(--gt-secondary);
      color: white;
    }
    .gt-btn-primary:hover { background: var(--gt-primary); }

    .gt-btn-copy {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
      font-size: 0.85rem;
      padding: 7px 14px;
    }
    .gt-btn-copy:hover { background: #c8e6c9; }
    .gt-btn-copy.copied {
      background: #c8e6c9;
      color: #1b5e20;
    }

    .gt-btn-whatsapp {
      background: #25d366;
      color: white;
    }
    .gt-btn-whatsapp:hover { background: #128c7e; }

    /* ===== שדה טקסט ===== */
    .gt-textarea {
      width: 100%;
      border: 1.5px solid #b0c4de;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 1rem;
      font-family: inherit;
      direction: rtl;
      resize: vertical;
      min-height: 80px;
      background: #f8fbff;
      color: var(--gt-text);
      transition: border 0.18s;
    }
    .gt-textarea:focus {
      outline: none;
      border-color: var(--gt-secondary);
      background: white;
    }

    /* ===== תשובת AI ===== */
    .gt-response {
      background: #f0f7ff;
      border-right: 4px solid var(--gt-secondary);
      border-radius: 0 var(--gt-radius) var(--gt-radius) 0;
      padding: 14px 16px;
      margin-top: 12px;
      line-height: 1.7;
      font-size: 0.97rem;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .gt-response-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .gt-response-label {
      font-size: 0.8rem;
      color: var(--gt-secondary);
      font-weight: 600;
    }

    /* ===== טעינה ===== */
    .gt-loading {
      display: none;
      text-align: center;
      padding: 20px;
      color: var(--gt-secondary);
      font-size: 0.95rem;
    }

    .gt-spinner {
      display: inline-block;
      width: 22px;
      height: 22px;
      border: 3px solid #b0c4de;
      border-top-color: var(--gt-secondary);
      border-radius: 50%;
      animation: gt-spin 0.8s linear infinite;
      vertical-align: middle;
      margin-left: 8px;
    }

    @keyframes gt-spin {
      to { transform: rotate(360deg); }
    }

    /* ===== שגיאה ===== */
    .gt-error {
      background: #fff3f3;
      border: 1.5px solid #ffcdd2;
      border-radius: 8px;
      padding: 12px;
      color: #c62828;
      font-size: 0.9rem;
      margin-top: 10px;
      display: none;
    }

    /* ===== פוטר ===== */
    .gt-footer {
      text-align: center;
      padding: 18px 16px;
      color: #7f8c8d;
      font-size: 0.82rem;
      border-top: 1px solid #dde8f0;
      margin-top: 20px;
    }

    .gt-footer a {
      color: var(--gt-secondary);
      text-decoration: none;
    }

    /* ===== רספונסיבי ===== */
    @media (max-width: 480px) {
      .gt-header { padding: 10px 12px; }
      .gt-header-title h1 { font-size: 1rem; }
      .gt-logo { height: 36px; }
      .gt-container { padding: 10px; }
    }
  `;
  document.head.appendChild(style);
}

// ===== בניית כותרת =====
function gtRenderHeader(config) {
  const header = document.getElementById("gt-header");
  if (!header) return;

  const matbLogoHtml = config.matbLogoUrl
    ? `<img src="${config.matbLogoUrl}" alt="מט&quot;ב" class="gt-matb-logo" style="display:block">`
    : `<img src="" alt="מט&quot;ב" class="gt-matb-logo">`; // מוסתר

  const homeUrl = config.homeUrl || GT_DEFAULTS.homeUrl;

  header.innerHTML = `
    <a href="${homeUrl}" style="position:absolute;top:14px;right:16px;font-size:11px;color:rgba(255,255,255,0.7);font-weight:600;text-decoration:none;">🏠 דף הבית</a>
    <div class="gt-header-logos">
      <img src="${config.logoUrl || GT_DEFAULTS.logoUrl}" alt="GimlaTech" class="gt-logo">
      ${matbLogoHtml}
    </div>
    <div class="gt-header-title">
      <h1>${config.appName || "GimlaTech"}</h1>
      ${config.appSubtitle ? `<p>${config.appSubtitle}</p>` : ""}
    </div>
  `;
}

// ===== בניית פוטר =====
function gtRenderFooter(config) {
  const footer = document.getElementById("gt-footer");
  if (!footer) return;

  const whatsapp = config.whatsapp || GT_DEFAULTS.whatsapp;
  footer.innerHTML = `
    <div class="gt-footer">
      <p>שאלות? נשמח לעזור 📱
        <a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>
      </p>
      <p>© GimlaTech ${new Date().getFullYear()} — כלים דיגיטליים לגיל השלישי</p>
    </div>
  `;
}

// ===== קריאה ל-AI =====
async function gtAskAI(userMessage, systemPrompt, config) {
  const apiUrl = config.apiUrl || GT_DEFAULTS.apiUrl;
  const model = config.model || GT_DEFAULTS.model;

  const params = new URLSearchParams({
    question: userMessage,
    system: systemPrompt,
    model: model
  });

  const response = await fetch(`${apiUrl}?${params.toString()}`, {
    method: "GET"
  });

  if (!response.ok) throw new Error(`שגיאת שרת: ${response.status}`);

  const data = await response.json();

  // תמיכה במבנים שונים של תשובה
  // Claude API (Anthropic proxy)
  if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
    return data.content[0].text;
  }
  // Gemini
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  if (data.reply) return data.reply;
  if (data.text) return data.text;
  if (data.error) throw new Error(data.error.message || 'שגיאת שרת');

  throw new Error("לא התקבלה תשובה מהשרת");
}

// ===== כפתור העתקה =====
function gtCopyText(text, btnId) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = "✅ הועתק!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove("copied");
    }, 2000);
  });
}

// ===== הצגת תשובה =====
function gtShowResponse(containerId, text, copyBtnId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const uniqueId = copyBtnId || ("copy-" + Date.now());

  container.innerHTML = `
    <div class="gt-response">
      <div class="gt-response-header">
        <span class="gt-response-label">✨ תשובת המסייע</span>
        <button class="gt-btn gt-btn-copy" id="${uniqueId}"
          onclick="gtCopyText(document.getElementById('${uniqueId}').closest('.gt-response').querySelector('.gt-response-text').innerText, '${uniqueId}')">
          📋 העתק תשובה
        </button>
      </div>
      <div class="gt-response-text">${text.replace(/\n/g, "<br>")}</div>
    </div>
  `;
}

// ===== הצגת/הסתרת טעינה =====
function gtShowLoading(loadingId, show) {
  const el = document.getElementById(loadingId);
  if (el) el.style.display = show ? "block" : "none";
}

// ===== הצגת שגיאה =====
function gtShowError(errorId, message) {
  const el = document.getElementById(errorId);
  if (!el) return;
  el.textContent = message || "אירעה שגיאה. נסו שוב.";
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 5000);
}

// ===== אתחול אפליקציה =====
function gtInit(config) {
  gtInjectStyles();
  if (config.darkTheme) document.body.classList.add('gt-dark');
  gtRenderHeader(config);
  gtRenderFooter(config);
}
