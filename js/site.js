const burger = document.getElementById("burger");
const overlay = document.getElementById("overlay");
let menuY = 0;
const setMenu = (open) => {
  overlay.hidden = !open;
  burger.classList.toggle("on", open);
  burger.setAttribute("aria-expanded", String(open));
  if (open) {
    menuY = window.scrollY;
    document.documentElement.classList.add("is-menu");
    document.body.style.top = `-${menuY}px`;
  } else {
    document.documentElement.classList.remove("is-menu");
    document.body.style.top = "";
    window.scrollTo(0, menuY);
  }
};
burger?.addEventListener("click", () => setMenu(overlay.hidden));
overlay?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

const tabs = document.getElementById("sys-tabs");
const dash = document.getElementById("sys-dash");
tabs?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
  dash.querySelectorAll("article").forEach((p) => p.classList.toggle("on", p.dataset.pane === btn.dataset.pane));
});

document.getElementById("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  form.querySelector(".ok").hidden = false;
});

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
window.addEventListener("scroll", toggleDock, { passive: true });
toggleDock();

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
