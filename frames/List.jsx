// List.jsx — 一覧（検索結果）画面 ★今回対象
// 仕様: tennis365_ui_requirements_list_page.txt

// ─── スクールカード（再利用可能コンポーネント） ─────────────
function SchoolCard({ s }) {
  return (
    <div className="card" style={{ display: 'block', marginBottom: 12 }}>
      {/* 1. スクール名 → 2. 住所 → 3. 最寄り駅（テキストを先頭にまとめる） */}
      <div style={{ padding: '12px 12px 10px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.4 }}>{s.name}</div>
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

        {/* 6. 評価・口コミ（1件でもあれば表示） */}
        {s.reviews > 0 && (
          <div style={{ marginBottom: 8 }}><Rating score={s.rating} count={s.reviews} /></div>
        )}

        {/* 7. 説明文（有料限定・2行省略） */}
        {s.desc && (
          <p className="sm" style={{
            margin: '0 0 10px', color: 'var(--gray-700)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{s.desc}</p>
        )}

        {/* 8. 料金（体験料金／会費・無ければ非表示） */}
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

        {/* 9. アクション（電話 / 体験申し込み / 詳細を見る の3列。電話はアイコンのみで細く） */}
        <div style={{ display: 'flex', gap: 6 }}>
          <a href="#" className="btn btn-out" aria-label="電話する" style={{ flex: '0 0 44px', padding: 0, height: 44 }}>{Ico.phone}</a>
          <a href="#" className="btn" style={{ flex: 1, height: 44 }}>体験申し込み</a>
          <a href="#" className="btn btn-out" style={{ flex: 1, height: 44 }}>詳細を見る{Ico.chevR}</a>
        </div>
      </div>
    </div>
  );
}

// ─── 検索条件エリア ─────────────────────────────────────────
function SearchArea() {
  // 3列の検索導線（詳細条件で絞り込む → エリア/駅路線/詳細条件から探す）
  const entries = [
    { l1: 'エリアから', l2: '探す' },
    { l1: '駅路線から', l2: '探す' },
    { l1: '詳細条件から', l2: '探す' },
  ];
  return (
    <div className="px" style={{ padding: '12px', background: '#fff' }}>
      {/* テニススクール診断 */}
      <button className="btn btn-out btn-block" style={{ height: 46 }}>テニススクール診断</button>

      {/* キーワード検索は常時表示 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px', marginTop: 10,
        border: '1px solid var(--gray-300)', borderRadius: 'var(--r-card)', background: '#fff',
      }}>
        <span style={{ color: 'var(--gray-400)' }}>{Ico.search}</span>
        <span className="sm mute">スクール名・住所・駅名で検索</span>
      </div>

      {/* 3列の検索導線 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
        {entries.map((e, i) => (
          <button key={i} className="search-entry">
            <span>{e.l1}</span>
            <span>{e.l2}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 一覧フレーム本体 ───────────────────────────────────────
function ListFrame() {
  return (
    <div className="pf">
      <SiteHeader variant="top" />
      <Crumb items={['ホーム', '東京都', '世田谷区']} />

      {/* 件数 h1（パンくず直後・検索フォームより上） */}
      <div className="px" style={{ padding: '12px 12px 4px' }}>
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.4 }}>
          世田谷区のテニススクール <span className="num" style={{ color: 'var(--em-600)' }}>128</span>件
        </h1>
      </div>

      <SearchArea />

      {/* 「市区町村から探す」導線（都道府県のみ絞り込み時の想定・折りたたみ） */}
      <div className="px" style={{ padding: '0 12px 12px' }}>
        <details className="acc">
          <summary>市区町村から探す<span className="chev">{Ico.chevD}</span></summary>
          <div className="acc-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['世田谷区', '渋谷区', '目黒区', '大田区', '杉並区', '中野区', '品川区', '狛江市', '調布市'].map(c => (
              <a key={c} href="#" className="sm" style={{
                textAlign: 'center', padding: '8px 4px', border: '1px solid var(--gray-200)',
                borderRadius: 'var(--r-chip)', textDecoration: 'none', color: 'var(--gray-700)',
              }}>{c}</a>
            ))}
          </div>
        </details>
      </div>

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
        <div className="sm mute">全<span className="num">128</span>件中 <span className="num">1〜20</span>件を表示</div>
        <div className="xs mute"><span className="num">20</span>件/ページ</div>
      </div>

      {/* 検索結果一覧（有料上位 → 新着順） */}
      <div className="px" style={{ padding: '12px' }}>
        {SCHOOLS.map(s => <SchoolCard key={s.id} s={s} />)}
      </div>

      {/* ページネーション（?page=N のページ番号方式） */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '4px 12px 20px' }}>
        <button className="btn btn-ghost btn-sm">前へ</button>
        {['1', '2', '3'].map((p, i) => (
          <button key={p} className={'btn btn-sm ' + (i === 0 ? '' : 'btn-ghost')} style={{ width: 36, padding: 0 }}>{p}</button>
        ))}
        <span className="sm mute">…</span>
        <button className="btn btn-ghost btn-sm" style={{ width: 36, padding: 0 }}>7</button>
        <button className="btn btn-ghost btn-sm">次へ</button>
      </div>
    </div>
  );
}

Object.assign(window, { ListFrame, SchoolCard });
