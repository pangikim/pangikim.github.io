#!/usr/bin/env python3
"""무료서비스 페이지를 만들고 기존 헤더·푸터에 메뉴를 넣습니다."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PAGES = ROOT / "pages"

NAV = """        <div class="drop">
          <a href="/tools/">무료서비스 <span class="chev"></span></a>
          <div class="menu">
            <a href="/tools/vat/">부가세 계산기</a>
            <a href="/tools/insurance/">4대보험 계산기</a>
            <a href="/tools/salary/">급여 실수령액</a>
            <a href="/tools/severance/">퇴직금 계산기</a>
            <a href="/tools/transfer/">부동산 양도세</a>
            <a href="/tools/gift/">증여세 계산기</a>
            <a href="/tools/inheritance/">상속세 계산기</a>
          </div>
        </div>
"""

OVERLAY = """      <details>
        <summary>무료서비스</summary>
        <a href="/tools/">전체 보기</a>
        <a href="/tools/vat/">부가세 계산기</a>
        <a href="/tools/insurance/">4대보험 계산기</a>
        <a href="/tools/salary/">급여 실수령액</a>
        <a href="/tools/severance/">퇴직금 계산기</a>
        <a href="/tools/transfer/">부동산 양도세</a>
        <a href="/tools/gift/">증여세 계산기</a>
        <a href="/tools/inheritance/">상속세 계산기</a>
      </details>
"""

HEAD = """<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | 판기세무회계</title>
  <meta name="description" content="{desc}">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <link rel="icon" href="/assets/brand/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/brand/apple-touch.png">
  <link rel="stylesheet" href="/src/css/site.css?v=164">
</head>
<body class="tools-page">
  <header class="hd">
    <div class="wrap hd-in">
      <a class="logo" href="/" aria-label="판기세무회계">
        <span class="logo-mark">
          <img class="logo-ink" src="/assets/brand/logo-line-black.png" alt="" width="39" height="39">
          <img class="logo-wash" src="/assets/brand/logo-line-white.png" alt="" width="39" height="39">
        </span>
        <span class="logo-word">
          <img class="logo-ink" src="/assets/brand/logo-word-black.png" alt="">
          <img class="logo-wash" src="/assets/brand/logo-word-white.png" alt="">
        </span>
      </a>
      <nav class="nav">
        <a href="/about/">회사소개</a>
        <div class="drop">
          <a href="/services/">세무서비스 <span class="chev"></span></a>
          <div class="menu">
            <a href="/gijang/">세무기장</a>
            <a href="/consulting/">컨설팅</a>
            <a href="/refund/">경정청구(더낸세금)</a>
          </div>
        </div>
        <div class="drop">
          <a href="/tools/">무료서비스 <span class="chev"></span></a>
          <div class="menu">
            <a href="/tools/vat/">부가세 계산기</a>
            <a href="/tools/insurance/">4대보험 계산기</a>
            <a href="/tools/salary/">급여 실수령액</a>
            <a href="/tools/severance/">퇴직금 계산기</a>
            <a href="/tools/transfer/">부동산 양도세</a>
            <a href="/tools/gift/">증여세 계산기</a>
            <a href="/tools/inheritance/">상속세 계산기</a>
          </div>
        </div>
        <a href="/pantax/">PANTAX.ai</a>
        <a href="/blog/">블로그</a>
      </nav>
      <div class="hd-btns">
        <a class="btn line" href="/consult/">상담 신청하기</a>
        <button class="burger" id="burger" type="button" aria-label="메뉴" aria-expanded="false">
          <i></i><i></i><i></i>
        </button>
      </div>
    </div>
  </header>

  <div class="overlay" id="overlay" hidden>
    <div class="overlay-bar">
      <a class="logo" href="/" aria-label="판기세무회계">
        <span class="logo-mark">
          <img class="logo-ink" src="/assets/brand/logo-line-black.png" alt="" width="39" height="39">
          <img class="logo-wash" src="/assets/brand/logo-line-white.png" alt="" width="39" height="39">
        </span>
        <span class="logo-word">
          <img class="logo-ink" src="/assets/brand/logo-word-black.png" alt="">
          <img class="logo-wash" src="/assets/brand/logo-word-white.png" alt="">
        </span>
      </a>
      <button class="burger" type="button" aria-label="닫기" aria-expanded="false">
        <i></i><i></i><i></i>
      </button>
    </div>
    <div class="overlay-in">
      <a href="/about/">회사소개</a>
      <details>
        <summary>세무서비스</summary>
        <a href="/services/">전체 보기</a>
        <a href="/gijang/">세무 기장</a>
        <a href="/consulting/">컨설팅</a>
        <a href="/refund/">경정청구(더낸세금)</a>
      </details>
      <details open>
        <summary>무료서비스</summary>
        <a href="/tools/">전체 보기</a>
        <a href="/tools/vat/">부가세 계산기</a>
        <a href="/tools/insurance/">4대보험 계산기</a>
        <a href="/tools/salary/">급여 실수령액</a>
        <a href="/tools/severance/">퇴직금 계산기</a>
        <a href="/tools/transfer/">부동산 양도세</a>
        <a href="/tools/gift/">증여세 계산기</a>
        <a href="/tools/inheritance/">상속세 계산기</a>
      </details>
      <a href="/pantax/">PANTAX.ai</a>
      <a href="/blog/">블로그</a>
    </div>
  </div>

  <main>
