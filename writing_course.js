/* คอร์สเขียน: เครื่องหมาย . , ; : และ Essay (IELTS Task 2) — ไม่ใช้ DOM/db (ทดสอบด้วย node ได้)
   ใส่บทเรียนเข้า GC.LESSONS (ต้องโหลดหลัง grammar_course.js) เนื้อหาเขียนขึ้นใหม่ทั้งหมด */
const WR = {};

/* ---------- กฎเครื่องหมายวรรคตอน ---------- */
WR.RULES = [
  { id: 'period', title: 'จุด (.) + ตัวพิมพ์ใหญ่', when: 'จบประโยคที่มีประธาน + กริยาครบและอ่านรู้เรื่องโดยไม่ต้องมีประโยคอื่น แล้วขึ้นประโยคใหม่ด้วยตัวพิมพ์ใหญ่ (ชื่อเฉพาะ และ I ก็ใหญ่เสมอ)', ex: [['Education is important. It shapes our future.', '']], trap: 'อย่าจบด้วย . ตอนที่ประโยคยังไม่ครบ เช่น "Because I was tired." (ขาดประโยคหลัก)' },
  { id: 'question', title: 'เครื่องหมายคำถาม (?)', when: 'คำถามตรง (Is it...? Why do people...?) ใส่ ? · คำถามที่เล่าต่อ (I wonder why...) เป็นประโยคบอกเล่า ใช้ .', ex: [['Is online learning effective?', ''], ['I wonder whether online learning is effective.', '']], trap: 'หลัง I wonder / I know / He asked ... ลำดับคำเป็นแบบบอกเล่า และไม่ใส่ ?' },
  { id: 'list', title: 'ลูกน้ำคั่นรายการ', when: 'มีของตั้งแต่ 3 อย่างขึ้นไปเรียงกัน คั่นด้วย , และใส่ and ก่อนตัวสุดท้าย (ใส่ , ก่อน and ด้วยก็ได้ ขอให้เขียนแบบเดียวกันทั้งเรียงความ)', ex: [['I bought apples, oranges, and bananas.', '']], trap: 'สองอย่างไม่ต้องใส่ comma: apples and oranges' },
  { id: 'intro', title: 'ลูกน้ำหลังคำ/วลีนำ', when: 'ประโยคขึ้นต้นด้วยคำเชื่อมหรือวลีนำ เช่น However, / For example, / In addition, / In conclusion, / Firstly, / In my opinion, / On the other hand, ใส่ , ปิดท้ายเสมอ', ex: [['However, the results were surprising.', ''], ['For example, cycling reduces air pollution.', '']], trap: 'อย่าลืม comma หลังคำเหล่านี้ — เป็นจุดที่คนไทยพลาดบ่อยที่สุดใน essay' },
  { id: 'subclause', title: 'ลูกน้ำหลังอนุประโยคที่นำหน้า', when: 'ประโยคขึ้นต้นด้วย if / when / although / because / since / while / after / before + ประโยคย่อย แล้วตามด้วยประโยคหลัก ใส่ , คั่นก่อนประโยคหลัก', ex: [['If it rains tomorrow, we will stay at home.', ''], ['Although the course was expensive, it was worth the money.', '']], trap: 'ถ้าประโยคหลักมาก่อน ไม่ต้องใส่ comma: We will stay at home if it rains.' },
  { id: 'fanboys', title: 'ลูกน้ำก่อน but / so / and / yet', when: 'เชื่อม "ประโยคเต็มสองประโยค" (มีประธานและกริยาทั้งสองข้าง) ใส่ , ก่อนคำเชื่อม', ex: [['Many students use phones in class, but teachers rarely allow it.', '']], trap: 'ประธานเดียวกัน กริยาสองตัว ไม่ใส่ comma: She wanted to leave but could not open the door.' },
  { id: 'adj', title: 'ลูกน้ำคั่นคำคุณศัพท์', when: 'คำคุณศัพท์สองคำขยายนามเดียวกันเท่าๆ กัน คั่นด้วย , (ทดสอบ: สลับที่หรือใส่ and ได้ = ใส่ comma)', ex: [['It was a long, difficult exam.', '']], trap: 'ถ้าสลับที่ไม่ได้ (a large wooden table) ไม่ใส่' },
  { id: 'nonessential', title: 'ลูกน้ำล้อมข้อมูลเสริม', when: 'ข้อมูลที่ตัดออกแล้วประโยคยังสมบูรณ์ (who / which / ชื่อเรียกแทน) ใส่ , ทั้งสองข้าง', ex: [['My brother, who lives in Chiang Mai, is a doctor.', '']], trap: 'ข้อมูลจำเป็น (ตัดแล้วความหมายเปลี่ยน) ไม่ใส่: The man who called you is my uncle. · which มี comma, that ไม่มี comma' },
  { id: 'splice', title: 'Comma splice (ห้ามใช้ , เชื่อมสองประโยคเต็ม)', when: 'ถ้าก่อนและหลัง , เป็นประโยคเต็มทั้งคู่และไม่มี and/but/so แปลว่าผิด แก้ด้วย . หรือ ; หรือ , + but/and/so หรือ because', ex: [['Technology is useful because it saves time.', ''], ['Technology is useful; it saves time.', '']], trap: '❌ Technology is useful, it saves time.' },
  { id: 'however', title: 'however / therefore คั่นสองประโยค', when: 'ใช้ ; นำหน้า แล้ว , ตามหลัง: ...; however, ... หรือขึ้นประโยคใหม่ด้วย . However, ...', ex: [['Technology has improved our lives; however, it has also created new problems.', '']], trap: '❌ ..., however, ... เพราะกลายเป็น comma splice' },
  { id: 'semicolon', title: 'Semicolon (;)', when: 'เชื่อมสองประโยคเต็มที่เรื่องเกี่ยวกันมาก แทนจุดแบบอ่อน หรือคั่นรายการที่มี comma อยู่ข้างในแล้ว ถ้าไม่แน่ใจ ใช้ . แทนปลอดภัยกว่า', ex: [['Some people prefer cities; others prefer villages.', '']], trap: 'ต้องมีประโยคเต็มทั้งสองข้างของ ;' },
  { id: 'colon', title: 'Colon (:)', when: 'นำรายการหรือคำอธิบายหลังประโยคเต็ม ("ต่อไปนี้คือ")', ex: [['There are three reasons: cost, time, and safety.', '']], trap: '❌ I need: a pen. (ก่อน : ต้องเป็นประโยคเต็ม)' },
  { id: 'apostrophe', title: "Apostrophe (')", when: "ย่อคำ (don't = do not) และบอกความเป็นเจ้าของ (John's book / the students' books) ส่วน its = ของมัน ไม่มี ' · it's = it is", ex: [["The students' books were on the table.", ''], ['The dog wagged its tail.', '']], trap: 'ใน essay วิชาการ เขียนเต็ม (do not) ไม่ใช้ตัวย่อ' },
  { id: 'dont', title: 'ที่ห้ามใส่ลูกน้ำ', when: 'ไม่ใส่ comma คั่นประธานกับกริยา, กริยากับกรรม, และกลางประโยคก่อน because / that', ex: [['Education is important because it improves job opportunities.', '']], trap: '❌ The man in the red shirt, is my uncle. · ❌ He said, that he was tired.' }
];
WR.RULE_BY_ID = Object.fromEntries(WR.RULES.map(r => [r.id, r]));

WR.COMMA_FLOW = [
  ['มีของ 3 อย่างขึ้นไปเรียงกันไหม?', 'ใช่ → คั่นด้วย , (apples, oranges, and bananas)'],
  ['ประโยคขึ้นต้นด้วยคำ/วลีนำ เช่น However / For example / In conclusion?', 'ใช่ → ใส่ , หลังคำนั้น'],
  ['ประโยคขึ้นต้นด้วย if / when / although / because แล้วค่อยตามด้วยประโยคหลัก?', 'ใช่ → ใส่ , ก่อนประโยคหลัก'],
  ['but / so / and / yet เชื่อม "ประโยคเต็ม 2 ประโยค" (ประธานใหม่)?', 'ใช่ → ใส่ , ก่อนคำเชื่อม'],
  ['มีข้อมูลเสริมที่ตัดออกแล้วประโยคยังสมบูรณ์ (who / which / ชื่อเรียกแทน)?', 'ใช่ → ใส่ , ทั้งสองข้าง'],
  ['จะใส่ , เชื่อมสองประโยคเต็มโดยไม่มีคำเชื่อม?', 'ห้าม! (comma splice) → เปลี่ยนเป็น . หรือ ; หรือเติม and/but/because']
];

