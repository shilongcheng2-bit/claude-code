const bars = [
  {
    id: 1,
    rank: 1,
    name: '鳥よし 上野本店',
    nameEn: 'Toriyoshi Ueno',
    genre: 'yakitori',
    genreLabel: '焼き鳥',
    emoji: '🍗',
    rating: 4.8,
    priceRange: '¥2,500〜¥4,000',
    priceValue: 3250,
    address: '台東区上野6-12-3',
    hours: '17:00〜24:00（月〜土）',
    closed: '日曜',
    desc: '上野で50年以上続く老舗焼き鳥専門店。備長炭で一本一本丁寧に焼き上げる串は絶品。常連客でにぎわう昭和の雰囲気が漂う名店。',
    features: ['個室あり', '予約可', 'テイクアウト可'],
    highlights: [
      'つくね・ねぎまの二枚看板は必食',
      '地酒・焼酎の品揃えが豊富',
      '開店前から行列ができる人気店',
      'グループ・接待にも対応'
    ]
  },
  {
    id: 2,
    rank: 2,
    name: 'アメ横ビアホール',
    nameEn: 'Ameyoko Beer Hall',
    genre: 'beer',
    genreLabel: 'ビアホール',
    emoji: '🍺',
    rating: 4.7,
    priceRange: '¥2,000〜¥3,500',
    priceValue: 2750,
    address: '台東区上野4-1-8（アメ横内）',
    hours: '11:00〜22:30',
    closed: '無休',
    desc: 'アメ横商店街の中心に位置する開放感抜群のビアホール。世界各国のクラフトビールを常時20種類以上揃える。観光客と地元民が混ざり合う活気あふれる空間。',
    features: ['テラス席あり', '観光地近く', '英語メニュー'],
    highlights: [
      '国産クラフトビール10種以上',
      '焼きソーセージ・プレッツェルなど本格つまみ',
      'アメ横の雰囲気を楽しみながら昼飲みOK',
      '大型グループ向けの席あり'
    ]
  },
  {
    id: 3,
    rank: 3,
    name: '海鮮居酒屋 魚富',
    nameEn: 'Uotomi Seafood Izakaya',
    genre: 'seafood',
    genreLabel: '海鮮',
    emoji: '🐟',
    rating: 4.6,
    priceRange: '¥3,000〜¥5,000',
    priceValue: 4000,
    address: '台東区上野2-14-6',
    hours: '16:00〜23:00',
    closed: '月曜',
    desc: '市場直送の鮮魚を使った刺身・焼き魚が自慢。店主が毎朝豊洲市場で仕入れる食材は鮮度抜群。日本酒との相性が抜群で日本酒好きにはたまらない一軒。',
    features: ['要予約（週末）', '個室あり', 'カウンター席'],
    highlights: [
      '豊洲市場直送の鮮魚を使用',
      '日本酒は全国各地の地酒40種',
      'おすすめは刺身盛り合わせ（3種から）',
      '魚介鍋コースが大人気'
    ]
  },
  {
    id: 4,
    rank: 4,
    name: '上野居酒屋 はなの舞',
    nameEn: 'Hana no Mai Ueno',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🏮',
    rating: 4.5,
    priceRange: '¥2,000〜¥3,800',
    priceValue: 2900,
    address: '台東区上野3-28-1',
    hours: '17:00〜翌0:00',
    closed: '無休',
    desc: '上野駅から徒歩3分の好立地。豊富なメニューと週替わりの黒板メニューが人気。宴会コースはコスパ抜群で、会社の飲み会から女子会まで幅広く対応。',
    features: ['宴会コースあり', '貸切可', '飲み放題'],
    highlights: [
      '2時間飲み放題付きコース¥3,500〜',
      '季節の食材を使った黒板料理が毎週更新',
      '最大50名の宴会に対応',
      '女子会・誕生日プランあり'
    ]
  },
  {
    id: 5,
    rank: 5,
    name: '立ち飲み 番長',
    nameEn: 'Tachi-nomi Bancho',
    genre: 'standing',
    genreLabel: '立ち飲み',
    emoji: '🥃',
    rating: 4.4,
    priceRange: '¥1,000〜¥2,500',
    priceValue: 1750,
    address: '台東区上野5-25-11',
    hours: '15:00〜23:30',
    closed: '水曜',
    desc: '昭和の薫り漂う立ち飲み酒場。焼酎ハイボールがなんと280円から。コスパ最強で地元サラリーマンの聖地として長年愛される。お通しが豪華と評判。',
    features: ['超リーズナブル', '現金のみ', 'サクッと一杯に最適'],
    highlights: [
      'ハイボール・チューハイ280円〜',
      'モツ煮込み・串カツが人気つまみ',
      'ランチタイムから飲める稀有な存在',
      '常連になると値引きされるとの噂も'
    ]
  },
  {
    id: 6,
    rank: 6,
    name: '上野 串かつ 八幡',
    nameEn: 'Kushikatsu Hachiman',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🍢',
    rating: 4.4,
    priceRange: '¥2,500〜¥4,200',
    priceValue: 3350,
    address: '台東区上野1-18-7',
    hours: '17:30〜23:00',
    closed: '火曜',
    desc: '大阪仕込みの本格串かつが東京で食べられる貴重な一軒。サクサクの衣に包まれた食材は50種類以上。二度漬け禁止のルールも大阪本場のスタイルを継承。',
    features: ['二度漬け禁止（本格派）', 'カウンター席', '単品オーダー可'],
    highlights: [
      '串かつ50種類以上を用意',
      'おすすめはエビ・紅しょうが・チーズ',
      '大阪から直送のソースを使用',
      '食べ放題コースもあり（要予約）'
    ]
  },
  {
    id: 7,
    rank: 7,
    name: '上野 炭火焼肉 牛王',
    nameEn: 'Yakiniku Gyuou',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🥩',
    rating: 4.3,
    priceRange: '¥3,500〜¥6,000',
    priceValue: 4750,
    address: '台東区上野7-1-21',
    hours: '17:00〜23:30',
    closed: '月曜',
    desc: 'A5ランクの黒毛和牛を炭火で焼き上げる焼肉専門店。全席個室で接待にも最適。隠れ家的な雰囲気で特別な夜を演出。',
    features: ['全席個室', 'A5和牛使用', '接待向け'],
    highlights: [
      'A5黒毛和牛のみを使用',
      '熟練スタッフが焼いてくれるサービスも',
      '赤ワインとの相性が抜群',
      'コース料理は要事前予約'
    ]
  },
  {
    id: 8,
    rank: 8,
    name: 'クラフトビア 上野醸造所',
    nameEn: 'Ueno Craft Brewery',
    genre: 'beer',
    genreLabel: 'ビアホール',
    emoji: '🍻',
    rating: 4.3,
    priceRange: '¥2,000〜¥4,000',
    priceValue: 3000,
    address: '台東区東上野2-9-5',
    hours: '15:00〜23:00',
    closed: '月曜',
    desc: '上野初の地ビール醸造所直営店。その場で醸造したできたてクラフトビールが飲めるのは都内でも珍しい。IPAからスタウトまで常時8タップを用意。',
    features: ['醸造所直営', '工場見学可（要予約）', 'ビアフライト'],
    highlights: [
      '上野産オリジナルクラフトビール8種',
      'ビアフライト（飲み比べ4種）が人気',
      '醸造所見学ツアー（月1回開催）',
      'ビール検定の勉強会も定期開催'
    ]
  },
  {
    id: 9,
    rank: 9,
    name: '上野 お好み焼き 太郎',
    nameEn: 'Okonomiyaki Taro',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🫓',
    rating: 4.2,
    priceRange: '¥1,800〜¥3,200',
    priceValue: 2500,
    address: '台東区上野4-6-8',
    hours: '11:30〜14:00 / 17:00〜22:30',
    closed: '火曜',
    desc: '大阪出身の店主が作る本場のお好み焼き・もんじゃ焼きが自慢。国産山芋をたっぷり使ったふわとろ生地は感動もの。鉄板を囲んで飲むお酒は格別。',
    features: ['鉄板席', '昼も営業', 'キッズメニューあり'],
    highlights: [
      'ミックスお好み焼きが看板メニュー',
      '広島焼きも本格派',
      'ランチタイムは定食も提供',
      '子ども向け鉄板教室（月2回）'
    ]
  },
  {
    id: 10,
    rank: 10,
    name: '立ち食い寿司 上野 魚松',
    nameEn: 'Tachi-zushi Uotatsu',
    genre: 'seafood',
    genreLabel: '海鮮',
    emoji: '🍣',
    rating: 4.2,
    priceRange: '¥1,500〜¥3,000',
    priceValue: 2250,
    address: '台東区アメ横商店街内',
    hours: '10:00〜20:00',
    closed: '不定休',
    desc: 'アメ横の中で昔ながらのスタイルを守る立ち食い寿司。一貫100円からという破格の値段で本格江戸前寿司を提供。観光客にも大人気で常に行列ができている。',
    features: ['立ち食い形式', '外国語対応', 'テイクアウト可'],
    highlights: [
      '一貫100円〜の圧倒的コスパ',
      '江戸前の仕事にこだわった職人技',
      '瓶ビール・日本酒を片手に立ち飲みOK',
      '観光の合間に気軽に立ち寄れる'
    ]
  },
  {
    id: 11,
    rank: 11,
    name: '炭焼き地鶏 上野たまの',
    nameEn: 'Sumiyaki Jidori Tamano',
    genre: 'yakitori',
    genreLabel: '焼き鳥',
    emoji: '🔥',
    rating: 4.1,
    priceRange: '¥2,500〜¥4,500',
    priceValue: 3500,
    address: '台東区上野2-1-3',
    hours: '17:00〜23:30',
    closed: '日曜',
    desc: '宮崎産地鶏のみを使用した焼き鳥専門店。炭火の遠赤外線効果でしっとり焼き上げる技術は他店とは一線を画す。鶏刺しも名物で日南の地鶏を生で楽しめる。',
    features: ['宮崎産地鶏使用', '鶏刺しあり', '日本酒充実'],
    highlights: [
      '宮崎産「みやざき地頭鶏」のみ使用',
      '鶏刺しの盛り合わせが絶品',
      '全国地酒30種以上',
      'コース料理で宮崎郷土料理も堪能'
    ]
  },
  {
    id: 12,
    rank: 12,
    name: '居酒屋 北の海道',
    nameEn: 'Izakaya Kitanokkaido',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🦀',
    rating: 4.1,
    priceRange: '¥3,000〜¥5,500',
    priceValue: 4250,
    address: '台東区上野6-4-15',
    hours: '16:30〜23:00',
    closed: '水曜',
    desc: '北海道直送の海産物を使った料理が評判の居酒屋。ズワイガニ・毛ガニ・ホタテなど北の幸が年中楽しめる。ジンギスカンも本場の味が上野で食べられる。',
    features: ['北海道直送食材', '鍋メニュー充実', '宴会コースあり'],
    highlights: [
      'カニ・ホタテ・イクラなど北海道直送',
      '石狩鍋・ジンギスカンコースが人気',
      '北海道のクラフトビール・ウイスキーも',
      '冬季限定のカニコースは要予約必須'
    ]
  },
  {
    id: 13,
    rank: 13,
    name: '上野 立ち飲み もつ次郎',
    nameEn: 'Tachi-nomi Motsu-jiro',
    genre: 'standing',
    genreLabel: '立ち飲み',
    emoji: '🍲',
    rating: 4.0,
    priceRange: '¥800〜¥2,000',
    priceValue: 1400,
    address: '台東区上野5-8-3',
    hours: '14:00〜23:00',
    closed: '火曜',
    desc: 'もつ煮込みが看板メニューの下町立ち飲み酒場。昭和の情緒が残る店内で気軽に一杯できる。ホルモン・レバー・シロなど豊富なモツ料理が揃う。',
    features: ['超低価格', '下町情緒', 'サクッと寄り道向け'],
    highlights: [
      '名物もつ煮込みは1日100食限定',
      '酎ハイ・ホッピー300円〜',
      '常連が教えてくれる裏メニューあり',
      'テレビ取材多数の人気店'
    ]
  },
  {
    id: 14,
    rank: 14,
    name: '上野 隠れ家バル Yoru',
    nameEn: 'Hidden Bar Yoru',
    genre: 'beer',
    genreLabel: 'ビアホール',
    emoji: '🌙',
    rating: 4.0,
    priceRange: '¥2,500〜¥4,500',
    priceValue: 3500,
    address: '台東区上野3-11-2（地下1F）',
    hours: '18:00〜翌2:00',
    closed: '月曜',
    desc: '地下に佇む隠れ家系ワインバー兼クラフトビアバー。自然派ワインのセレクションが都内屈指で、音楽のセンスも抜群。デートや特別な夜に最適な一軒。',
    features: ['地下隠れ家', '自然派ワイン充実', 'デートに最適'],
    highlights: [
      'ナチュラルワイン100種以上',
      'バックヤードで音楽ライブも開催',
      '予約困難な人気店（2週間前から受付）',
      'ソムリエによるワインペアリングコースあり'
    ]
  },
  {
    id: 15,
    rank: 15,
    name: '大衆居酒屋 うえ乃',
    nameEn: 'Daishuu Izakaya Ueno',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🍶',
    rating: 3.9,
    priceRange: '¥1,500〜¥3,000',
    priceValue: 2250,
    address: '台東区上野7-8-12',
    hours: '16:00〜23:30',
    closed: '無休',
    desc: '昭和の大衆居酒屋スタイルを今に伝える名店。おでん・煮物・揚げ物と定番つまみが充実。リーズナブルな価格で地元の常連客から観光客まで誰でも温かく迎えてくれる。',
    features: ['昭和レトロ', '全席禁煙', 'ファミリーOK'],
    highlights: [
      'おでん10種・大根・たまご・厚揚げが名物',
      '生ビール中ジョッキ480円の安さ',
      '土日は家族連れで賑わう',
      '70年以上続く老舗の味'
    ]
  },
  {
    id: 16,
    rank: 16,
    name: '上野 牡蠣専門 オイスターバー Kai',
    nameEn: 'Oyster Bar Kai',
    genre: 'seafood',
    genreLabel: '海鮮',
    emoji: '🦪',
    rating: 3.9,
    priceRange: '¥2,800〜¥5,000',
    priceValue: 3900,
    address: '台東区東上野4-2-9',
    hours: '17:00〜23:00（平日） 14:00〜23:00（土日）',
    closed: '火曜',
    desc: '国内外の産地から取り寄せる生牡蠣が名物のオイスターバー。フランス・三陸・広島など全国各地の牡蠣を食べ比べながらシャンパンやワインを楽しめる。',
    features: ['生牡蠣専門', 'ワイン充実', 'おひとり様歓迎'],
    highlights: [
      '常時10〜15種の牡蠣を用意',
      'カキフライ・グラタン・オイル漬けも絶品',
      '牡蠣に合うシャンパン・白ワインを厳選',
      'テイスティングセット（4種）が入門に最適'
    ]
  },
  {
    id: 17,
    rank: 17,
    name: '上野 ホルモン 大邑',
    nameEn: 'Horumon Daiyuu',
    genre: 'izakaya',
    genreLabel: '居酒屋',
    emoji: '🔪',
    rating: 3.9,
    priceRange: '¥2,000〜¥4,000',
    priceValue: 3000,
    address: '台東区上野1-3-6',
    hours: '17:30〜23:30',
    closed: '水曜',
    desc: 'ホルモン・内臓焼きに特化した炭火焼専門店。鮮度抜群のホルモンを七輪で焼くスタイルが特徴。焼酎との相性が抜群で焼酎好きの聖地として知られる。',
    features: ['七輪焼き', 'ホルモン専門', '焼酎充実'],
    highlights: [
      'テッチャン・コブクロなど希少部位も',
      '芋焼酎・麦焼酎50種以上',
      '〆の雑炊が絶品',
      'ホルモン好きのコアなファンが集まる店'
    ]
  },
  {
    id: 18,
    rank: 18,
    name: '上野 ワインと肉 VINO',
    nameEn: 'Wine & Meat VINO',
    genre: 'beer',
    genreLabel: 'ビアホール',
    emoji: '🍷',
    rating: 3.8,
    priceRange: '¥3,000〜¥6,000',
    priceValue: 4500,
    address: '台東区上野2-5-18',
    hours: '17:00〜23:30',
    closed: '月曜',
    desc: 'イタリア産ワインと熟成肉のペアリングが楽しめるリストランテ風居酒屋。カジュアルながら本格的な料理と厳選ワインで特別感のある夜を提供。',
    features: ['ワイン100種以上', '熟成肉', 'おしゃれな空間'],
    highlights: [
      'イタリア・スペイン産ワインを100種以上揃え',
      '60日熟成のドライエイジドビーフが看板',
      'スタッフがソムリエ資格保有',
      '記念日向け特別席あり（要予約）'
    ]
  },
  {
    id: 19,
    rank: 19,
    name: 'テキーラ立ち飲み El Norte',
    nameEn: 'Tequila Bar El Norte',
    genre: 'standing',
    genreLabel: '立ち飲み',
    emoji: '🌮',
    rating: 3.8,
    priceRange: '¥1,500〜¥3,500',
    priceValue: 2500,
    address: '台東区上野5-17-3',
    hours: '16:00〜翌1:00',
    closed: '不定休',
    desc: 'テキーラとメキシコ料理の立ち飲みバー。上野では珍しいメキシカンスタイルで、タコス・ナチョスをつまみながら本場のテキーラを楽しめる。',
    features: ['テキーラ専門', '立ち飲み', '深夜まで営業'],
    highlights: [
      'テキーラ・メスカル50種以上',
      '本場メキシコ風タコスが絶品',
      '深夜1時まで営業のナイトスポット',
      'テキーラショットとタコスのセットがお得'
    ]
  },
  {
    id: 20,
    rank: 20,
    name: '上野 活魚 海鮮丸',
    nameEn: 'Katsugyo Kaisenmaru',
    genre: 'seafood',
    genreLabel: '海鮮',
    emoji: '🐠',
    rating: 3.7,
    priceRange: '¥2,500〜¥4,500',
    priceValue: 3500,
    address: '台東区上野6-7-14',
    hours: '17:00〜22:30',
    closed: '日曜・月曜',
    desc: '店内の生け簀から選んで食べる活魚料理が名物。ヒラメ・タイ・イセエビなど旬の活魚を刺身・煮付け・焼き魚で提供。産地直送の新鮮さは折り紙付き。',
    features: ['生け簀料理', '産地直送', '季節のおまかせ'],
    highlights: [
      '生け簀から選ぶ活魚料理',
      'イセエビの踊り食いも可能',
      '旬の魚介おまかせコースが人気',
      '翌日まで元気な鮮度を保証'
    ]
  }
];

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '☆';
  return stars;
}