"""

FOOT = """  </main>

  <footer class="ft">
    <div class="wrap">
      <div class="ft-body">
        <div class="ft-info">
          <a class="ft-word" href="/" aria-label="판기세무회계"><img src="/assets/brand/logo-line-white.png" alt=""><img src="/assets/brand/logo-word-white.png" alt=""></a>
          <p class="ft-tel">문의전화: <a href="tel:0323230268">032-323-0268</a></p>
          <div>
            <p>대표 김판기</p>
            <p>경기도 부천시 신흥로 268 (중동)</p>
          </div>
          <div class="sns">
            <a href="/blog/" aria-label="인스타그램">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>
            </a>
            <a href="/blog/" aria-label="페이스북">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" fill="currentColor"/></svg>
            </a>
            <a href="/blog/" aria-label="블로그">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 9h8M8 12h5" stroke="currentColor" stroke-width="1.6"/></svg>
            </a>
            <a href="/blog/" aria-label="유튜브">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 10l5 2-5 2z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
        <div class="ft-links">
          <div>
            <p>세무서비스</p>
            <a href="/gijang/">세무기장</a>
            <a href="/consulting/">컨설팅</a>
            <a href="/refund/">더낸세금</a>
          </div>
          <div>
            <p>무료서비스</p>
            <a href="/tools/vat/">부가세 계산기</a>
            <a href="/tools/insurance/">4대보험 계산기</a>
            <a href="/tools/salary/">급여 실수령액</a>
            <a href="/tools/severance/">퇴직금 계산기</a>
            <a href="/tools/transfer/">부동산 양도세</a>
            <a href="/tools/gift/">증여세 계산기</a>
            <a href="/tools/inheritance/">상속세 계산기</a>
          </div>
          <div>
            <p>바로가기</p>
            <a href="/about/">회사소개</a>
            <a href="/pantax/">PANTAX.ai</a>
            <a href="/review/">고객 후기</a>
            <a href="/blog/">블로그</a>
            <a href="/consult/">상담 신청</a>
          </div>
        </div>
      </div>
      <p class="ft-copy">© 2026 판기세무회계</p>
    </div>
  </footer>

  <script src="/src/js/site.js?v=25"></script>
  {extra}