/* ---------- แบบฝึก "ใส่เครื่องหมายเอง": [ประโยคที่ถูกต้อง, id กฎ] ---------- */
WR.DRILL = [
  ['However, the results were surprising.', 'intro'], ['I bought apples, oranges, and bananas.', 'list'], ['She wanted to leave, but the door was locked.', 'fanboys'],
  ['She wanted to leave but could not open the door.', 'fanboys'], ['My brother, who lives in Chiang Mai, is a doctor.', 'nonessential'], ['The man who called you is my uncle.', 'nonessential'],
  ['If it rains tomorrow, we will stay at home.', 'subclause'], ['We will stay at home if it rains tomorrow.', 'subclause'], ['Technology has improved our lives; however, it has also created new problems.', 'however'],
  ['It was a long, difficult exam.', 'adj'], ['First, governments should invest in public transport.', 'intro'], ['For example, cycling reduces air pollution.', 'intro'],
  ['In conclusion, the advantages outweigh the disadvantages.', 'intro'], ['Many people use social media, so they spend less time with family.', 'fanboys'], ['Although the course was expensive, it was worth the money.', 'subclause'],
  ['She said that she was tired.', 'dont'], ['There are three reasons: cost, time, and safety.', 'colon'], ['I do not know where he is.', 'question'],
  ['Is online learning really better than classroom learning?', 'question'], ['On the other hand, some people prefer to live in the countryside.', 'intro'], ['Because of the heavy traffic, many people take the train.', 'subclause'],
  ['Education is important because it improves job opportunities.', 'dont'], ['In my opinion, schools should teach financial skills.', 'intro'], ['Some people prefer cities; others prefer villages.', 'semicolon']
];
/* token ของประโยค: [{w: คำ, p: เครื่องหมายท้ายคำ}] */
WR.tokens = ans => ans.trim().split(/\s+/).map(t => { const m = /^(.*?)([,.;:?!]*)$/.exec(t); return { w: m[1], p: m[2] }; });
WR.rawOf = ans => WR.tokens(ans).map(t => t.w).join(' ');
/* ตรวจแบบฝึก: slots = เครื่องหมายที่ผู้เรียนเลือกหลังแต่ละคำ (ความยาวเท่าจำนวนคำ) */
WR.gradeDrill = (ans, slots) => {
  const tk = WR.tokens(ans), wrong = []; tk.forEach((t, i) => { if ((slots[i] || '') !== t.p) wrong.push(i); });
  const user = tk.map((t, i) => t.w + (slots[i] || '')).join(' ');
  return { ok: !wrong.length, wrong, user, right: ans };
};

