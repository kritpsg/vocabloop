/* คอร์สแกรมม่าพื้นฐาน + ตัวตรวจจับ Tense (ไม่ใช้ DOM/db — ทดสอบด้วย node ได้)
   เนื้อหาเขียนขึ้นใหม่ทั้งหมด ตัวอย่างใช้ป้าย {S ประธาน} {A กริยาช่วย} {V กริยาหลัก} {O กรรม/ส่วนเติม} {T คำบอกเวลา} */
const GC = {};

GC.TENSES = {
  pres_simple: { en: 'Present Simple', th: 'ปัจจุบันธรรมดา' }, pres_cont: { en: 'Present Continuous', th: 'ปัจจุบันกำลังทำ' },
  pres_perf: { en: 'Present Perfect', th: 'ปัจจุบันสมบูรณ์' }, pres_perf_cont: { en: 'Present Perfect Continuous', th: 'ปัจจุบันสมบูรณ์ต่อเนื่อง' },
  past_simple: { en: 'Past Simple', th: 'อดีตธรรมดา' }, past_cont: { en: 'Past Continuous', th: 'อดีตกำลังทำ' },
  past_perf: { en: 'Past Perfect', th: 'อดีตสมบูรณ์' }, past_perf_cont: { en: 'Past Perfect Continuous', th: 'อดีตสมบูรณ์ต่อเนื่อง' },
  fut_simple: { en: 'Future Simple (will)', th: 'อนาคตธรรมดา' }, fut_goingto: { en: 'Be going to', th: 'อนาคตตามแผน/หลักฐาน' },
  fut_cont: { en: 'Future Continuous', th: 'อนาคตกำลังทำ' }, fut_perf: { en: 'Future Perfect', th: 'อนาคตสมบูรณ์' },
  fut_perf_cont: { en: 'Future Perfect Continuous', th: 'อนาคตสมบูรณ์ต่อเนื่อง' }, modal: { en: 'Modal verb', th: 'กริยาช่วยโมดัล (ไม่ใช่ tense)' }
};
GC.TENSE_ORDER = ['pres_simple', 'pres_cont', 'pres_perf', 'pres_perf_cont', 'past_simple', 'past_cont', 'past_perf', 'past_perf_cont', 'fut_simple', 'fut_goingto', 'fut_cont', 'fut_perf'];
GC.ROLE_TH = { S: 'ประธาน (ใคร/อะไร)', A: 'กริยาช่วย', V: 'กริยาหลัก', O: 'กรรม/ส่วนเติม', T: 'คำบอกเวลา' };

