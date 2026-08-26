const burgers = [...document.querySelectorAll(".burger")];
const overlay = document.getElementById("overlay");
const hd = document.querySelector(".hd");
const hero = document.querySelector(".hero");
let menuOpen = false;
const syncHd = () => {
  if (!hd || !hero) return;
  const past = window.scrollY >= Math.max(hero.offsetHeight - hd.offsetHeight, 0);
  hd.classList.toggle("is-solid", past || menuOpen);
};
const setMenu = (open) => {
  if (!overlay || !burgers.length) return;
  menuOpen = open;
  burgers.forEach((btn) => {
    btn.classList.toggle("on", open);
    btn.setAttribute("aria-expanded", String(open));
  });
  overlay.setAttribute("aria-hidden", String(!open));
  overlay.hidden = !open;
  document.documentElement.classList.toggle("is-menu", open);
  document.body.style.top = "";
  syncHd();
};
burgers.forEach((btn) => btn.addEventListener("click", () => setMenu(!menuOpen)));
overlay?.querySelectorAll(".overlay-in a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
const mobileNav = window.matchMedia("(max-width: 769px)");
mobileNav.addEventListener("change", () => {
  if (!mobileNav.matches && menuOpen) setMenu(false);
});

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
document.querySelectorAll(".pantax-menu").forEach((menu) => {
  const main = menu.parentElement?.querySelector(".pantax-main");
  const btns = [...menu.querySelectorAll("button")];
  const panes = [...(main?.querySelectorAll("article") || [])];
  if (!btns.length) return;
  const show = (i) => {
    const next = btns[i].dataset.pane;
    btns.forEach((b, n) => b.classList.toggle("on", n === i));
    panes.forEach((p) => {
      const on = p.dataset.pane === next;
      if (on === p.classList.contains("on")) return;
      p.classList.remove("in", "out");
      void p.offsetWidth;
      p.classList.toggle("on", on);
      p.classList.add(on ? "in" : "out");
    });
  };
  let i = Math.max(0, btns.findIndex((b) => b.classList.contains("on")));
  menu.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    i = btns.indexOf(btn);
    show(i);
  });
  if (btns.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => {
    i = (i + 1) % btns.length;
    show(i);
  }, 2000);
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

const heroMedia = [...document.querySelectorAll(".hero-bg")];
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ((heroMedia.length > 1 || heroSlides.length > 1) && !heroReduce) {
  const fadeMs = 1200;
  let mediaI = Math.max(0, heroMedia.findIndex((el) => el.classList.contains("is-on")));
  let slideI = Math.max(0, heroSlides.findIndex((el) => el.classList.contains("is-on")));
  let switching = false;
  let armTimer = 0;

  const playClip = (el) => {
    if (el.tagName !== "VIDEO") return;
    const play = () => el.play().catch(() => {});
    const start = () => {
      if (el.currentTime === 0 && !el.ended) {
        play();
        return;
      }
      const onSeeked = () => {
        el.removeEventListener("seeked", onSeeked);
        play();
      };
      el.addEventListener("seeked", onSeeked);
      try { el.currentTime = 0; } catch {
        el.removeEventListener("seeked", onSeeked);
        play();
      }
    };
    if (el.readyState >= 1) start();
    else el.addEventListener("loadedmetadata", start, { once: true });
  };

  const warm = (i) => {
    const el = heroMedia[i];
    if (el && el.tagName === "VIDEO") el.preload = "auto";
  };

  const showHero = (nextMedia, nextSlide) => {
    if (heroMedia.length) {
      mediaI = nextMedia;
      heroMedia.forEach((el, n) => {
        const on = n === mediaI;
        el.classList.toggle("is-on", on);
        if (el.tagName !== "VIDEO") return;
        if (on) playClip(el);
        else {
          window.setTimeout(() => {
            if (!el.classList.contains("is-on")) el.pause();
          }, fadeMs);
        }
      });
      warm((mediaI + 1) % heroMedia.length);
    }
    if (heroSlides.length) {
      slideI = nextSlide;
      heroSlides.forEach((el, n) => el.classList.toggle("is-on", n === slideI));
    }
  };

  const nextHero = () => {
    if (switching) return;
    if (heroMedia.length < 2 && heroSlides.length < 2) return;
    switching = true;
    showHero(
      heroMedia.length ? (mediaI + 1) % heroMedia.length : 0,
      heroSlides.length ? (slideI + 1) % heroSlides.length : 0
    );
    window.setTimeout(() => { switching = false; }, fadeMs);
  };

  const armVideo = (el) => {
    window.clearTimeout(armTimer);
    const lead = fadeMs / 1000;
    const remain = el.duration - el.currentTime - lead;
    const wait = Number.isFinite(remain) && remain > 0.4 ? remain * 1000 : 6800;
    armTimer = window.setTimeout(nextHero, wait);
  };

  heroMedia.forEach((el) => {
    if (el.tagName !== "VIDEO") return;
    el.loop = false;
    el.addEventListener("playing", () => {
      if (el.classList.contains("is-on")) armVideo(el);
    });
    el.addEventListener("ended", () => {
      if (el.classList.contains("is-on")) nextHero();
    });
  });

  const first = heroMedia[mediaI];
  if (heroMedia.length > 1) warm((mediaI + 1) % heroMedia.length);
  if (first && first.tagName === "VIDEO") {
    if (first.paused) playClip(first);
    if (first.readyState >= 1) armVideo(first);
  } else {
    armTimer = window.setTimeout(nextHero, 6500);
  }
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

document.querySelectorAll(".sns a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    alert("준비중입니다.");
  });
});

const aboutMap = document.querySelector(".about-map iframe");
if (aboutMap) {
  const box = aboutMap.parentElement;
  let last = "";
  const fit = () => {
    const w = Math.round(box.clientWidth);
    const h = Math.round(box.clientHeight);
    const key = `${w}x${h}`;
    if (w < 80 || h < 80 || key === last) return;
    last = key;
    const url = new URL(aboutMap.src);
    url.searchParams.set("sh_width", String(w));
    url.searchParams.set("sh_height", String(h));
    aboutMap.src = url.href;
  };
  fit();
  new ResizeObserver(fit).observe(box);
}
