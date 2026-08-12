// Stubs.jsx — TOP / 一覧比較 / おすすめ一覧（次回対象・レイアウト骨子のみ）

function StubNote({ children }) {
  return (
    <div style={{
      margin: '12px', padding: '10px 12px', borderRadius: 6,
      background: '#fff7ed', border: '1px dashed #fdba74', color: '#9a3412',
      fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-mono)',
    }}>{'// ' + children}</div>
  );
}

// ─── TOP ────────────────────────────────────────────────────
function TopFrame() {
  return (
    <div className="pf">
      <SiteHeader variant="top" />
      <StubNote>次回対象：TOP。検索起点（エリア/駅/特徴）+ おすすめ + 新着スクール</StubNote>
      <div style={{ padding: '0 12px 12px' }}>
        <div className="card" style={{ padding: 14, background: 'var(--em-50)', border: '1px solid var(--em-100)' }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>テニススクールを探す</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px', background: '#fff', border: '1px solid var(--gray-300)', borderRadius: 6 }}>
            <span style={{ color: 'var(--gray-400)' }}>{Ico.search}</span><span className="sm mute">エリア・駅名・スクール名</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {['東京都', '神奈川県', 'インドア', 'ジュニア', '駅近'].map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>
      <SecHead ja="おすすめのスクール" en="PICKUP" />
      <div style={{ padding: 12 }}><Img label="おすすめカード" /></div>
      <SecHead ja="新着スクール" en="NEW" />
      <div style={{ padding: 12 }}><Img label="新着リスト" ratio={false} style={{ height: 120, borderRadius: 6 }} /></div>
    </div>
  );
}

// ─── 一覧比較 ───────────────────────────────────────────────
function CompareFrame() {
  const rows = ['体験料金', '会費', '評価', 'コート', '最寄り駅', '振替'];
  const cols = ['経堂', '三軒茶屋'];
  return (
    <div className="pf">
      <SiteHeader variant="detail" />
      <StubNote>次回対象：一覧比較。チェックしたスクールを表で横並び比較</StubNote>
      <div style={{ padding: '0 12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0 10px', color: 'var(--em-700)', fontWeight: 800 }}>
          {Ico.compare}2件を比較中
        </div>
        <table className="spec" style={{ border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={{ background: 'var(--em-600)', color: '#fff' }}>項目</th>
              {cols.map(c => <th key={c} style={{ background: 'var(--em-50)', color: 'var(--em-700)', width: '33%' }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r}>
                <th>{r}</th><td className="mute">—</td><td className="mute">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── おすすめ一覧 ───────────────────────────────────────────
function RecommendFrame() {
  return (
    <div className="pf">
      <SiteHeader variant="top" />
      <StubNote>次回対象：おすすめ一覧。条件マッチ度の高いスクールを厳選提示</StubNote>
      <SecHead ja="あなたにおすすめ" en="FOR YOU" />
      <div style={{ padding: 12 }}>
        {['初心者に人気', '駅近で通いやすい', 'ジュニア充実'].map((t, i) => (
          <div key={i} className="card" style={{ padding: 12, marginBottom: 10 }}>
            <div className="xs" style={{ color: 'var(--em-700)', fontWeight: 800, marginBottom: 4 }}>{t}</div>
            <Img label="おすすめスクールカード" ratio={false} style={{ height: 96, borderRadius: 6 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TopFrame, CompareFrame, RecommendFrame });
