// CET-4 Reading RPG - 80 Questions (8 Days x 10)
const QUESTIONS = [
 [
  "V",
  "The university library is an important (1)__ for students. It provides a quiet (2)__ for study and research.",
  "(1)(2) 最合适的搭配是？",
  [
   "resource / environment",
   "access / contribute",
   "spend / access",
   "essential / risk"
  ],
  0,
  "resource=资源, environment=环境。图书馆是重要的学习资源，提供安静环境。"
 ],
 [
  "V",
  "The Internet has (1)__ the way we communicate. People can now (2)__ information instantly.",
  "(1)(2) 最合适的搭配是？",
  [
   "transformed / access",
   "significant / cautious",
   "verify / pressed",
   "extreme / contribute"
  ],
  0,
  "transformed=改变, access=获取。互联网改变了交流方式。"
 ],
 [
  "V",
  "Climate change is a (1)__ challenge. Many species are at (2)__ of extinction.",
  "(1)(2) 最合适的搭配是？",
  [
   "pressing / risk",
   "extreme / contribute",
   "immediate / access",
   "significant / verify"
  ],
  0,
  "pressing=紧迫的, risk=风险。气候变化紧迫，物种面临灭绝风险。"
 ],
 [
  "V",
  "The new policy aims to (1)__ economic growth while (2)__ the environment.",
  "(1)(2) 最合适的搭配是？",
  [
   "promote / protecting",
   "reduce / damaging",
   "ignore / improving",
   "delay / changing"
  ],
  0,
  "promote=促进, protect=保护。政策促进经济同时保护环境。"
 ],
 [
  "R",
  "A Harvard study tracked 2,000 students for five years. It found that students who read for pleasure regularly scored significantly higher on standardized tests. They also developed better vocabulary, writing skills, and critical thinking.",
  "该研究的主要发现是什么？",
  [
   "学生只应为作业阅读",
   "休闲阅读提升学业表现",
   "标准化考试不可靠",
   "休闲阅读浪费时间"
  ],
  1,
  "研究发现定期休闲阅读的学生在标准化考试中成绩显著更高。"
 ],
 [
  "R",
  "Urban green spaces reduce air pollution, lower temperatures, and provide wildlife habitats. Access to green spaces improves mental health and encourages physical activity.",
  "城市绿地的好处不包括以下哪项？",
  [
   "减少污染",
   "改善心理健康",
   "增加犯罪率",
   "加强社区联系"
  ],
  2,
  "文章说城市绿地减少犯罪率，不是增加。"
 ],
 [
  "R",
  "The sharing economy has grown rapidly. Platforms like Airbnb allow people to share assets. Supporters argue it reduces waste. Critics say it threatens traditional industries.",
  "文章主要讨论什么？",
  [
   "Airbnb的好处",
   "共享经济的增长与争议",
   "Uber为何流行",
   "如何分享资产"
  ],
  1,
  "文章讨论共享经济的快速增长以及支持和反对的观点。"
 ],
 [
  "M",
  "[A] Time management is crucial. [B] Setting priorities helps avoid stress. [C] Breaking tasks into smaller steps helps. [D] Regular review improves retention. [E] Group study offers different views. [F] Taking breaks boosts productivity.",
  "哪个部分讨论了拆分任务的好处？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C谈到把大任务拆分成小步骤。"
 ],
 [
  "M",
  "[A] Exercise boosts brain function. [B] Sleep consolidates memory. [C] Diet affects cognition. [D] Social interaction reduces stress. [E] Meditation improves focus. [F] Reading expands knowledge.",
  "哪个部分谈到睡眠对记忆的作用？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: 睡眠巩固记忆。"
 ],
 [
  "M",
  "[A] Water is essential for life. [B] Air pollution harms health. [C] Soil degradation threatens food security. [D] Biodiversity loss is irreversible. [E] Renewable energy reduces emissions. [F] Plastic waste pollutes oceans.",
  "哪个部分涉及粮食安全威胁？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 土壤退化威胁粮食安全。"
 ],
 [
  "V",
  "The experiment (1)__ that the new drug is effective. Researchers (2)__ their findings in a medical journal.",
  "(1)(2) 最合适的搭配是？",
  [
   "demonstrated / published",
   "discovered / ignored",
   "proved / rejected",
   "showed / hid"
  ],
  0,
  "demonstrated=证明, published=发表。研究者发表研究结果。"
 ],
 [
  "V",
  "Students who (1)__ in extracurricular activities tend to have better social skills. Schools should (2)__ such programs.",
  "(1)(2) 最合适的搭配是？",
  [
   "participate / encourage",
   "avoid / reduce",
   "fail / cancel",
   "engage / limit"
  ],
  0,
  "participate=参与, encourage=鼓励。参与课外活动有助于社交能力。"
 ],
 [
  "V",
  "The company is (1)__ new employees who can (2)__ to a team environment.",
  "(1)(2) 最合适的搭配是？",
  [
   "recruiting / adapt",
   "firing / resist",
   "ignoring / refuse",
   "changing / avoid"
  ],
  0,
  "recruiting=招聘, adapt=适应。公司招聘能适应团队环境的人。"
 ],
 [
  "V",
  "Social media can (1)__ people from different cultures, but may also (2)__ the spread of misinformation.",
  "(1)(2) 最合适的搭配是？",
  [
   "connect / facilitate",
   "separate / prevent",
   "divide / block",
   "isolate / stop"
  ],
  0,
  "connect=连接, facilitate=促进。社交媒体连接不同文化，但也促进假信息传播。"
 ],
 [
  "R",
  "AI is transforming industries worldwide. In healthcare, AI helps diagnose diseases faster. In education, personalized systems adapt to needs. However, concerns about job displacement and privacy grow.",
  "文章的主旨是什么？",
  [
   "AI只在医疗领域有用",
   "AI带来利好但也引发担忧",
   "AI会取代所有工作",
   "AI在教育中没用"
  ],
  1,
  "AI在各行业带来好处但引发失业和隐私担忧。"
 ],
 [
  "R",
  "Procrastination affects up to 80% of college students. It is caused by difficulty managing negative emotions associated with tasks, not laziness.",
  "拖延症的主要原因是什么？",
  [
   "懒惰",
   "时间管理差",
   "难以管理负面情绪",
   "智力问题"
  ],
  2,
  "拖延症主要源于难以管理任务带来的负面情绪。"
 ],
 [
  "R",
  "Growth mindset believes abilities can be developed through effort. Fixed mindset thinks talents are innate. Growth mindset students achieve more.",
  "成长型思维的人相信什么？",
  [
   "才能是天生的",
   "能力可以通过努力发展",
   "智力是固定的",
   "应该避免挑战"
  ],
  1,
  "成长型思维认为能力可以通过努力发展。"
 ],
 [
  "M",
  "[A] Exercise improves heart health. [B] Balanced diet provides nutrients. [C] Adequate sleep boosts immune function. [D] Stress management reduces disease risk. [E] Avoiding smoking extends life. [F] Moderate alcohol has mixed effects.",
  "哪个部分涉及免疫系统？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 充足睡眠增强免疫功能。"
 ],
 [
  "M",
  "[A] Solar power is affordable. [B] Wind energy grows rapidly. [C] Hydropower is the largest renewable. [D] Geothermal energy is underutilized. [E] Biomass offers solutions. [F] Nuclear power is low-carbon.",
  "哪个部分谈到一种未被充分利用的能源？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  3,
  "Section D: 地热能未充分利用(underutilized)。"
 ],
 [
  "M",
  "[A] Smartphones changed daily life. [B] Social media shapes opinion. [C] E-commerce transforms retail. [D] Remote work is common. [E] Online education expands access. [F] Digital privacy is a concern.",
  "哪个部分讨论购物方式的变化？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 电子商务改变零售业。"
 ],
 [
  "V",
  "The government should (1)__ more funds to education to (2)__ teaching quality in rural areas.",
  "(1)(2) 最合适的搭配是？",
  [
   "allocate / improve",
   "reduce / maintain",
   "remove / assess",
   "limit / evaluate"
  ],
  0,
  "allocate=分配, improve=提高。分配更多资金提高教学质量。"
 ],
 [
  "V",
  "Technology has (1)__ work. Many manual tasks are now (2)__.",
  "(1)(2) 最合适的搭配是？",
  [
   "revolutionized / automated",
   "ignored / eliminated",
   "delayed / simplified",
   "changed / complicated"
  ],
  0,
  "revolutionized=彻底改变, automated=自动化。技术革新了工作方式。"
 ],
 [
  "V",
  "Effective communication (1)__ active listening. You must (2)__ before responding.",
  "(1)(2) 最合适的搭配是？",
  [
   "requires / understand",
   "avoids / ignore",
   "prevents / forget",
   "delays / misinterpret"
  ],
  0,
  "requires=需要, understand=理解。有效沟通需要理解对方再回应。"
 ],
 [
  "V",
  "The research (1)__ a link between diet and mental health. Balanced diet can (2)__ depression symptoms.",
  "(1)(2) 最合适的搭配是？",
  [
   "revealed / reduce",
   "concealed / increase",
   "ignored / prevent",
   "denied / cause"
  ],
  0,
  "revealed=揭示, reduce=减轻。研究揭示了饮食与心理健康的联系。"
 ],
 [
  "R",
  "Many believe multitasking makes them productive. Research shows the brain focuses on one task at a time. Multitasking is rapid switching that reduces efficiency.",
  "关于多任务处理，研究说了什么？",
  [
   "提高效率",
   "降低效率、增加错误",
   "大脑能轻松处理多任务",
   "提升专注力"
  ],
  1,
  "多任务处理实际上是快速切换，降低效率增加错误。"
 ],
 [
  "R",
  "Globalization has connected economies and cultures. International trade has lifted millions out of poverty. However, it has also led to job losses and threatened local traditions.",
  "全球化的挑战是什么？",
  [
   "没有任何好处",
   "让利益被更广泛分享",
   "只帮助富国",
   "应该被停止"
  ],
  1,
  "全球化的挑战是管理它让利益被更广泛分享。"
 ],
 [
  "R",
  "Emotional intelligence (EQ) is increasingly valued. Studies show EQ predicts job performance better than IQ for many roles.",
  "关于EQ和IQ，文章说了什么？",
  [
   "IQ总是更重要",
   "对很多岗位EQ更预测表现",
   "EQ无法培养",
   "EQ和IQ一样"
  ],
  1,
  "研究显示对于很多职位，EQ比IQ更能预测工作表现。"
 ],
 [
  "M",
  "[A] Forests absorb CO2. [B] Wetlands filter water. [C] Coral reefs protect coasts. [D] Mangroves prevent erosion. [E] Grasslands support biodiversity. [F] Tundra stores carbon.",
  "哪个生态系统被描述为天然滤水器？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: 湿地天然过滤水。"
 ],
 [
  "M",
  "[A] Industrial Revolution changed production. [B] Digital Age transformed information. [C] Agricultural Revolution enabled settlement. [D] Space Age expanded horizons. [E] Information Era connected world. [F] AI Revolution reshapes work.",
  "哪个时期使人类能够建立永久社区？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 农业革命使定居成为可能。"
 ],
 [
  "M",
  "[A] Coffee boosts alertness. [B] Tea contains antioxidants. [C] Green tea aids weight loss. [D] Herbal tea promotes sleep. [E] Energy drinks have high caffeine. [F] Water is essential.",
  "哪种饮品被推荐改善睡眠？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  3,
  "Section D: 花草茶促进睡眠。"
 ],
 [
  "V",
  "The museum (1)__ ancient artifacts. Visitors can (2)__ exhibits in order.",
  "(1)(2) 最合适的搭配是？",
  [
   "houses / explore",
   "builds / destroy",
   "removes / ignore",
   "creates / avoid"
  ],
  0,
  "houses=收藏, explore=探索。博物馆收藏文物，游客可参观。"
 ],
 [
  "V",
  "To (1)__ a healthy lifestyle, (2)__ exercise with a balanced diet.",
  "(1)(2) 最合适的搭配是？",
  [
   "maintain / combine",
   "start / separate",
   "change / avoid",
   "achieve / remove"
  ],
  0,
  "maintain=维持, combine=结合。结合运动和饮食维持健康。"
 ],
 [
  "V",
  "The teacher (1)__ students to think critically to (2)__ problems effectively.",
  "(1)(2) 最合适的搭配是？",
  [
   "encourages / solve",
   "forces / create",
   "allows / ignore",
   "teaches / avoid"
  ],
  0,
  "encourages=鼓励, solve=解决。老师鼓励学生批判性思考。"
 ],
 [
  "V",
  "Scientists (1)__ the universe is expanding. This (2)__ changed cosmology.",
  "(1)(2) 最合适的搭配是？",
  [
   "discovered / discovery",
   "imagined / imagination",
   "created / creation",
   "denied / denial"
  ],
  0,
  "discovered发现, discovery名词。科学家发现宇宙膨胀。"
 ],
 [
  "R",
  "The placebo effect shows the power of mind over body. Clinical trials use control groups to separate placebo from drug effectiveness.",
  "为什么临床试验要使用对照组？",
  [
   "为了省钱",
   "区分安慰剂效应和药物效果",
   "测试更多病人",
   "糖丸更便宜"
  ],
  1,
  "对照组的设计目的就是区分安慰剂效应和药物真实效果。"
 ],
 [
  "R",
  "Mediterranean diet lowers risks of heart disease, diabetes, cancer. The combination of nutrients provides health benefits, not any single food.",
  "地中海饮食健康的秘密是什么？",
  [
   "只吃橄榄油",
   "营养素的组合而非单一食物",
   "大量吃红肉",
   "不吃谷物"
  ],
  1,
  "健康益处来自营养素的组合而非单一食物。"
 ],
 [
  "R",
  "The digital divide is the gap between those with and without technology. Meaningful access requires reliable internet, digital literacy, and relevant content.",
  "有意义的数字接入需要什么？",
  [
   "只要拥有手机",
   "可靠网络、数字素养和相关内容",
   "只要有电",
   "只要会用App"
  ],
  1,
  "有意义接入需可靠网络、数字素养和相关内容。"
 ],
 [
  "M",
  "[A] Jupiter is the largest planet. [B] Mars has tallest mountain. [C] Venus is hottest planet. [D] Saturn has rings. [E] Mercury is closest to Sun. [F] Neptune has strongest winds.",
  "哪颗行星温度最高？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 金星是最热的行星。"
 ],
 [
  "M",
  "[A] Great Wall was for defense. [B] Pyramids were tombs. [C] Colosseum hosted events. [D] Machu Picchu was royal estate. [E] Angkor Wat is religious. [F] Taj Mahal is love monument.",
  "哪个建筑主要用于娱乐活动？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 罗马斗兽场举办角斗士比赛等公众活动。"
 ],
 [
  "M",
  "[A] Photosynthesis converts sunlight. [B] Respiration releases energy. [C] Transpiration moves water. [D] Pollination enables reproduction. [E] Germination starts growth. [F] Fermentation works without O2.",
  "哪个过程涉及植物中水的移动？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 蒸腾作用使水在植物中移动。"
 ],
 [
  "V",
  "Charity (1)__ food and shelter to homeless. It (2)__ on public donations.",
  "(1)(2) 最合适的搭配是？",
  [
   "provides / relies",
   "sells / depends",
   "refuses / counts",
   "offers / stands"
  ],
  0,
  "provides=提供, relies=依赖。慈善机构提供食宿，依赖捐款。"
 ],
 [
  "V",
  "The athlete (1)__ for months. Hard work (2)__ off when she won gold.",
  "(1)(2) 最合适的搭配是？",
  [
   "trained / paid",
   "rested / gave",
   "waited / showed",
   "practiced / came"
  ],
  0,
  "trained=训练, paid off=得到回报。努力训练最终得到回报。"
 ],
 [
  "V",
  "Report (1)__ key issues. It (2)__ that immediate action is needed.",
  "(1)(2) 最合适的搭配是？",
  [
   "identified / stresses",
   "ignored / suggests",
   "created / denies",
   "removed / avoids"
  ],
  0,
  "identified=识别, stresses=强调。报告识别问题并强调需要行动。"
 ],
 [
  "V",
  "Online learning (1)__ students to study at own pace. This (2)__ makes education accessible.",
  "(1)(2) 最合适的搭配是？",
  [
   "allow / flexibility",
   "force / difficulty",
   "require / complexity",
   "prevent / limitation"
  ],
  0,
  "allow=允许, flexibility=灵活性。在线学习提供灵活性。"
 ],
 [
  "R",
  "Flynn Effect: rising IQ scores over generations. Better nutrition, education, complexity. May be leveling off in developed countries.",
  "Flynn效应是什么？",
  [
   "一种智力测试",
   "智商分数随世代上升",
   "智力下降",
   "营养研究"
  ],
  1,
  "Flynn效应指IQ分数代代上升的现象。"
 ],
 [
  "R",
  "Imposter syndrome: feeling less competent than others think. Common among high achievers in competitive environments.",
  "谁最容易有冒名顶替综合症？",
  [
   "成就低的人",
   "竞争环境中的高成就者",
   "从不成功的人",
   "只有学生"
  ],
  1,
  "该症在高成就者和竞争环境中尤为常见。"
 ],
 [
  "R",
  "Circadian rhythms regulate sleep-wake cycles. Shift work and jet lag disrupt them, linked to obesity and diabetes.",
  "什么会破坏昼夜节律？",
  [
   "充足睡眠",
   "轮班工作和时差",
   "自然光照",
   "规律的作息"
  ],
  1,
  "轮班工作(shift work)和时差(jet lag)破坏昼夜节律。"
 ],
 [
  "M",
  "[A] Beethoven composed despite deafness. [B] Van Gogh sold one painting. [C] Einstein failed entrance exam. [D] JK Rowling rejected by 12 publishers. [E] Disney fired for lacking imagination. [F] Oprah told unfit for TV.",
  "哪个故事说明早期失败不阻碍后来成功？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  3,
  "JK罗琳被12家出版社拒绝后大获成功。"
 ],
 [
  "M",
  "[A] Nitrogen is most of atmosphere. [B] Oxygen is for respiration. [C] CO2 traps heat. [D] Argon is inert. [E] Water vapor varies. [F] Ozone blocks UV.",
  "哪种气体对呼吸至关重要？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: 氧气对呼吸至关重要。"
 ],
 [
  "M",
  "[A] Smartwatches track health. [B] VR headsets create immersion. [C] Wireless earbuds convenient. [D] Laptops essential. [E] Tablets bridge gap. [F] Smart speakers answer voice.",
  "哪种设备创造虚拟环境？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: VR头显创造沉浸式体验。"
 ],
 [
  "V",
  "Policy aims to (1)__ the rich-poor gap and (2)__ economic inequality.",
  "(1)(2) 最合适的搭配是？",
  [
   "narrow / address",
   "expand / ignore",
   "widen / promote",
   "measure / assess"
  ],
  0,
  "narrow=缩小, address=处理。缩小差距，处理不平等。"
 ],
 [
  "V",
  "Artists (1)__ inspiration from daily life, (2)__ ordinary moments into extraordinary works.",
  "(1)(2) 最合适的搭配是？",
  [
   "draw / transform",
   "take / copy",
   "find / repeat",
   "get / destroy"
  ],
  0,
  "draw inspiration=汲取灵感, transform=转化。将平凡转化为不凡。"
 ],
 [
  "V",
  "Company (1)__ a new product and (2)__ significant market share.",
  "(1)(2) 最合适的搭配是？",
  [
   "launched / gained",
   "removed / lost",
   "planned / ignored",
   "designed / reduced"
  ],
  0,
  "launched=推出, gained=获得。推出新产品并获得市场份额。"
 ],
 [
  "V",
  "Volunteering can (1)__ your perspective and help you (2)__ gratitude.",
  "(1)(2) 最合适的搭配是？",
  [
   "broaden / develop",
   "limit / forget",
   "narrow / ignore",
   "change / lose"
  ],
  0,
  "broaden=拓宽, develop=培养。志愿服务拓宽视野培养感恩。"
 ],
 [
  "R",
  "Language shapes how we think. Linguistic relativity suggests language influences cognition. Different languages perceive the world differently.",
  "什么是语言相对论？",
  [
   "所有语言都一样",
   "语言影响思维方式",
   "有些语言更好",
   "学语言很容易"
  ],
  1,
  "语言相对论认为语言影响我们的思维方式。"
 ],
 [
  "R",
  "Sunk cost fallacy: continuing investment because resources already spent. Example: staying in bad relationship because years invested.",
  "沉没成本谬误导致人们做什么？",
  [
   "做理性决定",
   "不合理地继续投入",
   "及时止损",
   "关注未来价值"
  ],
  1,
  "沉没成本谬误让人因为已经投入而继续不合理投入。"
 ],
 [
  "R",
  "Microplastics found everywhere. Enter body through food, water, air. Potential impacts on digestive and immune systems.",
  "微塑料如何进入人体？",
  [
   "只通过水",
   "通过食物、水和空气",
   "只通过海鲜",
   "通过皮肤接触"
  ],
  1,
  "微塑料通过食物、水和空气进入人体。"
 ],
 [
  "M",
  "[A] Democracy: citizens voice. [B] Autocracy: power concentration. [C] Monarchy: tradition. [D] Republic: elected reps. [E] Theocracy: religion+state. [F] Anarchy: no government.",
  "哪种体制以缺乏政府为特征？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  5,
  "Section F: 无政府状态缺乏正式政府。"
 ],
 [
  "M",
  "[A] Supply-demand sets prices. [B] Inflation reduces purchasing power. [C] Interest rates influence borrowing. [D] Taxation funds services. [E] Trade creates benefits. [F] Regulation protects consumers.",
  "哪个概念解释钱越来越不值钱？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: 通货膨胀降低购买力。"
 ],
 [
  "M",
  "[A] Antibiotics fight bacteria. [B] Vaccines prevent diseases. [C] Painkillers relieve symptoms. [D] Antidepressants treat mental health. [E] Insulin manages diabetes. [F] Chemotherapy targets cancer.",
  "哪种疗法通过训练免疫系统工作？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  1,
  "Section B: 疫苗通过训练免疫系统预防疾病。"
 ],
 [
  "V",
  "Scientist (1)__ years to finding a cure. Her (2)__ saved thousands.",
  "(1)(2) 最合适的搭配是？",
  [
   "devoted / dedication",
   "wasted / ignorance",
   "spent / failure",
   "used / mistake"
  ],
  0,
  "devoted=投入, dedication=奉献。全身心投入研究。"
 ],
 [
  "V",
  "Festival (1)__ people from all walks. It (2)__ cultural exchange.",
  "(1)(2) 最合适的搭配是？",
  [
   "brings together / promotes",
   "separates / prevents",
   "divides / limits",
   "gathers / stops"
  ],
  0,
  "brings together=聚集, promotes=促进。节日聚集各界促进交流。"
 ],
 [
  "V",
  "Good leaders (1)__ team to reach potential and (2)__ positive environment.",
  "(1)(2) 最合适的搭配是？",
  [
   "inspire / create",
   "force / destroy",
   "allow / ignore",
   "tell / avoid"
  ],
  0,
  "inspire=激励, create=创造。好的领导者激励团队创造积极环境。"
 ],
 [
  "V",
  "Study (1)__ early education has long-term benefits. Kids attending preschool more likely to (2)__ higher education.",
  "(1)(2) 最合适的搭配是？",
  [
   "confirms / pursue",
   "denies / avoid",
   "suggests / drop",
   "indicates / reject"
  ],
  0,
  "confirms=证实, pursue=追求。研究证实早教有长期益处。"
 ],
 [
  "R",
  "Bystander effect: less help when others present. Responsibility diffuses. Understanding this encourages action in emergencies.",
  "为什么旁观者多时反而更少人帮忙？",
  [
   "人们冷漠",
   "责任在群体中分散了",
   "看不到紧急情况",
   "受害者不需要帮助"
  ],
  1,
  "责任分散——每个人都以为别人会帮忙。"
 ],
 [
  "R",
  "Flow is complete absorption. Time disappears. Occurs when challenge matches skill level.",
  "心流在什么情况下发生？",
  [
   "任务很简单时",
   "挑战与技能匹配时",
   "任务不可能时",
   "分心时"
  ],
  1,
  "心流发生在挑战难度与个人技能水平相匹配时。"
 ],
 [
  "R",
  "Tragedy of the commons: self-interest depletes shared resources. Examples: overfishing, overgrazing.",
  "公地悲剧的例子是什么？",
  [
   "自己种食物",
   "过度捕捞",
   "去超市买东西",
   "种花园"
  ],
  1,
  "过度捕捞是公地悲剧的经典例子。"
 ],
 [
  "M",
  "[A] Amazon is largest rainforest. [B] Sahara is largest hot desert. [C] Nile is longest river. [D] Everest is highest mountain. [E] Mariana Trench is deepest point. [F] Antarctica is coldest continent.",
  "哪处是地球最低点？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  4,
  "Section E: 马里亚纳海沟是地球最深点。"
 ],
 [
  "M",
  "[A] Baroque: dramatic. [B] Renaissance: realism. [C] Impressionism: light. [D] Cubism: perspectives. [E] Surrealism: unconscious. [F] Abstract: rejects representation.",
  "哪个流派探索梦境和潜意识？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  4,
  "Section E: 超现实主义探索潜意识。"
 ],
 [
  "M",
  "[A] Photosynthesis needs sunlight. [B] Cellular respiration makes energy. [C] DNA contains genetic info. [D] Proteins perform functions. [E] Lipids store energy. [F] Carbs provide quick energy.",
  "哪种分子携带遗传信息？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: DNA包含遗传信息。"
 ],
 [
  "V",
  "Conference (1)__ experts worldwide. Platform for (2)__ ideas.",
  "(1)(2) 最合适的搭配是？",
  [
   "gathered / exchanging",
   "separated / hiding",
   "limited / keeping",
   "divided / stopping"
  ],
  0,
  "gathered=聚集, exchanging=交换。会议聚集专家交流思想。"
 ],
 [
  "V",
  "Critical thinking (1)__ you to evaluate objectively and (2)__ informed decisions.",
  "(1)(2) 最合适的搭配是？",
  [
   "enables / make",
   "prevents / avoid",
   "stops / ignore",
   "forces / repeat"
  ],
  0,
  "enables=使能够, make decisions=做决定。批判性思维帮你做明智决定。"
 ],
 [
  "V",
  "Novel (1)__ lives of immigrants and (2)__ themes of identity.",
  "(1)(2) 最合适的搭配是？",
  [
   "portrays / explores",
   "ignores / avoids",
   "forgets / misses",
   "changes / hides"
  ],
  0,
  "portrays=描绘, explores=探索。小说描绘移民生活，探索身份认同。"
 ],
 [
  "V",
  "New tech (1)__ efficiency and has (2)__ to transform the industry.",
  "(1)(2) 最合适的搭配是？",
  [
   "increases / potential",
   "decreases / limitation",
   "maintains / problem",
   "reduces / failure"
  ],
  0,
  "increases=提高, potential=潜力。提高效率有潜力改变行业。"
 ],
 [
  "R",
  "Dunning-Kruger: low-ability overestimate, experts underestimate. Unskilled lack metacognition. Highlights continuous learning.",
  "达克效应描述了什么？",
  [
   "专家总是了解自己",
   "低能力者高估自己，专家低估自己",
   "每个人都能准确判断自己",
   "只有初学者有此偏见"
  ],
  1,
  "达克效应：能力低的人高估自己，专家反而低估自己。"
 ],
 [
  "R",
  "Blockchain is distributed ledger. Records nearly impossible to alter retroactively. Used for secure data management.",
  "为什么区块链被认为是安全的？",
  [
   "使用单台中央电脑",
   "记录几乎无法追溯篡改",
   "只用于加密货币",
   "任何人都能改数据"
  ],
  1,
  "区块链安全在于记录几乎无法被追溯篡改。"
 ],
 [
  "R",
  "80/20 rule: 80% of effects from 20% of causes. Helps prioritize efforts on most impactful areas.",
  "帕累托原理如何帮助工作？",
  [
   "每件事都平均用力",
   "聚焦最有影响力的领域",
   "忽略所有客户",
   "工作更长时间"
  ],
  1,
  "帕累托原理帮助聚焦关键的20%以产生80%效果。"
 ],
 [
  "M",
  "[A] Brain has 86B neurons. [B] Heart beats 100K daily. [C] Liver has 500+ functions. [D] Lungs process 11K L air. [E] Skin is largest organ. [F] Bones store calcium.",
  "哪个器官功能最多？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  2,
  "Section C: 肝脏有500多种功能。"
 ],
 [
  "M",
  "[A] Baroque: detailed drama. [B] Classical: balance. [C] Romantic: emotion. [D] Jazz: improvisation. [E] Rock: electric. [F] Electronic: synthesized.",
  "哪种音乐以即兴创作为特征？",
  [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F"
  ],
  3,
  "Section D: 爵士乐以即兴(improvisation)为特征。"
 ],
 [
  "R",
  "Critical reading means actively engaging with text, questioning assumptions, evaluating evidence, forming your own conclusions. It goes beyond understanding to analyzing purpose and bias.",
  "批判性阅读的核心是什么？",
  [
   "看懂每个单词",
   "质疑假设、评估证据、形成自己的结论",
   "死记硬背",
   "快速阅读"
  ],
  1,
  "批判性阅读包括质疑假设、评估证据、形成独立结论。"
 ]
];
