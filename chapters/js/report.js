/* report.js — ساخت گزارش (صفحهٔ نتیجه + فایل مستقل نتیجه).
   فقط هنگام «اتمام آزمون» لود می‌شود؛ فونت‌های KaTeX (برای فایل آفلاین) در report-katex.js هستند. */
(function () {
  'use strict';
  var C = window.QuizCore;
  var CONF_TEXT = C.CONF_TEXT,
      CRIT = C.CRIT,
      ERR = C.ERR,
      META = C.META,
      Q = C.Q,
      REPORT_CSS = C.REPORT_CSS,
      SK = C.SK,
      STATUS = C.STATUS,
      WEIGHTS = C.WEIGHTS,
      correctHtml = C.correctHtml,
      esc = C.esc,
      fa = C.fa,
      initTips = C.initTips,
      pad2 = C.pad2,
      renderRich = C.renderRich,
      sentenceFor = C.sentenceFor,
      tip = C.tip,
      userHtml = C.userHtml;
  var KATEX_CSS = window.KATEX_CSS;

  function dateText(d) {
    try {
      return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { dateStyle: 'long', timeStyle: 'medium' }).format(d);
    } catch (e) {
      return fa(d.getFullYear() + '/' + pad2(d.getMonth() + 1) + '/' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()));
    }
  }

  function buildReport(A, when) {
    var h = '<div class="rp">';
    h += '<header><h1>' + esc(META.title) + '</h1><p class="sub">' + dateText(when) + '</p></header>';

    h += '<section class="rp-stats">' +
      stat(A.tot.n, 'تعداد سؤال‌ها') +
      stat(A.tot.correct, 'پاسخ درست') +
      stat(A.tot.wrong, 'پاسخ غلط') +
      stat(A.tot.unsure, 'نمی‌دانم / مطمئن نیستم') +
      stat(A.tot.earned + ' از ' + A.tot.max, 'امتیاز وزنی') +
      '</section>';

    var cnt = { mastered: 0, practice: 0, weak: 0 };
    A.skills.forEach(function (s) { cnt[s.status]++; });
    h += '<h2>خلاصهٔ نتیجه</h2><div class="rp-box"><p style="margin:0">' +
      fa(A.tot.n) + ' سؤال پاسخ دادی: ' + fa(A.tot.correct) + ' درست، ' + fa(A.tot.wrong) + ' غلط و ' + fa(A.tot.unsure) +
      ' بار «نمی‌دانم / مطمئن نیستم». از ' + fa(A.skills.length) + ' مهارت، در ' + fa(cnt.mastered) + ' مورد مسلط هستی، ' +
      fa(cnt.practice) + ' مورد نیاز به مطالعه و تمرین بیشتر دارد و ' + fa(cnt.weak) + ' مورد بهتر است از پایه شروع شود. ' + strengthText(A) +
      'این یک غربالگری آموزشی است، نه نمرهٔ رسمی؛ هدفش پیداکردن بهترین نقطهٔ شروع برای ریاضی ۱ دهم است.</p></div>';

    h += '<h2>نقطهٔ شروع پیشنهادی</h2><div class="rp-start">';
    if (!A.starts.length) {
      h += esc(META.allDone || 'همهٔ مهارت‌های این بخش در حد قابل قبول است؛ از نظر این بخش می‌توانی ریاضی ۱ دهم را شروع کنی.');
    } else {
      h += 'منطقی‌ترین نقطهٔ شروع: ' + A.starts.map(function (id) { return '<b>«' + esc(SK[id].name) + '»</b>'; }).join(' و ') +
        '. پیش‌نیازهای آن‌ها در همین بخش را داری، ولی خودشان هنوز کامل نیستند؛ بهتر است اول از همین‌ها شروع کنی و بعد سراغ مهارت‌هایی بروی که به آن‌ها تکیه دارند.';
    }
    h += '</div>';

    h += '<h2>وضعیت هر مهارت</h2>';
    A.skills.forEach(function (s) {
      var st = STATUS[s.status];
      h += '<div class="rp-skill ' + st.cls + '"><div class="top"><h3>' + esc(s.name) + '</h3><span class="badge">' + st.label + '</span></div>';
      h += '<p>' + sentenceFor(s.status, esc(s.name)) + '</p>';
      h += '<p class="meta">' + fa(s.n) + ' سؤال (' + fa(s.diffCount.basic) + ' پایه، ' + fa(s.diffCount.medium) + ' متوسط، ' +
        fa(s.diffCount.hard) + ' نسبتاً دشوار) — درست: ' + fa(s.correct) + '، غلط: ' + fa(s.wrong) + '، نمی‌دانم: ' + fa(s.unsure) +
        ' — امتیاز: ' + fa(s.earned) + ' از ' + fa(s.max) + '</p>';
      h += '<p class="meta">' + CONF_TEXT[s.conf] + '</p>';
      var errKeys = Object.keys(s.errCount);
      if (errKeys.length) {
        h += '<p class="meta">در پاسخ‌های غلط، ممکن است این نوع خطا دیده شده باشد: ' +
          errKeys.map(function (k) { return ERR[k]; }).join('، ') + '.</p>';
      }
      if (s.status !== 'mastered') {
        var weakPre = s.prereq.filter(function (p) { return A.byId[p].status !== 'mastered'; });
        if (weakPre.length) {
          h += '<p class="note">پیش‌نیاز این بخش («' + weakPre.map(function (p) { return esc(SK[p].name); }).join('» و «') +
            '») هم کامل نیست؛ پس بخشی از این ضعف ممکن است از همان‌جا آمده باشد و نتیجه را با احتیاط ببین.</p>';
        }
      }
      h += '</div>';
    });

    h += '<details><summary>معیارهای طبقه‌بندی</summary><ul>' +
      '<li>هر سؤال بر اساس دشواری وزن دارد: پایه ' + fa(1) + '، متوسط ' + fa(2) + '، نسبتاً دشوار ' + fa(3) + '.</li>' +
      '<li><b>مسلط:</b> حداقل ' + fa(Math.round(CRIT.masteredRatio * 100)) + '٪ امتیاز وزنی همان مهارت، و پاسخ درست به همهٔ سؤال‌های پایهٔ آن.</li>' +
      '<li><b>اصلاً بلد نیست / نیازمند آموزش از پایه:</b> کمتر از ' + fa(Math.round(CRIT.weakRatio * 100)) + '٪ امتیاز وزنی و نادرست‌بودن (یا «نمی‌دانم») سؤال پایه. ' +
      'یعنی فقط شکست در یک سؤال دشوار هرگز این وضعیت را نمی‌دهد.</li>' +
      '<li><b>نیازمند مطالعه و تمرین بیشتر:</b> بقیهٔ حالت‌ها؛ یعنی بخشی از مهارت وجود دارد ولی برای اتکای کامل کافی نیست.</li>' +
      '<li><b>اطمینان تشخیص:</b> اگر دست‌کم نیمی از سؤال‌های یک مهارت «نمی‌دانم» باشد «کم»؛ اگر سؤال دشوارتری درست و سؤال ساده‌تری نادرست باشد «متوسط»؛ در غیر این صورت «بالا».</li>' +
      '<li>«نمی‌دانم / مطمئن نیستم» امتیاز نمی‌گیرد، ولی جدا از پاسخ غلط شمرده و گزارش می‌شود.</li>' +
      '<li>برخی سؤال‌ها به مهارت دیگری هم تکیه دارند؛ این وابستگی ثبت شده، ولی امتیاز هر سؤال فقط به مهارت اصلی آن می‌رسد.</li>' +
      '</ul></details>';

    h += '<details><summary>وابستگی مهارت‌ها</summary><ul>';
    A.skills.forEach(function (s) {
      var ext = SK[s.id].external || [];
      var line = tip(s.name, SK[s.id].desc, true) + ': ' + (s.prereq.length ?
        'پیش‌نیاز آن ' + s.prereq.map(function (p) { return tip(SK[p].name, SK[p].desc, true); }).join(' و ') + ' است.' :
        'پیش‌نیاز مستقیم در این بخش ندارد.');
      if (ext.length) {
        line += ' همچنین به ' + ext.map(function (e) {
          return tip(e.name, e.desc) + (e.where ? ' (بخش ' + tip(e.where, (window.CHAPTER_INFO || {})[e.where]) + ')' : '');
        }).join(' و ') + ' تکیه دارد؛ این‌ها در این فایل سنجیده نمی‌شوند.';
      }
      h += '<li>' + line + '</li>';
    });
    h += '</ul><p style="margin:6px 0">ضعف در یک پیش‌نیاز به این معنا نیست که مهارت‌های بعدی را هم بلد نیستی؛ فقط یعنی نتیجهٔ آن‌ها را باید با احتیاط تفسیر کرد. (روی آیکون <span class="tipicon" style="display:inline-flex;cursor:default;">i</span> بزن تا توضیحشان را ببینی.)</p></details>';

    var missed = A.items.filter(function (it) { return it.status !== 'correct'; });
    h += '<details><summary>پاسخنامه<small>تعداد سؤال‌هایی که درست نبودند: (' + fa(missed.length) + ')</small></summary>';
    A.items.forEach(function (it) {
      var qn = Q.indexOf(it.q) + 1;
      var cls = it.status === 'correct' ? 't-ok' : (it.status === 'unsure' ? 't-unsure' : 't-wrong');
      var txt = it.status === 'correct' ? 'صحیح' : (it.status === 'unsure' ? 'نمی‌دانم' : 'غلط');
      h += '<div class="rv"><span class="tag ' + cls + '">' + txt + '</span><b>سؤال ' + fa(qn) + '</b>' +
        '<span class="topic">' + esc(it.q.topic || SK[it.q.skill].name) + '</span>' +
        '<div>' + renderRich(it.q.prompt) + '</div>' +
        (it.status === 'wrong' ? '<div class="ans">پاسخ تو: ' + renderRich(userHtml(it.q, it.r)) + '</div>' : '') +
        '<div class="ans">پاسخ درست: ' + renderRich(correctHtml(it.q)) + '</div>' +
        '<div class="ans">نکته: ' + renderRich(it.q.feedback) + '</div></div>';
    });
    h += '</details></div>';
    return h;

    function stat(v, label) {
      return '<div class="rp-stat"><b>' + fa(v) + '</b><span>' + label + '</span></div>';
    }
  }

  function strengthText(A) {
    var strong = A.skills.filter(function (s) { return s.status === 'mastered'; });
    if (strong.length) {
      return 'نقطه‌های قوت تو: ' + strong.map(function (s) { return '«' + esc(s.name) + '»'; }).join('، ') + '. ';
    }
    return A.tot.correct ? 'با این حال، در این بخش سؤال‌هایی را درست پاسخ داده‌ای و همین پایهٔ خوبی برای ادامه است. ' : '';
  }

  function buildDocument(A, when, fileName) {
    var data = {
      schema: 'diag-v1',
      file: META.fileNo,
      title: META.title,
      fileName: fileName,
      finishedAt: when.toISOString(),
      startedAt: C.startedAt ? C.startedAt.toISOString() : null,
      totals: A.tot,
      criteria: CRIT,
      weights: WEIGHTS,
      startSkills: A.starts,
      skills: A.skills.map(function (s) {
        return {
          id: s.id, name: s.name, status: s.status, prereq: s.prereq,
          externalPrereq: (SK[s.id].external || []).map(function (e) { return e.id; }), confidence: s.conf, questions: s.n,
          correct: s.correct, wrong: s.wrong, unsure: s.unsure, earned: s.earned, max: s.max,
          difficulty: s.diffCount, errors: s.errCount
        };
      }),
      questions: A.items.map(function (it) {
        return {
          id: it.q.id, skill: it.q.skill, secondary: it.q.secondary, difficulty: it.q.difficulty,
          status: it.status, error: it.err || null
        };
      })
    };
    var json = JSON.stringify(data).replace(/</g, '\\u003c');
    var prevMode = C.mathMode, reportHtml;
    C.mathMode = 'html';
    try { reportHtml = buildReport(A, when); } finally { C.mathMode = prevMode; }
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title>' + esc(META.title) + '</title><style>' + REPORT_CSS + KATEX_CSS + '</style></head><body>' +
      reportHtml +
      '<script>(' + initTips.toString() + ')(document);<\/script>' +
      '<script type="application/json" id="result-data">' + json + '<\/script></body></html>';
  }


  window.QuizReport = { buildReport: buildReport, buildDocument: buildDocument };
})();