/* ---------- บทเรียน ---------- */
// ex: [ประโยคมีป้าย, ไทย]   quiz: [โจทย์ (มี ____), [ตัวเลือก], เฉลย A-D, อธิบาย]
GC.LESSONS = [
  { id: 'basic_sentence', group: 'พื้นฐาน', title: 'ประโยคอังกฤษหน้าตาเป็นยังไง', th: 'S + V + O', tense: null,
    intro: 'ประโยคอังกฤษส่วนใหญ่เรียงเป็น ใคร (S) → ทำอะไร (V) → กับอะไร (O) เหมือนภาษาไทย แต่ "กริยา" ต้องปรับรูปตามเวลา ซึ่งนี่คือเรื่องของ Tense ทั้งหมด จำแค่นี้ก่อน: ถ้าหา "กริยา" เจอ ก็อ่านประโยคออก 80% แล้ว',
    form: 'S (ประธาน) + V (กริยา) + O (กรรม/ส่วนเติม)', use: ['S = คนหรือสิ่งที่ทำ (I, she, the students)', 'V = การกระทำหรือสถานะ (eat, is, studied)', 'O = สิ่งที่ถูกทำ หรือรายละเอียดต่อท้าย'], signals: [],
    trick: 'วิธีหากริยา: ลองเติม "I" หน้าคำนั้น หรือเติม "to" หน้าคำนั้น ถ้าฟังเข้ากันได้ (I eat / to eat) = กริยา ถ้าเติม "the" ได้ (the book) = นาม',
    ex: [['{S I} {V eat} {O rice} {T every day}.', 'ฉันกินข้าวทุกวัน'], ['{S The students} {V read} {O books}.', 'นักเรียนอ่านหนังสือ'], ['{S My brother} {V plays} {O football}.', 'พี่ชายของฉันเล่นฟุตบอล']],
    quiz: [['In "She plays tennis", the verb is ____.', ['She', 'plays', 'tennis', 'the'], 'B', 'กริยา = คำบอกการกระทำ คือ plays'], ['Which word is a verb? "The ____ is open."', ['door', 'open', 'is', 'the'], 'C', 'is เป็นกริยา (be) ส่วน door เป็นนาม open เป็นคำคุณศัพท์'], ['In "They study English", "English" is the ____.', ['subject', 'verb', 'object', 'adverb'], 'C', 'English คือสิ่งที่ถูกเรียน = กรรม (O)']] },
  { id: 'verb_forms', group: 'พื้นฐาน', title: 'กริยา 5 รูป: V1 V2 V3 V-ing V-s', th: 'รูปของกริยา', tense: null,
    intro: 'กริยาตัวเดียวมีได้ 5 รูป และ "รูปที่เห็น" คือเบาะแสแรกที่บอก Tense: V1 (รูปเดิม: go) · V-s (ใช้กับ he/she/it: goes) · V2 (อดีต: went) · V3 (ใช้หลัง have/has/had และ be แบบถูกกระทำ: gone) · V-ing (going) กริยาปกติเติม -ed ได้ทั้ง V2 และ V3 ส่วนกริยาไม่ปกติต้องจำ',
    form: 'go – goes – went – gone – going', use: ['กริยาปกติ: work – worked – worked', 'ไม่ปกติ (ต้องจำ): go–went–gone, see–saw–seen, eat–ate–eaten, take–took–taken, make–made–made, buy–bought–bought, write–wrote–written, come–came–come, do–did–done, have–had–had'], signals: [],
    trick: 'เห็น -ing → ทำอยู่/กำลังทำ · เห็น V3 หลัง have/has/had → "perfect" · เห็น V2 ตัวเดียว → อดีตธรรมดา · เห็น V1/V-s ตัวเดียว → ปัจจุบันธรรมดา',
    ex: [['{S She} {V goes} {O to work} {T every day}.', 'เธอไปทำงานทุกวัน (V-s)'], ['{S She} {V went} {O to work} {T yesterday}.', 'เมื่อวานเธอไปทำงาน (V2)'], ['{S She} {A has} {V gone} {O to work}.', 'เธอไปทำงานแล้ว (V3 หลัง has)']],
    quiz: [['He has ____ his homework. (do)', ['do', 'did', 'done', 'doing'], 'C', 'หลัง has ต้องใช้ V3 ของ do = done'], ['Yesterday I ____ a new phone. (buy)', ['buy', 'buys', 'bought', 'buying'], 'C', 'yesterday = อดีต ใช้ V2 = bought'], ['She is ____ a letter now. (write)', ['write', 'wrote', 'written', 'writing'], 'D', 'is + V-ing = กำลังทำ → writing']] },
  { id: 'aux_verbs', group: 'พื้นฐาน', title: 'กริยาช่วย: be / do / have / will', th: 'ตัวช่วยบอก Tense', tense: null,
    intro: 'กริยาช่วยคือ "ตัวช่วย" ที่ยืนหน้ากริยาหลัก และเป็นเบาะแสที่ดีที่สุดว่าเป็น Tense อะไร: be (am/is/are/was/were) ไปกับ V-ing (กำลังทำ) หรือ V3 (ถูกกระทำ) · have/has/had ไปกับ V3 (perfect) · do/does/did ใช้ทำคำถามและปฏิเสธ · will ไปกับ V1 (อนาคต)',
    form: 'be + V-ing / V3 · have + V3 · do + V1 · will + V1', use: ['do/does/did + not → ทำประโยคปฏิเสธ (กริยาหลักกลับเป็น V1)', 'have/has/had + V3 → perfect', 'am/is/are/was/were + V-ing → continuous'], signals: ['will', 'have', 'has', 'had', 'am', 'is', 'are', 'was', 'were', 'do', 'does', 'did'],
    trick: 'มองหา "ตัวช่วย" ก่อนกริยาหลักเสมอ: will → อนาคต · have/has + V3 → perfect · had + V3 → อดีตสมบูรณ์ · be + V-ing → continuous · did/was/were → อดีต',
    ex: [['{S She} {A does} {A not} {V like} {O coffee}.', 'เธอไม่ชอบกาแฟ'], ['{S They} {A have} {V finished} {O the work}.', 'พวกเขาทำงานเสร็จแล้ว'], ['{S He} {A is} {V reading} {O a book}.', 'เขากำลังอ่านหนังสือ']],
    quiz: [['She ____ not like coffee.', ['do', 'does', 'did', 'is'], 'B', 'she เอกพจน์ปัจจุบัน → does + not + V1'], ['I ____ finished my work.', ['has', 'have', 'am', 'will'], 'B', 'I + have + V3 (finished) = present perfect'], ['He ____ playing football now.', ['do', 'has', 'is', 'will'], 'C', 'now + V-ing → is + playing']] },
  /* ---- Present ---- */
  { id: 'pres_simple', group: 'Present', title: 'Present Simple', th: 'ปัจจุบันธรรมดา', tense: 'pres_simple',
    intro: 'ใช้พูดสิ่งที่ "เป็นประจำ/จริงเสมอ" ไม่ได้เน้นว่ากำลังทำอยู่ตอนนี้: นิสัย กิจวัตร ความจริง ตารางเวลา',
    form: 'S + V1 (he/she/it → V-s/es)', neg: 'S + do/does + not + V1', ques: 'Do/Does + S + V1 ?', use: ['นิสัย/กิจวัตร: She works every day.', 'ความจริงทั่วไป: Water boils at 100°C.', 'ตารางประจำ: The train leaves at 6.'], signals: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'every week', 'on Mondays'],
    trick: 'กริยาตัวเดียว ไม่มีตัวช่วย รูปเดิม (V1) หรือเติม -s → Present Simple · ระวัง he/she/it ต้องมี -s · ถ้ามี do/does ช่วย กริยาหลักจะกลับเป็น V1 (ไม่มี s)',
    ex: [['{S She} {V works} {T every day}.', 'เธอทำงานทุกวัน'], ['{S Water} {V boils} {O at 100 degrees}.', 'น้ำเดือดที่ 100 องศา'], ['{S I} {A don\'t} {V like} {O coffee}.', 'ฉันไม่ชอบกาแฟ']],
    quiz: [['He ____ to school by bus every day.', ['go', 'goes', 'is going', 'went'], 'B', 'every day + he → V-s = goes'], ['Do you ____ English?', ['speak', 'speaks', 'spoke', 'speaking'], 'A', 'หลัง do ใช้ V1 (ไม่เติม s)'], ['The sun ____ in the east.', ['rise', 'rises', 'rose', 'is rising'], 'B', 'ความจริงทั่วไป + the sun (เอกพจน์) → rises']] },
  { id: 'pres_cont', group: 'Present', title: 'Present Continuous', th: 'ปัจจุบันกำลังทำ', tense: 'pres_cont',
    intro: 'ใช้พูดสิ่งที่ "กำลังเกิดขึ้นตอนนี้" หรือชั่วคราวช่วงนี้ และใช้กับแผนในอนาคตใกล้ที่นัดหมายไว้แล้ว',
    form: 'S + am/is/are + V-ing', neg: 'S + am/is/are + not + V-ing', ques: 'Am/Is/Are + S + V-ing ?', use: ['กำลังทำตอนนี้: I am studying now.', 'ชั่วคราวช่วงนี้: He is living in Phuket this month.', 'แผนที่นัดไว้: We are meeting at 5.'], signals: ['now', 'right now', 'at the moment', 'currently', 'these days', 'Look!', 'Listen!'],
    trick: 'มองหา am/is/are + V-ing (เช่น is raining) → Present Continuous · มีคำว่า now / at the moment / Look! ช่วยยืนยัน',
    ex: [['{S I} {A am} {V studying} {T now}.', 'ตอนนี้ฉันกำลังเรียน'], ['{S They} {A are} {V waiting} {O for the bus}.', 'พวกเขากำลังรอรถเมล์'], ['{S It} {A is} {V raining} {T at the moment}.', 'ตอนนี้ฝนกำลังตก']],
    quiz: [['Be quiet! The baby ____.', ['sleeps', 'is sleeping', 'slept', 'has slept'], 'B', 'กำลังเกิดขึ้นตอนนี้ → is sleeping'], ['We ____ dinner at the moment.', ['have', 'are having', 'had', 'will have'], 'B', 'at the moment → are + V-ing'], ['What ____ you ____ now?', ['do / do', 'are / doing', 'did / do', 'have / done'], 'B', 'now → are you doing']] },
  { id: 'pres_perf', group: 'Present', title: 'Present Perfect', th: 'ปัจจุบันสมบูรณ์', tense: 'pres_perf',
    intro: 'ใช้เมื่อเรื่องในอดีต "ยังเกี่ยวกับปัจจุบัน": ประสบการณ์ในชีวิต เพิ่งเสร็จ/ยังไม่เสร็จ หรือเกิดมานานจนถึงตอนนี้ ข้อสังเกตสำคัญ: ไม่ระบุเวลาที่แน่นอนในอดีต (ไม่ใช้ yesterday / last year / in 2019)',
    form: 'S + have/has + V3', neg: 'S + have/has + not + V3', ques: 'Have/Has + S + V3 ?', use: ['ประสบการณ์: I have been to Japan.', 'เพิ่งเสร็จ/ผลยังอยู่: I have lost my keys.', 'ต่อเนื่องถึงตอนนี้: She has lived here for 5 years.'], signals: ['already', 'yet', 'just', 'ever', 'never', 'so far', 'recently', 'since 2020', 'for 3 years'],
    trick: 'เห็น have/has + V3 → Present Perfect · ถ้ามี yesterday / last week / ago ในประโยค แสดงว่าไม่ใช่ perfect (ใช้ Past Simple) · since + จุดเวลา, for + ระยะเวลา คือคู่หู perfect',
    ex: [['{S I} {A have} {T already} {V finished} {O my homework}.', 'ฉันทำการบ้านเสร็จแล้ว'], ['{S She} {A has} {V lived} {O here} {T since 2020}.', 'เธออยู่ที่นี่มาตั้งแต่ปี 2020'], ['{A Have} {S you} {T ever} {V been} {O to Japan}?', 'คุณเคยไปญี่ปุ่นไหม']],
    quiz: [['I ____ here for three years.', ['live', 'have lived', 'lived', 'am living'], 'B', 'for + ระยะเวลา ต่อเนื่องถึงตอนนี้ → have lived'], ['He ____ his keys. He can\'t find them.', ['has lost', 'lost', 'loses', 'is losing'], 'A', 'อดีตที่ส่งผลถึงตอนนี้ (หาไม่เจอ) → has lost'], ['I have never ____ sushi.', ['eat', 'ate', 'eaten', 'eating'], 'C', 'have + V3 ของ eat = eaten']] },
  { id: 'pres_perf_cont', group: 'Present', title: 'Present Perfect Continuous', th: 'ปัจจุบันสมบูรณ์ต่อเนื่อง', tense: 'pres_perf_cont',
    intro: 'คล้าย Present Perfect แต่ "เน้นว่าทำต่อเนื่องมาเรื่อยๆ" ตั้งแต่อดีตจนถึงตอนนี้ (หรือเพิ่งหยุด แล้วยังเห็นผล) มักเน้นระยะเวลา',
    form: 'S + have/has + been + V-ing', neg: 'S + have/has + not + been + V-ing', ques: 'Have/Has + S + been + V-ing ?', use: ['ทำต่อเนื่องมานาน: I have been studying for two hours.', 'เห็นผลจากการทำมาก่อน: He is tired because he has been working all night.'], signals: ['for', 'since', 'all day', 'lately', 'recently', 'how long'],
    trick: 'เห็น have/has + been + V-ing (three words ต่อกัน) → Present Perfect Continuous · มักมี for / since / how long',
    ex: [['{S I} {A have been} {V studying} {T for two hours}.', 'ฉันเรียนมาสองชั่วโมงแล้ว'], ['{S She} {A has been} {V working} {T since morning}.', 'เธอทำงานมาตั้งแต่เช้า'], ['{S It} {A has been} {V raining} {T all day}.', 'ฝนตกมาทั้งวัน']],
    quiz: [['How long have you been ____ English?', ['learn', 'learned', 'learning', 'learns'], 'C', 'have been + V-ing → learning'], ['He is tired because he ____ all night.', ['has been working', 'works', 'worked', 'is working'], 'A', 'ทำต่อเนื่องมาตลอดคืนแล้วเหนื่อยตอนนี้ → has been working'], ['They ____ for the bus since 8 o\'clock.', ['wait', 'have been waiting', 'waited', 'are waiting'], 'B', 'since + จุดเวลา + ต่อเนื่อง → have been waiting']] },
  /* ---- Past ---- */
  { id: 'past_simple', group: 'Past', title: 'Past Simple', th: 'อดีตธรรมดา', tense: 'past_simple',
    intro: 'ใช้พูดเหตุการณ์ที่ "จบไปแล้ว" ในเวลาที่ระบุหรือรู้กันอยู่ (เมื่อวาน ปีที่แล้ว เมื่อ 3 ปีก่อน)',
    form: 'S + V2 (กริยาปกติ + -ed)', neg: 'S + did + not + V1', ques: 'Did + S + V1 ?', use: ['จบแล้วในอดีต: I visited my aunt yesterday.', 'เล่าเรื่องเรียงลำดับ: He woke up, ate, and left.'], signals: ['yesterday', 'last week', 'last year', 'ago', 'in 2010', 'when I was a child'],
    trick: 'กริยารูป V2 (-ed หรือรูปไม่ปกติ เช่น went, saw) ตัวเดียว + คำบอกเวลาในอดีต → Past Simple · ถ้ามี did ช่วย กริยาหลักกลับเป็น V1 (did not go ไม่ใช่ did not went)',
    ex: [['{S I} {V visited} {O my aunt} {T yesterday}.', 'เมื่อวานฉันไปเยี่ยมป้า'], ['{S We} {V went} {O to Phuket} {T last year}.', 'ปีที่แล้วเราไปภูเก็ต'], ['{S He} {A didn\'t} {V come} {O to class}.', 'เขาไม่มาเข้าเรียน']],
    quiz: [['She ____ to Japan in 2019.', ['go', 'went', 'has gone', 'goes'], 'B', 'in 2019 = เวลาอดีตที่ชัดเจน → went'], ['I didn\'t ____ the news.', ['see', 'saw', 'seen', 'seeing'], 'A', 'หลัง did not ใช้ V1'], ['When ____ you arrive yesterday?', ['do', 'did', 'have', 'were'], 'B', 'yesterday → did + V1']] },
  { id: 'past_cont', group: 'Past', title: 'Past Continuous', th: 'อดีตกำลังทำ', tense: 'past_cont',
    intro: 'ใช้พูดสิ่งที่ "กำลังทำอยู่" ณ ช่วงเวลาหนึ่งในอดีต หรือเหตุการณ์ยาวที่ถูกเหตุการณ์สั้นมาแทรก (while / when)',
    form: 'S + was/were + V-ing', neg: 'S + was/were + not + V-ing', ques: 'Was/Were + S + V-ing ?', use: ['ณ เวลาหนึ่งในอดีต: At 8 pm I was cooking.', 'ถูกแทรก: I was sleeping when you called.'], signals: ['while', 'when', 'at 8 pm yesterday', 'all evening'],
    trick: 'เห็น was/were + V-ing → Past Continuous · มักคู่กับ Past Simple: เหตุการณ์ยาว (was sleeping) + เหตุการณ์สั้นมาแทรก (called)',
    ex: [['{S I} {A was} {V sleeping} {T when you called}.', 'ฉันกำลังนอนตอนคุณโทรมา'], ['{S They} {A were} {V playing} {O football} {T at 5 pm}.', 'ตอนห้าโมงเย็นพวกเขากำลังเล่นฟุตบอล'], ['{S She} {A was} {V cooking} {T while he was watching TV}.', 'เธอทำอาหารขณะที่เขาดูทีวี']],
    quiz: [['I ____ TV when the phone rang.', ['was watching', 'watched', 'watch', 'am watching'], 'A', 'เหตุการณ์ยาวถูกแทรก → was watching'], ['At 9 pm last night, they ____ dinner.', ['were having', 'have', 'are having', 'will have'], 'A', 'ณ เวลาที่ระบุในอดีต → were + V-ing'], ['While she ____, he was reading.', ['cooks', 'was cooking', 'cooked', 'cook'], 'B', 'while + กำลังทำพร้อมกันในอดีต → was cooking']] },
  { id: 'past_perf', group: 'Past', title: 'Past Perfect', th: 'อดีตสมบูรณ์', tense: 'past_perf',
    intro: 'ใช้เมื่อมี "สองเหตุการณ์ในอดีต" และอันหนึ่งเกิดก่อนอีกอัน: เหตุการณ์ที่เกิดก่อนใช้ had + V3 (อดีตของอดีต)',
    form: 'S + had + V3', neg: 'S + had + not + V3', ques: 'Had + S + V3 ?', use: ['เกิดก่อนอีกเหตุการณ์ในอดีต: When I arrived, the film had started.'], signals: ['before', 'after', 'by the time', 'already', 'when (+ past simple)'],
    trick: 'เห็น had + V3 → Past Perfect · ถามตัวเองว่า "เรื่องไหนเกิดก่อน" เรื่องที่เกิดก่อนใช้ had + V3 เรื่องที่เกิดทีหลังใช้ Past Simple',
    ex: [['{T When I arrived}, {S the film} {A had} {V started}.', 'ตอนฉันไปถึง หนังเริ่มไปแล้ว'], ['{S She} {A had} {T already} {V left} {T before I came}.', 'เธอไปแล้วก่อนที่ฉันจะมา'], ['{S He} {V said} {S he} {A had} {V seen} {O the movie}.', 'เขาบอกว่าเขาเคยดูหนังเรื่องนั้นมาแล้ว']],
    quiz: [['When I got to the station, the train ____.', ['left', 'had left', 'leaves', 'has left'], 'B', 'รถไฟออกก่อนที่ฉันจะถึง (เกิดก่อน) → had left'], ['He said he ____ the book before.', ['read', 'had read', 'reads', 'has read'], 'B', 'said (อดีต) แล้วเล่าเรื่องก่อนหน้านั้น → had read'], ['By the time we arrived, they ____ dinner.', ['finish', 'finished', 'had finished', 'have finished'], 'C', 'by the time + past simple → อีกฝั่งใช้ had + V3']] },
  { id: 'past_perf_cont', group: 'Past', title: 'Past Perfect Continuous', th: 'อดีตสมบูรณ์ต่อเนื่อง', tense: 'past_perf_cont',
    intro: 'ใช้เมื่อสิ่งหนึ่ง "ทำต่อเนื่องมาก่อน" อีกเหตุการณ์ในอดีต (เน้นระยะเวลาก่อนหน้านั้น) พบน้อยกว่าตัวอื่น แค่จำรูปได้ก็ดีมาก',
    form: 'S + had + been + V-ing', neg: 'S + had + not + been + V-ing', ques: 'Had + S + been + V-ing ?', use: ['ทำมานานก่อนเหตุการณ์ในอดีต: She had been waiting for an hour when he arrived.'], signals: ['for', 'since', 'before', 'when'],
    trick: 'เห็น had + been + V-ing → Past Perfect Continuous (เหมือน Present Perfect Continuous แต่เปลี่ยน have/has เป็น had)',
    ex: [['{S She} {A had been} {V waiting} {T for an hour} {T when he arrived}.', 'เธอรอมาชั่วโมงหนึ่งแล้วตอนที่เขามาถึง'], ['{S They} {A had been} {V working} {T all day}.', 'พวกเขาทำงานมาทั้งวันแล้ว'], ['{S I} {A had been} {V living} {O there} {T since 2015}.', 'ตอนนั้นฉันอยู่ที่นั่นมาตั้งแต่ปี 2015']],
    quiz: [['They were tired because they ____ all day.', ['had been working', 'worked', 'have worked', 'were work'], 'A', 'ทำต่อเนื่องก่อนตอนที่เหนื่อย (อดีต) → had been working'], ['She ____ for an hour when he came.', ['has waited', 'was waiting', 'had been waiting', 'waits'], 'C', 'for an hour + ก่อนเหตุการณ์ในอดีต → had been waiting'], ['The road was wet. It ____ all night.', ['has rained', 'had been raining', 'rains', 'rain'], 'B', 'ทำต่อเนื่องก่อนจะเห็นผลในอดีต → had been raining']] },
  /* ---- Future ---- */
  { id: 'fut_simple', group: 'Future', title: 'Future Simple (will)', th: 'อนาคตธรรมดา', tense: 'fut_simple',
    intro: 'ใช้พูดอนาคตแบบตัดสินใจทันที คำสัญญา คำเสนอ หรือการคาดการณ์จากความคิดเห็น (I think…)',
    form: 'S + will + V1', neg: 'S + will + not (won\'t) + V1', ques: 'Will + S + V1 ?', use: ['ตัดสินใจทันที: I\'ll help you.', 'สัญญา: I will call you tomorrow.', 'คาดการณ์: I think it will rain.'], signals: ['tomorrow', 'next week', 'soon', 'I think', 'probably'],
    trick: 'เห็น will (หรือ \'ll) + V1 → Future Simple · กริยาหลังจาก will เป็นรูปเดิมเสมอ (will go ไม่ใช่ will goes)',
    ex: [['{S I} {A will} {V call} {O you} {T tomorrow}.', 'พรุ่งนี้ฉันจะโทรหาคุณ'], ['{S It} {A will} {V rain} {T tonight}, {S I think}.', 'ฉันคิดว่าคืนนี้ฝนจะตก'], ['{S I} {A won\'t} {V forget} {O you}.', 'ฉันจะไม่ลืมคุณ']],
    quiz: [['I think she ____ the exam.', ['passes', 'will pass', 'passed', 'is passing'], 'B', 'I think + คาดการณ์อนาคต → will pass'], ['Don\'t worry. I ____ help you.', ['will', 'am', 'did', 'have'], 'A', 'เสนอช่วยทันที → will help'], ['They ____ come to the party.', ['won\'t', 'doesn\'t', 'didn\'t', 'hasn\'t'], 'A', 'will not = won\'t + V1']] },
  { id: 'fut_goingto', group: 'Future', title: 'Be going to', th: 'อนาคตตามแผน/หลักฐาน', tense: 'fut_goingto',
    intro: 'ใช้พูดอนาคตที่ "ตั้งใจ/วางแผนไว้แล้ว" หรือ "ทำนายจากหลักฐานที่เห็นตอนนี้" (เห็นเมฆครึ้ม → ฝนจะตก)',
    form: 'S + am/is/are + going to + V1', neg: 'S + am/is/are + not + going to + V1', ques: 'Am/Is/Are + S + going to + V1 ?', use: ['แผนที่ตั้งใจไว้: I am going to study abroad.', 'หลักฐานตรงหน้า: Look at the clouds! It is going to rain.'], signals: ['next month', 'tomorrow', 'Look!', 'I have decided'],
    trick: 'เห็น am/is/are + going to + V1 → Be going to · will = ตัดสินใจตอนพูด, going to = วางแผน/มีหลักฐานมาก่อนแล้ว',
    ex: [['{S I} {A am going to} {V study} {O abroad}.', 'ฉันจะไปเรียนต่างประเทศ (วางแผนไว้)'], ['{S Look at the clouds}! {S It} {A is going to} {V rain}.', 'ดูเมฆสิ ฝนจะตกแล้ว'], ['{S We} {A are going to} {V visit} {O Chiang Mai} {T next month}.', 'เดือนหน้าเราจะไปเชียงใหม่']],
    quiz: [['Look! The car ____ crash!', ['will', 'is going to', 'crashes', 'crashed'], 'B', 'เห็นหลักฐานตรงหน้า → is going to'], ['We ____ visit Chiang Mai next month. We have booked tickets.', ['will', 'are going to', 'visit', 'visited'], 'B', 'วางแผนและจองแล้ว → are going to'], ['She ____ have a baby in May.', ['is going to', 'goes to', 'went to', 'has gone to'], 'A', 'แผน/สิ่งที่รู้ว่าจะเกิด → is going to have']] },
  { id: 'fut_cont', group: 'Future', title: 'Future Continuous', th: 'อนาคตกำลังทำ', tense: 'fut_cont',
    intro: 'ใช้พูดสิ่งที่ "จะกำลังทำอยู่" ณ เวลาหนึ่งในอนาคต (เหมือนเอากล้องไปถ่ายภาพ ณ เวลานั้น)',
    form: 'S + will + be + V-ing', neg: 'S + will + not + be + V-ing', ques: 'Will + S + be + V-ing ?', use: ['ณ เวลาหนึ่งในอนาคต: This time tomorrow, I will be flying to Tokyo.'], signals: ['this time tomorrow', 'at 8 pm tomorrow', 'next week at this time'],
    trick: 'เห็น will + be + V-ing → Future Continuous · มักมีเวลาเฉพาะ เช่น at 8 pm tomorrow',
    ex: [['{T This time tomorrow}, {S I} {A will be} {V flying} {O to Tokyo}.', 'เวลานี้พรุ่งนี้ ฉันจะกำลังบินไปโตเกียว'], ['{S She} {A will be} {V working} {T at 8 pm}.', 'ตอนสองทุ่มเธอจะกำลังทำงานอยู่'], ['{S They} {A will be} {V sleeping} {T at midnight}.', 'ตอนเที่ยงคืนพวกเขาจะกำลังนอน']],
    quiz: [['At 8 pm tomorrow, I ____ TV.', ['will watch', 'will be watching', 'watch', 'watched'], 'B', 'ณ เวลาหนึ่งในอนาคต กำลังทำ → will be watching'], ['This time next week, we ____ on the beach.', ['will lie', 'will be lying', 'lie', 'lay'], 'B', 'this time next week → will be + V-ing'], ['Don\'t call at 7. I ____.', ['will cook', 'will be cooking', 'cook', 'cooked'], 'B', 'ตอน 7 โมงจะกำลังทำอาหารอยู่ → will be cooking']] },
  { id: 'fut_perf', group: 'Future', title: 'Future Perfect', th: 'อนาคตสมบูรณ์', tense: 'fut_perf',
    intro: 'ใช้พูดสิ่งที่ "จะทำเสร็จแล้ว" ก่อนเวลาหนึ่งในอนาคต',
    form: 'S + will + have + V3', neg: 'S + will + not + have + V3', ques: 'Will + S + have + V3 ?', use: ['เสร็จก่อนเวลาในอนาคต: She will have finished the report by Friday.'], signals: ['by Friday', 'by 2030', 'by the time', 'before'],
    trick: 'เห็น will + have + V3 → Future Perfect · มักมี by + เวลา (by Friday, by 2030)',
    ex: [['{S She} {A will have} {V finished} {O the report} {T by Friday}.', 'เธอจะทำรายงานเสร็จภายในวันศุกร์'], ['{T By 2030}, {S he} {A will have} {V graduated}.', 'ภายในปี 2030 เขาจะเรียนจบแล้ว'], ['{S They} {A will have} {V left} {T by then}.', 'ถึงตอนนั้นพวกเขาจะออกไปแล้ว']],
    quiz: [['By 2030, he ____ his degree.', ['will finish', 'will have finished', 'finishes', 'finished'], 'B', 'by + เวลาอนาคต + เสร็จก่อน → will have finished'], ['I ____ the book by tomorrow.', ['will read', 'will have read', 'read', 'am reading'], 'B', 'by tomorrow → will have + V3'], ['By the time you arrive, we ____.', ['will eat', 'will have eaten', 'eat', 'ate'], 'B', 'by the time + ปัจจุบัน → will have + V3']] },
  /* ---- อื่นๆ ---- */
  { id: 'passive', group: 'อื่นๆ', title: 'Passive Voice', th: 'ประโยคถูกกระทำ', tense: null,
    intro: 'ใช้เมื่ออยากเน้น "สิ่งที่ถูกกระทำ" มากกว่าคนทำ: be + V3 และ Tense ดูได้จากรูปของ be (is/was/will be/has been)',
    form: 'S + be + V3', neg: 'S + be + not + V3', ques: 'Be + S + V3 ?', use: ['ปัจจุบัน: English is spoken worldwide.', 'อดีต: The window was broken yesterday.', 'อนาคต: The project will be finished next week.'], signals: ['by (คนทำ)'],
    trick: 'เห็น be + V3 → ประโยคถูกกระทำ · ดู "be" เพื่อรู้ Tense (is/are = ปัจจุบัน, was/were = อดีต, will be = อนาคต, has/have been = perfect)',
    ex: [['{S The window} {A was} {V broken} {T yesterday}.', 'หน้าต่างถูกทุบเมื่อวาน'], ['{S English} {A is} {V spoken} {O worldwide}.', 'ภาษาอังกฤษถูกใช้พูดทั่วโลก'], ['{S The project} {A will be} {V finished} {T next week}.', 'โครงการจะเสร็จสัปดาห์หน้า']],
    quiz: [['The letter ____ yesterday.', ['wrote', 'was written', 'is written', 'writes'], 'B', 'จดหมายถูกเขียน + yesterday → was written'], ['Rice ____ in Thailand.', ['grows', 'is grown', 'grew', 'is growing'], 'B', 'ข้าวถูกปลูก (ความจริงทั่วไป) → is grown'], ['The bridge ____ next year.', ['completes', 'will be completed', 'will complete', 'is completing'], 'B', 'สะพานถูกสร้างเสร็จในอนาคต → will be completed']] }
];

