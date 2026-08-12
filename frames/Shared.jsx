// Shared.jsx — 共通パーツ（ヘッダー / 見出し / アイコン / スマホ枠 / ダミーデータ）

// ─── アイコン（線画） ───────────────────────────────────────
const Ico = {
  menu:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  search: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  back:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M15 6l-6 6 6 6"/></svg>,
  chevD:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>,
  chevR:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6"/></svg>,
  pin:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>,
  train:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14M9 3v8M15 3v8"/><path d="m8 21 2-3M16 21l-2-3"/><circle cx="8.5" cy="14" r=".6" fill="currentColor"/><circle cx="15.5" cy="14" r=".6" fill="currentColor"/></svg>,
  phone:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1.5-6-4.5-7.5-7.5l2-2-2-4z"/></svg>,
  web:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>,
  clock:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  play:   <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M7 5v14l12-7z"/></svg>,
  ticket: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M9 6v12" strokeDasharray="2 2"/></svg>,
  check:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m5 12 5 5L20 7"/></svg>,
  compare:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 6h7M4 12h7M4 18h7M17 4v16M14 8l3-3 3 3M14 16l3 3 3-3"/></svg>,
};

// ─── ヘッダー（emerald-600 単色バー） ───────────────────────
function SiteHeader({ variant = 'top' }) {
  const left = variant === 'detail'
    ? <><span className="ico">{Ico.back}</span><Logo /></>
    : <><span className="ico">{Ico.menu}</span><Logo /></>;
  return (
    <div className="site-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{left}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="ico">{Ico.search}</span>
      </div>
    </div>
  );
}
function Logo() {
  return <div className="logo">tennis<span className="num" style={{ color:'#fff' }}>365</span><span className="sub">スクール</span></div>;
}

// ─── セクション見出し（帯 + 英字ラベル） ────────────────────
function SecHead({ ja, en }) {
  return (
    <div className="sec-head">
      <span className="ja">{ja}</span>
      <span className="en">{en}</span>
    </div>
  );
}

// ─── パンくず ───────────────────────────────────────────────
function Crumb({ items }) {
  return (
    <div className="crumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">›</span>}
          {i === items.length - 1
            ? <span className="cur">{it}</span>
            : <a href="#">{it}</a>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── 評価（★平均 + 件数） ─────────────────────────────────
function Rating({ score, count, size }) {
  const full = Math.round(score);
  return (
    <span className="rating">
      <span className="stars" style={size ? { fontSize: size } : null}>
        {'★★★★★'.slice(0, full)}<span style={{ color: '#e5e7eb' }}>{'★★★★★'.slice(full)}</span>
      </span>
      <span className="score">{score.toFixed(1)}</span>
      {count != null && <span className="count">({count}件)</span>}
    </span>
  );
}

// ─── 画像プレースホルダ ─────────────────────────────────────
function Img({ label, ratio = true, style = {}, className = '' }) {
  return (
    <div className={'img-ph ' + (ratio ? 'ratio-32 ' : '') + className} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

// ─── スマホ枠（内部スクロールなし、ページ全体を縦に表示） ──
function Phone({ children, width = 390, height }) {
  return (
    <div style={{
      width, ...(height ? { height } : {}),
      background: '#fff', borderRadius: 22,
      border: '1px solid #d1d5db',
      boxShadow: '0 2px 6px rgba(0,0,0,.05), 0 14px 34px rgba(0,0,0,.09)',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        height: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px', fontSize: 12, fontWeight: 700,
        borderBottom: '1px solid #f3f4f6', fontFamily: '-apple-system, system-ui',
      }}>
        <span>9:41</span>
        <span style={{ fontSize: 10, opacity: 0.55 }}>●●●●   ▮▮▮</span>
      </div>
      <div className="pf" style={height ? { height: height - 30, overflow: 'auto' } : { overflow: 'visible' }}>
        {children}
      </div>
    </div>
  );
}

// ─── ダミーデータ（要件のサンプル値を利用） ────────────────
const SCHOOLS = [
  {
    id: 's1', paid: true,
    name: 'スポーツクラブ&テニススクール経堂',
    addr: '東京都世田谷区宮坂3-1-45',
    station: '小田急線 経堂駅 徒歩3分',
    images: ['施設外観', 'インドアコート', 'ロビー', 'レッスン風景'],
    tags: ['インドア', 'ジュニア', '初心者歓迎', '駅近', '振替可'],
    rating: 4.3, reviews: 10,
    desc: 'このテニススクールは、ボールがたくさん打てて、初心者の上達にも注力しており、初めての方にも久しぶりの方にもおすすめです。インドアコートで天候を気にせず通えます。',
    taiken: 1100, kaihi: 8800,
    lesson: 'インドア／一般・ジュニア',
  },
  {
    id: 's2', paid: true,
    name: 'ルネサンス テニススクール 三軒茶屋',
    addr: '東京都世田谷区太子堂4-1-1',
    station: '東急田園都市線 三軒茶屋駅 徒歩5分',
    images: ['ナイター設備', 'クレーコート'],
    tags: ['アウトドア', '一般', '中級者向け', 'ナイター'],
    rating: 4.0, reviews: 6,
    desc: '経験豊富なコーチが在籍し、中級者以上のレベルアップに定評があります。少人数制でしっかり見てもらえるのが魅力です。',
    taiken: 2000, kaihi: 12000,
    lesson: 'アウトドア／一般',
  },
  {
    id: 's3', paid: false,   // 無料会員：タグ/説明文/画像を出さない
    name: '世田谷インドアテニスクラブ',
    addr: '東京都世田谷区用賀2-41-11',
    station: '東急田園都市線 用賀駅 徒歩7分',
    images: [],
    tags: [],
    rating: 3.8, reviews: 3,   // 口コミは無料でも表示
    desc: '',
    taiken: null, kaihi: 9000,
    lesson: '',
  },
];

Object.assign(window, {
  Ico, SiteHeader, Logo, SecHead, Crumb, Rating, Img, Phone, SCHOOLS,
});
