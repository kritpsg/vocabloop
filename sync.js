/* ตรรกะรวมข้อมูลสองเครื่อง (ไม่ใช้ DOM/เครือข่าย — ทดสอบด้วย node ได้)
   หลักคิด: การ์ดจับคู่ด้วย "ชุดคำ|คำ" (id ของแต่ละเครื่องไม่ตรงกัน) · ความคืบหน้าการเรียน (PROG) ใช้ของฝั่งที่ทบทวนล่าสุด (rmod)
   · เนื้อหาการ์ด (คำแปล ตัวอย่าง ฯลฯ) ใช้ของฝั่งที่แก้ล่าสุด (mod) · การลบใช้ป้ายหลุมศพ (db.del) · ตัวเลขสะสม (log/xp/stats) เอาค่ามากสุด */
const SYNC = (() => {
  const PROG = ['state', 'step', 'due', 'ivl', 'ease', 'reps', 'lapses', 'known', 'lastRev', 'use', 'mine'];
  const META = ['id', 'created', 'mod', 'rmod'];
  const nrm = w => String(w).trim().toLowerCase();
  const ck = c => c.deck + '|' + nrm(c.word);
  const num = v => (typeof v === 'number' && isFinite(v) ? v : 0);
  const score = c => num(c.reps) + num(c.lapses);
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

  function index(list) { // key -> card (คำซ้ำในชุดเดียวกันใส่ #n ต่อท้าย)
    const m = new Map(), cnt = {};
    for (const c of list) { if (!c || !c.word) continue; const k = ck(c), n = (cnt[k] = (cnt[k] || 0) + 1); m.set(n > 1 ? k + '#' + n : k, c); }
    return m;
  }
  const sigs = c => [PROG.map(f => JSON.stringify(c[f])).join('|'), JSON.stringify(Object.keys(c).filter(k => !PROG.includes(k) && !META.includes(k)).sort().map(k => [k, c[k]]))];

  /* บันทึกสถานะเริ่มต้น (ตอนโหลด) โดยไม่ประทับเวลา */
  function snapshot(cards, map) { map.clear(); for (const c of cards) map.set(c.id, sigs(c)); }
  /* เรียกทุกครั้งที่ save: ประทับเวลาให้การ์ดที่เปลี่ยน (การ์ดใหม่ = เปลี่ยนทั้งคู่) */
  function stamp(cards, map, now) {
    for (const c of cards) {
      const s = sigs(c), o = map.get(c.id);
      if (!o) { c.mod = now; c.rmod = now; } else { if (o[0] !== s[0]) c.rmod = now; if (o[1] !== s[1]) c.mod = now; }
      map.set(c.id, s);
    }
  }

  function mergeCard(l, r) {
    const out = { ...l }, lr = num(l.rmod), rr = num(r.rmod);
    if (rr > lr || (rr === lr && score(r) > score(l))) for (const f of PROG) { if (f in r) out[f] = r[f]; else delete out[f]; }
    if (num(r.mod) > num(l.mod)) for (const k of Object.keys(r)) if (!PROG.includes(k) && !META.includes(k)) out[k] = r[k];
    out.rmod = Math.max(lr, rr); out.mod = Math.max(num(l.mod), num(r.mod));
    const cr = Math.min(num(l.created) || Infinity, num(r.created) || Infinity); if (isFinite(cr)) out.created = cr;
    return out;
  }

  const maxObj = (a, b) => { const o = { ...(a || {}) }; for (const [k, v] of Object.entries(b || {})) o[k] = Math.max(num(o[k]), num(v)); return o; };
  const unionBy = (a, b, key) => { const seen = new Set((a || []).map(key)), out = [...(a || [])]; for (const x of b || []) { const k = key(x); if (!seen.has(k)) { seen.add(k); out.push(x); } } return out; };
  const jk = x => JSON.stringify(x);

  /* รวม remote เข้า local (แก้ local ตรงๆ แล้วคืนค่า) ไม่แตะ settings/newToday/auto ซึ่งเป็นของแต่ละเครื่อง */
  function mergeDb(local, remote, uid) {
    local = local || {}; if (!remote) return local;
    uid = uid || (() => Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
    // การลบ
    local.del = maxObj(local.del, remote.del);
    // การ์ด
    const lm = index(local.cards || []), rm = index(remote.cards || []), out = [], used = new Set((local.cards || []).map(c => c.id));
    const keyOf = new Map([...lm].map(([k, c]) => [c, k]));
    for (const c of local.cards || []) { const r = rm.get(keyOf.get(c)); out.push(r ? mergeCard(c, r) : c); }
    for (const [k, r] of rm) if (!lm.has(k)) { const c = { ...r }; if (!c.id || used.has(c.id)) c.id = uid(); used.add(c.id); out.push(c); }
    local.cards = out.filter(c => { const t = num(local.del[ck(c)]); return !(t && t > Math.max(num(c.mod), num(c.rmod))); });
    // ประวัติรายวัน: ถ้าฝั่งใดรีเซ็ตทีหลัง ใช้ log ของฝั่งนั้น
    const lz = num(local.resetAt), rz = num(remote.resetAt);
    if (rz > lz) { local.log = { ...(remote.log || {}) }; local.resetAt = rz; } else if (rz === lz) local.log = maxObj(local.log, remote.log);
    local.xp = Math.max(num(local.xp), num(remote.xp));
    local.badges = { ...(remote.badges || {}), ...(local.badges || {}) };
    local.stats = maxObj(local.stats, remote.stats);
    local.goalDate = local.goalDate || remote.goalDate || '';
    // การอ่าน
    local.passages = unionBy(local.passages, remote.passages, p => p && p.id);
    local.attempts = unionBy(local.attempts, remote.attempts, a => a && a.id).sort((x, y) => num(x && x.date) - num(y && y.date));
    local.reading = { ...(local.reading || {}) };
    for (const [id, r] of Object.entries(remote.reading || {})) { const o = local.reading[id]; if (!o || (r && num(r.score) > num(o.score))) local.reading[id] = r; }
    local.snap = { ...(remote.snap || {}), ...(local.snap || {}) };
    local.rev = { ...(remote.rev || {}), ...(local.rev || {}) };
    local.sent = unionBy(local.sent, remote.sent, jk);
    // สมุดความผิดพลาด: รวมตาม id (อีกเครื่องแก้สำเร็จแล้ว = fixed ชนะ)
    const mm = new Map((local.mist || []).filter(m => m && m.id).map(m => [m.id, m]));
    for (const m of remote.mist || []) { if (!m || !m.id) continue; const o = mm.get(m.id); if (!o) mm.set(m.id, m); else if (m.fixed && !o.fixed) o.fixed = m.fixed; }
    local.mist = [...mm.values()].sort((x, y) => num(x.t) - num(y.t) || (x.id < y.id ? -1 : 1)).slice(-600);
    // แกรมม่า/คอร์ส
    const g = local.gram = { topics: {}, miss: [], ...(local.gram || {}) }, rg = remote.gram || {};
    for (const [k, v] of Object.entries(rg.topics || {})) { const o = g.topics[k]; if (!o || num(v && v.n) > num(o.n)) g.topics[k] = v; }
    g.miss = unionBy(g.miss, rg.miss, jk).slice(-200);
    const c = local.course = { done: {}, tense: {}, asked: 0, ...(local.course || {}) }, rc = remote.course || {};
    c.done = { ...c.done }; for (const [k, v] of Object.entries(rc.done || {})) { const o = c.done[k]; if (!o || num(v && v.t) > num(o.t)) c.done[k] = v; }
    c.tense = { ...c.tense }; for (const [k, v] of Object.entries(rc.tense || {})) { const o = c.tense[k]; if (!o || num(v && v.n) > num(o.n)) c.tense[k] = v; }
    c.asked = Math.max(num(c.asked), num(rc.asked));
    // แผน/ภารกิจ (ญี่ปุ่น)
    if (isObj(remote.plan)) local.plan = isObj(local.plan) ? (num(remote.plan.start) && num(remote.plan.start) < num(local.plan.start) ? { ...local.plan, start: remote.plan.start } : local.plan) : remote.plan;
    const lmz = local.mission || {}, rmz = remote.mission || {};
    if (rmz.date && (!lmz.date || rmz.date > lmz.date)) local.mission = { ...rmz };
    else if (rmz.date && rmz.date === lmz.date) { const mm = { ...lmz }; for (const k of Object.keys(rmz)) if (typeof rmz[k] === 'number') mm[k] = Math.max(num(mm[k]), rmz[k]); mm.done = !!(lmz.done || rmz.done); local.mission = mm; }
    return local;
  }

  /* ส่วนที่อัปขึ้นคลาวด์: ตัด settings/newToday/auto (ของแต่ละเครื่อง) ออก */
  const strip = d => { if (!d) return null; const { settings, newToday, auto, ...rest } = d; return rest; };
  /* รูปแบบมาตรฐานสำหรับเทียบ/อัปขึ้นคลาวด์: เรียงลิสต์และคีย์ให้เหมือนกันทุกเครื่อง จะได้ไม่อัปซ้ำโดยไม่จำเป็น */
  const bySort = f => (a, b) => (f(a) < f(b) ? -1 : f(a) > f(b) ? 1 : 0);
  function canon(d) {
    const s = strip(d); if (!s) return null;
    s.cards = (s.cards || []).filter(c => c && c.word).map(({ id, ...c }) => c).sort(bySort(c => ck(c)));
    if (s.passages) s.passages = [...s.passages].sort(bySort(p => String(p && p.id)));
    if (s.attempts) s.attempts = [...s.attempts].sort(bySort(x => num(x && x.date) + '|' + String(x && x.id)));
    if (s.sent) s.sent = [...s.sent].sort(bySort(jk));
    if (s.mist) s.mist = [...s.mist].sort(bySort(m => num(m && m.t) + '|' + String(m && m.id)));
    if (s.gram && s.gram.miss) s.gram = { ...s.gram, miss: [...s.gram.miss].sort(bySort(jk)) };
    return s;
  }
  const stable = v => JSON.stringify(v, (k, x) => (isObj(x) ? Object.fromEntries(Object.keys(x).sort().map(key => [key, x[key]])) : x));
  return { PROG, ck, snapshot, stamp, mergeCard, mergeDb, strip, canon, stable };
})();
if (typeof module !== 'undefined') module.exports = SYNC;