/* ---------- วิธีจับ Tense ใน 10 วินาที ---------- */
GC.TRICK_STEPS = [
  ['1', 'หา "กริยาหลัก" ก่อน', 'ลองใส่ "I …" หรือ "to …" หน้าคำนั้น ถ้าฟังเข้ากัน (I eat / to eat) = กริยา'],
  ['2', 'ดู "ตัวช่วย" ที่ยืนหน้ากริยา', 'will · have/has/had · am/is/are/was/were · do/does/did — คำเหล่านี้บอก Tense ได้เกือบทั้งหมด'],
  ['3', 'ดู "รูปกริยา"', 'V1 / V-s · V2 (อดีต) · V3 (หลัง have/had/be) · V-ing (กำลังทำ)'],
  ['4', 'ดู "คำบอกเวลา"', 'yesterday, now, since, for, already, tomorrow, by Friday … ช่วยยืนยันว่าเดาถูก'],
  ['5', 'ประกอบร่างด้วยตารางสูตร', 'ใช้ตารางด้านล่าง: ตัวช่วย + รูปกริยา = Tense']
];
GC.TRICK_TABLE = [
  ['ไม่มีตัวช่วย + V1 / V-s', 'Present Simple', 'She works.'], ['ไม่มีตัวช่วย + V2', 'Past Simple', 'She worked.'],
  ['am/is/are + V-ing', 'Present Continuous', 'She is working.'], ['was/were + V-ing', 'Past Continuous', 'She was working.'],
  ['have/has + V3', 'Present Perfect', 'She has worked.'], ['had + V3', 'Past Perfect', 'She had worked.'],
  ['have/has + been + V-ing', 'Present Perfect Continuous', 'She has been working.'], ['had + been + V-ing', 'Past Perfect Continuous', 'She had been working.'],
  ['will + V1', 'Future Simple', 'She will work.'], ['am/is/are + going to + V1', 'Be going to', 'She is going to work.'],
  ['will + be + V-ing', 'Future Continuous', 'She will be working.'], ['will + have + V3', 'Future Perfect', 'She will have worked.'],
  ['be + V3 (ไม่ว่า tense ไหน)', 'Passive (ถูกกระทำ)', 'The work is done.']
];