</body>
</html>
"""

TABS = """      <nav class="svc-tabs">
        <a{vat} href="/tools/vat/">부가세</a>
        <a{ins} href="/tools/insurance/">4대보험</a>
        <a{sal} href="/tools/salary/">실수령액</a>
        <a{sev} href="/tools/severance/">퇴직금</a>
        <a{tr} href="/tools/transfer/">양도세</a>
        <a{gift} href="/tools/gift/">증여세</a>
        <a{inh} href="/tools/inheritance/">상속세</a>
      </nav>
"""


def tabs(on):
    mark = {k: ' class="on"' if k == on else "" for k in ("vat", "ins", "sal", "sev", "tr", "gift", "inh")}
    return TABS.format(**mark)


CTA = """      <div class="svc-cta">
        <p>계산 결과는 참고용입니다. 실제 신고·지급은 상담으로 확인하세요.</p>
        <a class="btn solid" href="/consult/">상담 신청하기</a>
      </div>
"""


def write(path: Path, title: str, desc: str, body: str, extra: str = ""):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        HEAD.format(title=title, desc=desc)
        + body
        + FOOT.format(extra=extra),
        encoding="utf-8",
    )
    print(path)


HUB = """    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>사업과 급여에 필요한 계산을<br>빠르게 확인하세요.</h1>
      <p class="sub">2026년 공식 요율을 기준으로 부가세, 4대보험, 급여 실수령액, 퇴직금, 양도세, 증여세, 상속세를 계산합니다. 로그인 없이 이용할 수 있고, 입력값은 저장하지 않습니다.</p>
      <div class="tools-grid">
        <a href="/tools/vat/">
          <b>부가세 계산기</b>
          <p>공급가액이나 합계금액으로 부가세를 바로 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/insurance/">
          <b>4대보험 계산기</b>
          <p>근로자와 사업주의 국민연금·건강보험·고용보험·산재보험 부담액을 나눠 봅니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/salary/">
          <b>급여 실수령액 계산기</b>
          <p>4대보험과 간이세액 기준으로 월 예상 실수령액을 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/severance/">
          <b>퇴직금 계산기</b>
          <p>직전 3개월 평균임금과 재직일수로 예상 퇴직금을 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/transfer/">
          <b>부동산 양도세 계산기</b>
          <p>양도가액, 취득가액, 필요경비, 보유기간으로 예상 양도세를 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/gift/">
          <b>증여세 계산기</b>
          <p>증여재산과 관계별 공제로 예상 증여세를 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
        <a href="/tools/inheritance/">
          <b>상속세 계산기</b>
          <p>상속재산과 일괄·배우자 공제로 예상 상속세를 계산합니다.</p>
          <span>계산하기 →</span>
        </a>
      </div>
      <ul class="tools-points">
        <li><b>공식 자료</b><span>국민연금공단, 국민건강보험공단, 국세청, 고용노동부 자료를 기준으로 계산합니다.</span></li>
        <li><b>기준일 공개</b><span>적용 중인 요율과 마지막 확인일을 계산기마다 표시합니다.</span></li>
        <li><b>입력값 보호</b><span>금액, 가족 수, 입·퇴사일을 서버로 전송하지 않습니다.</span></li>
      </ul>
""" + CTA + """    </section>
"""

VAT = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>부가세 계산기</h1>
      <p class="sub">공급가액 또는 합계금액을 입력해 공급가액, 부가세, 합계금액을 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-01 · 일반세율 10% · 입력값을 저장·전송하지 않음</p>
{tabs("vat")}
      <div class="tools-work" data-tool="vat">
        <form class="tools-box" onsubmit="return false">
          <h2>계산 기준</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label>입력 기준</label>
              <div class="tools-seg">
                <label><input type="radio" name="vatMode" value="supply" checked><span>공급가액</span></label>
                <label><input type="radio" name="vatMode" value="total"><span>합계금액</span></label>
              </div>
            </div>
            <div class="tools-field">
              <label for="vat-amount">금액</label>
              <input id="vat-amount" name="amount" data-money inputmode="numeric" placeholder="1,000,000">
              <small>공급가액의 10%를 부가세로 계산합니다. 합계금액은 10/110을 적용하고 1원 미만을 버립니다.</small>
            </div>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>공급가액</dt><dd data-out="supply">—</dd></div>
            <div><dt>부가세</dt><dd data-out="vat">—</dd></div>
            <div class="sum"><dt>합계금액</dt><dd data-out="total">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>참고용입니다.</b> 영세율·면세와 복수 세율은 지원하지 않습니다. 실제 신고와 세금계산서 발행 전에는 거래 조건을 다시 확인하세요.</p>
""" + CTA + """    </section>
"""

