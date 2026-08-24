const burger = document.getElementById("burger");
const overlay = document.getElementById("overlay");
const hd = document.getElementById("hd");
const hero = document.querySelector(".hero");
let menuY = 0;
let menuOpen = false;
const syncHd = () => {
  if (!hd || !hero) return;
  const y = document.documentElement.classList.contains("is-menu") ? menuY : window.scrollY;
  const past = y >= Math.max(hero.offsetHeight - hd.offsetHeight, 0);
  const menu = document.documentElement.classList.contains("is-menu");
  hd.classList.toggle("is-solid", past || menu);
};
const setMenu = (open) => {
  if (!burger || !overlay) return;
  menuOpen = open;
  burger.classList.toggle("on", open);
  burger.setAttribute("aria-expanded", String(open));
  overlay.setAttribute("aria-hidden", String(!open));
  if (open) {
    menuY = window.scrollY;
    overlay.hidden = false;
    document.documentElement.classList.add("is-menu");
    document.body.style.top = `-${menuY}px`;
  } else {
    overlay.hidden = true;
    document.documentElement.classList.remove("is-menu");
    document.body.style.top = "";
    window.scrollTo(0, menuY);
  }
  syncHd();
};
burger?.addEventListener("click", () => setMenu(!menuOpen));
overlay?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

const tabs = document.getElementById("sys-tabs");
const dash = document.getElementById("sys-dash");
const playKpis = (root) => {
  root.querySelectorAll(".kpis strong").forEach((el) => {
    if (!el.dataset.target) {
      const unit = el.querySelector("small");
      el.dataset.target = el.textContent.replace(/[^\d]/g, "");
      el.dataset.suffix = unit ? unit.outerHTML : "";
    }
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.innerHTML = target.toLocaleString("ko-KR") + suffix;
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - t) ** 3;
      el.innerHTML = Math.round(target * eased).toLocaleString("ko-KR") + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    el.innerHTML = "0" + suffix;
    requestAnimationFrame(tick);
  });
};
const playDash = (article) => {
  if (!article) return;
  article.classList.remove("is-play");
  void article.offsetWidth;
  playKpis(article);
  article.classList.add("is-play");
};
tabs?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
  dash.querySelectorAll("article").forEach((p) => p.classList.toggle("on", p.dataset.pane === btn.dataset.pane));
  playDash(dash.querySelector("article.on"));
});
if (dash) {
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    playDash(dash.querySelector("article.on"));
    io.disconnect();
  }, { threshold: 0.28 });
  io.observe(dash);
}

const formatProof = (el, n) => {
  if (el.dataset.format === "eokman") {
    const eok = Math.floor(n / 10000);
    const man = n % 10000;
    const manTxt = man.toLocaleString("ko-KR") + "<small>만원</small>";
    return eok ? `${eok}억 ${manTxt}` : manTxt;
  }
  return n.toLocaleString("ko-KR") + (el.dataset.suffix || "");
};
const playProofNum = (el, delay) => {
  const target = Number(el.dataset.count);
  if (!target) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.innerHTML = formatProof(el, target);
    return;
  }
  const run = () => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - t) ** 3;
      el.innerHTML = formatProof(el, Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.innerHTML = formatProof(el, 0);
    requestAnimationFrame(tick);
  };
  if (delay) setTimeout(run, delay);
  else run();
};
const pxMenu = document.getElementById("pantax-menu");
const pxMain = document.getElementById("pantax-main");
pxMenu?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  pxMenu.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
  pxMain?.querySelectorAll("article").forEach((p) => p.classList.toggle("on", p.dataset.pane === btn.dataset.pane));
});

const proof = document.querySelector(".proof");
if (proof) {
  proof.classList.add("is-ready");
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    proof.classList.add("is-in");
    proof.querySelectorAll("[data-count]").forEach((el, i) => playProofNum(el, i * 140));
    io.disconnect();
  }, { threshold: 0.32 });
  io.observe(proof);
}

