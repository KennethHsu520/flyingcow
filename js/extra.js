export const REACT = {
  cow: ['哞～謝謝你懂我', '哞～你很會照顧乳牛', '哞～下次再來看我'],
  goat: ['咩～答對了', '咩～你好懂山羊', '咩～一起上天橋吧'],
  rabbit: ['耳朵動了動，你好懂兔子', '鼻子抖抖，謝謝你', '兔子安心地眨眨眼']
};

export const Q2 = {
  cow: {
    'morning-cool': {
      question: '想近距離看乳牛吃草，怎麼做比較好？',
      options: [
        { text: '在圍欄外安靜觀察', correct: true, note: '保持距離、安靜觀察，乳牛才能放鬆地吃草。' },
        { text: '拔草伸進圍欄餵牠', note: '請不要自己餵食動物，一切依牧場規範。' },
        { text: '爬上圍欄靠近一點', note: '爬圍欄很危險，也會嚇到乳牛。' }
      ]
    },
    'morning-hot': {
      question: '太陽越來越大，乳牛最需要什麼？',
      options: [
        { text: '遮蔭和充足的飲水', correct: true, note: '遮蔭和水，是幫乳牛對抗炎熱最重要的兩件事。' },
        { text: '多吃一點飼料', note: '熱天時乳牛的食慾反而會下降。' },
        { text: '曬太陽取暖', note: '乳牛怕熱不怕冷，熱天不需要曬太陽。' }
      ]
    },
    'noon-cool': {
      question: '乳牛的胃一共有幾個胃室？',
      options: [
        { text: '1 個', note: '人只有 1 個胃，乳牛可不一樣。' },
        { text: '2 個', note: '再多一點喔。' },
        { text: '4 個', correct: true, note: '瘤胃、網胃、瓣胃、皺胃，四個胃室分工合作，才能消化大量的草。' }
      ]
    },
    'noon-hot': {
      question: '下列哪一個是乳牛「太熱了」的徵兆？',
      options: [
        { text: '呼吸變快、張嘴喘氣', correct: true, note: '呼吸變快、張嘴喘氣，代表乳牛正在努力散熱。' },
        { text: '一直甩尾巴', note: '甩尾巴多半是在趕蒼蠅。' },
        { text: '低頭吃草', note: '能好好吃草，通常代表牠很舒服。' }
      ]
    },
    'evening-cool': {
      question: '為什麼牧場常在早晚讓乳牛到戶外活動？',
      options: [
        { text: '早晚比較涼，乳牛比較舒服', correct: true, note: '避開中午的高溫，乳牛活動起來比較不會熱緊迫。' },
        { text: '乳牛晚上看得比較清楚', note: '這不是主要原因，關鍵是溫度。' },
        { text: '中午草會不見', note: '草不會不見，是中午太熱了。' }
      ]
    },
    'evening-hot': {
      question: '看到乳牛喘得很厲害，你應該怎麼做？',
      options: [
        { text: '告訴牧場工作人員', correct: true, note: '動物不舒服時，交給專業的工作人員處理最安全。' },
        { text: '自己拿水潑牠', note: '自行處理可能讓動物受驚，請交給工作人員。' },
        { text: '拍完照就離開', note: '發現動物不舒服，告訴工作人員就是幫了大忙。' }
      ]
    }
  },
  goat: {
    'morning-cool': {
      question: '山羊比較喜歡吃什麼？',
      options: [
        { text: '樹葉和嫩枝', correct: true, note: '山羊喜歡抬頭啃樹葉和嫩枝，天橋旁的樹就是牠們的早餐。' },
        { text: '肉', note: '山羊是草食動物，不吃肉。' },
        { text: '餅乾零食', note: '人吃的零食對山羊並不好。' }
      ]
    },
    'morning-hot': {
      question: '牧場為什麼要幫山羊蓋有屋頂的羊舍？',
      options: [
        { text: '可以遮太陽，也可以擋雨', correct: true, note: '有屋頂的地方，讓山羊熱天能避暑、下雨能躲雨。' },
        { text: '讓山羊睡在屋頂上', note: '屋頂是用來遮蔽的，不是給山羊睡的。' },
        { text: '只是為了好看', note: '羊舍是山羊生活很重要的地方。' }
      ]
    },
    'noon-cool': {
      question: '山羊和乳牛有什麼共同點？',
      options: [
        { text: '都是反芻動物', correct: true, note: '山羊和乳牛都會把吞下的草送回嘴裡再嚼一次。' },
        { text: '都會長出很厚的羊毛', note: '乳牛不會長羊毛喔。' },
        { text: '都住在水裡', note: '牠們都住在陸地上。' }
      ]
    },
    'noon-hot': {
      question: '想讓山羊好好休息，你可以怎麼做？',
      options: [
        { text: '保持安靜，不拍打欄杆', correct: true, note: '安靜觀察，是給休息中的動物最好的禮物。' },
        { text: '丟東西讓牠們站起來', note: '丟東西會嚇到動物，也可能讓牠們受傷。' },
        { text: '大聲叫牠們', note: '大聲叫會吵醒正在休息的山羊。' }
      ]
    },
    'evening-cool': {
      question: '山羊站在高處東張西望，主要是在做什麼？',
      options: [
        { text: '觀察四周有沒有危險', correct: true, note: '站得高看得遠，加上橫長的瞳孔，山羊很容易發現動靜。' },
        { text: '準備睡覺', note: '準備睡覺時，山羊會趴下來。' },
        { text: '在找廁所', note: '東張西望是在觀察環境。' }
      ]
    },
    'evening-hot': {
      question: '小山羊對著人咩咩叫，最可能代表什麼？',
      options: [
        { text: '好奇，或想引起注意', correct: true, note: '小山羊會用叫聲表達好奇或找媽媽。但這不代表可以隨意餵食喔。' },
        { text: '牠在唱歌', note: '山羊的叫聲是溝通，不是唱歌。' },
        { text: '牠準備要咬人', note: '咩咩叫通常不是攻擊的意思。' }
      ]
    }
  },
  rabbit: {
    'morning-cool': {
      question: '兔子用後腳站起來到處聞，是在做什麼？',
      options: [
        { text: '觀察、聞聞周圍的環境', correct: true, note: '站高一點、用鼻子聞，是兔子認識環境的方法。' },
        { text: '在跳舞', note: '這是在觀察，不是跳舞。' },
        { text: '想被抱起來', note: '大部分兔子並不喜歡被抱。' }
      ]
    },
    'morning-hot': {
      question: '兔子主要靠身體哪個部位散熱？',
      options: [
        { text: '耳朵', correct: true, note: '兔子的大耳朵布滿血管，是牠們散熱的好幫手。' },
        { text: '尾巴', note: '兔子的尾巴很短，不是主要的散熱部位。' },
        { text: '牙齒', note: '牙齒是用來啃牧草的。' }
      ]
    },
    'noon-cool': {
      question: '兔子一天之中，什麼時候最有精神？',
      options: [
        { text: '清晨和傍晚', correct: true, note: '兔子是晨昏型動物，中午多半在休息。' },
        { text: '正午最熱的時候', note: '正午兔子通常在睡覺休息。' },
        { text: '一整天都一樣', note: '兔子的精神會隨時間改變喔。' }
      ]
    },
    'noon-hot': {
      question: '大約幾度以上，兔子就要特別小心中暑？',
      options: [
        { text: '約 28°C', correct: true, note: '兔子很怕熱，氣溫大約超過 28°C 就要特別注意。' },
        { text: '約 15°C', note: '15°C 對兔子來說很舒服。' },
        { text: '約 5°C', note: '這已經很冷了。' }
      ]
    },
    'evening-cool': {
      question: '兔子最主要的食物是什麼？',
      options: [
        { text: '牧草', correct: true, note: '牧草是兔子每天最主要的食物，也能幫牠磨牙。' },
        { text: '紅蘿蔔', note: '紅蘿蔔糖分高，只能當少量點心。' },
        { text: '巧克力', note: '巧克力對兔子有害，千萬不能給。' }
      ]
    },
    'evening-hot': {
      question: '看到兔子跺腳，大家應該怎麼做？',
      options: [
        { text: '停下來保持安靜', correct: true, note: '兔子跺腳是在說「有危險」，安靜下來牠就會慢慢放鬆。' },
        { text: '也跺腳回應牠', note: '跺腳回應會讓兔子更緊張。' },
        { text: '追得更快', note: '追逐會讓兔子非常害怕。' }
      ]
    }
  }
};