INS = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>4대보험 계산기</h1>
      <p class="sub">비과세를 제외한 월 보수와 사업장 규모, 산재보험료율을 입력해 2026년 예상 부담액을 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-01 · 국민연금 4.75% · 건강보험 3.595% · 입력값을 저장·전송하지 않음</p>
{tabs("ins")}
      <div class="tools-work" data-tool="insurance">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label for="ins-pay">월 보수</label>
              <input id="ins-pay" name="pay" data-money inputmode="numeric" placeholder="3,000,000">
              <small>식대 등 4대보험 산정에서 제외할 금액을 뺀 월 보수입니다.</small>
            </div>
            <div class="tools-field">
              <label for="ins-size">사업장 규모</label>
              <select id="ins-size" name="size">
                <option value="small">150인 미만</option>
                <option value="pref">150인 이상 우선지원 대상기업</option>
                <option value="mid">150인 이상 1,000인 미만</option>
                <option value="large">1,000인 이상</option>
              </select>
              <small>사업주 고용안정·직업능력개발 보험료에 반영됩니다.</small>
            </div>
            <div class="tools-field">
              <label for="ins-acc">산재보험료율 (‰)</label>
              <input id="ins-acc" name="accident" inputmode="decimal" placeholder="7">
              <small>근로복지공단 사업종류별 요율을 ‰로 입력하세요. 비워 두면 산재는 0원입니다.</small>
            </div>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>근로자 부담</h2>
          <dl>
            <div><dt>국민연금</dt><dd data-out="np">—</dd></div>
            <div><dt>건강보험</dt><dd data-out="hi">—</dd></div>
            <div><dt>장기요양보험</dt><dd data-out="lt">—</dd></div>
            <div><dt>고용보험</dt><dd data-out="ei">—</dd></div>
            <div class="sum"><dt>근로자 합계</dt><dd data-out="worker">—</dd></div>
          </dl>
          <h2>사업주 부담</h2>
          <dl>
            <div><dt>국민연금</dt><dd data-out="npEmp">—</dd></div>
            <div><dt>건강보험</dt><dd data-out="hiEmp">—</dd></div>
            <div><dt>장기요양보험</dt><dd data-out="ltEmp">—</dd></div>
            <div><dt>고용보험</dt><dd data-out="eiEmp">—</dd></div>
            <div><dt>산재보험</dt><dd data-out="accident">—</dd></div>
            <div class="sum"><dt>사업주 합계</dt><dd data-out="employer">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>2026년 요율입니다.</b> 국민연금 기준소득월액은 41만~659만 원입니다. 연령, 단시간 근로, 두루누리 지원, 중도 입·퇴사는 반영하지 않습니다.</p>
