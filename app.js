/* ============================================
   TabiLog — リアル旅日記SNS
   Main Application Logic
   ============================================ */

// ── Demo Data ──

const ROUTE_STOPS = [
    { name: 'パリ', lat: 48.8566, lng: 2.3522, emoji: '🇫🇷', days: 'Day 1-4', desc: 'エッフェル塔、ルーブル、モンマルトル' },
    { name: 'リヨン', lat: 45.764, lng: 4.8357, emoji: '🇫🇷', days: 'Day 5', desc: '旧市街散策、リヨン料理' },
    { name: 'マルセイユ', lat: 43.2965, lng: 5.3698, emoji: '🇫🇷', days: 'Day 6', desc: '旧港、ブイヤベース' },
    { name: 'バルセロナ', lat: 41.3874, lng: 2.1686, emoji: '🇪🇸', days: 'Day 7-9', desc: 'サグラダ・ファミリア、グエル公園' },
    { name: 'ニース', lat: 43.7102, lng: 7.262, emoji: '🇫🇷', days: 'Day 10', desc: 'プロムナード・デ・ザングレ' },
    { name: 'フィレンツェ', lat: 43.7696, lng: 11.2558, emoji: '🇮🇹', days: 'Day 11-12', desc: 'ウフィツィ美術館、ドゥオーモ' },
    { name: 'ローマ', lat: 41.9028, lng: 12.4964, emoji: '🇮🇹', days: 'Day 13-14', desc: 'コロッセオ、バチカン市国' }
];

const FEED_POSTS = [
    {
        user: 'Yuki T.',
        avatar: 'Y',
        avatarGrad: 'gradient-1',
        date: '2026年2月15日',
        title: 'パリ→バルセロナ TGV 6時間半の旅',
        text: '正直、TGVの6時間半は長かったけど、車窓から見える南フランスの景色は最高だった。WiFiは不安定で、充電はできた。隣の席のフランス人とカタコトで話して楽しかった。一人旅ならではの出会い。',
        route: ['パリ Gare de Lyon', 'TGV 6h30m', 'バルセロナ Sants'],
        ratings: { '移動しやすさ': 7, '安全性': 9, 'コスパ': 6, '快適さ': 7 },
        likes: 128,
        comments: 23,
        image: null,
        imageEmoji: '🚄',
        imageLabel: 'TGV 高速鉄道での移動'
    },
    {
        user: 'Mika S.',
        avatar: 'M',
        avatarGrad: 'gradient-2',
        date: '2026年2月12日',
        title: 'ローマの宿は立地で選ぶべし',
        text: 'テルミニ駅近くのホテルに泊まったけど、夜は治安が心配だった。次回はコロッセオ周辺かトラステヴェレがおすすめ。朝食付きで€65/泊は安かった。シャワーの水圧は弱め。',
        route: ['ローマ テルミニ駅', '徒歩 5分', 'Hotel Roma Centro'],
        ratings: { '移動しやすさ': 8, '安全性': 5, 'コスパ': 8, '快適さ': 6 },
        likes: 95,
        comments: 31,
        image: null,
        imageEmoji: '🏨',
        imageLabel: 'テルミニ駅エリアの宿泊'
    },
    {
        user: 'Kenji M.',
        avatar: 'K',
        avatarGrad: 'gradient-3',
        date: '2026年2月10日',
        title: 'バルセロナ市内はメトロが最強',
        text: 'T-Casual（10回回数券）が€11.35でめちゃくちゃお得。空港からも市内中心部まで40分。Google Mapsがあれば迷わない。ただしスリには注意！リュックは前に背負うべし。',
        route: ['バルセロナ空港 T2', 'メトロ L9', 'Passeig de Gràcia'],
        ratings: { '移動しやすさ': 9, '安全性': 6, 'コスパ': 9, '快適さ': 7 },
        likes: 212,
        comments: 45,
        image: null,
        imageEmoji: '🚇',
        imageLabel: 'バルセロナメトロ T-Casual'
    }
];