function getRankClass(rank) {
  if (rank === 1) return 'rank-1';
  if (rank === 2) return 'rank-2';
  if (rank === 3) return 'rank-3';
  return '';
}

function getMedal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
}

function createCard(bar) {
  const div = document.createElement('div');
  div.className = `rank-card ${getRankClass(bar.rank)}`;
  div.dataset.genre = bar.genre;
  div.dataset.id = bar.id;

  const medal = getMedal(bar.rank);

  div.innerHTML = `
    <div class="card-rank">
      <div class="rank-number">${bar.rank}</div>
      ${medal ? `<div class="rank-medal">${medal}</div>` : ''}
    </div>
    <div class="card-emoji">${bar.emoji}</div>
    <div class="card-body">
      <div class="card-header">
        <div>
          <div class="card-name">${bar.name}</div>
          <div class="card-name-sub">${bar.nameEn}</div>
        </div>
        <div class="rating-badge">
          ⭐ ${bar.rating}
        </div>
      </div>
      <div class="card-tags">
        <span class="tag tag-genre">${bar.genreLabel}</span>
        <span class="tag tag-price">${bar.priceRange}</span>
        ${bar.features.slice(0, 2).map(f => `<span class="tag tag-feature">${f}</span>`).join('')}
      </div>
      <div class="card-desc">${bar.desc}</div>
      <div class="card-footer">
        <div class="card-address">📍 ${bar.address}</div>
        <div class="card-cta">詳細を見る →</div>
      </div>
    </div>
  `;

  div.addEventListener('click', () => openModal(bar));
  return div;
}