""" + CTA + """    </section>
"""

SAL = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>급여 실수령액 계산기</h1>
      <p class="sub">연봉 또는 월급, 비과세액, 가족 수와 원천징수 비율을 입력해 2026년 월 예상 실수령액을 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-01 · 근로소득 간이세액 기준 · 입력값을 저장·전송하지 않음</p>
{tabs("sal")}
      <div class="tools-work" data-tool="salary">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label>급여 입력 방식</label>
              <div class="tools-seg">
                <label><input type="radio" name="payHow" value="month" checked><span>월급</span></label>
                <label><input type="radio" name="payHow" value="year"><span>연봉</span></label>
              </div>
            </div>
            <label class="tools-check"><input type="checkbox" name="severance"><span>연봉에 퇴직금이 포함되어 있습니다. (÷13)</span></label>
            <div class="tools-field">
              <label for="sal-amount">금액</label>
              <input id="sal-amount" name="amount" data-money inputmode="numeric" placeholder="3,000,000">
            </div>
            <div class="tools-field">
              <label for="sal-free">월 비과세액</label>
              <input id="sal-free" name="free" data-money inputmode="numeric" placeholder="200,000">
              <small>식대 등 매월 적용할 비과세 예상액입니다.</small>
            </div>
            <div class="tools-field">
              <label for="sal-family">공제대상가족 수</label>
              <input id="sal-family" name="family" type="number" min="1" max="20" value="1">
              <small>본인을 포함한 기본공제대상 가족 수입니다.</small>
            </div>
            <div class="tools-field">
              <label for="sal-kids">8~20세 자녀 수</label>
              <input id="sal-kids" name="kids" type="number" min="0" max="20" value="0">
              <small>공제대상가족 중 8세 이상 20세 이하 자녀 수입니다.</small>
            </div>
            <div class="tools-field">
              <label>원천징수 비율</label>
              <div class="tools-seg">
                <label><input type="radio" name="taxRate" value="0.8"><span>80%</span></label>
                <label><input type="radio" name="taxRate" value="1" checked><span>100%</span></label>
                <label><input type="radio" name="taxRate" value="1.2"><span>120%</span></label>
              </div>
            </div>
            <label class="tools-check"><input type="checkbox" name="pension" checked><span>국민연금에 가입되어 있습니다.</span></label>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>월 총급여</dt><dd data-out="month">—</dd></div>
            <div><dt>국민연금</dt><dd data-out="np">—</dd></div>
            <div><dt>건강보험</dt><dd data-out="hi">—</dd></div>
            <div><dt>장기요양보험</dt><dd data-out="lt">—</dd></div>
            <div><dt>고용보험</dt><dd data-out="ei">—</dd></div>
            <div><dt>소득세</dt><dd data-out="tax">—</dd></div>
            <div><dt>지방소득세</dt><dd data-out="local">—</dd></div>
            <div><dt>공제 합계</dt><dd data-out="cut">—</dd></div>
            <div class="sum"><dt>예상 실수령액</dt><dd data-out="take">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>예상액입니다.</b> 상여금 별도 원천징수, 각종 지원금, 추가 공제와 연말정산은 반영하지 않습니다. 실제 급여명세서와 다를 수 있습니다.</p>
""" + CTA + """    </section>
"""

SEV = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>퇴직금 계산기</h1>
      <p class="sub">입·퇴사일과 직전 3개월 임금으로 평균임금과 예상 퇴직금을 계산합니다.</p>
      <p class="tools-meta">기준일 2026-08-01 · 근로자퇴직급여 보장법 · 입력값을 저장·전송하지 않음</p>
{tabs("sev")}
      <div class="tools-work" data-tool="severance">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label for="sev-start">입사일</label>
              <input id="sev-start" name="start" type="date">
            </div>
            <div class="tools-field">
              <label for="sev-end">퇴사일</label>
              <input id="sev-end" name="end" type="date">
            </div>
            <div class="tools-field">
              <label for="sev-wage">직전 3개월 임금 합계</label>
              <input id="sev-wage" name="wage" data-money inputmode="numeric" placeholder="9,000,000">
              <small>기본급·수당 등 퇴직 전 3개월에 지급한 임금 총액입니다.</small>
            </div>
            <div class="tools-field">
              <label for="sev-bonus">연간 상여금</label>
              <input id="sev-bonus" name="bonus" data-money inputmode="numeric" placeholder="0">
            </div>
            <div class="tools-field">
              <label for="sev-leave">연차수당</label>
              <input id="sev-leave" name="leave" data-money inputmode="numeric" placeholder="0">
              <small>연간 상여와 연차수당은 평균임금에 비례해 더합니다.</small>
            </div>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>재직일수</dt><dd data-out="days" data-unit="일">—</dd></div>
            <div><dt>1일 평균임금</dt><dd data-out="daily">—</dd></div>
            <div><dt>30일분 평균임금</dt><dd data-out="avg">—</dd></div>
            <div class="sum"><dt>예상 퇴직금</dt><dd data-out="pay">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>법정 퇴직금은 1년 이상 재직한 경우</b> 발생합니다. 평균임금 = 퇴직 전 3개월 임금 총액 ÷ 그 기간 일수, 퇴직금 = 평균임금 × 30일 × (재직일수 ÷ 365)입니다.</p>