/* ---------- ทริค "สองแกน": ตัวช่วยบอกเวลา, ส่วนต่อท้ายบอกลักษณะ (ตาราง 3x4) ---------- */
GC.GRID_COLS = [['Simple', 'ธรรมดา'], ['Continuous', 'กำลังทำ'], ['Perfect', 'เสร็จ/ผลติดมา'], ['Perfect Continuous', 'ทำต่อเนื่องมา']];
GC.GRID = [
  ['Present (ตอนนี้)', [['V1 / V-s', 'pres_simple'], ['am/is/are + V-ing', 'pres_cont'], ['have/has + V3', 'pres_perf'], ['have/has + been + V-ing', 'pres_perf_cont']]],
  ['Past (อดีต)', [['V2', 'past_simple'], ['was/were + V-ing', 'past_cont'], ['had + V3', 'past_perf'], ['had + been + V-ing', 'past_perf_cont']]],
  ['Future (อนาคต)', [['will + V1', 'fut_simple'], ['will be + V-ing', 'fut_cont'], ['will have + V3', 'fut_perf'], ['will have been + V-ing', 'fut_perf_cont']]]
];
GC.GRID_TRICK = [
  'แกนที่ 1 — "เวลา" ดูที่คำแรกของกริยา: do/does/V1 = ปัจจุบัน · did/V2/was/were/had = อดีต · will = อนาคต',
  'แกนที่ 2 — "ลักษณะ" ดูที่ส่วนท้าย: กริยาเปล่า = ธรรมดา · be + V-ing = กำลังทำ · have + V3 = เสร็จแล้ว/ผลติดมาถึงตอนนี้ · have been + V-ing = ทำต่อเนื่องมา',
  'เจอประโยคไหน ถามสองข้อ: "เวลาอะไร?" + "ลักษณะอะไร?" แล้วเอามาต่อกัน เช่น had + been + V-ing = อดีต + ทำต่อเนื่องมา = Past Perfect Continuous'
];