export const QUIZ = {
  cow: [
    { text: '乳牛的胃有四個胃室。', answer: true, note: '瘤胃、網胃、瓣胃、皺胃，一共四個。' },
    { text: '黑白花紋的乳牛，每一頭的花紋都一樣。', answer: false, note: '每一頭乳牛的花紋都不一樣，就像人的指紋。' },
    { text: '乳牛比較怕熱，不太怕冷。', answer: true, note: '天氣一熱，乳牛就容易熱緊迫。' },
    { text: '乳牛只在白天吃東西。', answer: false, note: '乳牛一整天會分好幾次進食和反芻。' },
    { text: '乳牛會把吞下的草送回嘴裡再嚼一次。', answer: true, note: '這叫做反芻，一天要花好幾個小時。' },
    { text: '熱天時，乳牛會吃得比平常多。', answer: false, note: '熱天時乳牛的食慾反而會下降。' }
  ],
  goat: [
    { text: '山羊的瞳孔是橫的長方形。', answer: true, note: '橫長瞳孔讓山羊的視野很寬。' },
    { text: '山羊很怕高，從來不往高處爬。', answer: false, note: '山羊是攀爬高手，很喜歡站在高處。' },
    { text: '山羊和乳牛一樣是反芻動物。', answer: true, note: '吃飽後，山羊會趴著慢慢反芻。' },
    { text: '比起貼地吃草，山羊更喜歡抬頭吃樹葉。', answer: true, note: '樹葉和嫩枝是山羊最愛的食物。' },
    { text: '看到可愛的小山羊，可以自己拿零食餵牠。', answer: false, note: '請不要自己餵食動物，一切依牧場規範。' },
    { text: '山羊的蹄很會抓地，走在窄窄的天橋上也很穩。', answer: true, note: '這就是山羊能在天橋上自在活動的原因。' }
  ],
  rabbit: [
    { text: '兔子的牙齒一輩子都在長。', answer: true, note: '所以兔子要靠大量啃牧草來磨牙。' },
    { text: '紅蘿蔔是兔子最主要的食物。', answer: false, note: '牧草才是主食，紅蘿蔔只能當少量點心。' },
    { text: '兔子會流汗來散熱。', answer: false, note: '兔子沒有汗腺，主要靠耳朵散熱。' },
    { text: '兔子在清晨和傍晚最活躍。', answer: true, note: '兔子是晨昏型動物。' },
    { text: '兔子用後腳跺地，是在警告同伴。', answer: true, note: '跺腳是兔子的警報。' },
    { text: '大部分兔子都很喜歡被抱起來。', answer: false, note: '大部分兔子不喜歡被抱，請不要隨意抱動物。' }
  ]
};

export const SORT = {
  cow: [
    { time: 'morning', text: '太陽剛出來，涼涼的，邊走邊吃早餐' },
    { time: 'noon', text: '太陽最大，趴在樹蔭下休息、反芻' },
    { time: 'evening', text: '夕陽西下，天氣變涼，又出來走走吃草' }
  ],
  goat: [
    { time: 'morning', text: '晨霧還沒散，在天橋上散步、啃樹葉' },
    { time: 'noon', text: '熱到不想動，擠在天橋下的陰影裡' },
    { time: 'evening', text: '涼風吹來，又爬上天橋東張西望' }
  ],
  rabbit: [
    { time: 'morning', text: '天剛亮，跳來跳去，站起來到處聞' },
    { time: 'noon', text: '窩在兔舍門口，閉著眼睛睡午覺' },
    { time: 'evening', text: '太陽下山前，又出來喀滋喀滋啃牧草' }
  ]
};
