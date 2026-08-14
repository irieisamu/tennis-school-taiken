// List.jsx — 一覧（検索結果）画面 ★今回対象
// 仕様: tennis365_ui_requirements_list_page.txt

// ─── スクールカード（再利用可能コンポーネント） ─────────────
function SchoolCard({ s, selected, onToggle, disabled }) {
  return (
    <div className="card" style={{ display: 'block', marginBottom: 12, border: selected ? '1px solid var(--em-600)' : undefined }}>
      {/* 1. スクール名 + 比較トグル → 2. 住所 → 3. 最寄り駅 */}
      <div style={{ padding: '12px 12px 10px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: 800, lineHeight: 1.4 }}>{s.name}</div>
          <button onClick={onToggle} disabled={disabled} style={{
            flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 10px',
            fontSize: 12, fontWeight: 700, borderRadius: 'var(--r-chip)', whiteSpace: 'nowrap', fontFamily: 'var(--font-jp)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: selected ? 'var(--em-600)' : '#fff', color: selected ? '#fff' : 'var(--em-700)',
            border: '1px solid var(--em-600)', opacity: disabled ? 0.4 : 1,
          }}>{selected ? '✓ 比較中' : '＋ 比較'}</button>
        </div>
        <div className="sm mute" style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
          <span style={{ color: 'var(--em-600)' }}>{Ico.pin}</span>{s.addr}
        </div>
        <div className="sm mute" style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <span style={{ color: 'var(--em-600)' }}>{Ico.train}</span>{s.station}
        </div>
      </div>

      {/* 4. 施設画像（テキストの下）。無ければエリアごと非表示。複数は横スクロール(最大4枚) */}
      {s.images.length > 0 && (
        <div className="hscroll" style={{ gap: 8, padding: '0 12px 12px' }}>
          {s.images.slice(0, 4).map((label, i) => (
            <div key={i} style={{ flex: s.images.length === 1 ? '0 0 100%' : '0 0 88%', scrollSnapAlign: 'start' }}>
              <Img label={label} />
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '0 12px 12px' }}>
        {/* 5. タグ（有料会員限定・無ければ非表示） */}
        {s.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 9 }}>
            {s.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
            {s.tags.length > 4 && <span className="tag tag-plain">他{s.tags.length - 4}件</span>}
          </div>
        )}

        {/* 6. 評価・口コミ（有料会員のみ。無料会員は非表示） */}
        {s.paid && s.reviews > 0 && (
          <div style={{ marginBottom: 8 }}><Rating score={s.rating} count={s.reviews} /></div>
        )}

        {/* 7. 説明文（有料限定・2行省略） */}
        {s.desc && (
          <p className="sm" style={{
            margin: '0 0 10px', color: 'var(--gray-700)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{s.desc}</p>
        )}

        {/* 8. 料金（有料会員のみ。無料会員は非表示） */}
        {s.paid && (
          <div style={{ display: 'flex', gap: 18, alignItems: 'baseline', padding: '9px 0 10px', borderTop: '1px solid var(--gray-100)' }}>
            {s.taiken != null && (
              <div className="price-row">
                <span className="label">体験</span>
                <span className="val"><span className="num">{s.taiken.toLocaleString()}</span>円<span className="unit">〜</span></span>
              </div>
            )}
            {s.kaihi != null && (
              <div className="price-row">
                <span className="label">会費</span>
                <span className="val"><span className="num">{s.kaihi.toLocaleString()}</span>円<span className="unit">〜</span></span>
              </div>
            )}
          </div>
        )}

        {/* 9. アクション（有料：電話/体験申込/詳細の3列。無料：詳細のみ） */}
        <div style={{ display: 'flex', gap: 6 }}>
          {s.paid && (
            <>
              <a href="#" className="btn btn-out" aria-label="電話する" style={{ flex: '0 0 44px', padding: 0, height: 44 }}>{Ico.phone}</a>
              <a href="#" className="btn" style={{ flex: 1, height: 44 }}>体験申し込み</a>
            </>
          )}
          <a href="#" className="btn btn-out" style={{ flex: 1, height: 44 }}>詳細を見る{Ico.chevR}</a>
        </div>
      </div>
    </div>
  );
}

// ─── キーワード検索（常時表示・最上部固定） ─────────────────
function KeywordBox() {
  return (
    <div className="px" style={{ padding: '12px', background: '#fff' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px',
        border: '1px solid var(--gray-300)', borderRadius: 'var(--r-card)', background: '#fff',
      }}>
        <span style={{ color: 'var(--gray-400)' }}>{Ico.search}</span>
        <span className="sm mute">スクール名・住所・駅名で検索</span>
      </div>
    </div>
  );
}

// ─── 探し方の入口（エリア/駅路線/詳細条件 ＋ 市区町村/現在地） ──
// スコープにより配置が変わる（都道府県=上部／市区町村=ページング下）
function BrowseTools({ sc }) {
  const entries = [
    { l1: 'エリアから', l2: '探す' },
    { l1: '駅路線から', l2: '探す' },
    { l1: '詳細条件から', l2: '探す' },
  ];
  return (
    <div style={{ background: '#fff' }}>
      {/* 3列の検索導線 */}
      <div className="px" style={{ padding: '0 12px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {entries.map((e, i) => (
            <button key={i} className="search-entry">
              <span>{e.l1}</span>
              <span>{e.l2}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 「市区町村から探す」＋「現在地から探す」（横並び。市区町村は折りたたみ） */}
      <div className="px" style={{ padding: '0 12px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <details className="acc" open={sc.drillOpen} style={{ flex: 1, minWidth: 0 }}>
          <summary>{sc.drillLabel}<span className="chev">{Ico.chevD}</span></summary>
          <div className="acc-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {sc.drillItems.map(c => (
              <a key={c} href="#" className="sm" style={{
                textAlign: 'center', padding: '8px 4px', border: '1px solid var(--gray-200)',
                borderRadius: 'var(--r-chip)', textDecoration: 'none', color: 'var(--gray-700)',
              }}>{c}</a>
            ))}
          </div>
        </details>
        <a href="#" className="btn btn-out" style={{ flex: '0 0 auto', height: 44, whiteSpace: 'nowrap' }}>{Ico.pin}現在地から探す</a>
      </div>
    </div>
  );
}

// セクション見出し（h2）共通スタイル
const SECTION_H2 = { margin: '0 0 10px', fontSize: 15, fontWeight: 800, color: 'var(--ink)' };

// 一覧・比較への回遊リンク（見出し付き）。都道府県スコープではページ下部に単体表示
function RelatedLinks({ sc }) {
  return (
    <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)', padding: '16px 12px' }}>
      <h2 style={SECTION_H2}>{sc.relatedLabel}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sc.related.map(r => (
          <a key={r} href="#" className="btn btn-out btn-block" style={{ justifyContent: 'space-between', height: 48, padding: '0 14px' }}>{r}{Ico.chevR}</a>
        ))}
      </div>
    </div>
  );
}

// 市区町村スコープ用：ページング下を2見出しに分割
//  ①「テニススクールを探す」＝検索窓＋探し方の入口／②「◯◯で探す」＝一覧・比較への回遊
function BottomFinder({ sc }) {
  return (
    <>
      <div style={{ background: '#fff', borderTop: '1px solid var(--gray-200)' }}>
        <div className="px" style={{ padding: '16px 12px 0' }}>
          <h2 style={SECTION_H2}>テニススクールを探す</h2>
        </div>
        <KeywordBox />
        <BrowseTools sc={sc} />
      </div>
      <RelatedLinks sc={sc} />
    </>
  );
}

// ─── 一覧フレーム本体 ───────────────────────────────────────
// ─── 比較トレイ（下部固定・選択中スクールがたまる） ─────────
function CompareTray({ schools, onCompare, onClear, onRemove, max }) {
  const ready = schools.length >= 2;
  return (
    <div style={{ background: '#fff', borderTop: '1px solid var(--gray-200)', boxShadow: '0 -4px 16px rgba(0,0,0,.08)', padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span className="sm" style={{ fontWeight: 800 }}><span className="num">{schools.length}</span>件を比較中</span>
        <span className="xs mute">（最大{max}件）</span>
        <button onClick={onClear} className="xs" style={{ marginLeft: 'auto', background: 'none', border: 0, color: 'var(--gray-500)', cursor: 'pointer', textDecoration: 'underline' }}>クリア</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
        {schools.map(s => (
          <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--em-50)', border: '1px solid var(--em-100)', borderRadius: 'var(--r-chip)', padding: '4px 6px 4px 8px', fontSize: 12, fontWeight: 700, color: 'var(--em-700)' }}>
            🎾 {s.short || s.name}
            <button onClick={() => onRemove(s.id)} aria-label="外す" style={{ background: 'none', border: 0, color: 'var(--em-700)', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 0 0 2px' }}>×</button>
          </span>
        ))}
      </div>
      <button onClick={ready ? onCompare : undefined} disabled={!ready} className="btn btn-block" style={{ opacity: ready ? 1 : 0.5, cursor: ready ? 'pointer' : 'not-allowed' }}>
        {ready ? <>比較する（{schools.length}校）{Ico.chevR}</> : 'もう1校選ぶと比較できます'}
      </button>
    </div>
  );
}

// ─── 比較表（共通部品：ページ版・シート版で流用） ───────────
function CompareTable({ schools }) {
  const yen = v => v != null ? v.toLocaleString() + '円〜' : '—';
  const ROWS = [
    ['体験料金', s => yen(s.taiken)],
    ['会費(月)', s => yen(s.kaihi)],
    ['評価', s => s.reviews > 0 ? `★${s.rating.toFixed(1)}（${s.reviews}件）` : '—'],
    ['最寄り駅', s => s.station || '—'],
    ['タイプ', s => s.lesson || '—'],
    ['特徴', s => (s.tags && s.tags.length) ? s.tags.slice(0, 4).join('・') : '—'],
  ];
  const th0 = { position: 'sticky', left: 0, zIndex: 1, textAlign: 'left', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid var(--gray-200)' };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 13, minWidth: 92 + schools.length * 140 }}>
        <thead>
          <tr>
            <th style={{ ...th0, width: 92, background: 'var(--em-600)', color: '#fff' }}>項目</th>
            {schools.map(s => (
              <th key={s.id} style={{ minWidth: 140, textAlign: 'left', padding: '8px 10px', fontWeight: 800, background: 'var(--em-50)', color: 'var(--em-700)', borderBottom: '1px solid var(--gray-200)', borderLeft: '1px solid var(--gray-200)' }}>{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([label, fn]) => (
            <tr key={label}>
              <th style={{ ...th0, width: 92, background: 'var(--gray-50)', color: 'var(--gray-600)', fontWeight: 700 }}>{label}</th>
              {schools.map(s => (
                <td key={s.id} style={{ padding: '8px 10px', verticalAlign: 'top', borderBottom: '1px solid var(--gray-200)', borderLeft: '1px solid var(--gray-200)' }}>{fn(s)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 各校CTA（共通部品） ───────────────────────────────────
function CompareCtas({ schools }) {
  return (
    <>
      {schools.map(s => (
        <div key={s.id} className="card" style={{ padding: '10px 12px', marginBottom: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>{s.name}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="#" className="btn btn-out btn-sm" style={{ flex: 1 }}>詳細を見る</a>
            <a href="#" className="btn btn-sm" style={{ flex: 1 }}>体験申し込み</a>
          </div>
        </div>
      ))}
    </>
  );
}

// 一覧の階層バリアント（都道府県 / 市区町村 / 駅）。パンくず・見出し・件数・絞り込み導線が変わる
const LIST_SCOPES = {
  // 市区町村（デフォルト）
  city: {
    crumb: ['ホーム', '東京都', '世田谷区'], title: '世田谷区', count: 12,
    browseBelow: true, // 絞り込み済みなので「探し方の入口」はページング下へ
    drillLabel: '市区町村から探す', drillOpen: false,
    drillItems: ['世田谷区', '渋谷区', '目黒区', '大田区', '杉並区', '中野区', '品川区', '狛江市', '調布市'],
    relatedLabel: '世田谷区で探す',
    related: ['世田谷区のおすすめスクール一覧を見る', '世田谷区のスクール比較を見る'],
  },
  // 都道府県（東京都）：件数が多く、市区町村での絞り込みを最初から促す（開いた状態）
  pref: {
    crumb: ['ホーム', '東京都'], title: '東京都', count: 128,
    drillLabel: '市区町村から探す', drillOpen: false,
    drillItems: ['世田谷区', '渋谷区', '新宿区', '港区', '目黒区', '大田区', '杉並区', '中野区', '品川区', '足立区', '江戸川区', '八王子市'],
    relatedLabel: '東京都で探す',
    related: ['東京都の市区町村から探す', '東京都のスクール比較を見る'],
  },
  // 駅（用賀駅）：件数が少なく、近隣の駅・エリアへ広げる導線を用意
  station: {
    crumb: ['ホーム', '東京都', '世田谷区', '用賀駅'], title: '用賀駅', count: 8,
    drillLabel: '近隣の駅から探す', drillOpen: false,
    drillItems: ['二子玉川駅', '桜新町駅', '上町駅', '駒沢大学駅', '三軒茶屋駅', '溝の口駅'],
    relatedLabel: '用賀駅・世田谷区で探す',
    related: ['世田谷区のおすすめスクール一覧を見る', '用賀駅のスクール比較を見る'],
  },
};

function ListFrame({ scope = 'city' } = {}) {
  const { useState } = React;
  const sc = LIST_SCOPES[scope] || LIST_SCOPES.city;
  const MAX = 3;
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState('list');
  const toggle = (id) => setSelected(cur => cur.includes(id) ? cur.filter(x => x !== id) : (cur.length >= MAX ? cur : [...cur, id]));
  const selSchools = SCHOOLS.filter(s => selected.includes(s.id));

  // 件数からページング情報を算出（1ページに収まる件数ならページングは出さない）
  const PER_PAGE = 20;
  const total = sc.count;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const shownEnd = Math.min(PER_PAGE, total);
  const headPages = [];
  for (let i = 1; i <= Math.min(3, totalPages); i++) headPages.push(i);
  const showEllipsis = totalPages > 4;
  const showLast = totalPages > 3 && !headPages.includes(totalPages);

  // [比較する] → B案：下から比較シートがせり上がる
  if (view === 'sheet') {
    return <div className="pf"><CompareSheet schools={selSchools} onClose={() => setView('list')} crumb={sc.crumb} title={sc.title} count={sc.count} /></div>;
  }

  return (
    <div className="pf">
      <SiteHeader variant="top" />
      <Crumb items={sc.crumb} />

      {/* 件数 h1（パンくず直後・検索フォームより上） */}
      <div className="px" style={{ padding: '12px 12px 4px' }}>
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.4 }}>
          {sc.title}のテニススクール <span className="num" style={{ color: 'var(--em-600)' }}>{sc.count.toLocaleString()}</span>件
        </h1>
      </div>

      {/* 検索窓・探し方の入口：都道府県は上部、市区町村（絞り込み済み）はページング下へ */}
      {!sc.browseBelow && <KeywordBox />}
      {!sc.browseBelow && <BrowseTools sc={sc} />}

      {/* 地図エリア（上下グレー余白 + 角丸カード） */}
      <div style={{ background: 'var(--gray-50)', padding: '12px', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ position: 'relative', height: 150, borderRadius: 'var(--r-card)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
          <Img label="地図（Leaflet + CARTO Positron）" ratio={false} style={{ position: 'absolute', inset: 0 }} />
          <span style={{ position: 'absolute', top: '38%', left: '30%', color: 'var(--em-600)' }}>{Ico.pin}</span>
          <span style={{ position: 'absolute', top: '55%', left: '58%', color: 'var(--em-600)' }}>{Ico.pin}</span>
          <span style={{ position: 'absolute', top: '30%', left: '70%', color: 'var(--em-600)' }}>{Ico.pin}</span>
        </div>
      </div>

      {/* 表示件数（1ページ20件を明示） */}
      <div className="px" style={{ padding: '12px 12px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className="sm mute">全<span className="num">{total.toLocaleString()}</span>件中 <span className="num">1〜{shownEnd}</span>件を表示</div>
        {totalPages > 1 && <div className="xs mute"><span className="num">{PER_PAGE}</span>件/ページ</div>}
      </div>

      {/* 検索結果一覧（有料上位 → 新着順）。各カードに [＋比較] トグル */}
      <div className="px" style={{ padding: '12px' }}>
        {SCHOOLS.map(s => (
          <SchoolCard
            key={s.id} s={s}
            selected={selected.includes(s.id)}
            disabled={!selected.includes(s.id) && selected.length >= MAX}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </div>

      {/* ページネーション（?page=N のページ番号方式。1ページに収まる件数なら非表示） */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '4px 12px 20px' }}>
          <button className="btn btn-ghost btn-sm">前へ</button>
          {headPages.map((p, i) => (
            <button key={p} className={'btn btn-sm ' + (i === 0 ? '' : 'btn-ghost')} style={{ width: 36, padding: 0 }}>{p}</button>
          ))}
          {showEllipsis && <span className="sm mute">…</span>}
          {showLast && <button className="btn btn-ghost btn-sm" style={{ width: 36, padding: 0 }}>{totalPages}</button>}
          <button className="btn btn-ghost btn-sm">次へ</button>
        </div>
      )}

      {/* ページング下：市区町村は「◯◯で探す」セクション（検索窓＋探し方の入口＋一覧/比較）、都道府県は回遊リンクのみ */}
      {sc.browseBelow ? <BottomFinder sc={sc} /> : <RelatedLinks sc={sc} />}

      {/* 下部固定：AI相談 FAB ＋ 比較トレイ（選択中のみ） */}
      <div style={{ position: 'sticky', bottom: 0, zIndex: 30, marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 14px 10px', pointerEvents: 'none' }}>
          <a href="#" style={{
            pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 18px',
            background: 'var(--em-600)', color: '#fff', borderRadius: 999, fontWeight: 800, fontSize: 14,
            textDecoration: 'none', boxShadow: '0 6px 18px rgba(5,150,105,.4)', border: '2px solid #fff', whiteSpace: 'nowrap',
          }}>🎾 AIに相談</a>
        </div>
        {selected.length > 0 && (
          <CompareTray
            schools={selSchools} max={MAX}
            onCompare={() => setView('sheet')}
            onClear={() => setSelected([])}
            onRemove={(id) => toggle(id)}
          />
        )}
      </div>
    </div>
  );
}

// ─── 比較ボトムシート（B案）。一覧の上に下からせり上がる ──
function CompareSheet({ schools, onClose, crumb = ['ホーム', '東京都', '世田谷区'], title = '世田谷区', count = 128 }) {
  return (
    <div style={{ position: 'relative', height: 700, overflow: 'hidden', background: '#fff' }}>
      {/* 背景：一覧（薄暗く残す） */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <SiteHeader variant="top" />
        <Crumb items={crumb} />
        <div className="px" style={{ padding: '12px 12px 4px' }}>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.4 }}>
            {title}のテニススクール <span className="num" style={{ color: 'var(--em-600)' }}>{count.toLocaleString()}</span>件
          </h1>
        </div>
        <div className="px" style={{ padding: '12px' }}>
          {SCHOOLS.map(s => (
            <SchoolCard key={s.id} s={s} selected={schools.some(x => x.id === s.id)} disabled={false} onToggle={() => {}} />
          ))}
        </div>
      </div>

      {/* スクリム（タップで閉じる） */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(17,24,39,.5)' }} />

      {/* ボトムシート（下からせり上がり・高め） */}
      <div className="sheet-up" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '92%',
        background: '#fff', borderRadius: '16px 16px 0 0', boxShadow: '0 -8px 30px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '8px 0 4px', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--gray-300)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 14px 10px', borderBottom: '1px solid var(--gray-200)', flex: '0 0 auto' }}>
          <span style={{ color: 'var(--em-600)' }}>{Ico.compare}</span>
          <div style={{ flex: 1, fontWeight: 800, fontSize: 16 }}>スクール比較 <span className="num" style={{ color: 'var(--em-600)' }}>{schools.length}</span>校</div>
          <button onClick={onClose} aria-label="閉じる" style={{ background: 'none', border: 0, fontSize: 22, lineHeight: 1, color: 'var(--gray-500)', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px' }}>
          <CompareTable schools={schools} />
          <div style={{ height: 12 }} />
          <CompareCtas schools={schools} />
        </div>
      </div>
    </div>
  );
}

// カンバス表示用：比較シート（B案）を開いた状態
function CompareSheetFrame() {
  const picked = SCHOOLS.filter(s => s.id === 's1' || s.id === 's2');
  return <div className="pf"><CompareSheet schools={picked} onClose={() => {}} /></div>;
}

// 階層バリアント（カンバス表示用）
function ListFramePref() { return <ListFrame scope="pref" />; }
function ListFrameStation() { return <ListFrame scope="station" />; }

Object.assign(window, { ListFrame, ListFramePref, ListFrameStation, SchoolCard, CompareTray, CompareTable, CompareCtas, CompareSheet, CompareSheetFrame });