const REVIEWS = {
    transport: [
        { name: 'TGV（パリ→バルセロナ）', location: 'フランス→スペイン', stars: 4, text: '6時間半の長旅だが、景色が良い。WiFi不安定。事前予約で€59〜。座席は広め。食堂車でサンドイッチ€8。', tags: ['高速鉄道', '長距離', '景色◎', '🎒一人旅OK'], price: '€59〜129', reviewer: 'Yuki T.', date: '2026/02/15', image: 'https://images.unsplash.com/photo-1534083220759-20cfec615eea?w=600&h=360&fit=crop' },
        { name: 'バルセロナ・メトロ', location: 'バルセロナ', stars: 5, text: 'T-Casualで10回€11.35は最強コスパ。主要観光地全てカバー。英語表記あり。終電は24:00。一人旅初心者でも安心。', tags: ['地下鉄', 'コスパ◎', '初心者向け', '🎒一人旅OK'], price: '€11.35/10回', reviewer: 'Kenji M.', date: '2026/02/10', image: 'https://images.unsplash.com/photo-1565109441218-83dca34a079d?w=600&h=360&fit=crop' },
        { name: 'Vueling（バルセロナ→ローマ）', location: 'スペイン→イタリア', stars: 3, text: 'LCCなので手荷物制限が厳しい。2時間のフライト。機内食は有料。20分遅延。', tags: ['LCC', '短距離', '手荷物注意'], price: '€45〜90', reviewer: 'Mika S.', date: '2026/02/12', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=360&fit=crop' }
    ],
    hotel: [
        { name: 'Hôtel des Arts Montmartre', location: 'パリ 18区', stars: 4, text: 'モンマルトルの丘が徒歩圏。朝食のクロワッサンが絶品。WiFi高速。エレベーターなし（5階まで階段）。', tags: ['朝食付き', 'WiFi◎', '立地◎', '🎒一人旅OK'], price: '€89/泊', reviewer: 'Yuki T.', date: '2026/02/08', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=360&fit=crop' },
        { name: 'Hostel One Paralelo', location: 'バルセロナ', stars: 5, text: '一人旅の聖地。毎晩無料ディナーと交流イベントあり。清潔で安全。ドミトリー6人部屋。', tags: ['ホステル', '交流◎', 'コスパ◎', '🎒ソロ旅聖地'], price: '€28/泊', reviewer: 'Kenji M.', date: '2026/02/09', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=360&fit=crop' },
        { name: 'Hotel Adriano', location: 'ローマ ナヴォーナ広場近く', stars: 4, text: '立地最高。パンテオン徒歩3分。部屋はやや狭いがヨーロピアンスタイル。スタッフが親切。', tags: ['好立地', 'スタッフ◎', 'クラシック', '🎒一人旅OK'], price: '€110/泊', reviewer: 'Mika S.', date: '2026/02/13', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=360&fit=crop' }
    ],
    spot: [
        { name: 'サグラダ・ファミリア', location: 'バルセロナ', stars: 5, text: '事前予約必須（2週間前には売り切れ）。朝イチの9:00枠が空いている。塔に登るオプションは追加€10だが絶対おすすめ。', tags: ['要予約', '早朝推奨', '圧巻'], price: '€26+€10', reviewer: 'Kenji M.', date: '2026/02/11', image: 'https://images.unsplash.com/photo-1583779457711-ab081d59e5db?w=600&h=360&fit=crop' },
        { name: 'ルーブル美術館', location: 'パリ', stars: 4, text: '広すぎて1日では回りきれない。水曜・金曜の夜間開館（〜21:45）は空いている穴場。モナリザは混雑覚悟。', tags: ['穴場あり', '夜間開館', '広い', '🎒一人旅向き'], price: '€22', reviewer: 'Yuki T.', date: '2026/02/07', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=360&fit=crop' },
        { name: 'コロッセオ', location: 'ローマ', stars: 4, text: 'コンビチケットで周辺遺跡もまとめて入場可（フォロ・ロマーノ等）。朝8:30が最も空いている。Audio guideは日本語あり。', tags: ['コンビチケット', '朝一推奨', '日本語OK'], price: '€18', reviewer: 'Mika S.', date: '2026/02/14', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=360&fit=crop' }
    ]
};

const MATCHING_USERS = {
    paris: [
        { name: 'Emma L.', initial: 'E', grad: 'gradient-1', location: 'パリ 🇫🇷', dates: '3月10日 〜 3月15日', interests: ['美術館', 'カフェ巡り', '写真'], online: true },
        { name: 'Taro K.', initial: 'T', grad: 'gradient-2', location: 'パリ 🇫🇷', dates: '3月12日 〜 3月18日', interests: ['食べ歩き', '歴史', '一人旅初'], online: false },
        { name: 'Lisa W.', initial: 'L', grad: 'gradient-3', location: 'パリ 🇫🇷', dates: '3月9日 〜 3月14日', interests: ['ショッピング', 'ワイン', 'アート'], online: true }
    ],
    barcelona: [
        { name: 'Carlos R.', initial: 'C', grad: 'gradient-4', location: 'バルセロナ 🇪🇸', dates: '3月15日 〜 3月20日', interests: ['建築', 'サッカー', 'タパス'], online: true },
        { name: 'Hana M.', initial: 'H', grad: 'gradient-1', location: 'バルセロナ 🇪🇸', dates: '3月14日 〜 3月19日', interests: ['ビーチ', '市場', '一人旅'], online: true },
        { name: 'Marco P.', initial: 'M', grad: 'gradient-2', location: 'バルセロナ 🇪🇸', dates: '3月16日 〜 3月22日', interests: ['グルメ', '美術', '散歩'], online: false }
    ],
    rome: [
        { name: 'Sofia B.', initial: 'S', grad: 'gradient-3', location: 'ローマ 🇮🇹', dates: '3月20日 〜 3月25日', interests: ['遺跡', 'ジェラート', '写真'], online: true },
        { name: 'Ryo N.', initial: 'R', grad: 'gradient-4', location: 'ローマ 🇮🇹', dates: '3月19日 〜 3月23日', interests: ['歴史', 'パスタ', '一人旅'], online: false }
    ],
    tokyo: [
        { name: 'Alex J.', initial: 'A', grad: 'gradient-1', location: '東京 🇯🇵', dates: '3月5日 〜 3月12日', interests: ['ラーメン', '秋葉原', '寺社'], online: true },
        { name: 'Mei C.', initial: 'M', grad: 'gradient-2', location: '東京 🇯🇵', dates: '3月8日 〜 3月15日', interests: ['原宿', '浅草', '夜景'], online: true },
        { name: 'Tom H.', initial: 'T', grad: 'gradient-3', location: '東京 🇯🇵', dates: '3月10日 〜 3月17日', interests: ['居酒屋', '美術館', '築地'], online: false }
    ]
};

const SHIORI_ITEMS = [
    { icon: '🚆', type: 'transport', name: 'TGV パリ→バルセロナ', desc: '€89 / 6h30m / Gare de Lyon発' },
    { icon: '🏨', type: 'hotel', name: 'Hôtel des Arts Montmartre', desc: '€89/泊 / 朝食付き / WiFi◎' },
    { icon: '📸', type: 'spot', name: 'サグラダ・ファミリア', desc: '€36 / 要予約 / 朝9:00推奨' },
    { icon: '🚇', type: 'transport', name: 'バルセロナ T-Casual', desc: '€11.35/10回 / 全ゾーン' },
    { icon: '🏨', type: 'hotel', name: 'Hostel One Paralelo', desc: '€28/泊 / 無料ディナー / 交流◎' },
    { icon: '🍽️', type: 'food', name: 'La Boqueria 市場', desc: 'ランブラス通り / タパス / 朝がおすすめ' }
];

const LOG_TIMELINE = [
    { time: '08:30', place: 'ホテル出発', desc: 'パリ 18区 モンマルトル' },
    { time: '09:15', place: 'サクレ・クール寺院', desc: '写真5枚 / 朝の空気が気持ちいい' },
    { time: '10:30', place: 'アメリカフェ des 2 Moulins', desc: 'クレームブリュレ €8' },
    { time: '12:00', place: 'ルーブル美術館', desc: '写真12枚 / モナリザは大混雑' },
    { time: '14:30', place: 'セーヌ川散歩', desc: '写真3枚 / ノートルダム方面へ' },
    { time: '16:00', place: 'シテ島', desc: 'サント・シャペル見学' },
    { time: '18:30', place: 'エッフェル塔', desc: '写真8枚 / 夕暮れが最高' },
    { time: '20:00', place: 'Le Bouillon Chartier', desc: 'ディナー €18 / オニオングラタンスープ' }
];


// ── Application ──

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroMap();
    initMainMap();
    initFeed();
    initLogSection();
    initReviews();
    initMatching();
    initShiori();
    initScrollAnimations();
    initNavigation();
});


// ── Header ──

function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    mobileBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'rgba(248,255,248,0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(140,215,157,0.3)';
    });
}


// ── Hero Map ──

function initHeroMap() {
    const heroMap = L.map('hero-map', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
    }).setView([45.0, 6.0], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }).addTo(heroMap);

    // Draw route
    const routeCoords = ROUTE_STOPS.map(s => [s.lat, s.lng]);
    L.polyline(routeCoords, {
        color: '#5BB86E',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 8',
    }).addTo(heroMap);

    ROUTE_STOPS.forEach(stop => {
        L.circleMarker([stop.lat, stop.lng], {
            radius: 6,
            fillColor: '#5BB86E',
            color: '#fff',
            weight: 2,
            fillOpacity: 1,
        }).addTo(heroMap);
    });
}