const form = document.getElementById("form");
const syncChips = () => {
  if (!form) return;
  const biz = form.querySelector("[name=userType]:checked")?.value !== "none";
  const show = biz ? "biz" : "none";
  form.querySelectorAll("[name=consultType]").forEach((input) => {
    const ok = input.dataset.show === "all" || input.dataset.show === show;
    const lab = form.querySelector(`label[for="${input.id}"]`);
    input.hidden = !ok;
    if (lab) lab.hidden = !ok;
    if (!ok) input.checked = false;
  });
  if (!form.querySelector("[name=consultType]:checked")) {
    const first = [...form.querySelectorAll("[name=consultType]")].find((i) => !i.hidden);
    if (first) first.checked = true;
  }
};
const toggleBiz = () => {
  if (!form) return;
  const biz = form.querySelector("[name=userType]:checked")?.value !== "none";
  form.querySelectorAll("[data-biz]").forEach((el) => {
    el.hidden = !biz;
    el.querySelectorAll("input, select").forEach((field) => {
      field.required = false;
      if (!biz) {
        field.value = "";
        field.classList.remove("has-value");
      }
    });
  });
  syncChips();
};
form?.querySelectorAll("[name=userType]").forEach((r) => r.addEventListener("change", toggleBiz));
toggleBiz();

const topic = new URLSearchParams(location.search).get("topic");
if (topic) {
  const radio = form?.querySelector(`[name=consultType][value="${CSS.escape(topic)}"]`);
  if (radio) radio.checked = true;
  syncChips();
}

const phone = form?.querySelector("[name=phone]");
phone?.addEventListener("input", () => {
  const d = phone.value.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) phone.value = d;
  else if (d.length < 8) phone.value = `${d.slice(0, 3)}-${d.slice(3)}`;
  else phone.value = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
});

const bizId = form?.querySelector("[name=bizId]");
bizId?.addEventListener("input", () => {
  const d = bizId.value.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) bizId.value = d;
  else if (d.length < 6) bizId.value = `${d.slice(0, 3)}-${d.slice(3)}`;
  else bizId.value = `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
});

form?.querySelectorAll("select").forEach((sel) => {
  const sync = () => sel.classList.toggle("has-value", !!sel.value);
  sel.addEventListener("change", sync);
  sync();
});

const setModal = (id, open) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = !open;
  document.body.classList.toggle("is-modal", [...document.querySelectorAll(".cmodal")].some((m) => !m.hidden));
};
document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => setModal(btn.dataset.open, true));
});
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setModal(btn.dataset.close, false);
    if (btn.dataset.close === "ok-modal") {
      form?.reset();
      form?.querySelectorAll("select").forEach((sel) => sel.classList.toggle("has-value", !!sel.value));
    }
    toggleBiz();
  });
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const ok = form.querySelector(".ok");
  if (ok) ok.hidden = false;
  if (document.getElementById("ok-modal")) setModal("ok-modal", true);
});

const heroSlides = [...document.querySelectorAll(".hero-slide")];
if (heroSlides.length > 1) {
  let heroI = 0;
  setInterval(() => {
    heroSlides[heroI].classList.remove("is-on");
    heroI = (heroI + 1) % heroSlides.length;
    heroSlides[heroI].classList.add("is-on");
  }, 5200);
}

const track = document.getElementById("rev-track");
if (track) track.innerHTML += track.innerHTML;
["logo-a", "logo-b"].forEach((id) => {
  const row = document.getElementById(id);
  if (row) row.innerHTML += row.innerHTML + row.innerHTML;
});
const press = document.getElementById("press-track");
if (press) press.innerHTML += press.innerHTML;

const dock = document.getElementById("dock");
const consult = document.getElementById("consult");
const toggleDock = () => {
  if (!dock) return;
  const passedTop = window.scrollY >= 480;
  const atForm = consult && consult.getBoundingClientRect().top < window.innerHeight - 80;
  dock.hidden = !passedTop || atForm;
};
window.addEventListener("scroll", () => {
  toggleDock();
  syncHd();
}, { passive: true });
toggleDock();
syncHd();

const blogQ = document.getElementById("blog-q");
if (blogQ) {
  const cards = [...document.querySelectorAll(".bcard")];
  const secs = [...document.querySelectorAll("[data-sec]")];
  const applyQ = () => {
    const q = blogQ.value.trim().toLowerCase();
    cards.forEach((c) => {
      const hit = !q || (c.dataset.q || c.innerText).toLowerCase().includes(q);
      c.hidden = q ? !hit : c.classList.contains("extra") && !c.closest(".blog-mosaic")?.classList.contains("open");
    });
    secs.forEach((s) => {
      s.hidden = q && ![...s.querySelectorAll(".bcard")].some((c) => !c.hidden);
    });
  };
  blogQ.addEventListener("input", applyQ);
  document.querySelectorAll(".blog-more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const mosaic = document.querySelector(btn.getAttribute("href"));
      if (!mosaic) return;
      mosaic.classList.add("open");
      mosaic.querySelectorAll(".extra").forEach((c) => { c.hidden = false; });
      btn.hidden = true;
    });
  });
}