/* ---------- ตัวตรวจเครื่องหมายแบบกฎ (ไม่ใช้เน็ต) ---------- */
(function () {
  const INTRO = /^(however|moreover|furthermore|therefore|thus|consequently|nevertheless|additionally|besides|meanwhile|overall|firstly|secondly|thirdly|finally|lastly|first|second|third|in addition|in contrast|in conclusion|in summary|to sum up|to conclude|for example|for instance|on the other hand|on the contrary|as a result|in other words|in my opinion|in fact|of course|at the same time|to begin with|similarly|likewise|all in all|above all|generally speaking|in the first place|nowadays|in recent years|in today's world)\b/i;
  const SUB = /^(if|when|although|though|even though|because|since|while|whereas|unless|once|after|before|as soon as|as long as|whenever)\b/i;
  const SUBJ = '(?:he|she|it|they|we|i|you|people|there|this|these|those|many people|some people|everyone|students|children|governments|society|technology|education)';
  const VERB = '(?:will|would|can|could|should|may|might|must|is|are|was|were|has|have|had|do|does|did|allow|use|need|want|take|make|prefer|think|believe|say|see|get|give|know|go|come|like|help|cause|create|improve|reduce|increase|offer|provide|remain|become|choose|spend|feel|find|work|live|play|learn|study|face|suffer|lose|gain|enjoy|follow|share|pay|buy|keep|try|start|stop|show|bring|lead|hold|run|build|travel|avoid|support|affect|depend|include|require|struggle|waste|miss|lack|fail|tend|rely|focus|worry|stay|move|grow|rise|fall|put|set|turn|open|end|begin|seem|look|sound|mean|matter|change|[a-z]{3,}s|[a-z]{3,}ed)';
  const ADV = '(?:(?:rarely|often|usually|never|always|also|still|sometimes|really|only|even|already|just)\\s+)?';
  const APOS = { dont: "don't", cant: "can't", doesnt: "doesn't", didnt: "didn't", isnt: "isn't", arent: "aren't", wasnt: "wasn't", werent: "weren't", havent: "haven't", hasnt: "hasn't", hadnt: "hadn't", wouldnt: "wouldn't", couldnt: "couldn't", shouldnt: "shouldn't", wont: "won't", im: "I'm", ive: "I've", youre: "you're", theyre: "they're", thats: "that's", theres: "there's" };
  const wc = s => (s.trim().match(/[A-Za-z']+/g) || []).length;
  const hasClause = s => new RegExp('\\b' + SUBJ + '\\s+' + VERB + '\\b', 'i').test(s) || /\b(?:the|a|an|my|our|their)\s+[a-z]+(?:\s+[a-z]+)?\s+(?:is|are|was|were|has|have|had|will|would|can|could|should|[a-z]{3,}s|[a-z]{3,}ed)\b/i.test(s);

  WR.checkPunct = function (text) {
    const issues = [], add = (it) => issues.push(it);
    const paraRe = /[^\n]+/g; let pm;
    while ((pm = paraRe.exec(text))) {
      const para = pm[0], pbase = pm.index, sentRe = /[^.!?]+[.!?]*/g; let sm; const sents = [];
      while ((sm = sentRe.exec(para))) { if (sm[0].trim()) sents.push({ t: sm[0], o: pbase + sm.index }); }
      sents.forEach((sn, si) => {
        const lead = sn.t.length - sn.t.trimStart().length, S = sn.t.trim(), o = sn.o + lead, last = si === sents.length - 1;
        if (!S) return;
        // ตัวพิมพ์ใหญ่ต้นประโยค
        if (/^[a-z]/.test(S) && !/^(e\.g|i\.e)/.test(S)) add({ type: 'capital', s: o, e: o + 1, sug: S[0].toUpperCase(), msg: 'ขึ้นต้นประโยคด้วยตัวพิมพ์ใหญ่' });
        // ไม่มีเครื่องหมายจบประโยคท้ายย่อหน้า
        if (last && !/[.!?]$/.test(S) && wc(S) >= 4) add({ type: 'end', s: o + S.length, e: o + S.length, sug: '.', msg: 'จบประโยคด้วยจุด (.)' });
        // วลีนำที่ไม่มี comma
        const im = INTRO.exec(S);
        if (im) { const after = S.slice(im[0].length); if (!/^\s*,/.test(after) && after.trim().length > 2 && !/^\s*[.!?]/.test(after)) add({ type: 'intro', s: o + im[0].length, e: o + im[0].length, sug: ',', msg: `ใส่ , หลัง "${im[0]}" (วลี/คำเชื่อมที่นำประโยคต้องมี comma)` }); }
        // อนุประโยคนำหน้าแล้วไม่มี comma ก่อนประโยคหลัก
        else if (SUB.test(S) && !S.slice(0, 80).includes(',')) {
          const re = new RegExp('\\b' + SUBJ + '\\s+' + VERB + '\\b', 'gi'); let m;
          while ((m = re.exec(S))) { if (m.index > 14 && S[m.index - 1] === ' ') { add({ type: 'subclause', s: o + m.index - 1, e: o + m.index - 1, sug: ',', msg: 'ประโยคขึ้นต้นด้วย if/when/although/because ... ต้องใส่ , ก่อนประโยคหลัก' }); break; } }
        }
        // but/so/yet (+ and) เชื่อมสองประโยคเต็ม แต่ไม่มี comma
        const fre = new RegExp('(\\S)\\s(but|yet|so|and)\\s((?:' + SUBJ + '|(?:the|a|an|my|our|their|many|some)\\s+[a-z]+|[a-z]+s)\\s+' + ADV + VERB + ')\\b', 'gi'); let fm;
        while ((fm = fre.exec(S))) {
          const idx = fm.index + 1, left = S.slice(0, idx), kw = fm[2].toLowerCase(), nxt = S.slice(idx + 1 + kw.length).trim().toLowerCase();
          if (fm[1] === ',' || wc(left) < 3 || (kw === 'and' && !new RegExp('^' + SUBJ + '\\b', 'i').test(nxt)) || (kw === 'so' && /^(many|much|that|far|long|little|few)/.test(nxt)) || /^(not|also|only)\b/.test(nxt)) continue;
          if (!hasClause(left)) continue;
          add({ type: 'fanboys', s: idx, e: idx, sug: ',', msg: `"${kw}" เชื่อมสองประโยคเต็ม ให้ใส่ , ก่อน ${kw}` }); break;
        }
        // comma splice: ประโยคเต็ม , ประโยคเต็ม (ไม่มีคำเชื่อม)
        { const im2 = INTRO.exec(S), SS = im2 ? S.slice(im2[0].length).replace(/^\s*,?\s*/, '') : S, ob = S.length - SS.length;
          const sp = new RegExp(',\\s+(' + SUBJ + '\\s+' + VERB + ')\\b', 'i'), m = SS && !SUB.test(SS) ? sp.exec(SS) : null;
          if (m) { m.index += ob; const before = S.slice(0, m.index), seg = before.slice(before.lastIndexOf(';') + 1).replace(INTRO, '').replace(/^\s*,?\s*/, '').trim(); if (!INTRO.test(seg) && !SUB.test(seg) && hasClause(seg) && wc(seg) >= 3) add({ type: 'splice', s: o + m.index, e: o + m.index + 1, sug: ';', msg: 'ก่อนและหลัง , เป็นประโยคเต็มทั้งคู่ (comma splice) เปลี่ยนเป็น ; หรือ . หรือเติม and/but/because' }); }
        }
        // however คั่นสองประโยคด้วย comma
        const hm = /,\s*(however|therefore|moreover|furthermore|consequently|nevertheless|thus|otherwise)\b/i.exec(S);
        if (hm && wc(S.slice(0, hm.index)) >= 4 && !SUB.test(S)) add({ type: 'however', s: o + hm.index, e: o + hm.index + 1, sug: ';', msg: `"${hm[1]}" คั่นสองประโยค ใช้ ; นำหน้า (…; ${hm[1].toLowerCase()}, …) หรือขึ้นประโยคใหม่ด้วย .` });
        const hn = /\w\s+(however|therefore|moreover|furthermore|consequently|nevertheless)\s+(?:he|she|it|they|we|i|you|there|this|these|the|a|many|some|[a-z]+s)\b/i.exec(S);
        if (hn && wc(S.slice(0, hn.index + 1)) >= 4 && !/[;,.]\s*$/.test(S.slice(0, hn.index + 1)) && !SUB.test(S)) { const ws = S.indexOf(hn[1], hn.index), st = ws - 1; add({ type: 'however', s: o + st, e: o + ws + hn[1].length, sug: '; ' + hn[1].toLowerCase() + ',', msg: `"${hn[1]}" คั่นสองประโยคเต็ม ใช้ ; นำหน้าและ , ตามหลัง` }); }
        // , ก่อน because / that กลางประโยค
        const bm = /\w,\s+(because|that)\b/i.exec(S);
        if (bm && !SUB.test(S)) { const ci = S.indexOf(',', bm.index); add({ type: 'dont', s: o + ci, e: o + ci + 1, sug: '', msg: `ไม่ต้องใส่ , ก่อน "${bm[1]}" กลางประโยค` }); }
      });
    }
    { const ir = /(^|[\s(])i(?=[\s,.;:?!']|$)/g; let im; while ((im = ir.exec(text))) { const st = im.index + im[1].length; add({ type: 'capital', s: st, e: st + 1, sug: 'I', msg: 'I (ฉัน) เป็นตัวพิมพ์ใหญ่เสมอ' }); } }
    // apostrophe ที่ขาด
    const ar = new RegExp('\\b(' + Object.keys(APOS).join('|') + ')\\b', 'gi'); let am;
    while ((am = ar.exec(text))) { const fix = APOS[am[1].toLowerCase()]; add({ type: 'apostrophe', s: am.index, e: am.index + am[0].length, sug: /^[A-Z]/.test(am[0]) && !/^I/.test(fix) ? fix[0].toUpperCase() + fix.slice(1) : fix, msg: `ขาด apostrophe: ${fix} (ใน essay วิชาการควรเขียนเต็ม เช่น do not)` }); }
    // ช่องว่างรอบเครื่องหมาย
    let m2; const sb = /\s+([,;:?!])/g; while ((m2 = sb.exec(text))) { if (!/\n/.test(m2[0])) add({ type: 'space', s: m2.index, e: m2.index + m2[0].length - 1, sug: '', msg: 'ไม่เว้นวรรคหน้าเครื่องหมาย , ; : ? !' }); }
    const sa = /([A-Za-z])([,;?!])(?=[A-Za-z])/g; while ((m2 = sa.exec(text))) add({ type: 'space', s: m2.index + 1, e: m2.index + 2, sug: m2[2] + ' ', msg: 'เว้นวรรคหลังเครื่องหมาย' });
    const dd = /,,|\.\.(?!\.)/g; while ((m2 = dd.exec(text))) add({ type: 'double', s: m2.index, e: m2.index + 2, sug: m2[0][0], msg: 'เครื่องหมายซ้ำ' });
    // เรียงตามตำแหน่ง ตัดซ้ำที่ทับกัน
    issues.sort((a, b) => a.s - b.s || a.e - b.e); const out = []; for (const it of issues) { if (!out.length || it.s >= out[out.length - 1].e + (it.s === it.e ? 0 : 0) || it.s !== out[out.length - 1].s) out.push(it); }
    return out;
  };
  WR.applyFix = (text, it) => text.slice(0, it.s) + it.sug + text.slice(it.e);
  WR.PUNCT_TH = { capital: 'ตัวพิมพ์ใหญ่', end: 'จุดท้ายประโยค', intro: 'comma หลังคำนำ', subclause: 'comma หลังอนุประโยค', fanboys: 'comma ก่อน but/so/and', splice: 'comma splice', however: 'however คั่นประโยค', dont: 'comma ที่ไม่ต้องใส่', apostrophe: 'apostrophe', space: 'ช่องว่าง', double: 'เครื่องหมายซ้ำ' };
})();

/* ---------- Essay: ประเภท โจทย์ วลีสำเร็จรูป คำเชื่อม ---------- */
WR.TYPES = {
  opinion: { name: 'Opinion (เห็นด้วยหรือไม่)', ask: 'โจทย์ให้ตอบว่า "คุณเห็นด้วยแค่ไหน" ต้องมีจุดยืนชัดตั้งแต่ย่อหน้าแรกและคงจุดยืนเดิมตลอดเรื่อง', outline: ['Intro: เปลี่ยนคำโจทย์ + ประโยคจุดยืน (I strongly agree/disagree that ...)', 'Body 1: เหตุผลที่ 1 + อธิบาย + ตัวอย่าง', 'Body 2: เหตุผลที่ 2 + อธิบาย + ตัวอย่าง (อาจยอมรับอีกด้านสั้นๆ แล้วแย้ง)', 'Conclusion: ย้ำจุดยืนด้วยคำใหม่ + สรุปเหตุผล'], thesis: 'In my opinion, ... because ... and ...' },
  discussion: { name: 'Discussion (ถกสองมุมมอง + ความเห็น)', ask: 'โจทย์มีสองมุมมอง ต้องอธิบาย "ทั้งสองฝั่ง" อย่างสมดุล แล้วบอกความเห็นของตัวเอง', outline: ['Intro: บอกว่ามีสองมุมมอง + จะบอกความเห็น', 'Body 1: มุมมองที่ 1 พร้อมเหตุผล/ตัวอย่าง', 'Body 2: มุมมองที่ 2 พร้อมเหตุผล/ตัวอย่าง', 'Conclusion: สรุปว่าคุณเอนเอียงไปทางไหนเพราะอะไร'], thesis: 'This essay will discuss both views before explaining why I believe that ...' },
  problem: { name: 'Problem–Solution', ask: 'ต้องตอบทั้ง "ปัญหาคืออะไร" และ "แก้อย่างไร" (หรือสาเหตุ + วิธีแก้) ให้ชัดเจนทั้งสองส่วน', outline: ['Intro: อธิบายปัญหาสั้นๆ + บอกว่าจะเสนอทางแก้', 'Body 1: ปัญหา/สาเหตุหลักๆ พร้อมตัวอย่าง', 'Body 2: ทางแก้ที่เป็นไปได้ + ผลที่คาดว่าจะได้', 'Conclusion: สรุปปัญหา + ทางแก้ที่ดีที่สุด'], thesis: 'This essay will examine the main causes of this problem and suggest practical solutions.' },
  adv: { name: 'Advantages–Disadvantages', ask: 'ถ้าโจทย์ถามว่า "ข้อดีมากกว่าข้อเสียไหม" ต้องเลือกฝั่งและให้เหตุผลทั้งสองด้าน', outline: ['Intro: บอกหัวข้อ + จุดยืนว่าข้อดี/ข้อเสียมากกว่า', 'Body 1: ข้อดี (หรือข้อเสีย) 1-2 ข้อ พร้อมตัวอย่าง', 'Body 2: อีกด้านที่ตรงข้าม พร้อมตัวอย่าง', 'Conclusion: สรุปว่าด้านไหนหนักกว่า'], thesis: 'Although there are some drawbacks, I believe the advantages outweigh the disadvantages.' },
  twopart: { name: 'Two-part question', ask: 'โจทย์มี 2 คำถามแยกกัน ต้องตอบ "ทั้งสองคำถาม" ทีละย่อหน้า', outline: ['Intro: บอกหัวข้อ + สิ่งที่จะตอบทั้งสองข้อ', 'Body 1: ตอบคำถามที่ 1', 'Body 2: ตอบคำถามที่ 2', 'Conclusion: สรุปคำตอบทั้งสองข้อ'], thesis: 'This essay will explain why ... and discuss how ...' }
};
WR.PROMPTS = [
  ['opinion', 'Some people believe that students should learn at least one foreign language in primary school. To what extent do you agree or disagree?'],
  ['opinion', 'Many people think that governments should spend more money on public transport than on building new roads. Do you agree or disagree?'],
  ['opinion', 'Some people say that watching television is harmful for children. To what extent do you agree?'],
  ['discussion', 'Some people prefer to work for a large company, while others prefer to work for a small business. Discuss both views and give your own opinion.'],
  ['discussion', 'Some people think that university education should be free for everyone. Others believe that students should pay for it. Discuss both views and give your opinion.'],
  ['problem', 'In many cities, air pollution is getting worse every year. What are the causes of this problem, and what can be done to solve it?'],
  ['problem', 'More and more young people spend most of their free time on smartphones. What problems does this cause, and what solutions can you suggest?'],
  ['adv', 'More people are choosing to work from home instead of going to an office. Do the advantages of this trend outweigh the disadvantages?'],
  ['adv', 'Tourism is growing rapidly in many countries. Do the advantages of tourism outweigh its disadvantages?'],
  ['twopart', 'Many people nowadays eat fast food regularly. Why is this happening? Is it a positive or negative development?'],
  ['twopart', 'In some countries, fewer young people are choosing to learn traditional crafts. Why do you think this is happening? What can be done to preserve these skills?'],
  ['opinion', 'Some people believe that the best way to reduce crime is to give longer prison sentences. To what extent do you agree or disagree?']
].map(([type, text], i) => ({ id: 'p' + (i + 1), type, text }));
WR.PHRASES = {
  'Intro (ย่อหน้าแรก)': ['Nowadays, ... has become increasingly common.', 'It is often argued that ...', 'In recent years, there has been a growing debate about ...', 'This essay will discuss both views and give my own opinion.', 'In my opinion, ... because ... and ...'],
  'ประเด็นหลัก (Topic sentence)': ['One major reason is that ...', 'Another important factor is ...', 'Firstly, ...', 'The main advantage of ... is that ...'],
  'อธิบาย + ตัวอย่าง': ['This means that ...', 'As a result, ...', 'For example, ...', 'For instance, in ..., ...'],
  'ขัดแย้ง / ยอมรับอีกด้าน': ['However, ...', 'On the other hand, ...', 'Although ..., ...', 'While some people argue that ..., I believe that ...'],
  'สรุป (Conclusion)': ['In conclusion, ...', 'To sum up, ...', 'Overall, I believe that ...']
};
WR.LINKERS = {
  'เพิ่มข้อมูล': ['in addition', 'moreover', 'furthermore', 'besides', 'additionally'],
  'ขัดแย้ง': ['however', 'on the other hand', 'in contrast', 'although', 'whereas', 'nevertheless', 'despite', 'even though'],
  'เหตุและผล': ['because', 'since', 'as a result', 'therefore', 'consequently', 'due to', 'thus', 'owing to'],
  'ตัวอย่าง': ['for example', 'for instance', 'such as', 'in particular'],
  'เรียงลำดับ': ['firstly', 'secondly', 'finally', 'lastly', 'to begin with', 'first', 'second', 'third'],
  'สรุป': ['in conclusion', 'to sum up', 'overall', 'in summary', 'to conclude', 'all in all']
};
const STOP = new Set('the a an and or but of to in on for with at by from as is are was were be been it this that these those they them their there he she we you i his her our your its not no yes can will would should could may might also more most many much very than then so if when while which who whom whose what why how about into over under between among such other another one two some any each every both either neither people'.split(' '));
WR.essayStats = function (text) {
  const t = String(text || ''), paras = t.split(/\n\s*\n/).map(x => x.trim()).filter(Boolean), words = t.match(/[A-Za-z][A-Za-z'’-]*/g) || [], low = t.toLowerCase();
  const sentences = (t.match(/[^.!?\n]+[.!?]+/g) || []).length || (t.trim() ? 1 : 0);
  const link = {}, linkTotal = {}; for (const [cat, list] of Object.entries(WR.LINKERS)) for (const w of list) { const n = (low.match(new RegExp('\\b' + w.replace(/ /g, '\\s+') + '\\b', 'g')) || []).length; if (n) { (link[cat] = link[cat] || []).push(w); linkTotal[w] = n; } }
  const overused = Object.entries(linkTotal).filter(([, n]) => n > 2).map(([w, n]) => `${w} (${n})`);
  const contractions = [...new Set((low.match(/\b[a-z]+n't\b|\b[a-z]+'(?:re|ve|ll|d|m)\b|\b(?:it|that|there|what|let)'s\b/g) || []))];
  const informal = [...new Set((low.match(/\b(?:a lot of|lots of|kids|stuff|gonna|wanna|guys|thing|things|really|very good|very bad|get|got)\b/g) || []))];
  const freq = {}; words.map(w => w.toLowerCase()).filter(w => w.length > 4 && !STOP.has(w)).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const repeated = Object.entries(freq).filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([w, n]) => `${w} (${n})`);
  const first = (low.match(/\bi (?:think|believe|feel|agree|disagree)\b|\bin my opinion\b/g) || []).length;
  const avg = sentences ? Math.round(words.length / sentences) : 0, punct = WR.checkPunct(t);
  const lastPara = paras[paras.length - 1] || '', cats = Object.keys(link).length;
  const checks = [
    { id: 'words', ok: words.length >= 250, label: `ความยาว ${words.length}/250 คำ`, tip: 'น้อยกว่า 250 คำถูกหักคะแนน Task Response — เพิ่มเหตุผลหรือตัวอย่างในย่อหน้าเนื้อหา' },
    { id: 'paras', ok: paras.length >= 4, label: `จำนวนย่อหน้า ${paras.length} (ควร 4-5)`, tip: 'แบ่งเป็น Intro + Body 2 ย่อหน้า + Conclusion เว้นบรรทัดว่างระหว่างย่อหน้า' },
    { id: 'concl', ok: paras.length >= 2 && WR.LINKERS['สรุป'].some(w => new RegExp('\\b' + w + '\\b', 'i').test(lastPara)), label: 'ย่อหน้าสรุปขึ้นต้นด้วยคำสรุป', tip: 'ขึ้นต้นย่อหน้าสุดท้ายด้วย In conclusion, / To sum up, / Overall,' },
    { id: 'link', ok: cats >= 3, label: `คำเชื่อมหลายหน้าที่ (${cats}/6 กลุ่ม)`, tip: 'ลองใช้คำเชื่อมให้ครบอย่างน้อย 3 หน้าที่: เหตุผล ตัวอย่าง ขัดแย้ง สรุป' },
    { id: 'over', ok: !overused.length, label: overused.length ? `ใช้คำเชื่อมซ้ำเกิน: ${overused.join(', ')}` : 'ไม่ใช้คำเชื่อมซ้ำเกินไป', tip: 'ซ้ำเกิน 2 ครั้ง เปลี่ยนเป็นคำเชื่อมอื่นที่หน้าที่เดียวกัน' },
    { id: 'contr', ok: !contractions.length, label: contractions.length ? `มีตัวย่อ: ${contractions.join(', ')}` : 'ไม่ใช้ตัวย่อ (contractions)', tip: 'ใน essay วิชาการเขียนเต็ม เช่น do not, it is' },
    { id: 'inf', ok: !informal.length, label: informal.length ? `คำพูดกันเอง: ${informal.join(', ')}` : 'ไม่มีคำพูดกันเองที่เจอบ่อย', tip: 'a lot of → many / a large number of · kids → children · get → obtain/receive · thing → factor/aspect' },
    { id: 'len', ok: avg >= 12 && avg <= 28, label: `ความยาวประโยคเฉลี่ย ${avg} คำ`, tip: 'ผสมประโยคสั้นและยาว (12-28 คำ) ถ้ายาวเกินให้ตัดด้วยจุด ถ้าสั้นเกินให้เชื่อมด้วย because/although' },
    { id: 'punct', ok: !punct.length, label: punct.length ? `พบจุดเครื่องหมายที่ควรแก้ ${punct.length} จุด` : 'ไม่พบจุดเครื่องหมายที่ผิด', tip: 'กดตรวจเครื่องหมายแล้วแก้ทีละจุด' }
  ];
  return { paras: paras.length, words: words.length, sentences, avg, link, overused, contractions, informal, repeated, first, punct, checks, paraWords: paras.map(p => (p.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length) };
};

/* ---------- บทเรียน (เข้า GC.LESSONS ใช้ระบบติวเตอร์เดิม) ---------- */
const G1 = 'การเขียน: เครื่องหมาย . , ; :', G2 = 'การเขียน: Essay (IELTS Task 2)';
WR.LESSONS = [
  { id: 'punct_basics', group: G1, cat: 'punct', title: 'จุด ตัวพิมพ์ใหญ่ และ ?', th: 'ประโยคจบตรงไหน', tense: null,
    intro: 'ประโยคอังกฤษ 1 ประโยค = ใจความสมบูรณ์ 1 เรื่อง (มีประธาน + กริยา) จบด้วยจุด แล้วขึ้นประโยคใหม่ด้วยตัวพิมพ์ใหญ่ ภาษาไทยไม่มีจุดจบประโยค ตรงนี้จึงต้องฝึกให้ชิน',
    form: 'ตัวพิมพ์ใหญ่ + ประธาน + กริยา + ... . (หรือ ?)', neg: '', ques: '',
    use: ['ประโยคบอกเล่า จบด้วย . → Education is important.', 'คำถามตรง จบด้วย ? → Is online learning effective?', 'คำถามที่เล่าต่อ ใช้ . ไม่ใช้ ? → I wonder why he left.', 'ตัวพิมพ์ใหญ่: ต้นประโยค, I, ชื่อเฉพาะ (Thailand, Bangkok, Monday)', 'ประโยคไม่ครบ (fragment) เช่น "Because I was tired." ห้ามจบแยก ต้องต่อกับประโยคหลัก', 'ใน essay วิชาการไม่ใช้ ! (อัศเจรีย์)'], signals: [],
    trick: 'ก่อนใส่ . ถามว่า "อ่านจบแล้ว มีประธานและกริยา ฟังรู้เรื่องโดยไม่ต้องมีประโยคอื่นไหม?" ถ้าใช่ จบได้ · ถ้าขึ้นต้นด้วย because / although / if / when แล้วยังไม่มีประโยคหลัก ยังจบไม่ได้',
    ex: [['Education is important. It shapes our future.', 'สองประโยค จบด้วยจุดทั้งคู่'], ['Is online learning effective?', 'คำถามตรง ใช้ ?'], ['Because it was raining, we stayed at home.', 'ประโยคย่อยตามด้วยประโยคหลัก ถึงจะจบได้']],
    quiz: [['Which one is a complete sentence?', ['Because I was tired.', 'When the teacher arrived.', 'Although it was late.', 'I was tired.'], 'D', 'ต้องมีประโยคหลัก ส่วน Because / When / Although ... ยังไม่ครบ'], ['Choose the correct sentence.', ['I wonder where he lives?', 'I wonder where he lives.', 'I wonder, where he lives?', 'i wonder where he lives.'], 'B', 'คำถามที่เล่าต่อ เป็นประโยคบอกเล่า ใช้ . และขึ้นต้นด้วยตัวใหญ่'], ['Which sentence is written correctly?', ['we visited bangkok in march.', 'We visited bangkok in March.', 'We visited Bangkok in March.', 'we visited Bangkok in march.'], 'C', 'ต้นประโยค ชื่อเมือง และชื่อเดือน เป็นตัวพิมพ์ใหญ่']] },
  { id: 'punct_comma1', group: G1, cat: 'punct', title: 'ลูกน้ำ (,) ตอนที่ 1', th: 'รายการ คำนำ เชื่อมประโยค', tense: null,
    intro: 'comma คือ "จังหวะหายใจ" ของประโยค จำ 5 กรณีหลักก่อน ครอบคลุมราว 80% ของ essay: คั่นรายการ · หลังคำ/วลีนำ · หลังอนุประโยคที่นำหน้า · ก่อน but/so/and ที่เชื่อมสองประโยคเต็ม · คั่นคำคุณศัพท์ที่เท่ากัน',
    form: 'A, B, and C · However, S + V · If S + V, S + V · S + V, but S + V', neg: '', ques: '',
    use: ['รายการ 3 อย่างขึ้นไป: apples, oranges, and bananas', 'วลีนำ: However, / For example, / In conclusion, / Firstly, / In my opinion,', 'อนุประโยคนำหน้า: If it rains tomorrow, we will stay home. (ถ้าประโยคหลักมาก่อน ไม่ใส่ comma)', 'เชื่อมสองประโยคเต็มด้วย but/so/and/yet: Many students use phones in class, but teachers rarely allow it.', 'ประธานเดียวกัน กริยาสองตัว ไม่ใส่ comma: She wanted to leave but could not open the door.', 'คำคุณศัพท์เท่ากัน: a long, difficult exam (สลับที่/ใส่ and ได้)'], signals: ['However,', 'For example,', 'In conclusion,', 'If ..., ...', 'but', 'so'],
    trick: 'ก่อนใส่ , ถาม 4 ข้อ: (1) มีของ 3 อย่างไหม? (2) มีคำนำอย่าง However / For example หน้าประโยคไหม? (3) ขึ้นต้นด้วย if / when / although / because แล้วค่อยถึงประโยคหลักไหม? (4) but / so / and เชื่อม "ประโยคเต็ม 2 ประโยค" ไหม? ข้อไหนใช่ ใส่ comma',
    ex: [['I bought apples, oranges, and bananas.', 'รายการ 3 อย่าง'], ['However, the results were surprising.', 'วลีนำ'], ['If it rains tomorrow, we will stay at home.', 'อนุประโยคนำหน้า'], ['She wanted to leave, but the door was locked.', 'เชื่อมสองประโยคเต็ม']],
    quiz: [['Choose the correct sentence.', ['However the results were surprising.', 'However; the results were surprising.', 'However the results, were surprising.', 'However, the results were surprising.'], 'D', 'คำนำประโยค (However) ต้องตามด้วย comma'], ['Choose the correct sentence.', ['Many students use phones in class but teachers rarely allow it.', 'Many students use phones in class, but teachers rarely allow it.', 'Many students use phones in class but, teachers rarely allow it.', 'Many students use phones, in class but teachers rarely allow it.'], 'B', 'but เชื่อมสองประโยคเต็ม (ประธานต่างกัน) ใส่ comma ก่อน but'], ['Which sentence is punctuated correctly?', ['If it rains tomorrow we will stay at home.', 'If it rains, tomorrow we will stay at home.', 'If, it rains tomorrow we will stay at home.', 'If it rains tomorrow, we will stay at home.'], 'D', 'อนุประโยคที่ขึ้นต้นด้วย if ต้องมี comma คั่นก่อนประโยคหลัก']] },
  { id: 'punct_comma2', group: G1, cat: 'punct', title: 'ลูกน้ำ (,) ตอนที่ 2', th: 'ข้อมูลเสริม + comma splice', tense: null,
    intro: 'สามเรื่องที่คนไทยผิดบ่อยสุด: (1) ใช้ , เชื่อมสองประโยคเต็มโดยไม่มีคำเชื่อม (comma splice) (2) ใส่ , ผิดที่ เช่น ระหว่างประธานกับกริยา (3) ลืมคู่ , ที่ล้อมข้อมูลเสริม',
    form: 'S, who/which + ข้อมูลเสริม, V · S + V; however, S + V · ❌ S + V, S + V', neg: '', ques: '',
    use: ['ข้อมูลเสริม (ตัดแล้วประโยคยังสมบูรณ์) ใส่ , สองข้าง: My teacher, who is very kind, helped me.', 'ข้อมูลจำเป็น (ตัดแล้วความหมายเปลี่ยน) ไม่ใส่: The students who studied hard passed.', 'which ที่เป็นข้อมูลเสริมมี comma · that ไม่มี comma', 'comma splice ❌: Technology is useful, it saves time. → ใช้ . หรือ ; หรือ , and หรือ because', 'however / therefore / moreover คั่นสองประโยค ใช้ ; นำหน้า: ...; however, ...', 'ห้ามคั่นประธานกับกริยา และไม่ต้องใส่ก่อน because / that กลางประโยค'], signals: ['who', 'which', 'however', ';'],
    trick: 'ทดสอบ "ตัดออก": ตัดวลีระหว่าง comma ทิ้ง ถ้าประโยคยังสมบูรณ์ = ข้อมูลเสริม ใส่สองข้างได้ · ทดสอบ "ประโยคเต็ม": ก่อนและหลัง , เป็นประโยคเต็มทั้งคู่และไม่มี and/but/so = comma splice แก้ทันที',
    ex: [['My brother, who lives in Chiang Mai, is a doctor.', 'ข้อมูลเสริมล้อมด้วย comma'], ['Technology is useful because it saves time.', 'แก้ comma splice ด้วย because'], ['Technology has improved our lives; however, it has also created new problems.', '; + however,']],
    quiz: [['Which sentence has a comma splice?', ['Technology is useful, it saves time.', 'Technology is useful because it saves time.', 'Technology is useful; it saves time.', 'Technology is useful, and it saves time.'], 'A', 'สองประโยคเต็มถูก , เชื่อมโดยไม่มีคำเชื่อม'], ['Choose the correct sentence (the speaker has only one brother).', ['My brother who lives in Chiang Mai is a doctor.', 'My brother, who lives in Chiang Mai is a doctor.', 'My brother, who lives in Chiang Mai, is a doctor.', 'My brother who lives, in Chiang Mai, is a doctor.'], 'C', 'ข้อมูลเสริมล้อมด้วย comma ทั้งสองข้าง'], ['Choose the correct sentence.', ['Many people use cars, however, public transport is cheaper.', 'Many people use cars however public transport is cheaper.', 'Many people use cars; however, public transport is cheaper.', 'Many people use cars, however public transport is cheaper.'], 'C', 'however คั่นสองประโยคเต็ม ใช้ ; นำหน้า']] },
  { id: 'punct_other', group: G1, cat: 'punct', title: "; : และ '", th: 'semicolon colon apostrophe', tense: null,
    intro: 'ถ้าไม่แน่ใจเรื่อง ; และ : ให้ใช้ . แทนได้เสมอ ปลอดภัยกว่า แต่ apostrophe (\') ต้องแม่น เพราะใช้บ่อย: บอกการย่อและความเป็นเจ้าของ',
    form: "S + V; S + V · ประโยคเต็ม: รายการ · John's book / the students' books", neg: '', ques: '',
    use: ['; เชื่อมสองประโยคเต็มที่เรื่องเกี่ยวกันมาก: Some people prefer cities; others prefer villages.', ': ตามหลังประโยคเต็มเพื่อนำรายการ/คำอธิบาย: There are three reasons: cost, time, and safety.', "' ย่อคำ: don't = do not (essay วิชาการควรเขียนเต็ม)", "' เจ้าของ: John's book · the students' books (นักเรียนหลายคน)", "its = ของมัน (ไม่มี ') · it's = it is", 'ไม่ใส่ : หลังกริยาหรือคำขยายที่ประโยคยังไม่ครบ (❌ I need: a pen.)'], signals: [],
    trick: "'; = จุดแบบอ่อน : = ต่อไปนี้คือ ... ' = ตัวอักษรหายหรือของใคร  ถ้าลังเลระหว่าง its / it's ให้แทนด้วย it is ถ้าอ่านรู้เรื่องใช้ it's ไม่งั้นใช้ its",
    ex: [['Some people prefer cities; others prefer villages.', 'semicolon เชื่อมสองประโยคเต็ม'], ['There are three reasons: cost, time, and safety.', 'colon นำรายการ'], ["The students' books were on the table.", 'หนังสือของนักเรียนหลายคน']],
    quiz: [['Choose the correct sentence.', ["The dog wagged it's tail.", "The dog wagged its' tail.", 'The dog wagged its tail.', 'The dog wagged it tail.'], 'C', "its = ของมัน ไม่มี '"], ['Choose the correct sentence (many students).', ['The students books are on the desk.', "The students' books are on the desk.", "The students's books are on the desk.", "The student's' books are on the desk."], 'B', "นามพหูพจน์ที่ลงท้าย s ใส่ ' หลัง s"], ['Choose the correct sentence.', ['I need: three things, a pen, a book, and a pencil.', 'I need three things; a pen, a book, and a pencil.', 'I need three things: a pen, a book, and a pencil.', 'I need three things, a pen: a book, and a pencil.'], 'C', 'ก่อน : ต้องเป็นประโยคเต็ม แล้วตามด้วยรายการ']] },
  { id: 'essay_overview', group: G2, cat: 'essay', title: 'ภาพรวม IELTS Writing Task 2', th: 'โครงสร้าง + เกณฑ์ 4 ข้อ', tense: null,
    intro: 'Task 2 คือเรียงความอย่างน้อย 250 คำ ใช้เวลาราว 40 นาที ให้คะแนนสองเท่าของ Task 1 กรรมการให้คะแนน 4 เกณฑ์เท่าๆ กัน (เกณฑ์ละ 25%) แล้วเฉลี่ยเป็น band',
    form: 'Intro (2-3 ประโยค) → Body 1 → Body 2 → Conclusion (2 ประโยค) รวมราว 250-290 คำ', neg: '', ques: '',
    use: ['Task Response (TR): ตอบโจทย์ครบทุกส่วน มีจุดยืนชัด ขยายด้วยเหตุผลและตัวอย่าง', 'Coherence & Cohesion (CC): แบ่งย่อหน้าชัด ความคิดไหลลื่น ใช้คำเชื่อมพอดี ไม่มากเกิน', 'Lexical Resource (LR): คำศัพท์หลากหลายเหมาะกับหัวข้อ ใช้ collocation ถูก', 'Grammatical Range & Accuracy (GRA): ประโยคหลายแบบ ผิดน้อย รวมถึง . และ ,', 'เวลา: วางแผน 5 นาที · เขียน 30 นาที · ตรวจ 5 นาที', 'น้อยกว่า 250 คำถูกหักคะแนนด้าน Task Response'], signals: [],
    trick: 'จำ "TR-CC-LR-GRA" แล้วถามตัวเองก่อนส่ง: ตอบครบทุกส่วนไหม? แบ่ง 4 ย่อหน้าไหม? ใช้คำหลากหลายไหม? ตรวจ . และ , แล้วหรือยัง?',
    ex: [['Nowadays, many people work from home. This essay will discuss the advantages and disadvantages.', 'Intro: บอกหัวข้อ + บอกสิ่งที่จะเขียน'], ['One major advantage is flexibility. For example, employees can plan their own day.', 'Body: ประเด็น + ตัวอย่าง'], ['In conclusion, remote work offers benefits, but it also has drawbacks.', 'Conclusion: สรุป ไม่เพิ่มไอเดียใหม่']],
    quiz: [['Which is NOT a marking criterion in IELTS Writing?', ['Task Response', 'Handwriting', 'Lexical Resource', 'Coherence and Cohesion'], 'B', 'เกณฑ์มี TR, CC, LR, GRA เท่านั้น ลายมือไม่นับ'], ['What is the minimum word count for Task 2?', ['150', '200', '250', '350'], 'C', 'ต่ำกว่า 250 คำถูกหักคะแนน'], ['Which time plan is best for 40 minutes?', ['Write for 40 minutes without planning', 'Plan 20, write 20', 'Plan 5, write 30, check 5', 'Write 20 and leave early'], 'C', 'วางแผนสั้นๆ เขียนเป็นหลัก แล้วเหลือเวลาตรวจ . , และสะกด']] },
  { id: 'essay_task', group: G2, cat: 'essay', title: 'วิเคราะห์โจทย์ + 5 ประเภท', th: 'อ่านโจทย์แล้วรู้ว่าต้องตอบอะไร', tense: null,
    intro: 'คะแนน Task Response ขึ้นกับว่า "ตอบครบทุกส่วนของโจทย์" หรือไม่ ก่อนเขียนให้ขีดเส้นใต้ 3 อย่าง: หัวข้อ · คำสั่ง (agree? discuss? why? solutions?) · ขอบเขต (young people / in your country)',
    form: 'หัวข้อ + คำสั่ง + ขอบเขต → เลือกโครงสร้างให้ตรงประเภทโจทย์', neg: '', ques: '',
    use: ['Opinion: "To what extent do you agree?" → จุดยืนชัดเจนและคงที่', 'Discussion: "Discuss both views and give your opinion" → อธิบายสองฝั่ง + ความเห็น', 'Problem–Solution: "What problems...? What solutions...?" → ตอบทั้งปัญหาและทางแก้', 'Advantages–Disadvantages: "Do the advantages outweigh the disadvantages?" → เลือกฝั่ง + ให้เหตุผลทั้งสองด้าน', 'Two-part: มี 2 คำถามแยกกัน → ตอบทีละคำถามทีละย่อหน้า', 'ตอบ "ไม่ครบ" เช่น ลืมให้ความเห็นหรือลืมทางแก้ เป็นข้อผิดที่หักคะแนนมากที่สุด'], signals: ['To what extent', 'Discuss both views', 'What problems', 'outweigh'],
    trick: 'อ่านคำสั่งท้ายโจทย์ก่อนเสมอ: "agree" = Opinion · "both views" = Discussion · "problems ... solutions" = Problem–Solution · "outweigh" = Adv–Disadv · มีเครื่องหมาย ? สองข้อ = Two-part แล้วทำเช็กลิสต์ในใจว่า "ตอบครบทุกส่วนแล้วหรือยัง"',
    ex: [['To what extent do you agree or disagree?', 'Opinion'], ['Discuss both views and give your own opinion.', 'Discussion'], ['What are the causes of this problem, and what can be done to solve it?', 'Problem–Solution']],
    quiz: [['"Do the advantages of tourism outweigh its disadvantages?" is which type?', ['Opinion', 'Discussion', 'Advantages–Disadvantages', 'Two-part'], 'C', 'outweigh บอกให้เทียบข้อดี-ข้อเสียแล้วเลือกฝั่ง'], ['"What problems does this cause, and what solutions can you suggest?" must be answered with…', ['only the problems', 'both problems and solutions', 'only your opinion', 'a story'], 'B', 'โจทย์มี 2 คำสั่ง ต้องตอบทั้งปัญหาและทางแก้'], ['"Discuss both views and give your opinion." What is the minimum you must include?', ['One view only', 'Both views and your own opinion', 'Only your opinion', 'A list of facts'], 'B', 'ต้องมีสองมุมมองและความเห็นของตัวเอง']] },
  { id: 'essay_intro', group: G2, cat: 'essay', title: 'ย่อหน้าแรก: Paraphrase + Thesis', th: 'เปิดเรื่องให้ตอบโจทย์ทันที', tense: null,
    intro: 'ย่อหน้าแรกมี 2 หน้าที่: (1) เล่าหัวข้อด้วยคำของคุณเอง (paraphrase) (2) บอกจุดยืนหรือสิ่งที่จะเขียน (thesis) ใช้ 2-3 ประโยค ราว 40-50 คำ ห้ามมีตัวอย่างหรือรายละเอียด',
    form: 'Background/paraphrase sentence + Thesis sentence', neg: '', ques: '',
    use: ['ห้ามลอกโจทย์ทั้งประโยค เปลี่ยนคำ: some people → many individuals · believe → argue · important → essential', 'Thesis ตอบโจทย์ตรงๆ: In my opinion, ... / This essay will discuss both views and argue that ...', 'บอกเหตุผลคร่าวๆ 2 ข้อ ให้ผู้อ่านรู้ว่าจะเจออะไรในย่อหน้าถัดไป', 'comma หลัง Nowadays, / In recent years, / In my opinion, (ไม่ต้อง comma หลัง that)', 'ไม่เขียนว่า "I will write about..." แบบเด็กๆ ใช้ This essay will ...'], signals: ['Nowadays,', 'In my opinion,', 'This essay will'],
    trick: 'สูตร 2 ประโยค: [Nowadays, + หัวข้อที่ paraphrase]. [In my opinion, + จุดยืน + because + เหตุผล 2 ข้อ].',
    ex: [['Nowadays, there is a debate over whether school pupils should be required to wear uniforms. In my opinion, uniforms are beneficial because they promote equality and reduce distractions.', 'โจทย์: Some people think students should wear uniforms. (paraphrase + thesis)']],
    quiz: [['Which sentence is the best thesis?', ['Uniforms are things that schools have.', 'In my opinion, uniforms are beneficial because they promote equality and reduce distractions.', 'I will write about uniforms.', 'Many students go to school.'], 'B', 'จุดยืนชัด + เหตุผลคร่าวๆ'], ['Which should NOT appear in the introduction?', ['A paraphrase of the question', 'A clear position', 'A detailed personal example', 'A short outline of the essay'], 'C', 'ตัวอย่างละเอียดเก็บไว้ในย่อหน้าเนื้อหา'], ['Which is a good paraphrase of "Some people believe that..."?', ['Some people believe that...', 'Many individuals argue that...', 'I think that...', 'Some people say that...'], 'B', 'เปลี่ยนทั้งคำนามและกริยา']] },
  { id: 'essay_body', group: G2, cat: 'essay', title: 'ย่อหน้าเนื้อหา: PEEL', th: 'ประเด็น อธิบาย ตัวอย่าง โยงกลับ', tense: null,
    intro: 'ย่อหน้าเนื้อหา 1 ย่อหน้า = 1 ไอเดียหลัก ราว 70-90 คำ ใช้สูตร PEEL: Point (ประเด็น) → Explain (อธิบายว่าทำไม) → Example (ตัวอย่างเจาะจง) → Link (โยงกลับโจทย์)',
    form: 'P: Topic sentence · E: เหตุผล · E: ตัวอย่าง · L: ประโยคโยงกลับ', neg: '', ques: '',
    use: ['Point: One major benefit of ... is that ...', 'Explain: This means that ... / As a result, ...', 'Example: For example, in Finland, ... (เจาะจง ไม่ใช่ "many people")', 'Link: Therefore, ... โยงกลับจุดยืน', 'ไม่ยัดหลายไอเดียในย่อหน้าเดียว แยกเป็นอีกย่อหน้า', 'เว้นบรรทัดว่างระหว่างย่อหน้า'], signals: ['One major', 'This means', 'For example,', 'Therefore,'],
    trick: 'ถามทุกย่อหน้า: "อ่านประโยคแรกแล้วรู้ไหมว่าย่อหน้านี้จะพูดเรื่องอะไร?" ถ้าไม่ topic sentence ยังไม่ชัด · และทุกประโยคต่อจากนั้นต้อง "ช่วยอธิบายหรือพิสูจน์" ประโยคแรก',
    ex: [['One major benefit of remote work is flexibility. This means that employees can plan their day around their most productive hours. For example, a designer in Chiang Mai can work late at night and avoid traffic. Therefore, flexible schedules improve both well-being and efficiency.', 'ย่อหน้า PEEL ครบ 4 ส่วน']],
    quiz: [['What does the first E in PEEL stand for?', ['Example', 'Explain', 'Essay', 'End'], 'B', 'P-E-E-L = Point, Explain, Example, Link'], ['Which is the best topic sentence?', ['Cars are cars.', 'One major drawback of private cars is that they cause serious air pollution.', 'I like trains.', 'Another thing.'], 'B', 'บอกประเด็นของทั้งย่อหน้าชัดเจน'], ['Which sentence is a specific example?', ['Many people like it.', 'This is good for everyone.', 'For example, in Bangkok, the BTS carries over 600,000 passengers a day.', 'It depends.'], 'C', 'ตัวอย่างต้องเจาะจง (สถานที่/ตัวเลข/กรณีจริง)']] },
  { id: 'essay_conclusion', group: G2, cat: 'essay', title: 'ย่อหน้าสรุป', th: 'ย้ำจุดยืน ไม่เพิ่มไอเดียใหม่', tense: null,
    intro: 'ย่อหน้าสรุปสั้นๆ 2-3 ประโยค ทำสองอย่าง: ย้ำจุดยืนด้วยถ้อยคำใหม่ + สรุปเหตุผลหลักๆ ห้ามเพิ่มไอเดียหรือตัวอย่างใหม่',
    form: 'In conclusion, + จุดยืน (paraphrase thesis) + สรุป 2 เหตุผล', neg: '', ques: '',
    use: ['ขึ้นต้นด้วยคำสรุปแล้วใส่ comma: In conclusion, / To sum up, / Overall,', 'ย้ำจุดยืนเดิม เปลี่ยนคำให้ไม่ซ้ำ thesis ทุกตัวอักษร', 'สรุปเหตุผลหลักอย่างสั้น: ... because of A and B', 'อาจปิดด้วยข้อเสนอ/คำทำนายสั้นๆ ที่เกี่ยวกับจุดยืนเดิม', 'ห้ามเพิ่มประเด็นใหม่ที่ยังไม่ได้พูดมาก่อน'], signals: ['In conclusion,', 'To sum up,', 'Overall,'],
    trick: 'สูตร: In conclusion, [จุดยืนเดิมด้วยคำใหม่] because [เหตุผล 1] and [เหตุผล 2]. ตรวจ: "มีอะไรในย่อหน้านี้ที่ไม่เคยพูดมาก่อนไหม?" ถ้ามี ลบออก',
    ex: [['In conclusion, I firmly believe that school uniforms are worthwhile, as they encourage equality and help students focus on learning.', 'ย้ำจุดยืน + สรุปเหตุผล']],
    quiz: [['Which is the best opening of a conclusion?', ['Firstly,', 'In conclusion,', 'For example,', 'However,'], 'B', 'ใช้คำสรุป + comma'], ['What should a conclusion NOT contain?', ['A restated position', 'A summary of main reasons', 'A completely new argument', 'A short final comment'], 'C', 'ห้ามเพิ่มไอเดียใหม่'], ['Which conclusion restates the opinion with new words?', ['Uniforms are good. Uniforms are good.', 'In conclusion, I strongly believe that uniforms are beneficial for pupils.', 'Also, many schools are big.', 'It depends.'], 'B', 'ย้ำจุดยืนเดิมด้วยคำใหม่']] },
  { id: 'essay_linking', group: G2, cat: 'essay', title: 'คำเชื่อม (Cohesion)', th: 'ใช้ให้ถูกหน้าที่ + ใส่ . , ให้ถูก', tense: null,
    intro: 'คำเชื่อมช่วยให้ความคิดไหลลื่น แต่ใช้มากไปหรือผิดหน้าที่ก็เสียคะแนน เลือกตาม "หน้าที่" แล้วดูว่าคำนั้นต้องตามด้วยอะไร (ประโยคเต็มหรือนาม) และต้องใส่เครื่องหมายอะไร',
    form: 'Although + S + V, S + V · Despite + noun/V-ing, S + V · S + V; however, S + V · Because + S + V / Because of + noun', neg: '', ques: '',
    use: ['เพิ่มข้อมูล: In addition, / Moreover, / Furthermore, (ขึ้นต้นประโยค + comma)', 'ขัดแย้ง: However, / On the other hand, / Although + ประโยค / Despite + นาม', 'เหตุผล: because + ประโยค · because of + นาม · As a result, / Therefore,', 'ตัวอย่าง: For example, / For instance, / such as + รายการ', 'เรียงลำดับ: Firstly, / Secondly, / Finally,', 'สรุป: In conclusion, / To sum up, / Overall,', 'ใช้คำเดียวกันไม่เกิน 2 ครั้งต่อ essay'], signals: ['However,', 'Although', 'Despite', 'Therefore,'],
    trick: 'ถาม 2 ข้อ: (1) หน้าที่อะไร? (เพิ่ม/ขัดแย้ง/เหตุผล/ตัวอย่าง/ลำดับ/สรุป) (2) ตามด้วยประโยคเต็มหรือนาม? Although/Because + ประโยคเต็ม · Despite/Because of + นาม · However/Therefore = ขึ้นต้นประโยคใหม่ มี comma',
    ex: [['Although public transport is cheaper, many people still prefer cars.', 'Although + ประโยค + comma'], ['Despite the high cost, many people still prefer cars.', 'Despite + นาม + comma'], ['Public transport is cheaper; however, many people still prefer cars.', '; however,']],
    quiz: [['Choose the correct sentence.', ['Despite it was expensive, we bought it.', 'Despite the high price, we bought it.', 'Although the high price, we bought it.', 'Because the high price we bought it.'], 'B', 'Despite ตามด้วยนาม (the high price)'], ['Choose the correct punctuation.', ['It is cheap, however it is slow.', 'It is cheap however, it is slow.', 'It is cheap; however, it is slow.', 'It is cheap however it, is slow.'], 'C', 'however คั่นสองประโยคเต็ม ใช้ ; และ , ตามหลัง'], ['Which connector shows CONTRAST?', ['Moreover', 'For example', 'On the other hand', 'In conclusion'], 'C', 'On the other hand = ขัดแย้ง']] },
  { id: 'essay_style', group: G2, cat: 'essay', title: 'ภาษา Academic + ข้อผิดที่เจอบ่อย', th: 'เขียนให้ดูเป็นทางการ', tense: null,
    intro: 'Essay วิชาการใช้ภาษาที่เป็นทางการ ไม่ฟันธงเกินไป และไม่พูดกันเอง รวมถึงไม่ปล่อยประโยคยาวติดกันโดยไม่มีจุด (run-on)',
    form: 'ภาษาทางการ + hedging + ประโยคที่จบด้วยจุดเป็นระยะ', neg: '', ques: '',
    use: ['ไม่ใช้ตัวย่อ: don\'t → do not · it\'s → it is', 'เลี่ยงคำพูดกันเอง: a lot of → many · kids → children · get → obtain/receive · thing → factor/aspect', 'ใช้ hedging ไม่ฟันธง: tend to, may, can, is likely to (เลี่ยง always / never / everyone)', 'In my opinion ใช้ 1 ครั้งพอ ไม่ต้อง I think ทุกประโยค', 'ประโยคยาวติดกันไม่มีจุด (run-on) ให้แบ่งด้วย . หรือเชื่อมด้วย because/although', 'ทบทวนก่อนส่ง: ตัวพิมพ์ใหญ่ · . · , · การสะกด · a/an/the'], signals: [],
    trick: 'ก่อนส่ง อ่านออกเสียงในใจ ที่ไหนหายใจ/หยุด ตรงนั้นควรมี , หรือ . ถ้าอ่านรวดเดียว 3 บรรทัดไม่จบ แปลว่า run-on',
    ex: [['Many students tend to rely on technology, which may reduce their ability to concentrate.', 'hedging: tend to / may'], ['Children often spend too much time on their phones.', 'kids → children']],
    quiz: [['Which sentence is more formal?', ["Kids don't get enough sleep.", 'Children do not get enough sleep.', "Kids can't sleep.", 'Lots of kids sleep bad.'], 'B', 'เขียนเต็ม ไม่ใช้ตัวย่อและคำพูดกันเอง'], ['Which sentence uses hedging?', ['Technology always harms children.', 'Technology may harm children if they overuse it.', 'Everyone hates technology.', 'Technology never helps.'], 'B', 'may / if ทำให้ไม่ฟันธงเกินไป'], ['Which is a run-on sentence?', ['Many people use cars, but trains are cheaper.', 'Cars are convenient they are fast and many people use them every day.', 'Cars are convenient. They are also fast.', 'Because cars are fast, many people use them.'], 'B', 'สองประโยคเต็มติดกันโดยไม่มีจุดหรือคำเชื่อม']] }
];
if (typeof GC !== 'undefined' && Array.isArray(GC.LESSONS) && !GC.LESSONS.some(l => l.id === 'punct_basics')) GC.LESSONS.push(...WR.LESSONS);
if (typeof module !== 'undefined') module.exports = WR;