// ── Main Map ──

function initMainMap() {
    const mainMap = L.map('main-map', {
        zoomControl: true,
        attributionControl: true,
    }).setView([45.0, 6.0], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
    }).addTo(mainMap);

    // Draw route polyline
    const routeCoords = ROUTE_STOPS.map(s => [s.lat, s.lng]);
    L.polyline(routeCoords, {
        color: '#5BB86E',
        weight: 4,
        opacity: 0.9,
        smoothFactor: 1,
    }).addTo(mainMap);

    // Add markers with popups
    ROUTE_STOPS.forEach((stop, i) => {
        const marker = L.circleMarker([stop.lat, stop.lng], {
            radius: 10,
            fillColor: '#5BB86E',
            color: '#ffffff',
            weight: 3,
            fillOpacity: 1,
        }).addTo(mainMap);

        marker.bindPopup(`
      <h4>${stop.emoji} ${stop.name}</h4>
      <p><strong>${stop.days}</strong></p>
      <p>${stop.desc}</p>
    `);
    });

    // Populate stop list
    const stopList = document.getElementById('mapStopList');
    ROUTE_STOPS.forEach((stop, i) => {
        const li = document.createElement('li');
        li.className = 'map-stop-item';
        li.innerHTML = `
      <span class="stop-number">${i + 1}</span>
      <div>
        <div style="font-weight:600">${stop.emoji} ${stop.name}</div>
        <div style="font-size:0.72rem;color:#8FA893">${stop.days}</div>
      </div>
    `;
        li.addEventListener('click', () => {
            mainMap.flyTo([stop.lat, stop.lng], 12, { duration: 1.5 });
        });
        stopList.appendChild(li);
    });
}