/* ---------- ทริครายTense: ดูตรงไหน + เส้นเวลา + ตัวช่วยจำ (tl: dots/bars/flags เป็น % บนเส้น 0-100, NOW อยู่ที่ 50) ---------- */
GC.TENSE_TIPS = {
  pres_simple: { look: 'ไม่มีตัวช่วยหน้ากริยา เห็น V1 หรือ V-s เปล่าๆ + คำบอกความถี่ (always, usually, every day)', memo: 'ซ้ำๆ / จริงเสมอ = กริยาตัวเดียวเปล่าๆ ไม่มีใครมาช่วย (ระวัง he/she/it ต้องมี -s)', tl: { dots: [18, 30, 42, 58, 70, 82], note: 'เกิดซ้ำเป็นประจำ ครอบคลุมทั้งอดีตและอนาคต' } },
  pres_cont: { look: 'am / is / are + V-ing + คำอย่าง now, at the moment, Look!', memo: '-ing = กำลังไหลอยู่ ตอนนี้เลย ยังไม่จบ', tl: { bars: [[40, 60]], dots: [50], note: 'กำลังเกิดอยู่ ณ ตอนนี้' } },
  pres_perf: { look: 'have / has + V3 + คำอย่าง already, yet, ever, never, just, since, for (ไม่ระบุเวลาที่แน่ชัด)', memo: 'have = "ถืออยู่ในมือตอนนี้" เรื่องเกิดในอดีตแต่ผลยังติดมา ถ้ามี yesterday/ago ห้ามใช้ perfect', tl: { dots: [26], bars: [[26, 50]], note: 'เกิดในอดีต แต่ผลหรือประสบการณ์ยังเชื่อมถึงตอนนี้' } },
  pres_perf_cont: { look: 'have / has + been + V-ing + for / since / all day / how long', memo: 'have been -ing = "อยู่มาเรื่อยๆ จนถึงตอนนี้" เน้นว่าทำนานแค่ไหน', tl: { bars: [[16, 52]], dots: [52], note: 'ทำต่อเนื่องมาจากอดีตจนถึงตอนนี้ (ยังทำอยู่หรือเพิ่งหยุด)' } },
  past_simple: { look: 'V2 (หรือ did/was/were) + คำบอกเวลาอดีตชัดๆ เช่น yesterday, last week, in 2020, ago', memo: 'จบแล้ว + รู้ว่าเมื่อไหร่ = ทิ้งไว้ข้างหลัง ไม่เกี่ยวกับตอนนี้', tl: { dots: [26], note: 'เกิดและจบแล้วในอดีต ระบุเวลาได้' } },
  past_cont: { look: 'was / were + V-ing มักมี when / while / at 8 pm yesterday', memo: 'was/were -ing = "ตอนนั้นกำลังทำอยู่" เป็นฉากหลังให้อีกเหตุการณ์มาแทรก', tl: { bars: [[16, 36]], dots: [26], note: 'กำลังทำอยู่ ณ จุดหนึ่งในอดีต' } },
  past_perf: { look: 'had + V3 + มีสองเหตุการณ์ในอดีต + คำอย่าง before, after, by the time, already', memo: 'had = "อดีตของอดีต" อันไหนเกิดก่อน ใส่ had ให้อันนั้น', tl: { dots: [14, 34], labels: ['1', '2'], note: 'เหตุการณ์ 1 (had + V3) เกิดก่อนเหตุการณ์ 2 ในอดีต' } },
  past_perf_cont: { look: 'had + been + V-ing + for / since ก่อนอีกเหตุการณ์ในอดีต', memo: 'had been -ing = "ทำมานานแล้วก่อนเรื่องนั้นจะเกิด"', tl: { bars: [[6, 30]], dots: [34], labels: ['', '2'], note: 'ทำต่อเนื่องมาก่อนอีกเหตุการณ์หนึ่งในอดีต' } },
  fut_simple: { look: 'will + V1 + คำอย่าง tomorrow, next week, probably, I think', memo: 'will = ตัดสินใจตอนพูด / สัญญา / คาดเดา (ไม่ได้วางแผนไว้ก่อน)', tl: { dots: [76], note: 'จะเกิดในอนาคต (ตัดสินใจตอนพูดหรือคาดเดา)' } },
  fut_goingto: { look: 'am / is / are + going to + V1 + แผนหรือหลักฐานที่เห็นตอนนี้ (เมฆครึ้ม, I have decided)', memo: 'going to = "มีแผน/เห็นหลักฐานแล้ว" ต่างจาก will ที่เพิ่งตัดสินใจ', tl: { bars: [[50, 72]], dots: [76], note: 'แผนหรือหลักฐานตอนนี้ นำไปสู่เหตุการณ์ในอนาคต' } },
  fut_cont: { look: 'will + be + V-ing + เวลาในอนาคต เช่น at 8 pm tomorrow, this time next week', memo: 'will be -ing = "เวลานั้นฉันจะกำลังทำอยู่"', tl: { bars: [[66, 86]], dots: [76], note: 'กำลังทำอยู่ ณ เวลาหนึ่งในอนาคต' } },
  fut_perf: { look: 'will + have + V3 + by + เวลา เช่น by Friday, by 2030, by the time', memo: 'will have + V3 = "พอถึงเส้นตายนั้น ทำเสร็จเรียบร้อยแล้ว"', tl: { dots: [64], bars: [[64, 84]], flags: [[84, 'by']], note: 'จะเสร็จก่อน/ภายในเส้นตายในอนาคต' } }
};

