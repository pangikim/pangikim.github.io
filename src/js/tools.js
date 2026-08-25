(() => {
  const floor = (n) => (Number.isFinite(n) ? Math.trunc(n) : 0);
  const won = (n) => `${floor(n).toLocaleString("ko-KR")}원`;
  const digits = (v) => Number(String(v).replace(/[^\d]/g, "")) || 0;

  const NP_MIN = 410000;
  const NP_MAX = 6590000;
  const NP_RATE = 0.0475;
  const HI_RATE = 0.03595;
  const LT_RATIO = 0.9448 / 7.19;
  const EI_RATE = 0.009;
  const EI_EXTRA = { small: 0.0025, pref: 0.0045, mid: 0.0065, large: 0.0085 };

  const fill = (root, rows) => {
    root.querySelectorAll("[data-out]").forEach((el) => {
      const key = el.dataset.out;
      if (!(key in rows)) {
        el.textContent = "—";
        return;
      }
      if (el.dataset.unit === "일") {
        el.textContent = `${floor(rows[key]).toLocaleString("ko-KR")}일`;
        return;
      }
      el.textContent = won(rows[key]);
    });
  };

  const pensionBase = (pay) => {
    const cut = floor(pay / 1000) * 1000;
    return Math.min(NP_MAX, Math.max(NP_MIN, cut));
  };

  const fourIns = (pay, opt = {}) => {
    const base = Math.max(0, pay);
    const np = opt.pension === false ? 0 : floor(pensionBase(base) * NP_RATE);
    const hi = floor(base * HI_RATE);
    const lt = floor(hi * LT_RATIO);
    const ei = floor(base * EI_RATE);
    const extra = EI_EXTRA[opt.size] || 0;
    const eiEmp = floor(base * (EI_RATE + extra));
    const accident = opt.accident > 0 ? floor(base * opt.accident / 1000) : 0;
    return { np, hi, lt, ei, eiEmp, accident };
  };

  const earnedDeduction = (gross) => {
    if (gross <= 5000000) return gross * 0.7;
    if (gross <= 15000000) return 3500000 + (gross - 5000000) * 0.4;
    if (gross <= 45000000) return 7500000 + (gross - 15000000) * 0.15;
    if (gross <= 100000000) return 12000000 + (gross - 45000000) * 0.05;
    return Math.min(20000000, 14750000 + (gross - 100000000) * 0.02);
  };

  const progressive = (base) => {
    const steps = [
      [14000000, 0.06, 0],
      [50000000, 0.15, 840000],
      [88000000, 0.24, 6240000],
      [150000000, 0.35, 15360000],
      [300000000, 0.38, 37060000],
      [500000000, 0.4, 94060000],
      [1000000000, 0.42, 174060000],
      [Infinity, 0.45, 384060000],
    ];
    let prev = 0;
    for (const [limit, rate, add] of steps) {
      if (base <= limit) return add + (base - prev) * rate;
      prev = limit;
    }
    return 0;
  };

  const earnedCredit = (tax, annual) => {
    let credit = tax <= 1300000 ? tax * 0.55 : 715000 + (tax - 1300000) * 0.3;
    let cap = 740000;
    if (annual > 33000000 && annual <= 70000000) {
      cap = Math.max(660000, 740000 - (annual - 33000000) * 0.008);
    } else if (annual > 70000000) {
      cap = Math.max(500000, 660000 - (annual - 70000000) * 0.5);
    }
    return Math.min(credit, cap);
  };

  const childCredit = (n) => {
    if (n <= 0) return 0;
    if (n === 1) return 150000;
    if (n === 2) return 350000;
    return 350000 + (n - 2) * 300000;
  };

  const incomeTax = (monthlyTaxable, family, kids, rate) => {
    const annual = monthlyTaxable * 12;
    const std = Math.max(0, annual - earnedDeduction(annual) - 1500000 * Math.max(1, family));
    const raw = progressive(std);
    const yearly = Math.max(0, raw - earnedCredit(raw, annual) - childCredit(kids));
    return floor(floor(yearly / 12) * rate);
  };

  const bindMoney = (input) => {
    const paint = () => {
      const n = digits(input.value);
      input.value = n ? n.toLocaleString("ko-KR") : "";
    };
    input.addEventListener("focus", () => {
      if (input.value) input.value = String(digits(input.value));
    });
    input.addEventListener("blur", paint);
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^\d]/g, "");
    });
  };

  const vat = (root) => {
    const amount = root.querySelector("[name=amount]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const n = digits(amount.value);
      const mode = root.querySelector("[name=vatMode]:checked")?.value;
      if (!n) return fill(out, {});
      if (mode === "total") {
        const vatAmt = floor(n * 10 / 110);
        fill(out, { supply: n - vatAmt, vat: vatAmt, total: n });
        return;
      }
      const vatAmt = floor(n * 0.1);
      fill(out, { supply: n, vat: vatAmt, total: n + vatAmt });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const insurance = (root) => {
    const pay = root.querySelector("[name=pay]");
    const size = root.querySelector("[name=size]");
    const accident = root.querySelector("[name=accident]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const n = digits(pay.value);
      if (!n) return fill(out, {});
      const ins = fourIns(n, {
        size: size.value,
        accident: Number(accident.value) || 0,
      });
      fill(out, {
        np: ins.np,
        hi: ins.hi,
        lt: ins.lt,
        ei: ins.ei,
        worker: ins.np + ins.hi + ins.lt + ins.ei,
        npEmp: ins.np,
        hiEmp: ins.hi,
        ltEmp: ins.lt,
        eiEmp: ins.eiEmp,
        accident: ins.accident,
        employer: ins.np + ins.hi + ins.lt + ins.eiEmp + ins.accident,
      });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const salary = (root) => {
    const amount = root.querySelector("[name=amount]");
    const free = root.querySelector("[name=free]");
    const family = root.querySelector("[name=family]");
    const kids = root.querySelector("[name=kids]");
    const pension = root.querySelector("[name=pension]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const n = digits(amount.value);
      if (!n) return fill(out, {});
      const how = root.querySelector("[name=payHow]:checked")?.value;
      const include = root.querySelector("[name=severance]")?.checked;
      const monthly = how === "year" ? floor(n / (include ? 13 : 12)) : n;
      const nontax = Math.min(digits(free.value), monthly);
      const taxable = Math.max(0, monthly - nontax);
      const ins = fourIns(taxable, { pension: pension.checked, size: "small" });
      const taxBase = Math.max(0, taxable - ins.np - ins.hi - ins.lt - ins.ei);
      const rate = Number(root.querySelector("[name=taxRate]:checked")?.value || 1);
      const fam = Math.max(1, Number(family.value) || 1);
      const child = Math.min(Math.max(0, Number(kids.value) || 0), fam);
      const tax = incomeTax(taxBase, fam, child, rate);
      const local = floor(tax * 0.1);
      const cut = ins.np + ins.hi + ins.lt + ins.ei + tax + local;
      fill(out, {
        month: monthly,
        np: ins.np,
        hi: ins.hi,
        lt: ins.lt,
        ei: ins.ei,
        tax,
        local,
        cut,
        take: monthly - cut,
      });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const dayCount = (a, b) => Math.round((b - a) / 86400000);

  const monthsBack = (end, n) => {
    const d = new Date(end);
    d.setMonth(d.getMonth() - n);
    return d;
  };

  const severance = (root) => {
    const start = root.querySelector("[name=start]");
    const end = root.querySelector("[name=end]");
    const wage = root.querySelector("[name=wage]");
    const bonus = root.querySelector("[name=bonus]");
    const leave = root.querySelector("[name=leave]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      if (!start.value || !end.value) return fill(out, {});
      const a = new Date(`${start.value}T00:00:00`);
      const b = new Date(`${end.value}T00:00:00`);
      const days = dayCount(a, b);
      if (days <= 0) return fill(out, {});
      const from = monthsBack(b, 3);
      const period = Math.max(1, dayCount(from, b));
      const three = digits(wage.value);
      if (!three) return fill(out, {});
      const extra = digits(bonus.value) / 12 * 3 + digits(leave.value) * period / 365;
      const daily = (three + extra) / period;
      const pay = daily * 30 * (days / 365);
      fill(out, {
        days,
        daily,
        avg: daily * 30,
        pay,
      });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const estateTax = (base) => {
    const steps = [
      [100000000, 0.1, 0],
      [500000000, 0.2, 10000000],
      [1000000000, 0.3, 60000000],
      [3000000000, 0.4, 160000000],
      [Infinity, 0.5, 460000000],
    ];
    for (const [limit, rate, cut] of steps) {
      if (base <= limit) return base * rate - cut;
    }
    return 0;
  };

  const longHold = (years) => (years < 3 ? 0 : Math.min(0.3, years * 0.02));

  const transfer = (root) => {
    const sale = root.querySelector("[name=sale]");
    const buy = root.querySelector("[name=buy]");
    const cost = root.querySelector("[name=cost]");
    const years = root.querySelector("[name=years]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const s = digits(sale.value);
      if (!s) return fill(out, {});
      const gain = s - digits(buy.value) - digits(cost.value);
      if (gain <= 0) {
        fill(out, { gain, special: 0, std: 0, tax: 0, local: 0, total: 0 });
        return;
      }
      const y = Number(years.value);
      const house = root.querySelector("[name=asset]:checked")?.value !== "other";
      const special = y >= 2 ? floor(gain * longHold(y)) : 0;
      const std = Math.max(0, gain - special - 2500000);
      let tax = 0;
      if (y < 1) tax = std * (house ? 0.7 : 0.5);
      else if (y < 2) tax = std * (house ? 0.6 : 0.4);
      else tax = progressive(std);
      tax = floor(tax);
      const local = floor(tax * 0.1);
      fill(out, { gain, special, std, tax, local, total: tax + local });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const GIFT_DED = {
    spouse: 600000000,
    parent: 50000000,
    minor: 20000000,
    child: 50000000,
    kin: 10000000,
    other: 0,
  };

  const gift = (root) => {
    const amount = root.querySelector("[name=amount]");
    const rel = root.querySelector("[name=rel]");
    const file = root.querySelector("[name=file]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const n = digits(amount.value);
      if (!n) return fill(out, {});
      const ded = GIFT_DED[rel.value] || 0;
      const std = Math.max(0, n - ded);
      const raw = floor(estateTax(std));
      const credit = file.checked ? floor(raw * 0.03) : 0;
      fill(out, { ded, std, raw, credit, pay: raw - credit });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const inheritance = (root) => {
    const amount = root.querySelector("[name=amount]");
    const lump = root.querySelector("[name=lump]");
    const file = root.querySelector("[name=file]");
    const out = root.querySelector("[data-result]");
    const run = () => {
      const n = digits(amount.value);
      if (!n) return fill(out, {});
      const spouse = root.querySelector("[name=spouse]:checked")?.value === "yes";
      let ded = lump.checked ? 500000000 : 200000000;
      if (spouse) ded += 500000000;
      const std = Math.max(0, n - ded);
      const raw = floor(estateTax(std));
      const credit = file.checked ? floor(raw * 0.03) : 0;
      fill(out, { ded, std, raw, credit, pay: raw - credit });
    };
    root.addEventListener("input", run);
    root.addEventListener("change", run);
    run();
  };

  const boot = {
    vat,
    insurance,
    salary,
    severance,
    transfer,
    gift,
    inheritance,
  };

  document.querySelectorAll("[data-tool]").forEach((root) => {
    root.querySelectorAll("[data-money]").forEach(bindMoney);
    boot[root.dataset.tool]?.(root);
  });
})();