// ── Feed ──

function initFeed() {
    const grid = document.getElementById('feedGrid');

    FEED_POSTS.forEach((post, index) => {
        const card = document.createElement('div');
        card.className = 'feed-card animate-on-scroll';
        card.style.animationDelay = `${index * 0.1}s`;

        const routeHTML = post.route.map((r, i) => {
            if (i % 2 === 0) return `<span class="feed-route-stop">${r}</span>`;
            return `<span class="feed-route-arrow">${r}</span>`;
        }).join('');

        const ratingsHTML = Object.entries(post.ratings).map(([label, val]) => `
      <div class="rating-row">
        <span class="rating-label">${label}</span>
        <div class="rating-bar">
          <div class="rating-fill" style="width:${val * 10}%"></div>
        </div>
        <span class="rating-value">${val}</span>
      </div>
    `).join('');

        card.innerHTML = `
      <div class="feed-card-header">
        <div class="feed-avatar ${post.avatarGrad}">${post.avatar}</div>
        <div class="feed-user-info">
          <div class="feed-username">${post.user}</div>
          <div class="feed-date">${post.date}</div>
        </div>
        <span class="badge badge-solo">🎒 一人旅</span>
      </div>
      <div style="height:180px;background:linear-gradient(135deg,rgba(140,215,157,0.12),rgba(91,155,213,0.08));display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
        <span style="font-size:3rem">${post.imageEmoji}</span>
        <span style="font-size:0.8rem;color:#5A7A5E">${post.imageLabel}</span>
      </div>
      <div class="feed-card-body">
        <div class="feed-card-title">${post.title}</div>
        <p class="feed-card-text">${post.text}</p>
        <div class="feed-card-route">${routeHTML}</div>
        <div class="feed-ratings">${ratingsHTML}</div>
      </div>
      <div class="feed-card-footer">
        <div class="feed-actions">
          <button class="feed-action-btn like-btn" data-likes="${post.likes}">
            ♡ <span>${post.likes}</span>
          </button>
          <button class="feed-action-btn">💬 ${post.comments}</button>
          <button class="feed-action-btn">↗ 共有</button>
        </div>
        <button class="bookmark-btn" title="旅しおりに追加">☆</button>
      </div>
    `;

        grid.appendChild(card);
    });

    // Like button interaction
    grid.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            likeBtn.classList.toggle('liked');
            const span = likeBtn.querySelector('span');
            const base = parseInt(likeBtn.dataset.likes);
            if (likeBtn.classList.contains('liked')) {
                likeBtn.innerHTML = `♥ <span>${base + 1}</span>`;
                likeBtn.classList.add('liked');
            } else {
                likeBtn.innerHTML = `♡ <span>${base}</span>`;
            }
        }

        const bookmarkBtn = e.target.closest('.bookmark-btn');
        if (bookmarkBtn) {
            bookmarkBtn.classList.toggle('active');
            if (bookmarkBtn.classList.contains('active')) {
                bookmarkBtn.textContent = '★';
                showToast('旅しおりに追加しました', 'success');
            } else {
                bookmarkBtn.textContent = '☆';
                showToast('旅しおりから削除しました', 'info');
            }
        }
    });
}