""" + CTA + """    </section>
"""

YEAR_OPTS = "\n".join(
    ["""                <option value="0">1년 미만</option>""",
     """                <option value="1">1년 이상 2년 미만</option>"""]
    + [f"""                <option value="{n}">{n}년 이상 {n + 1}년 미만</option>""" for n in range(2, 15)]
    + ["""                <option value="15">15년 이상</option>"""]
)

TR = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>부동산 양도세 계산기</h1>
      <p class="sub">양도가액, 취득가액, 필요경비, 보유기간을 입력해 예상 양도소득세와 지방소득세를 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-25 · 소득세법 제104조 · 기본공제 250만 원 · 입력값을 저장·전송하지 않음</p>
{tabs("tr")}
      <div class="tools-work" data-tool="transfer">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label>자산 구분</label>
              <div class="tools-seg">
                <label><input type="radio" name="asset" value="house" checked><span>주택·입주권·분양권</span></label>
                <label><input type="radio" name="asset" value="other"><span>그 외 부동산</span></label>
              </div>
            </div>
            <div class="tools-field">
              <label for="tr-sale">양도가액 (매도)</label>
              <input id="tr-sale" name="sale" data-money inputmode="numeric" placeholder="500,000,000">
            </div>
            <div class="tools-field">
              <label for="tr-buy">취득가액 (매수)</label>
              <input id="tr-buy" name="buy" data-money inputmode="numeric" placeholder="300,000,000">
            </div>
            <div class="tools-field">
              <label for="tr-cost">필요경비</label>
              <input id="tr-cost" name="cost" data-money inputmode="numeric" placeholder="10,000,000">
              <small>중개수수료, 취득세, 자본적 지출 등 필요경비 예상액입니다.</small>
            </div>
            <div class="tools-field">
              <label for="tr-years">보유기간</label>
              <select id="tr-years" name="years">
{YEAR_OPTS}
              </select>
            </div>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>양도차익</dt><dd data-out="gain">—</dd></div>
            <div><dt>장기보유특별공제</dt><dd data-out="special">—</dd></div>
            <div><dt>과세표준</dt><dd data-out="std">—</dd></div>
            <div><dt>양도소득세</dt><dd data-out="tax">—</dd></div>
            <div><dt>지방소득세</dt><dd data-out="local">—</dd></div>
            <div class="sum"><dt>예상 납부세액</dt><dd data-out="total">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>참고용입니다.</b> 일반자산 장기보유특별공제(3년 6%~15년 30%)와 기본공제 250만 원을 반영합니다. 1세대1주택 비과세, 고가주택 장특공, 다주택 중과, 비사업용 토지 중과는 지원하지 않습니다.</p>
""" + CTA + """    </section>
"""