function openModal(bar) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  const medal = getMedal(bar.rank);

  body.innerHTML = `
    <div class="modal-rank-badge">
      ${medal || `#${bar.rank}`} ${bar.rank <= 3 ? 'TOP' + bar.rank : 'RANK ' + bar.rank}
    </div>
    <div class="modal-emoji">${bar.emoji}</div>
    <div class="modal-name">${bar.name}</div>
    <div class="modal-rating">
      <div class="modal-score">${bar.rating}</div>
      <div class="modal-stars">${renderStars(bar.rating)}</div>
    </div>
    <div class="modal-tags">
      <span class="tag tag-genre">${bar.genreLabel}</span>
      <span class="tag tag-price">${bar.priceRange}</span>
      ${bar.features.map(f => `<span class="tag tag-feature">${f}</span>`).join('')}
    </div>
    <div class="modal-section">
      <h3>📝 店舗紹介</h3>
      <p>${bar.desc}</p>
    </div>
    <div class="modal-section">
      <h3>✨ こんな人におすすめ</h3>
      <div class="modal-highlights">
        ${bar.highlights.map(h => `<div class="highlight-item">${h}</div>`).join('')}
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-info-grid">
        <div class="info-item"><label>📍 住所</label><span>${bar.address}</span></div>
        <div class="info-item"><label>🕐 営業時間</label><span>${bar.hours}</span></div>
        <div class="info-item"><label>🚫 定休日</label><span>${bar.closed}</span></div>
        <div class="info-item"><label>💴 価格帯</label><span>${bar.priceRange}</span></div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