// ── Log Section ──

function initLogSection() {
    const uploadArea = document.getElementById('logUpload');
    const fileInput = document.getElementById('logFileInput');
    const selectBtn = document.getElementById('logSelectBtn');
    const photosGrid = document.getElementById('logPhotosGrid');
    const saveLogBtn = document.getElementById('saveLogBtn');

    // Render demo timeline
    renderLogTimeline();

    // Render demo photos
    renderDemoPhotos();

    // Click to select
    selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        showToast('写真を解析中... ルートを自動生成しています', 'info');
        setTimeout(() => {
            showToast('✨ ルートが生成されました！', 'success');
        }, 2000);
    });

    fileInput.addEventListener('change', () => {
        showToast('写真を解析中... ルートを自動生成しています', 'info');
        setTimeout(() => {
            showToast('✨ ルートが生成されました！', 'success');
        }, 2000);
    });

    // Save log
    saveLogBtn.addEventListener('click', () => {
        showToast('旅日記を保存しました！', 'success');
    });
}

function renderDemoPhotos() {
    const grid = document.getElementById('logPhotosGrid');
    const times = ['08:30', '09:15', '09:45', '10:30', '12:00', '14:30', '16:00', '18:30', '20:00'];
    const emojis = ['🏨', '⛪', '📸', '☕', '🎨', '🌊', '⛪', '🗼', '🍽️'];

    times.forEach((t, i) => {
        const item = document.createElement('div');
        item.className = 'log-photo-item';
        item.innerHTML = `
      <span style="font-size:1.8rem">${emojis[i]}</span>
      <span class="log-photo-time">${t}</span>
    `;
        grid.appendChild(item);
    });
}

function renderLogTimeline() {
    const timeline = document.getElementById('logTimeline');
    LOG_TIMELINE.forEach(item => {
        const div = document.createElement('div');
        div.className = 'log-timeline-item';
        div.innerHTML = `
      <div class="log-timeline-time">${item.time}</div>
      <div class="log-timeline-place">${item.place}</div>
      <div class="log-timeline-desc">${item.desc}</div>
    `;
        timeline.appendChild(div);
    });
}


// ── Reviews ──

function initReviews() {
    const tabs = document.getElementById('reviewTabs');
    const grid = document.getElementById('reviewGrid');

    renderReviews('transport');

    tabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.review-tab');
        if (!tab) return;

        tabs.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        renderReviews(tab.dataset.tab);
    });
}

