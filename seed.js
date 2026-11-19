// คลังคำเริ่มต้น  รูปแบบ: word|pos|ความหมายไทย|English definition|example|synonyms
const SEED = {
IELTS: `
mitigate|verb|ลดความรุนแรง บรรเทา|to make something less severe, harmful or painful|Planting trees can help mitigate the effects of air pollution in big cities.|alleviate, reduce, lessen
substantial|adjective|มากมาย มีนัยสำคัญ|large in amount, value or importance|There has been a substantial increase in the number of students studying abroad.|considerable, significant, sizeable
phenomenon|noun|ปรากฏการณ์|a fact or event in nature or society that can be observed|Urbanisation is a global phenomenon that shows no sign of slowing down.|occurrence, event, trend
sustainable|adjective|ยั่งยืน|able to continue over time without harming the environment|Many companies are switching to sustainable sources of energy.|viable, eco-friendly, renewable
deteriorate|verb|เสื่อมลง แย่ลง|to become worse over time|Air quality has deteriorated rapidly since the factory opened.|worsen, decline, degrade
advocate|verb|สนับสนุน เรียกร้อง|to publicly support an idea or policy|Many experts advocate a shorter working week.|support, promote, champion
ambiguous|adjective|คลุมเครือ ตีความได้หลายแบบ|having more than one possible meaning|The question was ambiguous, so students answered it in different ways.|unclear, vague, equivocal
coherent|adjective|สอดคล้อง ต่อเนื่องเป็นเหตุเป็นผล|logical and well organised so that it is easy to understand|A good essay needs a coherent argument from the introduction to the conclusion.|logical, consistent, clear
comprehensive|adjective|ครอบคลุม|including all or nearly all the important parts|The government published a comprehensive report on public health.|thorough, extensive, complete
controversial|adjective|ที่เป็นที่ถกเถียง|causing a lot of public disagreement|Genetic engineering remains a controversial topic.|disputed, contentious, debatable
diminish|verb|ลดลง ทำให้น้อยลง|to become or make something smaller or less important|The importance of printed newspapers has diminished in recent years.|decrease, reduce, shrink
discrepancy|noun|ความไม่ตรงกัน ความแตกต่าง|a difference between two things that should be the same|There is a large discrepancy between rural and urban incomes.|inconsistency, gap, disparity
elaborate|verb|อธิบายเพิ่มเติม ขยายความ|to give more details about something|Could you elaborate on your reasons for choosing this course?|expand, detail, develop
empirical|adjective|อิงหลักฐานจากการสังเกตหรือทดลอง|based on observation or experiment rather than theory|The study provides empirical evidence that exercise improves memory.|observed, experimental, evidence-based
enhance|verb|ยกระดับ เพิ่มคุณภาพ|to improve the quality, value or strength of something|Technology can enhance the learning experience in the classroom.|improve, boost, strengthen
exacerbate|verb|ทำให้แย่ลง|to make a problem or bad situation worse|Cutting public transport will only exacerbate traffic congestion.|aggravate, worsen, intensify
fluctuate|verb|ผันผวน ขึ้นๆ ลงๆ|to change frequently, especially in amount or level|Oil prices fluctuate depending on global demand.|vary, swing, oscillate
hypothesis|noun|สมมติฐาน|an idea suggested as an explanation that needs to be tested|The researchers tested their hypothesis with a survey of 500 people.|theory, assumption, proposition
implement|verb|นำไปปฏิบัติใช้|to put a plan or decision into action|The city plans to implement a congestion charge next year.|carry out, execute, apply
inevitable|adjective|หลีกเลี่ยงไม่ได้|certain to happen and impossible to avoid|Some job losses are inevitable as more tasks become automated.|unavoidable, inescapable, certain
infrastructure|noun|โครงสร้างพื้นฐาน|the basic systems and services a country needs, such as roads and power|Developing countries need to invest in transport infrastructure.|facilities, framework, utilities
innovate|verb|สร้างนวัตกรรม|to introduce new ideas, methods or products|Companies must innovate constantly to stay ahead of their competitors.|pioneer, invent, modernise
integrate|verb|ผสมผสาน รวมเข้าด้วยกัน|to combine two or more things so they work together|Schools are trying to integrate digital tools into every subject.|combine, merge, incorporate
mandatory|adjective|บังคับ|required by law or by a rule|Wearing a helmet is mandatory for all cyclists in some countries.|compulsory, obligatory, required
obsolete|adjective|ล้าสมัย เลิกใช้แล้ว|no longer used because something better has been invented|Many office skills have become obsolete due to automation.|outdated, outmoded, redundant
paradigm|noun|กระบวนทัศน์ แบบอย่างความคิด|a typical model or way of thinking about something|Online learning has created a new paradigm in higher education.|model, framework, pattern
predominantly|adverb|ส่วนใหญ่ เป็นหลัก|mainly or mostly|The workforce in this industry is predominantly female.|mainly, chiefly, largely
proliferate|verb|เพิ่มจำนวนอย่างรวดเร็ว|to increase quickly in number|Fast-food restaurants have proliferated across the country.|multiply, spread, expand
resilient|adjective|ยืดหยุ่น ฟื้นตัวเร็ว|able to recover quickly from difficulties|Young children are often more resilient than adults expect.|tough, adaptable, hardy
scrutinise|verb|ตรวจสอบอย่างละเอียด|to examine something very carefully|Journalists scrutinise every decision made by the government.|examine, inspect, analyse
stimulate|verb|กระตุ้น|to encourage something to develop or become more active|Lower taxes may stimulate economic growth.|encourage, boost, spur
surge|noun|การพุ่งสูงขึ้นอย่างรวดเร็ว|a sudden large increase|There was a surge in demand for remote working tools in 2020.|spike, rise, upsurge
tackle|verb|รับมือ แก้ไข (ปัญหา)|to try to deal with a difficult problem|Governments must work together to tackle climate change.|address, handle, confront
thrive|verb|เจริญรุ่งเรือง เติบโตได้ดี|to grow and be successful|Small businesses can thrive when they are supported by the local community.|flourish, prosper, boom
underlying|adjective|ที่เป็นรากเหตุ ซ่อนอยู่เบื้องหลัง|forming the basis of something but not obvious at first|Poverty is often the underlying cause of crime.|fundamental, root, basic
viable|adjective|ที่เป็นไปได้ ใช้การได้|able to work successfully or be practical|Solar power is now a viable alternative to fossil fuels.|feasible, practical, workable
widespread|adjective|แพร่หลาย|found or happening in many places or among many people|Concern about data privacy is widespread among internet users.|common, extensive, prevalent
vulnerable|adjective|เปราะบาง เสี่ยงต่อการถูกทำร้าย|easily harmed, attacked or affected|Elderly people are particularly vulnerable to extreme heat.|exposed, susceptible, at risk
alleviate|verb|บรรเทา|to make a problem or pain less serious|Building more houses could alleviate the housing shortage.|ease, relieve, mitigate
consensus|noun|ฉันทามติ ความเห็นพ้องกัน|general agreement among a group of people|There is a broad consensus that more should be done to protect forests.|agreement, accord, unanimity
contemporary|adjective|ร่วมสมัย|belonging to the present time|Contemporary art often challenges traditional ideas of beauty.|modern, current, present-day
detrimental|adjective|เป็นอันตราย ส่งผลเสีย|causing harm or damage|Too much screen time can be detrimental to children's sleep.|harmful, damaging, adverse
disparity|noun|ความเหลื่อมล้ำ|a large and unfair difference|The disparity between rich and poor has widened over the past decade.|inequality, gap, imbalance
entail|verb|ส่งผลตามมา ต้องมี|to involve something as a necessary part or result|Moving abroad entails a lot of paperwork and planning.|involve, require, mean
foster|verb|ส่งเสริม บ่มเพาะ|to encourage the development of something|Teachers should foster creativity as well as discipline.|encourage, nurture, promote
indigenous|adjective|พื้นเมือง ดั้งเดิม|naturally existing in a place; relating to the original people of an area|Indigenous communities have protected these forests for centuries.|native, aboriginal, local
notion|noun|แนวคิด ความเชื่อ|an idea or belief about something|The notion that money brings happiness is widely debated.|concept, idea, belief
prevalent|adjective|พบได้บ่อย แพร่หลาย|common at a particular time or in a particular place|Obesity is increasingly prevalent among teenagers.|common, widespread, rife
plausible|adjective|น่าเชื่อถือ มีเหตุผลฟังขึ้น|seeming reasonable or likely to be true|Scientists have proposed a plausible explanation for the sudden decline.|credible, believable, reasonable
reluctant|adjective|ไม่เต็มใจ ลังเล|not willing to do something|Many employees are reluctant to work overtime without extra pay.|unwilling, hesitant, unenthusiastic
revenue|noun|รายได้|money that a company or government receives|Tourism generates significant revenue for the local economy.|income, earnings, turnover
deplete|verb|ทำให้หมดไป ลดลง|to use so much of something that little is left|Overfishing has depleted fish stocks in many regions.|exhaust, drain, use up
emission|noun|การปล่อย (ก๊าซ)|gas or other substance released into the air|Cars are a major source of carbon emissions.|discharge, release, output
biodiversity|noun|ความหลากหลายทางชีวภาพ|the variety of plant and animal life in an area|Deforestation is a serious threat to biodiversity.|variety of life, ecosystem diversity
urbanisation|noun|การขยายตัวของเมือง|the process by which towns and cities grow as people move into them|Rapid urbanisation has put pressure on housing and public services.|city growth, metropolitan expansion
`,
DET: `
abundant|adjective|อุดมสมบูรณ์ มีมากมาย|existing in large quantities|Fresh fruit is abundant in this region during the summer.|plentiful, ample, copious
accomplish|verb|ทำสำเร็จ|to succeed in doing something|She accomplished her goal of running a marathon.|achieve, complete, fulfil
acquire|verb|ได้มา ได้รับ (ทักษะ/สิ่งของ)|to get or gain something|Children acquire language skills very quickly.|obtain, gain, get
adequate|adjective|เพียงพอ|enough in quantity or good enough in quality|The room was small but adequate for one person.|sufficient, enough, satisfactory
adjacent|adjective|ติดกัน ที่อยู่ข้างเคียง|next to or near something|The library is adjacent to the main science building.|neighbouring, nearby, next to
anticipate|verb|คาดการณ์ คาดหวัง|to expect something to happen|We anticipate a large crowd at the concert tonight.|expect, predict, foresee
apparent|adjective|เห็นได้ชัด|easy to see or understand|It soon became apparent that the plan would not work.|obvious, clear, evident
appropriate|adjective|เหมาะสม|suitable or right for a particular situation|Casual clothes are not appropriate for a job interview.|suitable, proper, fitting
assume|verb|สันนิษฐาน|to think something is true without proof|I assumed the shop would be open on Sunday.|suppose, presume, believe
cautious|adjective|ระมัดระวัง|careful to avoid danger or mistakes|Be cautious when you cross the road at night.|careful, wary, alert
coincide|verb|บังเอิญตรงกัน|to happen at the same time as something else|My holiday coincides with my sister's wedding.|overlap, clash, concur
compel|verb|บังคับ ผลักดันให้ต้อง|to force someone to do something|The heavy rain compelled us to cancel the picnic.|force, oblige, require
concise|adjective|กระชับ|giving a lot of information in a few words|Please keep your answer short and concise.|brief, succinct, short
consecutive|adjective|ติดต่อกัน ต่อเนื่อง|following one after another without a break|The team has won five consecutive games.|successive, sequential, in a row
crucial|adjective|สำคัญอย่างยิ่ง|extremely important|Sleep is crucial for good health.|vital, essential, critical
deliberate|adjective|จงใจ ตั้งใจ|done on purpose|It was a deliberate attempt to confuse the customers.|intentional, planned, conscious
deny|verb|ปฏิเสธ|to say that something is not true|He denied breaking the window.|reject, refuse, dispute
distinct|adjective|ชัดเจน แตกต่างกันอย่างเห็นได้ชัด|clearly different or easy to notice|The two brothers have very distinct personalities.|separate, different, clear
eager|adjective|กระตือรือร้น|very excited and interested in doing something|The students were eager to start the experiment.|keen, enthusiastic, impatient
eventually|adverb|ในที่สุด|after a long time or a series of events|After many delays, the train eventually arrived.|finally, ultimately, in the end
exaggerate|verb|พูดเกินจริง|to make something seem bigger or better than it is|Don't exaggerate; it wasn't that bad.|overstate, inflate, embellish
flexible|adjective|ยืดหยุ่น|able to change easily to suit new situations|Her job offers flexible working hours.|adaptable, adjustable, versatile
genuine|adjective|ของแท้ จริงใจ|real, honest and not fake|She gave a genuine smile when she saw her friends.|authentic, sincere, real
gradually|adverb|ค่อยเป็นค่อยไป|slowly over a period of time|The weather gradually improved during the afternoon.|slowly, steadily, progressively
hesitate|verb|ลังเล|to pause before doing something because you are unsure|Don't hesitate to ask if you need help.|pause, waver, delay
humble|adjective|ถ่อมตัว|not proud and not thinking you are better than others|Despite his fame, he remained a humble man.|modest, unassuming, down-to-earth
ignore|verb|เพิกเฉย ไม่สนใจ|to pay no attention to someone or something|He ignored the warning signs and kept driving.|disregard, overlook, neglect
impose|verb|บังคับใช้ กำหนด|to force a rule or opinion on people|The city imposed a new tax on plastic bags.|enforce, introduce, force
keen|adjective|ใจจดใจจ่อ กระตือรือร้น|very interested or enthusiastic|He is keen on learning new languages.|eager, enthusiastic, passionate
lack|noun|ความขาดแคลน|the state of not having enough of something|A lack of sleep makes it hard to concentrate.|shortage, absence, deficiency
moderate|adjective|ปานกลาง|not extreme; average in amount or strength|Moderate exercise is good for your heart.|average, reasonable, mild
neglect|verb|ละเลย|to fail to take care of something|He neglected his garden, and the plants died.|ignore, abandon, overlook
obtain|verb|ได้รับ|to get something, often with effort|You need to obtain a permit before you build a house.|get, acquire, secure
occur|verb|เกิดขึ้น|to happen|Accidents often occur when people are tired.|happen, take place, arise
persuade|verb|โน้มน้าว|to make someone agree to do something by giving reasons|I managed to persuade my friend to join the gym.|convince, urge, win over
pursue|verb|ไล่ตาม ทำตามเป้าหมาย|to try to achieve something over a period of time|She moved to London to pursue a career in music.|chase, follow, seek
rare|adjective|หายาก|not common; not happening often|It is rare to see snow in this part of the country.|uncommon, scarce, unusual
reliable|adjective|เชื่อถือได้|able to be trusted to work well or tell the truth|This car is cheap, but it is also very reliable.|dependable, trustworthy, steady
reveal|verb|เปิดเผย|to show or tell something that was secret|The survey revealed that most people prefer to shop online.|disclose, show, uncover
suspicious|adjective|น่าสงสัย|making you feel that something is wrong|A suspicious package was found near the station.|doubtful, dubious, wary
tend|verb|มีแนวโน้ม มักจะ|to usually do or be something|Prices tend to rise during the holiday season.|be inclined, usually, often
urgent|adjective|เร่งด่วน|needing immediate attention|I have an urgent message for the manager.|pressing, critical, immediate
valid|adjective|ใช้ได้ ถูกต้อง มีผล|acceptable or legally effective|Your passport must be valid for at least six months.|legitimate, acceptable, sound
withdraw|verb|ถอน ถอนตัว|to take something away or to stop taking part|She withdrew 2,000 baht from her account.|remove, retract, pull out
yield|verb|ให้ผลผลิต ยอมจำนน|to produce something; to give way|The experiment yielded surprising results.|produce, generate, give way
`
};
