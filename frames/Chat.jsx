// Chat.jsx — AIスクール相談（コンシェルジュ）チャット ★今回対象（モック）
// 一覧/TOP の右下 FAB から開く想定のポップアップUI。
// 実際のAI/API/DBは無し。ダミーデータ + 固定フローで「意思決定支援」の体験を確認する。
// フロー: 起動 → エリア連動の質問候補 → 3校提示(軸ちがい) → どれ重視? → 価値観の質問 → 最終1校 + 体験CTA

// ── AIが最初に出す3校（順位ではなく「選ぶ軸」を変える） ──
const AI_SCHOOLS3 = [
  { key: 'price',   axis: '料金重視',     tagline: '料金を抑えたいなら', name: '経堂テニスガーデン',
    img: 'コート',        price: '7,800',  points: ['初心者クラスあり', '駅徒歩8分'] },
  { key: 'access',  axis: '通いやすさ重視', tagline: '通いやすさなら',   name: '三軒茶屋テニスアカデミー',
    img: 'コート',        price: '9,800',  points: ['駅徒歩2分', '平日夜クラスあり', '初心者クラスあり'] },
  { key: 'comfort', axis: '快適さ重視',    tagline: '快適さなら',       name: '世田谷インドアテニスクラブ',
    img: 'インドアコート', price: '12,800', points: ['インドアコート', '冷暖房完備', '天候に左右されない'] },
];

// ── 最終推薦（重視した軸で1校に絞る） ──
const FINAL_BY_AXIS = {
  price:   { name: '経堂テニスガーデン',       price: '7,800',  reasons: ['初心者クラスが充実', '料金がリーズナブル', '駅から徒歩8分', '振替レッスンあり'] },
  access:  { name: '三軒茶屋テニスアカデミー', price: '9,800',  reasons: ['駅から徒歩2分', '平日夜のレッスンあり', '初心者クラスが充実', '仕事帰りに通いやすい'] },
  comfort: { name: '世田谷インドアテニスクラブ', price: '12,800', reasons: ['インドアで天候に左右されない', '冷暖房完備で快適', '駅から徒歩3分', '平日夜のレッスンあり'] },
};

function AiAvatar() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', background: 'var(--em-50)', border: '1px solid var(--em-100)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flex: '0 0 auto',
    }}>🎾</div>
  );
}

function Bubble({ role, children }) {
  if (role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <div style={{ maxWidth: '82%', background: 'var(--em-600)', color: '#fff', borderRadius: '12px 12px 3px 12px', padding: '9px 12px', fontSize: 14, lineHeight: 1.6 }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
      <AiAvatar />
      <div style={{ maxWidth: '82%', background: 'var(--gray-100)', color: 'var(--ink)', borderRadius: '12px 12px 12px 3px', padding: '9px 12px', fontSize: 14, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

// タップできる選択肢ボタン
function ChipBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'block', width: '100%', textAlign: 'left', padding: '11px 12px', fontSize: 14, fontWeight: 600,
      background: '#fff', color: 'var(--em-700)', border: '1px solid var(--em-600)', borderRadius: 'var(--r-card)',
      cursor: 'pointer', fontFamily: 'var(--font-jp)', lineHeight: 1.5,
    }}>{children}</button>
  );
}

function ChoiceStack({ items, onPick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((it, i) => <ChipBtn key={i} onClick={() => onPick(it[0], it[1])}>{it[0]}</ChipBtn>)}
    </div>
  );
}