function renderReviews(type) {
    const grid = document.getElementById('reviewGrid');
    grid.innerHTML = '';

    const reviews = REVIEWS[type] || [];

    reviews.forEach((rev, i) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.style.animation = `fadeInUp 0.4s ease-out ${i * 0.1}s both`;

        const starsStr = '★'.repeat(rev.stars) + '☆'.repeat(5 - rev.stars);
        const tagsHTML = rev.tags.map(t => `<span class="review-tag">${t}</span>`).join('');

        card.innerHTML = `
      <img class="review-card-image" src="${rev.image}" alt="${rev.name}" loading="lazy" />
      <div class="review-card-body">
        <div class="review-card-header">
          <div>
            <div class="review-card-name">${rev.name}</div>
            <div class="review-card-location">📍 ${rev.location}</div>
          </div>
          <div class="review-stars">${starsStr}</div>
        </div>
        <p class="review-card-text">${rev.text}</p>
        <div class="review-card-tags">${tagsHTML}</div>
        <div class="review-card-footer">
          <span>by ${rev.reviewer} · ${rev.date}</span>
          <span class="review-price">${rev.price}</span>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}


// ── Matching ──

function initMatching() {
    const citySelect = document.getElementById('matchingCity');
    renderMatching('paris');

    citySelect.addEventListener('change', (e) => {
        renderMatching(e.target.value);
    });
}

function renderMatching(city) {
    const grid = document.getElementById('matchingGrid');
    grid.innerHTML = '';

    const users = MATCHING_USERS[city] || [];

    users.forEach((user, i) => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.style.animation = `fadeInUp 0.4s ease-out ${i * 0.1}s both`;

        const interestsHTML = user.interests.map(int =>
            `<span class="matching-interest">${int}</span>`
        ).join('');

        card.innerHTML = `
      <div class="matching-avatar ${user.grad}">
        ${user.initial}
        ${user.online ? '<span class="matching-online"></span>' : ''}
      </div>
      <div class="matching-name">${user.name}</div>
      <div class="matching-solo-badge">🎒 一人旅旅行者</div>
      <div class="matching-location">${user.location}</div>
      <div class="matching-dates">📅 ${user.dates}</div>
      <div class="matching-interests">${interestsHTML}</div>
      <div class="matching-actions">
        <button class="btn btn-primary btn-small matching-dinner-btn">🍽️ 夕食に誘う</button>
        <button class="btn btn-secondary btn-small btn-icon" title="プロフィールを見る">👤</button>
      </div>
    `;
        grid.appendChild(card);
    });

    // Dinner button
    grid.addEventListener('click', (e) => {
        const dinnerBtn = e.target.closest('.matching-dinner-btn');
        if (dinnerBtn) {
            const name = dinnerBtn.closest('.matching-card').querySelector('.matching-name').textContent;
            showToast(`${name}さんに夕食リクエストを送信しました！`, 'success');
            dinnerBtn.textContent = '✓ リクエスト済み';
            dinnerBtn.disabled = true;
            dinnerBtn.style.opacity = '0.6';
        }
    });
}


// ── Shiori ──

function initShiori() {
    renderShiori();
}

function renderShiori() {
    const list = document.getElementById('shioriList');
    list.innerHTML = '';

    SHIORI_ITEMS.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'shiori-item';
        div.innerHTML = `
      <div class="shiori-item-icon ${item.type}">
        ${item.icon}
      </div>
      <div class="shiori-item-info">
        <div class="shiori-item-name">${item.name}</div>
        <div class="shiori-item-desc">${item.desc}</div>
      </div>
      <button class="shiori-item-remove" data-index="${i}" title="削除">✕</button>
    `;
        list.appendChild(div);
    });

    // Remove button
    list.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.shiori-item-remove');
        if (removeBtn) {
            const idx = parseInt(removeBtn.dataset.index);
            const name = SHIORI_ITEMS[idx]?.name || '';
            removeBtn.closest('.shiori-item').style.animation = 'fadeInUp 0.3s reverse ease-in';
            setTimeout(() => {
                SHIORI_ITEMS.splice(idx, 1);
                renderShiori();
                updateShioriCount();
                showToast(`「${name}」を旅しおりから削除しました`, 'info');
            }, 250);
        }
    });

    updateShioriCount();
}

function updateShioriCount() {
    const countEl = document.getElementById('shioriCount');
    if (countEl) countEl.textContent = `${SHIORI_ITEMS.length} 件`;
}


// ── Scroll Animations ──

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}


// ── Navigation Active State ──

function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Hero buttons
    document.getElementById('heroStartBtn')?.addEventListener('click', () => {
        document.getElementById('log').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('heroExploreBtn')?.addEventListener('click', () => {
        document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
    });

    // Create post button
    document.getElementById('createPostBtn')?.addEventListener('click', () => {
        document.getElementById('log').scrollIntoView({ behavior: 'smooth' });
    });
}


// ── Toast Notifications ──

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <span>${type === 'success' ? '✅' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