let currentGenre = 'all';
let currentSort = 'rank';
let currentSearch = '';

function getFiltered() {
  let list = [...bars];

  if (currentGenre !== 'all') {
    list = list.filter(b => b.genre === currentGenre);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.trim().toLowerCase();
    list = list.filter(b =>
      b.name.includes(q) ||
      b.nameEn.toLowerCase().includes(q) ||
      b.desc.includes(q) ||
      b.genreLabel.includes(q) ||
      b.address.includes(q) ||
      b.features.some(f => f.includes(q))
    );
  }

  if (currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'price-asc') {
    list.sort((a, b) => a.priceValue - b.priceValue);
  } else if (currentSort === 'price-desc') {
    list.sort((a, b) => b.priceValue - a.priceValue);
  } else {
    list.sort((a, b) => a.rank - b.rank);
  }

  return list;
}

function render() {
  const list = getFiltered();
  const container = document.getElementById('rankingList');
  const count = document.getElementById('resultsCount');

  container.innerHTML = '';
  count.textContent = `${list.length}件`;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>🍺</p>
        <p>条件に合う店舗が見つかりませんでした</p>
      </div>
    `;
    return;
  }

  list.forEach(bar => container.appendChild(createCard(bar)));
}

document.getElementById('genreFilter').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentGenre = btn.dataset.filter;
  render();
});

document.getElementById('sortSelect').addEventListener('change', e => {
  currentSort = e.target.value;
  render();
});

let searchTimer;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearch = e.target.value;
    render();
  }, 250);
});

render();
