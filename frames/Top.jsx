// Top.jsx — TOP（トップ）画面 ★骨子（Stub）
// 構成: A 検索起点 / B 収益・送客枠 / C 探し方の軸 / D SEO・コンテンツ
// デザインは既存のデザインシステム（emerald-600・帯見出し・card・tag・Img）を踏襲。

// セクション見出し（PRラベル対応版）
function TopSec({ ja, en, pr }) {
  return (
    <div className="sec-head">
      <span className="ja">{ja}</span>
      <span className="en">{en}</span>
      {pr && (
        <span style={{
          marginLeft: 'auto', fontSize: 10, fontWeight: 800, letterSpacing: '.05em',
          color: 'var(--gray-500)', border: '1px solid var(--gray-300)', borderRadius: 3, padding: '1px 5px',
        }}>PR</span>
      )}
    </div>
  );
}

function TopFrame() {
  const PREFS = ['北海道', '宮城県', '東京都', '神奈川県', '埼玉県', '千葉県', '愛知県', '大阪府', '京都府', '兵庫県', '広島県', '福岡県'];
  const FEATURES = ['インドア', 'アウトドア', 'ジュニア', '初心者歓迎', '駅近', 'ナイター', '振替可', '女性向け', '個人レッスン', '短期集中'];
  const BIG = [
    { n: '大手スクール A', c: 128 }, { n: '大手スクール B', c: 96 },
    { n: '大手スクール C', c: 74 }, { n: '大手スクール D', c: 51 },
  ];
  const ARTICLES = [
    { cat: '選び方', t: 'テニススクールの選び方「11のポイント」' },
    { cat: '子ども', t: '子供のスポーツ系習い事に「テニス」がおすすめ' },
    { cat: '初心者', t: '初心者が体験レッスン前に知っておきたいこと' },
    { cat: '費用', t: 'テニススクールの料金相場と続けやすい選び方' },
  ];
  const AREAS = ['世田谷区', '渋谷区', '目黒区', '大田区', '杉並区', '横浜市', '川崎市', '大阪市'];
  const LINES = ['小田急線', '東急田園都市線', 'JR山手線', '京王線', '東急東横線', '中央線'];

  return (
    <div className="pf">
      <SiteHeader variant="top" />

      {/* ── A1. 検索起点（検索窓 + 現在地） ───────────── */}
      <div style={{ padding: '14px 12px' }}>
        <div className="card" style={{ padding: 14, background: 'var(--em-50)', border: '1px solid var(--em-100)' }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>テニススクールを探す</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, height: 46, padding: '0 12px',
            background: '#fff', border: '1px solid var(--gray-300)', borderRadius: 'var(--r-card)',
          }}>
            <span style={{ color: 'var(--gray-400)' }}>{Ico.search}</span>
            <span className="sm mute">スクール名・駅名・エリアから探す</span>
          </div>
          <button className="btn btn-out btn-block" style={{ marginTop: 10, height: 44 }}>{Ico.pin}現在地から探す</button>
        </div>
      </div>

      {/* ── A2. エリアから探す（都道府県一覧） ───────── */}
      <TopSec ja="エリアから探す" en="AREA" />
      <div style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {PREFS.map(p => (
            <a key={p} href="#" className="sm" style={{
              textAlign: 'center', padding: '10px 4px', border: '1px solid var(--gray-200)',
              borderRadius: 'var(--r-chip)', textDecoration: 'none', color: 'var(--gray-700)', fontWeight: 600,
            }}>{p}</a>
          ))}
        </div>
        <a href="#" className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }}>都道府県をすべて見る{Ico.chevR}</a>
      </div>

      {/* ── B3. 大手スクール（PR枠） ─────────────────── */}
      <TopSec ja="大手スクール" en="NATIONAL" pr />
      <div className="hscroll" style={{ gap: 10, padding: '12px' }}>
        {BIG.map((b, i) => (
          <a key={i} href="#" className="card" style={{ flex: '0 0 150px', textDecoration: 'none', scrollSnapAlign: 'start' }}>
            <Img label="ロゴ" ratio={false} style={{ height: 84 }} />
            <div style={{ padding: '8px 10px 10px' }}>
              <div className="sm" style={{ fontWeight: 800 }}>{b.n}</div>
              <div className="xs mute" style={{ marginTop: 2 }}>全国 <span className="num">{b.c}</span> 校</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── B4. 特集（PR枠） ─────────────────────────── */}
      <TopSec ja="特集" en="FEATURE" pr />
      <div className="hscroll" style={{ gap: 10, padding: '12px' }}>
        {[0, 1].map(i => (
          <div key={i} style={{ flex: '0 0 78%', scrollSnapAlign: 'start' }}>
            <Img label={'特集バナー ' + (i + 1)} />
          </div>
        ))}
      </div>

      {/* ── C5. 条件から探す（軸の提供） ─────────────── */}
      <TopSec ja="条件から探す" en="TAGS" />
      <div style={{ padding: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {FEATURES.map(f => <a key={f} href="#" className="tag" style={{ textDecoration: 'none', fontSize: 13, padding: '6px 10px' }}>{f}</a>)}
      </div>

      {/* ── C6. 比較で探す（地域×スクール比較へ） ─────── */}
      <TopSec ja="比較で探す" en="COMPARE" />
      <div style={{ padding: 12 }}>
        <a href="#" className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, textDecoration: 'none' }}>
          <span style={{ color: 'var(--em-600)', flex: '0 0 auto' }}>{Ico.compare}</span>
          <span style={{ flex: 1 }}>
            <span className="base" style={{ fontWeight: 800, display: 'block' }}>地域 × スクールで比較する</span>
            <span className="sm mute">気になるスクールを横並びでチェック</span>
          </span>
          <span style={{ color: 'var(--gray-400)' }}>{Ico.chevR}</span>
        </a>
      </div>

      {/* ── C7. スクール診断 ─────────────────────────── */}
      <div style={{ padding: '0 12px 12px' }}>
        <a href="#" className="card" style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: 14, textDecoration: 'none',
          background: 'var(--em-600)', border: '1px solid var(--em-600)',
        }}>
          <span style={{ flex: 1 }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, display: 'block' }}>テニススクール診断</span>
            <span style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>3つの質問であなたに合うスクールを提案</span>
          </span>
          <span style={{ color: '#fff' }}>{Ico.chevR}</span>
        </a>
      </div>

      {/* ── D8. 特集記事（SEO） ──────────────────────── */}
      <TopSec ja="特集記事" en="ARTICLES" />
      <div style={{ padding: 12 }}>
        {ARTICLES.map((a, i) => (
          <a key={i} href="#" style={{
            display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0',
            borderTop: i ? '1px solid var(--gray-100)' : 0, textDecoration: 'none',
          }}>
            <Img label="記事" ratio={false} style={{ width: 84, height: 56, flex: '0 0 84px', borderRadius: 4 }} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="xs" style={{ color: 'var(--em-700)', fontWeight: 800 }}>{a.cat}</span>
              <span className="sm" style={{ display: 'block', fontWeight: 700, marginTop: 2, color: 'var(--ink)' }}>{a.t}</span>
            </span>
          </a>
        ))}
        <a href="#" className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }}>記事をもっと見る{Ico.chevR}</a>
      </div>

      {/* ── D9. 人気エリア・路線から探す（内部リンク／SEO補強） ── */}
      <TopSec ja="人気エリア・路線から探す" en="POPULAR" />
      <div style={{ padding: 12 }}>
        <div className="xs mute" style={{ fontWeight: 700, marginBottom: 6 }}>人気エリア</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {AREAS.map(a => <a key={a} href="#" className="tag tag-plain" style={{ textDecoration: 'none', padding: '6px 10px' }}>{a}</a>)}
        </div>
        <div className="xs mute" style={{ fontWeight: 700, marginBottom: 6 }}>人気路線</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {LINES.map(l => <a key={l} href="#" className="tag tag-plain" style={{ textDecoration: 'none', padding: '6px 10px' }}>{l}</a>)}
        </div>
      </div>

      <div style={{ height: 20 }} />

      {/* 右下フローティング：AI相談 */}
      <AIFab />
    </div>
  );
}

Object.assign(window, { TopFrame, TopSec });