// チャット内のミニ・スクールカード（軸ラベル付き・横スクロール用）
function MiniSchoolCard({ s }) {
  return (
    <div className="card" style={{ flex: '0 0 80%', scrollSnapAlign: 'start' }}>
      <div style={{ padding: '8px 10px 0' }}><span className="tag" style={{ fontSize: 11 }}>{s.axis}</span></div>
      <div style={{ padding: '6px 10px 0' }}><Img label={s.img} /></div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div className="xs mute">{s.tagline}こちら</div>
        <div className="sm" style={{ fontWeight: 800, margin: '2px 0 6px' }}>{s.name}</div>
        {s.points.map((p, i) => (
          <div key={i} className="xs" style={{ display: 'flex', gap: 5, alignItems: 'flex-start', padding: '1px 0', color: 'var(--gray-700)' }}>
            <span style={{ color: 'var(--em-600)', flex: '0 0 auto' }}>{Ico.check}</span>{p}
          </div>
        ))}
        <div className="price-row" style={{ marginTop: 6 }}>
          <span className="label">月額</span>
          <span className="val"><span className="num">{s.price}</span>円<span className="unit">〜</span></span>
        </div>
      </div>
    </div>
  );
}

// 最終推薦カード（情報量を増やす + 体験CTA）
function FinalCard({ axis }) {
  const f = FINAL_BY_AXIS[axis] || FINAL_BY_AXIS.comfort;
  return (
    <div className="card" style={{ borderColor: 'var(--em-600)' }}>
      <div style={{ padding: '10px 12px', background: 'var(--em-50)', borderBottom: '1px solid var(--em-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="tag">初心者おすすめ</span>
          <Rating score={4.6} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 16, marginTop: 6 }}>{f.name}</div>
      </div>
      <div style={{ padding: '12px' }}>
        <div className="xs mute" style={{ fontWeight: 700, marginBottom: 4 }}>おすすめ理由</div>
        {f.reasons.map((r, i) => (
          <div key={i} className="sm" style={{ display: 'flex', gap: 6, alignItems: 'flex-start', padding: '2px 0' }}>
            <span style={{ color: 'var(--em-600)', flex: '0 0 auto', marginTop: 2 }}>{Ico.check}</span>{r}
          </div>
        ))}
        <div className="price-row" style={{ margin: '8px 0 12px' }}>
          <span className="label">月額</span>
          <span className="val"><span className="num">{f.price}</span>円<span className="unit">〜</span></span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="#" className="btn btn-out" style={{ flex: 1 }}>スクール詳細を見る</a>
          <a href="#" className="btn" style={{ flex: 1 }}>体験レッスンを申し込む</a>
        </div>
      </div>
    </div>
  );
}