/* ---------- วิธีจำที่ใช้ในแอป + งานวิจัย (ตรวจลิงก์จากการค้นหา 2026-11-19; หลักฐานเฉพาะเรื่อง Tense ยังมีน้อย) ---------- */
GC.RESEARCH = [
  { m: 'เส้นเวลา (timeline) ประกอบทุก Tense', why: 'งานทดลองขนาดเล็กหลายชิ้นพบว่าผู้เรียนที่ใช้เส้นเวลาเข้าใจความต่างของ Tense ชัดกว่าการเรียนด้วยกฎล้วนๆ', caveat: 'ส่วนใหญ่กลุ่มตัวอย่างเล็ก ทดสอบระยะสั้น ยังไม่ชี้ว่าจำได้นานแค่ไหน', src: 'Visual Timelines-based Technique … Saudi EFL Learners (World Journal of English Language)', url: 'https://www.sciedupress.com/journal/index.php/wjel/article/view/24861' },
  { m: 'เส้นเวลาที่วาดเอง (ตารางสองแกนก็ใช้หลักเดียวกัน คือเห็นภาพรวมก่อนจำรายละเอียด)', why: 'ผลศึกษาแบบผสมในห้องเรียนผู้ใหญ่ พบว่าผู้เรียนมองว่าเส้นเวลาช่วยให้เห็นความต่างชัดกว่ารายการกฎ', caveat: 'เป็นการประเมินของผู้เรียนส่วนหนึ่ง ไม่ใช่ผลสอบอย่างเดียว', src: 'Manually drawn visual timelines for teaching English tenses (Springer, 2026)', url: 'https://link.springer.com/article/10.1007/s44217-026-01964-2' },
  { m: 'ลองตอบก่อนฟังเฉลย (retrieval) แทนการอ่านซ้ำ', why: 'เมื่อใช้เวลาเรียนเท่ากัน การดึงคำตอบออกมาจากความจำมักทำให้จำระยะยาวดีกว่าการอ่านทวน ทุกบทของพี่ติวจึงให้ลองตอบก่อนเสมอ', caveat: 'หลักฐานส่วนใหญ่มาจากการเรียนคำศัพท์ ยังไม่ใช่ Tense โดยตรง', src: 'Repetition, Retrieval, and Spaced Practice (ResearchGate)', url: 'https://www.researchgate.net/publication/398256768_Repetition_Retrieval_and_Spaced_Practice' },
  { m: 'ทบทวนซ้ำแบบเว้นช่วง (1 → 3 → 7 → 14 วัน)', why: 'การทบทวนแบบเว้นช่วงให้ผลดีกว่าอัดรวดเดียวในการเรียนภาษาที่สอง จึงมีรายการ "ถึงเวลาทวน" ในหน้าคอร์ส', caveat: 'ผลกับแกรมม่าไม่นิ่งเท่าคำศัพท์ และช่วงห่างที่ดีที่สุดขึ้นกับเป้าหมาย ตัวเลข 1/3/7/14 วันเป็นค่าตั้งต้นที่ผมเลือกเอง ไม่ใช่ค่าจากงานวิจัย', src: 'The Effects of Spaced Practice on Second Language Learning: A Meta-Analysis (Kim & Webb, 2022)', url: 'https://www.researchgate.net/publication/358406370_The_Effects_of_Spaced_Practice_on_Second_Language_Learning_A_Meta-Analysis' },
  { m: 'สลับหลาย Tense ในชุดฝึกเดียว (โหมดฝึกจับ Tense)', why: 'บังคับให้ต้องตัดสินใจว่าเป็น Tense ไหนทุกข้อ แทนที่จะรู้คำตอบล่วงหน้าเพราะทำบทเดียวซ้ำๆ', caveat: 'เป็นการประยุกต์ตามหลักการฝึกแบบสลับ (interleaving) ผมไม่ได้พบงานที่ทดสอบกับ Tense โดยตรง', src: '', url: '' }
];

/* ---------- ตัวอย่างที่มีป้าย ---------- */
GC.parseTagged = s => { const out = []; let last = 0, m; const re = /\{([SAVOT])\s+([^}]*)\}/g; while ((m = re.exec(s))) { if (m.index > last) out.push({ tag: '', text: s.slice(last, m.index) }); out.push({ tag: m[1], text: m[2] }); last = m.index + m[0].length; } if (last < s.length) out.push({ tag: '', text: s.slice(last) }); return out; };
GC.plain = s => GC.parseTagged(s).map(x => x.text).join('').replace(/\s+([.,!?])/g, '$1').replace(/\s+/g, ' ').trim();
GC.allExamples = () => GC.LESSONS.filter(l => l.tense).flatMap(l => l.ex.map(([tagged, th]) => ({ lesson: l.id, tense: l.tense, tagged, plain: GC.plain(tagged), th })));

