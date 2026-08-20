const hd = document.getElementById("hd");
const hero = document.querySelector(".hero");
const onScroll = () => {
  const past = window.scrollY > (hero?.offsetHeight || 400) - 80;
  hd.classList.toggle("solid", past);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const mBtn = document.getElementById("m-btn");
const mNav = document.getElementById("m-nav");
mBtn?.addEventListener("click", () => {
  mNav.hidden = !mNav.hidden;
});
mNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => { mNav.hidden = true; });
});

const pills = document.getElementById("report-pills");
const dash = document.getElementById("report-dash");
pills?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  pills.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
  dash.querySelectorAll("article").forEach((p) => p.classList.toggle("on", p.dataset.pane === btn.dataset.tab));
});

const whyPills = document.getElementById("why-pills");
const whySlide = document.getElementById("why-slide");
whyPills?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  whyPills.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
  whySlide.querySelectorAll("article").forEach((a, i) => a.classList.toggle("on", String(i) === btn.dataset.why));
});

const track = document.getElementById("review-track");
if (track) track.innerHTML += track.innerHTML;

const nums = document.querySelectorAll(".num[data-count]");
const tick = (el) => {
  const end = Number(el.dataset.count);
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / 1200);
    el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))).toLocaleString("ko-KR");
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    tick(en.target);
    io.unobserve(en.target);
  });
}, { threshold: 0.4 });
nums.forEach((n) => io.observe(n));

const feeModal = document.getElementById("fee-modal");
const feeName = document.getElementById("fee-name");
document.querySelectorAll("[data-fee]").forEach((btn) => {
  btn.addEventListener("click", () => {
    feeName.textContent = btn.dataset.fee;
    feeModal.hidden = false;
  });
});
document.getElementById("fee-close")?.addEventListener("click", () => { feeModal.hidden = true; });
feeModal?.addEventListener("click", (e) => { if (e.target === feeModal) feeModal.hidden = true; });

const privacy = document.getElementById("privacy-modal");
document.getElementById("privacy-open")?.addEventListener("click", () => { privacy.hidden = false; });
document.getElementById("privacy-close")?.addEventListener("click", () => { privacy.hidden = true; });
privacy?.addEventListener("click", (e) => { if (e.target === privacy) privacy.hidden = true; });

document.getElementById("consult-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  form.querySelector(".ok").hidden = false;
});