// ── チャット本体（再利用可能なパネル。area は一覧のコンテキストを引き継ぐ） ──
function ChatPanel({ area = '世田谷区', onClose }) {
  const { useState, useRef, useEffect } = React;
  const [thread, setThread] = useState([{ role: 'ai', kind: 'welcome' }]);
  const [step, setStep] = useState('welcome');
  const [axis, setAxis] = useState(null);
  const [input, setInput] = useState('');
  const scRef = useRef(null);
  useEffect(() => { const el = scRef.current; if (el) el.scrollTop = el.scrollHeight; }, [thread, step]);

  const push = (...items) => setThread(t => [...t, ...items]);
  const questions = [
    `${area}で初心者におすすめのテニススクールを教えて`,
    `${area}で料金が安いテニススクールを教えて`,
    `${area}で駅から近いテニススクールを教えて`,
    `${area}でインドアのテニススクールを教えて`,
  ];

  const ask = (q) => {
    push(
      { role: 'user', text: q },
      { role: 'ai', text: `${area}で初心者の方におすすめのスクールを3校選びました。重視したいポイントで選び方が変わります。` },
      { role: 'ai', kind: 'cards3' },
      { role: 'ai', text: 'この3校なら、どれを重視したいですか？' },
    );
    setStep('axis');
  };
  const chooseAxis = (label, val) => {
    setAxis(val);
    push({ role: 'user', text: `${label}を重視したい` }, { role: 'ai', text: '少し料金が高くても、天候に左右されずに通える方がいいですか？' });
    setStep('value1');
  };
  const value1 = (ans) => { push({ role: 'user', text: ans }, { role: 'ai', text: '仕事帰りにも通うなら、駅から近いことは重視しますか？' }); setStep('value2'); };
  const value2 = (ans) => {
    push(
      { role: 'user', text: ans },
      { role: 'ai', text: `ありがとうございます。「初心者向け」${axis === 'comfort' ? '「インドア」' : ''}「駅近」を重視して選びました。あなたにはこちらがおすすめです。` },
      { role: 'ai', kind: 'final' },
    );
    setStep('final');
  };
  const reset = () => { setThread([{ role: 'ai', kind: 'welcome' }]); setStep('welcome'); setAxis(null); };
  const submitFree = () => { const v = input.trim(); if (!v) return; setInput(''); ask(v); };

  // 現在ステップに応じた選択肢
  let choices = null;
  if (step === 'welcome') {
    choices = (
      <>
        <div className="xs mute" style={{ fontWeight: 700, marginBottom: 6 }}>こんな質問ができます</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {questions.map(q => <ChipBtn key={q} onClick={() => ask(q)}>{q}</ChipBtn>)}
        </div>
      </>
    );
  } else if (step === 'axis') {
    choices = <ChoiceStack items={[['料金', 'price'], ['通いやすさ', 'access'], ['快適さ', 'comfort']]} onPick={chooseAxis} />;
  } else if (step === 'value1') {
    choices = <ChoiceStack items={[['はい、インドアがいい'], ['料金を優先したい']]} onPick={(l) => value1(l)} />;
  } else if (step === 'value2') {
    choices = <ChoiceStack items={[['駅近がいい'], ['多少遠くてもOK']]} onPick={(l) => value2(l)} />;
  } else if (step === 'final') {
    choices = (
      <button onClick={reset} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: 0,
        color: 'var(--gray-600)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-jp)',
      }}>🔄 もう一度相談する</button>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* ヘッダー（コンシェルジュ） */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--em-600)', color: '#fff' }}>
        <span style={{ fontSize: 18 }}>🎾</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>テニス選びコンシェルジュ</div>
          <div style={{ fontSize: 11, opacity: 0.9 }}>「{area}」のスクールからご提案します</div>
        </div>
        <button onClick={onClose} aria-label="閉じる" style={{ background: 'transparent', border: 0, color: '#fff', fontSize: 22, lineHeight: 1, cursor: 'pointer' }}>×</button>
      </div>

      {/* メッセージ（内部スクロール） */}
      <div ref={scRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px', background: '#fafbfb' }}>
        {thread.map((m, i) => {
          if (m.kind === 'welcome') {
            return (
              <Bubble key={i} role="ai">
                <div style={{ fontWeight: 700, marginBottom: 4 }}>テニススクール選びをお手伝いします</div>
                今見ている「<b>{area}</b>」から、あなたに合うスクールを探せます。まずは気になるものをタップしてください👇
              </Bubble>
            );
          }
          if (m.kind === 'cards3') {
            return (
              <div key={i} className="hscroll" style={{ gap: 8, marginBottom: 10, paddingBottom: 2 }}>
                {AI_SCHOOLS3.map(s => <MiniSchoolCard key={s.key} s={s} />)}
              </div>
            );
          }
          if (m.kind === 'final') {
            return <div key={i} style={{ marginBottom: 10 }}><FinalCard axis={axis} /></div>;
          }
          return <Bubble key={i} role={m.role}>{m.text}</Bubble>;
        })}
      </div>

      {/* フッター（選択肢 + 自由入力） */}
      <div style={{ borderTop: '1px solid var(--gray-200)', padding: '10px 12px', background: '#fff' }}>
        {choices}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitFree(); }}
            placeholder="その他の条件を入力（例：仕事帰りに通いたい）"
            style={{ flex: 1, height: 40, padding: '0 12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--r-card)', fontSize: 14, fontFamily: 'var(--font-jp)', minWidth: 0 }}
          />
          <button onClick={submitFree} className="btn" style={{ flex: '0 0 auto', padding: '0 14px' }}>送信</button>
        </div>
      </div>
    </div>
  );
}

// カンバス表示用フレーム（スマホ枠に固定高さで内部スクロール）
function ChatFrame() {
  return (
    <div className="pf" style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ChatPanel area="世田谷区" onClose={() => {}} />
    </div>
  );
}

Object.assign(window, { ChatFrame, ChatPanel });