/* ---------- ตัวตรวจจับ Tense (กฎเบื้องต้น ใช้ได้โดยไม่ต้องมีเน็ต) ---------- */
(function () {
  const IRR = `go:went:gone see:saw:seen take:took:taken make:made:made get:got:got give:gave:given know:knew:known come:came:come say:said:said think:thought:thought tell:told:told find:found:found eat:ate:eaten write:wrote:written read:read:read run:ran:run begin:began:begun buy:bought:bought bring:brought:brought build:built:built choose:chose:chosen drink:drank:drunk drive:drove:driven fall:fell:fallen feel:felt:felt fly:flew:flown forget:forgot:forgotten grow:grew:grown hear:heard:heard hold:held:held keep:kept:kept leave:left:left lose:lost:lost meet:met:met pay:paid:paid put:put:put sell:sold:sold send:sent:sent sit:sat:sat speak:spoke:spoken spend:spent:spent stand:stood:stood swim:swam:swum teach:taught:taught understand:understood:understood wear:wore:worn win:won:won break:broke:broken catch:caught:caught cost:cost:cost cut:cut:cut draw:drew:drawn fight:fought:fought hit:hit:hit hide:hid:hidden lead:led:led let:let:let mean:meant:meant ride:rode:ridden ring:rang:rung rise:rose:risen set:set:set shake:shook:shaken show:showed:shown shut:shut:shut sing:sang:sung sleep:slept:slept steal:stole:stolen throw:threw:thrown wake:woke:woken become:became:become blow:blew:blown deal:dealt:dealt dig:dug:dug hurt:hurt:hurt lend:lent:lent seek:sought:sought tear:tore:torn lay:laid:laid feed:fed:fed bite:bit:bitten shoot:shot:shot sink:sank:sunk spread:spread:spread freeze:froze:frozen hang:hung:hung forgive:forgave:forgiven quit:quit:quit sweep:swept:swept do:did:done`;
  const REG = `work play study live like love want need use help start finish watch look call ask try open close walk talk wait stay move change happen turn follow create provide include continue consider appear expect remain offer remember require report decide pull develop carry cook clean visit travel arrive enjoy learn listen plan prepare improve increase reduce support suggest agree allow apply believe belong borrow cause check climb collect compare complete connect cover cry dance depend describe destroy discuss divide drop earn explain fail fix gather guess handle hate hope imagine invite join jump kill kiss laugh lift manage mark miss mix notice order own pack paint pass pick pour practice protect push race reach relax repeat rest return rush save share shout smile solve sound stop surprise taste thank touch train trust wash waste wish worry rain snow shop order graduate wake finish promise celebrate arrange organize organise attend cancel complain contact deliver design discover employ express fill gain hurry insist lack lie mention mind prefer print publish raise realize receive refuse reply search serve shine spell sign succeed suffer tend tie tour type wonder have boil melt flow produce contain form matter affect reflect represent involve exist seem cover damage notice demand disappear explore extend recognize recognise reveal select separate shape slow spoil stress taste tire trouble vote wrap`;
  const BE = new Set(['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being']), HAVE = new Set(['have', 'has', 'had']), DO = new Set(['do', 'does', 'did']);
  const MODAL = new Set(['will', 'would', 'can', 'could', 'shall', 'should', 'may', 'might', 'must']);
  const ADV = new Set(['not', 'never', 'always', 'usually', 'often', 'sometimes', 'already', 'just', 'also', 'still', 'ever', 'really', 'probably', 'definitely', 'only', 'even', 'rarely', 'seldom', 'finally', 'recently', 'nearly', 'almost', 'hardly', 'now', 'currently', 'both', 'all']);
  const DET = new Set(['the', 'a', 'an', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'some', 'any', 'no', 'very', 'more', 'most', 'of', 'in', 'on', 'at', 'with', 'for', 'from', 'by', 'about', 'than', 'and', 'or']);
  const SUBJ = new Set(['i', 'you', 'we', 'they', 'who', 'people']);
  const EDSTOP = new Set(['need', 'indeed', 'speed', 'feed', 'seed', 'red', 'bed', 'hundred', 'weed', 'breed', 'proceed', 'succeed', 'exceed', 'sacred', 'naked', 'wicked', 'tired', 'bored', 'excited', 'interested', 'married', 'crowded', 'talented', 'determined']);
  const DOUBLE = new Set(['begin', 'prefer', 'refer', 'admit', 'occur', 'control', 'regret', 'forget', 'commit', 'equip', 'plan', 'stop', 'shop', 'drop', 'run', 'sit', 'get', 'put', 'swim', 'cut', 'hit', 'let', 'set', 'shut', 'quit', 'win', 'hug', 'rob', 'tap']);
  const cvc = w => /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(w) && w.length <= 4;
  const ingOf = b => /ie$/.test(b) ? b.slice(0, -2) + 'ying' : /[^aeiou]e$/.test(b) && !/(ee|ye|oe)$/.test(b) ? b.slice(0, -1) + 'ing' : (DOUBLE.has(b) || cvc(b)) && !/[aeiou]{2}.$/.test(b) ? b + b.slice(-1) + 'ing' : b + 'ing';
  const sOf = b => /(s|x|z|ch|sh|o)$/.test(b) ? b + 'es' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ies' : b + 's';
  const edOf = b => /e$/.test(b) ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : (DOUBLE.has(b) || cvc(b)) ? b + b.slice(-1) + 'ed' : b + 'ed';
  const base = new Set(), ing = {}, sf = {}, edf = {}, past = {}, pp = {};
  for (const r of IRR.trim().split(/\s+/)) { const [b, p, q] = r.split(':'); base.add(b); past[p] = b; pp[q] = b; ing[ingOf(b)] = b; sf[sOf(b)] = b; }
  for (const b of REG.trim().split(/\s+/)) { base.add(b); ing[ingOf(b)] = b; sf[sOf(b)] = b; edf[edOf(b)] = b; }
  const formsOf = w => {
    const f = new Set();
    if (base.has(w)) f.add('v1'); if (sf[w]) f.add('s'); if (ing[w]) f.add('ing'); if (edf[w]) { f.add('v2'); f.add('v3'); } if (past[w]) f.add('v2'); if (pp[w]) f.add('v3');
    if (!f.size) { if (/ing$/.test(w) && w.length > 5) f.add('ing'); else if (/ed$/.test(w) && w.length > 4 && !EDSTOP.has(w)) { f.add('v2'); f.add('v3'); } }
    return f;
  };
  GC.formsOf = formsOf;
  const SIGW = new Set(['yesterday', 'tomorrow', 'today', 'tonight', 'now', 'already', 'yet', 'just', 'ever', 'never', 'always', 'usually', 'often', 'sometimes', 'recently', 'lately', 'currently', 'soon', 'ago', 'still', 'once', 'twice', 'later', 'then', 'before', 'after', 'while', 'when', 'since', 'seldom', 'rarely']);
  const TIMEN = new Set(['day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years', 'hour', 'hours', 'minute', 'minutes', 'morning', 'night', 'evening', 'afternoon', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'summer', 'winter', 'weekend', 'midnight', 'then', 'now', 'moment', 'time']);
  const NUM = /^(\d+|one|two|three|four|five|six|seven|eight|nine|ten|an|a|half)$/;
  const CONTR = { "ca": 'can', "wo": 'will', "sha": 'shall', "ai": 'is' };
  const kindOf = w => BE.has(w) ? 'be' : HAVE.has(w) ? 'have' : DO.has(w) ? 'do' : MODAL.has(w) ? 'modal' : null;

  GC.analyze = function (sentence) {
    const raw = String(sentence).match(/[A-Za-z]+(?:['’][A-Za-z]+)*|\d+|[^\sA-Za-z\d]/g) || [];
    const T = raw.map(t => ({ t, l: t.toLowerCase().replace(/’/g, "'"), role: null, g: -1 }));
    const n = T.length, isWord = i => i >= 0 && i < n && /^[a-z']+$/.test(T[i].l);
    // ขยายคำย่อ: don't / I'm / she's / I've / I'll / I'd → w = กริยาช่วยจริง
    for (let i = 0; i < n; i++) {
      const t = T[i]; let m;
      if ((m = t.l.match(/^(.+)n't$/))) { const st = CONTR[m[1]] || m[1]; if (kindOf(st)) { t.w = st; t.neg = true; } }
      else if ((m = t.l.match(/^(.+)'(m|re|ve|ll|d|s)$/))) {
        const suf = m[2]; if (suf === 'm') t.w = 'am'; else if (suf === 're') t.w = 'are'; else if (suf === 've') t.w = 'have'; else if (suf === 'll') t.w = 'will';
        else { let k = i + 1; while (k < n && ADV.has(T[k].l)) k++; const nx = k < n ? T[k].l : ''; const f = formsOf(nx), isV3 = f.has('v3') || nx === 'been'; if (suf === 'd') t.w = isV3 ? 'had' : 'would'; else if (suf === 's') t.w = isV3 && !f.has('s') ? 'has' : 'is'; }
        if (t.w) t.contr = true;
      }
      if (!t.w && isWord(i)) t.w = t.l;
    }
    const aux = i => isWord(i) && T[i].w && kindOf(T[i].w), adv = i => isWord(i) && (ADV.has(T[i].l) || !!T[i].neg);
    const groups = [], infinitives = [];
    const pushGroup = g => { g.idxs.forEach(k => { T[k].g = groups.length; }); groups.push(g); };
    for (let i = 0; i < n; i++) {
      if (T[i].g >= 0 || !isWord(i)) continue;
      const k0 = aux(i);
      if (k0) {
        // เก็บห่วงโซ่ของกริยาช่วย
        const chain = [i]; let j = i + 1;
        const skipAdv = () => { while (j < n && adv(j) && !aux(j)) j++; };
        for (;;) { skipAdv(); if (j < n && aux(j) && (kindOf(T[j].w) !== 'do')) { chain.push(j); j++; } else break; }
        skipAdv(); let verb = -1;
        const qStart = i === 0 || /^[,.;:!?]$/.test(T[i - 1].l) || ['when', 'while', 'if', 'what', 'where', 'why', 'how', 'who', 'which', 'and', 'but', 'because', 'that', 'long', 'many', 'much', 'often'].includes(T[i - 1].l);
        const PRON = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
        const verbAt = q => q < n && isWord(q) && formsOf(T[q].l).size && !DET.has(T[q].l);
        if (!verbAt(j)) { // อาจเป็นคำถามที่สลับประธาน: Have you been…? / Is she working…? / Did the students go…?
          let moved = false;
          if (j < n && PRON.includes(T[j].l)) { j++; moved = true; }
          else if (qStart && j < n) { let q = j, c = 0; while (q < n && c < 4 && isWord(q) && !aux(q) && !formsOf(T[q].l).size) { q++; c++; } if (q > j && q < n && (aux(q) || verbAt(q))) { j = q; moved = true; } }
          if (moved) { for (;;) { skipAdv(); if (j < n && aux(j) && kindOf(T[j].w) !== 'do') { chain.push(j); j++; } else break; } skipAdv(); }
        }
        if (verbAt(j)) verb = j;
        else if (j < n && T[j].l === 'going' && j + 1 < n && T[j + 1].l === 'to') { verb = -2; }
        const words = chain.map(k => T[k].w);
        // be going to
        const last = words[words.length - 1];
        if (verb === -2 || (last && (last === 'am' || last === 'is' || last === 'are' || last === 'was' || last === 'were') && j < n && T[j].l === 'going' && j + 1 < n && T[j + 1].l === 'to')) {
          let vi = -1, q = j + 2; while (q < n && adv(q)) q++; if (q < n && formsOf(T[q].l).has('v1')) vi = q;
          const past = last === 'was' || last === 'were';
          const idxs = [...chain, j, j + 1, ...(vi >= 0 ? [vi] : [])];
          pushGroup({ tense: 'fut_goingto', voice: 'active', aux: [...chain, j, j + 1], verb: vi, idxs, formula: 'am/is/are + going to + V1', conf: vi >= 0 ? 'high' : 'mid', note: past ? 'was/were going to = เคยตั้งใจจะทำ (อนาคตในอดีต)' : '' });
          i = Math.max(i, vi >= 0 ? vi : j + 1); continue;
        }
        const mainF = verb >= 0 ? formsOf(T[verb].l) : new Set();
        const f1 = words[0], hasBeenNext = words.includes('been'), idxs = verb >= 0 ? [...chain, verb] : chain.slice();
        let tense = null, voice = 'active', formula = '', note = '', conf = 'high';
        const rest = words.slice(1);
        if (f1 === 'will' || f1 === 'shall') {
          if (rest[0] === 'have' && rest[1] === 'been' && mainF.has('ing')) { tense = 'fut_perf_cont'; formula = 'will + have been + V-ing'; }
          else if (rest[0] === 'have' && mainF.has('v3')) { tense = 'fut_perf'; formula = 'will + have + V3'; }
          else if (rest[0] === 'be' && mainF.has('ing')) { tense = 'fut_cont'; formula = 'will + be + V-ing'; }
          else if (rest[0] === 'be' && mainF.has('v3')) { tense = 'fut_simple'; voice = 'passive'; formula = 'will + be + V3'; }
          else { tense = 'fut_simple'; formula = 'will + V1'; if (verb < 0) conf = 'mid'; }
        } else if (MODAL.has(f1)) { tense = 'modal'; formula = f1 + (rest[0] === 'have' ? ' + have + V3' : ' + V1'); note = rest[0] === 'have' ? 'modal + have + V3 = พูดถึงอดีต (เช่น should have done = น่าจะได้ทำ)' : (f1 === 'would' ? 'would ใช้ได้ทั้งสมมติ/อดีตที่เคยทำเป็นนิสัย' : ''); }
        else if (f1 === 'am' || f1 === 'is' || f1 === 'are') {
          if (rest[0] === 'being' && mainF.has('v3')) { tense = 'pres_cont'; voice = 'passive'; formula = 'am/is/are + being + V3'; }
          else if (mainF.has('ing') && !mainF.has('v3')) { tense = 'pres_cont'; formula = 'am/is/are + V-ing'; }
          else if (mainF.has('v3') && !mainF.has('ing')) { tense = 'pres_simple'; voice = 'passive'; formula = 'am/is/are + V3'; if (/ed$/.test(T[verb].l) && !past[T[verb].l] && !pp[T[verb].l]) { conf = 'mid'; note = 'ถ้า V3 ตัวนี้ทำหน้าที่เป็นคำคุณศัพท์ (เช่น is tired = เหนื่อย) จะไม่ใช่ passive'; } }
          else if (mainF.has('ing')) { tense = 'pres_cont'; formula = 'am/is/are + V-ing'; }
          else { tense = 'pres_simple'; formula = 'am/is/are (be)'; note = 'be เป็นกริยาหลัก'; verb = -1; }
        } else if (f1 === 'was' || f1 === 'were') {
          if (mainF.has('ing') && !mainF.has('v3')) { tense = 'past_cont'; formula = 'was/were + V-ing'; }
          else if (mainF.has('v3')) { tense = 'past_simple'; voice = 'passive'; formula = 'was/were + V3'; }
          else if (mainF.has('ing')) { tense = 'past_cont'; formula = 'was/were + V-ing'; }
          else { tense = 'past_simple'; formula = 'was/were (be)'; note = 'be เป็นกริยาหลัก'; verb = -1; }
        } else if (f1 === 'have' || f1 === 'has') {
          if (rest[0] === 'been' && mainF.has('ing')) { tense = 'pres_perf_cont'; formula = 'have/has + been + V-ing'; }
          else if (rest[0] === 'been' && mainF.has('v3')) { tense = 'pres_perf'; voice = 'passive'; formula = 'have/has + been + V3'; }
          else if (rest[0] === 'been') { tense = 'pres_perf'; formula = 'have/has + been'; }
          else if (mainF.has('v3')) { tense = 'pres_perf'; formula = 'have/has + V3'; }
          else { tense = 'pres_simple'; formula = 'have/has (กริยาหลัก = มี)'; verb = -1; note = 'have เป็นกริยาหลัก'; }
        } else if (f1 === 'had') {
          if (rest[0] === 'been' && mainF.has('ing')) { tense = 'past_perf_cont'; formula = 'had + been + V-ing'; }
          else if (rest[0] === 'been' && mainF.has('v3')) { tense = 'past_perf'; voice = 'passive'; formula = 'had + been + V3'; }
          else if (mainF.has('v3')) { tense = 'past_perf'; formula = 'had + V3'; }
          else { tense = 'past_simple'; formula = 'had (กริยาหลัก = มี)'; verb = -1; note = 'had เป็นกริยาหลัก'; }
        } else if (f1 === 'do' || f1 === 'does') { tense = 'pres_simple'; formula = 'do/does + V1 (คำถาม/ปฏิเสธ)'; if (verb < 0) conf = 'mid'; }
        else if (f1 === 'did') { tense = 'past_simple'; formula = 'did + V1 (คำถาม/ปฏิเสธ)'; if (verb < 0) conf = 'mid'; }
        if (tense) { pushGroup({ tense, voice, aux: chain, verb: verb >= 0 ? verb : -1, idxs: verb >= 0 ? [...chain, verb] : chain.slice(), formula, conf, note }); i = Math.max(i, verb >= 0 ? verb : chain[chain.length - 1]); }
        continue;
      }
      // กริยาหลักที่ไม่มีตัวช่วย
      const w = T[i].l, F = formsOf(w); if (!F.size) continue;
      let p = i - 1; while (p >= 0 && adv(p)) p--; const pw = p >= 0 ? T[p].l : '';
      if (pw === 'to') { infinitives.push(i); T[i].role = 'inf'; continue; }
      if (DET.has(pw)) continue;
      let tense = null, formula = '', conf = 'mid', note = '';
      if (F.has('v2') && !F.has('v1') && !F.has('s')) { tense = 'past_simple'; formula = 'V2 (กริยาช่อง 2)'; conf = pp[w] || past[w] ? 'high' : 'mid'; }
      else if (F.has('v2') && (F.has('v1') || F.has('s'))) { // รูปซ้ำ เช่น read/put/cut
        tense = SUBJ.has(pw) ? 'pres_simple' : 'past_simple'; formula = SUBJ.has(pw) ? 'V1' : 'V2'; note = 'รูปเหมือนกันทั้งช่อง 1 และ 2 ดูบริบท/เวลาเพื่อแยก'; }
      else if (F.has('s') && !F.has('v1')) { if (['he', 'she', 'it'].includes(pw) || /^[a-z]+$/.test(pw)) { tense = 'pres_simple'; formula = 'V-s (he/she/it)'; conf = ['he', 'she', 'it'].includes(pw) ? 'high' : 'mid'; } }
      else if (F.has('v1') && !F.has('ing')) { if (SUBJ.has(pw) || (/s$/.test(pw) && !DET.has(pw))) { tense = 'pres_simple'; formula = 'V1 (I/you/we/they/พหูพจน์)'; conf = SUBJ.has(pw) ? 'high' : 'mid'; } }
      if (tense) pushGroup({ tense, voice: 'active', aux: [], verb: i, idxs: [i], formula, conf, note });
    }
    // คำบอกเวลา
    const signals = [];
    for (let i = 0; i < n; i++) {
      if (!isWord(i)) continue; const w = T[i].l;
      if (['for', 'since', 'by', 'last', 'next', 'every', 'in', 'on', 'at', 'this', 'all', 'until'].includes(w)) {
        const a = i + 1, b = i + 2; let end = -1;
        if (a < n && (TIMEN.has(T[a].l) || /^\d{4}$/.test(T[a].l))) end = a; else if (b < n && NUM.test(T[a] ? T[a].l : '') && TIMEN.has(T[b].l)) end = b; else if (a < n && /^\d/.test(T[a].l)) end = a;
        if (end >= 0 && ['for', 'since', 'by', 'last', 'next', 'every', 'all', 'until'].includes(w)) signals.push({ idxs: Array.from({ length: end - i + 1 }, (_, k) => i + k) });
        else if (end >= 0 && ['at', 'in', 'on', 'this'].includes(w) && /^(\d|midnight|moment|monday|tuesday|wednesday|thursday|friday|saturday|sunday|morning|night|evening|afternoon|summer|winter|weekend)/.test(T[a].l)) signals.push({ idxs: Array.from({ length: end - i + 1 }, (_, k) => i + k) });
      } else if (SIGW.has(w) && !(w === 'when' || w === 'while' || w === 'before' || w === 'after') ) signals.push({ idxs: [i] });
      else if (w === 'when' || w === 'while' || w === 'before' || w === 'after') signals.push({ idxs: [i] });
    }
    for (const s of signals) s.idxs.forEach(k => { if (T[k].role == null) T[k].role = 'signal'; });
    for (const g of groups) { g.aux.forEach(k => { T[k].role = 'aux'; }); if (g.verb >= 0) T[g.verb].role = 'verb'; }
    return { tokens: T.map(({ t, role, g }) => ({ t, role, g })), groups, signals: signals.map(s => ({ idxs: s.idxs, text: s.idxs.map(k => T[k].t).join(' ') })), infinitives };
  };
})();
