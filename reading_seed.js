// บทความอ่านสั้นสไตล์ IELTS (เขียนขึ้นใหม่ทั้งหมด ไม่ได้คัดลอกจากแหล่งใด)
// questions: mcq = เลือกตอบ A-D (answer เป็นตัวอักษร) / tfng = True | False | Not Given
const READING_SEED = [
  {
    id: 'rd-remote', src: 'builtin', title: 'Remote Work and the Modern City', topic: 'Work & careers', level: 'Band 6.0–6.5',
    text: `Before 2020, working from home was rare. Only about five percent of employees in most developed countries did so regularly. The pandemic changed this almost overnight, forcing millions of companies to adopt digital tools and flexible schedules. Surprisingly, many firms found that productivity did not fall; in some cases it increased, as workers spent less time commuting and had fewer interruptions.

However, the shift has not been entirely positive. Some employees report feeling isolated and find it hard to separate work from private life. City centres, which once depended on office workers to support cafes and shops, have seen a sharp decline in customers. Urban planners now debate whether empty offices should be converted into housing.

Experts suggest that a hybrid model, combining home and office days, may offer the best balance. It preserves the flexibility that workers value while keeping the social contact that many companies consider essential for creativity.`,
    vocab: [
      { w: "adopt", th: "นำมาใช้ / รับมาใช้", syn: ["take up", "embrace", "introduce"] },
      { w: "productivity", th: "ประสิทธิภาพการทำงาน / ผลิตภาพ", syn: ["efficiency", "output"] },
      { w: "commute", th: "เดินทางไปกลับที่ทำงาน", syn: ["travel to work"] },
      { w: "isolated", th: "รู้สึกโดดเดี่ยว แยกตัว", syn: ["lonely", "cut off", "alone"] },
      { w: "decline", th: "การลดลง", syn: ["drop", "fall", "decrease"] },
      { w: "hybrid", th: "แบบผสม (เช่น ที่บ้านผสมออฟฟิศ)", syn: ["mixed", "combined"] },
      { w: "essential", th: "จำเป็นอย่างยิ่ง", syn: ["vital", "crucial", "necessary"] }
    ],
    key_points: [
      'ก่อนปี 2020 คนทำงานจากบ้านเป็นประจำน้อยมาก (ราว 5%) แต่โรคระบาดทำให้เปลี่ยนไปอย่างรวดเร็ว',
      'ข้อดี: ผลผลิตไม่ลดลงและบางกรณีเพิ่มขึ้น ลดเวลาเดินทาง / ข้อเสีย: รู้สึกโดดเดี่ยว แยกงานกับชีวิตส่วนตัวยาก และร้านค้ากลางเมืองเสียลูกค้า',
      'ผู้เชี่ยวชาญเสนอรูปแบบไฮบริด (ผสมที่บ้านกับที่ออฟฟิศ) เพื่อให้ได้ทั้งความยืดหยุ่นและการพบปะ'
    ],
    questions: [
      { type: 'mcq', q: 'What is the main idea of the passage?', options: ['Remote work has completely replaced offices.', 'Remote work brings both benefits and problems, and a hybrid model may balance them.', 'Productivity always falls when people work at home.', 'City centres have benefited greatly from the pandemic.'], answer: 'B', why: 'บทความพูดถึงทั้งข้อดี (ผลผลิต) และข้อเสีย (โดดเดี่ยว เมืองเงียบ) แล้วสรุปที่รูปแบบไฮบริด จึงตรงกับข้อ B' },
      { type: 'tfng', q: 'Before 2020, most employees in developed countries worked from home regularly.', answer: 'False', why: 'ประโยคแรกๆ บอกว่ามีเพียงราว 5% ที่ทำงานที่บ้านเป็นประจำ ซึ่งขัดกับคำว่า "most"' },
      { type: 'tfng', q: 'Productivity decreased in all companies that adopted remote work.', answer: 'False', why: 'บทความบอกว่าหลายบริษัทพบว่าผลผลิตไม่ลดลง และบางกรณีเพิ่มขึ้น จึงไม่ใช่ "ทุกบริษัท" ที่ลดลง' },
      { type: 'tfng', q: 'Some urban planners have suggested building more cafes in city centres.', answer: 'Not Given', why: 'บทความพูดถึงการแปลงออฟฟิศว่างเป็นที่อยู่อาศัย แต่ไม่ได้พูดถึงข้อเสนอสร้างคาเฟ่เพิ่ม จึงเป็น Not Given' },
      { type: 'mcq', q: 'According to the passage, why might a hybrid model be effective?', options: ['It reduces the cost of renting offices.', 'It keeps flexibility for workers while maintaining social contact.', 'It removes the need for any commuting.', 'It brings more customers to city-centre shops than before 2020.'], answer: 'B', why: 'ย่อหน้าสุดท้ายบอกว่าไฮบริดรักษาความยืดหยุ่นที่พนักงานต้องการ ขณะเดียวกันยังมีการพบปะที่ช่วยความคิดสร้างสรรค์' }
    ]
  },
  {
    id: 'rd-green', src: 'builtin', title: 'Green Spaces in Crowded Cities', topic: 'Environment', level: 'Band 6.5–7.0',
    text: `As more people move into cities, green spaces such as parks and rooftop gardens are becoming increasingly valuable. Research shows that residents who live near parks report lower stress levels and are more likely to exercise regularly. Trees also reduce urban temperatures by providing shade and releasing moisture, which can lower the "heat island" effect by several degrees in summer.

Despite these benefits, land in city centres is expensive, and developers often prefer to build offices or apartments. Some cities have responded by requiring new buildings to include green roofs or vertical gardens. Singapore, for example, has introduced policies that encourage developers to replace any green area lost to construction.

Critics argue that such measures raise building costs and may make housing less affordable. Supporters, however, point out that the long-term savings on healthcare and energy outweigh the initial expense.`,
    vocab: [
      { w: "valuable", th: "มีคุณค่า", syn: ["precious", "worthwhile", "useful"] },
      { w: "moisture", th: "ความชื้น", syn: ["dampness", "humidity"] },
      { w: "require", th: "กำหนดให้ต้อง / ต้องการ", syn: ["demand", "oblige", "need"] },
      { w: "affordable", th: "ราคาไม่แพง จ่ายไหว", syn: ["inexpensive", "reasonable", "cheap"] },
      { w: "outweigh", th: "มีน้ำหนักมากกว่า / คุ้มกว่า", syn: ["exceed", "surpass", "override"] },
      { w: "encourage", th: "ส่งเสริม สนับสนุน", syn: ["promote", "support", "urge"] },
      { w: "resident", th: "ผู้อยู่อาศัย", syn: ["inhabitant", "dweller", "occupant"] }
    ],
    key_points: [
      'พื้นที่สีเขียวในเมืองช่วยลดความเครียดของผู้อยู่อาศัย ส่งเสริมการออกกำลังกาย และลดความร้อนของเมือง (heat island)',
      'แต่ที่ดินกลางเมืองแพง ผู้พัฒนาจึงนิยมสร้างอาคาร บางเมืองจึงออกนโยบาย เช่น หลังคาเขียว สวนแนวตั้ง (สิงคโปร์ส่งเสริมให้ชดเชยพื้นที่สีเขียวที่เสียไป)',
      'ผู้วิจารณ์มองว่าทำให้ต้นทุนก่อสร้างและราคาบ้านสูงขึ้น ส่วนผู้สนับสนุนมองว่าประหยัดค่ารักษาพยาบาลและพลังงานในระยะยาวคุ้มกว่า'
    ],
    questions: [
      { type: 'mcq', q: 'What is the main idea of the passage?', options: ['Cities should stop building offices and apartments.', 'Green spaces offer important benefits in cities, but encouraging them involves a debate about cost.', 'Singapore has the greenest buildings in the world.', 'Trees are the only way to cool a city.'], answer: 'B', why: 'บทความไล่ประโยชน์ของพื้นที่สีเขียว แล้วต่อด้วยข้อถกเถียงเรื่องต้นทุน จึงตรงกับข้อ B' },
      { type: 'tfng', q: 'People who live near parks tend to report lower stress levels.', answer: 'True', why: 'ย่อหน้าแรกระบุว่าผู้ที่อยู่ใกล้สวนสาธารณะรายงานระดับความเครียดต่ำกว่า' },
      { type: 'tfng', q: 'Trees make the heat island effect stronger in summer.', answer: 'False', why: 'ต้นไม้ให้ร่มเงาและปล่อยความชื้น ซึ่ง "ลด" heat island effect ไม่ใช่ทำให้แรงขึ้น' },
      { type: 'tfng', q: 'Green roofs cost more to build than vertical gardens.', answer: 'Not Given', why: 'บทความพูดถึงทั้งสองอย่างว่าเป็นสิ่งที่เมืองกำหนดให้มี แต่ไม่ได้เปรียบเทียบต้นทุนระหว่างกัน' },
      { type: 'mcq', q: 'What do supporters of green building rules argue?', options: ['Green buildings are cheaper to construct than ordinary buildings.', 'The long-term savings on healthcare and energy are greater than the initial cost.', 'Developers should be forbidden from building offices.', 'Every country should copy the policies of Singapore.'], answer: 'B', why: 'ประโยคสุดท้ายบอกว่าผู้สนับสนุนชี้ว่าการประหยัดค่ารักษาพยาบาลและพลังงานในระยะยาวมากกว่าค่าใช้จ่ายเริ่มแรก' }
    ]
  },
  {
    id: 'rd-sleep', src: 'builtin', title: 'Why Sleep Matters for Memory', topic: 'Health & science', level: 'Band 6.5–7.0',
    text: `Scientists have long known that sleep is essential for health, but recent studies reveal how deeply it affects memory. During the day, the brain collects large amounts of information. At night, particularly during deep sleep, it replays and strengthens important memories while discarding unnecessary details. This process, known as consolidation, helps people retain what they have learned.

In one experiment, two groups of students studied a list of words. One group slept for eight hours afterwards, while the other stayed awake. When tested the next day, the group that had slept remembered about 20 percent more words. Similar results have been found with skills such as playing the piano.

Researchers therefore advise students not to sacrifice sleep to study late into the night. Although extra hours of revision may seem productive, the resulting tiredness can reduce the brain's ability to store new information.`,
    vocab: [
      { w: "retain", th: "จดจำไว้ / เก็บไว้", syn: ["remember", "keep", "hold"] },
      { w: "consolidation", th: "การเสริมความจำให้มั่นคง", syn: ["strengthening", "stabilisation"] },
      { w: "discard", th: "ทิ้ง ละทิ้ง", syn: ["throw away", "dispose of", "get rid of"] },
      { w: "sacrifice", th: "ยอมเสียสละ", syn: ["give up", "forgo"] },
      { w: "revision", th: "การทบทวนบทเรียน", syn: ["review", "study"] },
      { w: "reveal", th: "เผยให้เห็น", syn: ["show", "uncover", "disclose"] },
      { w: "tiredness", th: "ความเหนื่อยล้า", syn: ["fatigue", "exhaustion", "weariness"] }
    ],
    key_points: [
      'การนอนหลับ โดยเฉพาะช่วงหลับลึก ช่วย "เสริมความจำ" (consolidation) โดยสมองทบทวนความจำสำคัญและทิ้งรายละเอียดที่ไม่จำเป็น',
      'การทดลอง: กลุ่มที่นอน 8 ชั่วโมงจำคำศัพท์ได้มากกว่ากลุ่มที่ไม่นอนประมาณ 20% และผลคล้ายกันกับทักษะ เช่น เล่นเปียโน',
      'นักวิจัยแนะนำว่าอย่าอดนอนเพื่ออ่านหนังสือดึก เพราะความเหนื่อยทำให้สมองจดจำข้อมูลใหม่ได้แย่ลง'
    ],
    questions: [
      { type: 'mcq', q: 'What is the main idea of the passage?', options: ['Students should study for as many hours as possible.', 'Sleep plays an important role in storing memories, so students should not give it up for extra study.', 'Playing the piano improves memory.', 'The brain stops working during deep sleep.'], answer: 'B', why: 'ใจความหลักคือการนอนช่วยเก็บความจำ จึงไม่ควรเสียการนอนไปเพื่ออ่านหนังสือเพิ่ม' },
      { type: 'tfng', q: 'Memory consolidation takes place mainly during deep sleep.', answer: 'True', why: 'บทความบอกว่า "particularly during deep sleep" สมองทบทวนและเสริมความจำสำคัญ' },
      { type: 'tfng', q: 'The students who stayed awake remembered more words than those who slept.', answer: 'False', why: 'กลุ่มที่นอนจำได้มากกว่าประมาณ 20% ไม่ใช่กลุ่มที่ไม่นอน' },
      { type: 'tfng', q: 'The experiment involved more than one hundred students.', answer: 'Not Given', why: 'บทความบอกแค่ว่ามีนักเรียนสองกลุ่ม แต่ไม่ได้ระบุจำนวนคน' },
      { type: 'mcq', q: 'What do researchers advise students to do?', options: ['Revise for extra hours even when tired.', 'Avoid giving up sleep in order to study late at night.', 'Sleep only during the day.', 'Practise a musical instrument before exams.'], answer: 'B', why: 'ย่อหน้าสุดท้ายแนะนำไม่ให้เสียการนอนเพื่ออ่านหนังสือดึก เพราะความเหนื่อยลดความสามารถในการจำ' }
    ]
  }
];