GIFT = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>증여세 계산기</h1>
      <p class="sub">증여재산과 관계를 입력해 증여재산공제와 예상 증여세를 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-25 · 상속세 및 증여세법 제53조·제56조 · 입력값을 저장·전송하지 않음</p>
{tabs("gift")}
      <div class="tools-work" data-tool="gift">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label for="gift-amount">증여재산</label>
              <input id="gift-amount" name="amount" data-money inputmode="numeric" placeholder="100,000,000">
            </div>
            <div class="tools-field">
              <label for="gift-rel">증여자와의 관계</label>
              <select id="gift-rel" name="rel">
                <option value="parent">직계존속 (성년, 10년 5천만 원)</option>
                <option value="minor">직계존속 (미성년, 10년 2천만 원)</option>
                <option value="child">직계비속 (10년 5천만 원)</option>
                <option value="spouse">배우자 (10년 6억 원)</option>
                <option value="kin">기타 친족 (10년 1천만 원)</option>
                <option value="other">그 외</option>
              </select>
              <small>10년 이내 동일인 증여는 합산합니다. 이 계산기는 이번 건만 봅니다.</small>
            </div>
            <label class="tools-check"><input type="checkbox" name="file" checked><span>기한 내 자진신고 세액공제 3%를 적용합니다.</span></label>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>증여재산공제</dt><dd data-out="ded">—</dd></div>
            <div><dt>과세표준</dt><dd data-out="std">—</dd></div>
            <div><dt>산출세액</dt><dd data-out="raw">—</dd></div>
            <div><dt>신고세액공제</dt><dd data-out="credit">—</dd></div>
            <div class="sum"><dt>예상 납부세액</dt><dd data-out="pay">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>참고용입니다.</b> 세율은 1억 10%, 5억 20%, 10억 30%, 30억 40%, 초과 50%입니다. 혼인·출산 증여공제, 감정평가, 채무 인수, 10년 합산은 반영하지 않습니다.</p>
""" + CTA + """    </section>
"""

INH = f"""    <section class="svc tools wrap">
      <p class="eyebrow">무료서비스</p>
      <h1>상속세 계산기</h1>
      <p class="sub">상속재산, 배우자 여부, 일괄공제로 예상 상속세를 확인하세요.</p>
      <p class="tools-meta">기준일 2026-08-25 · 상속세 및 증여세법 제18조·제19조·제21조·제26조 · 입력값을 저장·전송하지 않음</p>
{tabs("inh")}
      <div class="tools-work" data-tool="inheritance">
        <form class="tools-box" onsubmit="return false">
          <h2>입력</h2>
          <div class="tools-fields">
            <div class="tools-field">
              <label for="inh-amount">상속재산</label>
              <input id="inh-amount" name="amount" data-money inputmode="numeric" placeholder="1,000,000,000">
            </div>
            <div class="tools-field">
              <label>배우자</label>
              <div class="tools-seg">
                <label><input type="radio" name="spouse" value="yes" checked><span>있음</span></label>
                <label><input type="radio" name="spouse" value="no"><span>없음</span></label>
              </div>
              <small>배우자가 있으면 배우자 최소공제 5억 원을 더합니다.</small>
            </div>
            <label class="tools-check"><input type="checkbox" name="lump" checked><span>일괄공제 5억 원을 적용합니다. (끄면 기초공제 2억 원)</span></label>
            <label class="tools-check"><input type="checkbox" name="file" checked><span>기한 내 자진신고 세액공제 3%를 적용합니다.</span></label>
          </div>
        </form>
        <div class="tools-box tools-result" data-result>
          <h2>계산 결과</h2>
          <dl>
            <div><dt>공제 합계</dt><dd data-out="ded">—</dd></div>
            <div><dt>과세표준</dt><dd data-out="std">—</dd></div>
            <div><dt>산출세액</dt><dd data-out="raw">—</dd></div>
            <div><dt>신고세액공제</dt><dd data-out="credit">—</dd></div>
            <div class="sum"><dt>예상 납부세액</dt><dd data-out="pay">—</dd></div>
          </dl>
        </div>
      </div>
      <p class="tools-note"><b>참고용입니다.</b> 일괄공제 5억 원 또는 기초공제 2억 원, 배우자 최소공제 5억 원만 반영합니다. 금융재산공제, 동거주택 공제, 사전증여 합산, 감정평가는 지원하지 않습니다.</p>
""" + CTA + """    </section>
"""

SCRIPT = '<script src="/src/js/tools.js?v=3"></script>'


def inject_existing():
    for path in PAGES.rglob("*.html"):
        if "tools" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        orig = text
        if "무료서비스" in text:
            continue
        text = text.replace('css/site.css?v=139', 'css/site.css?v=140')
        if '<a href="/pantax/">PANTAX.ai</a>' in text or 'aria-current="page">PANTAX.ai</a>' in text:
            if "button type=\"button\">무료서비스" not in text:
                text = text.replace(
                    '        </div>\n        <a href="/pantax/">PANTAX.ai</a>',
                    "        </div>\n" + NAV + '        <a href="/pantax/">PANTAX.ai</a>',
                )
                text = text.replace(
                    '        </div>\n        <a href="/pantax/" aria-current="page">PANTAX.ai</a>',
                    "        </div>\n" + NAV + '        <a href="/pantax/" aria-current="page">PANTAX.ai</a>',
                )
        if "<a href=\"/pantax/\">PANTAX.ai</a>" in text and "<summary>무료서비스</summary>" not in text:
            text = text.replace(
                '      </details>\n      <a href="/pantax/">PANTAX.ai</a>',
                "      </details>\n" + OVERLAY + '      <a href="/pantax/">PANTAX.ai</a>',
            )
        if '<a href="/pantax/">PANTAX.ai</a>' in text and '<a href="/tools/">무료서비스</a>' not in text:
            text = text.replace(
                '            <a href="/pantax/">PANTAX.ai</a>',
                '            <a href="/tools/">무료서비스</a>\n            <a href="/pantax/">PANTAX.ai</a>',
            )
        if text != orig:
            path.write_text(text, encoding="utf-8")
            print("nav", path)


def main():
    write(PAGES / "tools" / "index.html", "무료서비스", "판기세무회계 무료 계산기. 부가세, 4대보험, 급여 실수령액, 퇴직금, 양도세, 증여세, 상속세를 로그인 없이 계산합니다.", HUB)
    write(PAGES / "tools" / "vat" / "index.html", "부가세 계산기", "공급가액이나 합계금액으로 부가세를 계산합니다. 판기세무회계 무료서비스.", VAT, SCRIPT)
    write(PAGES / "tools" / "insurance" / "index.html", "4대보험 계산기", "2026년 요율로 근로자와 사업주 4대보험 부담액을 계산합니다. 판기세무회계 무료서비스.", INS, SCRIPT)
    write(PAGES / "tools" / "salary" / "index.html", "급여 실수령액 계산기", "4대보험과 간이세액 기준으로 월 예상 실수령액을 계산합니다. 판기세무회계 무료서비스.", SAL, SCRIPT)
    write(PAGES / "tools" / "severance" / "index.html", "퇴직금 계산기", "직전 3개월 평균임금과 재직일수로 예상 퇴직금을 계산합니다. 판기세무회계 무료서비스.", SEV, SCRIPT)
    write(PAGES / "tools" / "transfer" / "index.html", "부동산 양도세 계산기", "양도가액, 취득가액, 필요경비, 보유기간으로 예상 양도세를 계산합니다. 판기세무회계 무료서비스.", TR, SCRIPT)
    write(PAGES / "tools" / "gift" / "index.html", "증여세 계산기", "증여재산과 관계별 공제로 예상 증여세를 계산합니다. 판기세무회계 무료서비스.", GIFT, SCRIPT)
    write(PAGES / "tools" / "inheritance" / "index.html", "상속세 계산기", "상속재산과 일괄·배우자 공제로 예상 상속세를 계산합니다. 판기세무회계 무료서비스.", INH, SCRIPT)
    inject_existing()


if __name__ == "__main__":
    main()
