// Overview.jsx — 概要比較（案A：概要カード → 違いだけ比較表）★今回対象
// tennis_school_compare の「A · CARD + DIFF TABLE」を移植。
// 要素の並び順は原案のまま。デザインは taiken のシステム（emerald-600 / 角丸6px /
// グレー帯セクション見出し / Noto Sans JP + Inter）に統一。
// データは案A専用（用賀・溝の口3校）を内包し、既存の window.SCHOOLS とは分離。

// ─── 案A専用データ（用賀・溝の口3校） ──────────────────────
const OSCHOOLS = [
  {
    id: 'central-yoga',
    name: 'セントラルフィットネスクラブ', branch: '用賀校',
    address: '世田谷区用賀2-41-11 平成ビル用賀3F',
    station: '東急田園都市線「用賀」', walk: '駅直結', walkMin: 0,
    court: 'アウトドア', trialPrice: null, entry: 1100,
    monthlyMin: 10010, juniorAcademy: false, ticket: false, softTennis: false,
    tagline: '駅徒歩0分でアクセス抜群。コートから富士山も見える開放的な空間。',
    campaign: '体験レッスン後の入会で入会金0円',
  },
  {
    id: 'central-mizonokuchi',
    name: 'セントラルフィットネスクラブ', branch: '溝ノ口校',
    address: '川崎市高津区溝口2-10-22',
    station: '東急田園都市線「溝の口」', walk: '徒歩3分', walkMin: 3,
    court: 'アウトドア', trialPrice: null, entry: 1100,
    monthlyMin: 10230, juniorAcademy: true, ticket: true, softTennis: false,
    tagline: '女性限定クラスから競技志向まで。振替でフィットネス施設も使える。',
    campaign: '体験レッスン後の入会で入会金0円',
  },
  {
    id: 'noah-kawasaki',
    name: 'テニススクール・ノア', branch: '川崎溝の口校',
    address: '川崎市高津区溝口1丁目6番12号 リンクス溝の口 5F',
    station: 'JR南武線「武蔵溝ノ口」', walk: '徒歩5分', walkMin: 5,
    court: 'インドア', trialPrice: 3300, entry: 6600,
    monthlyMin: 14850, juniorAcademy: false, ticket: false, softTennis: true,
    tagline: '天候に左右されないインドア。ソフトテニスクラスもあり、2路線から通いやすい。',
    campaign: '入会金1,000円・年会費1,000円・初月受講料1,000円＋選べるプレゼント',
  },
];

function getODiffs() {
  const s = OSCHOOLS;
  const cheapest = s.reduce((a, b) => (a.monthlyMin < b.monthlyMin ? a : b));
  const closest = s.reduce((a, b) => (a.walkMin < b.walkMin ? a : b));
  const indoor = s.find((x) => x.court === 'インドア');
  const bestCampaign = s.reduce((a, b) => {
    const score = (x) => (x.campaign.includes('1,000円') ? 3 : x.campaign.includes('0円') ? 1 : 0);
    return score(a) > score(b) ? a : b;
  });
  return { cheapest, closest, indoor, bestCampaign };
}

// 他のエリアの比較 / 関連コラム
const O_OTHER_AREAS = [
  { title: '【武蔵小杉・大森・馬込エリア】人気のテニススクール比較', href: 'https://trial.tennis365.net/comparison/musashikosugi-omori-magome/' },
];
const O_RELATED_COLUMNS = [
  { title: 'テニススクールの選び方「11のポイント」', href: 'https://trial.tennis365.net/column/list/beginners/howtochoose/' },
  { title: 'テニス初心者向けガイド', href: 'https://trial.tennis365.net/column/list/beginners/forbeginners/' },
  { title: 'テニススクールの服装ってどんな？', href: 'https://trial.tennis365.net/column/list/beginners/whattowear/' },
  { title: '初心者のためのラケットの選び方', href: 'https://trial.tennis365.net/column/list/beginners/selectracket/' },
];
const O_GUIDE_POINTS = [
  {
    title: 'テニススクールの立地',
    body: [
      'テニススクールを選ぶ際、まず最初にチェックするポイントはテニススクールの立地。やはりできるだけ自宅から近いところがオススメです。徒歩10分から20分程度、車で通う場合なら15分から20分程度が望ましいでしょう。',
      '勤務先の近くという選択肢もありますが、テニスをプレイするためにはラケットやシューズ・ウエアなどの荷物を持ち運ぶ必要があります。スクールによってはレンタルも用意しているところもありますが、やはり自分の道具の方がプレイしやすいです。そういった事を考えるとやはり自宅近くのテニススクールが一番のオススメです。',
      '特に平日の夜に通う場合は、たいてい仕事が終わってから行く場合がほとんど。職場までラケットを持っていける人となると少々限定されてしまいます。職場のロッカーに収まりきらないかもしれません。',
    ],
  },
  {
    title: 'インドア/アウトドア',
    body: [
      'テニススクールは、大きく分けるとインドアとアウトドアの2種類に分かれます。インドアは天候に関係なくレッスンが受けられることでスケジュールが組みやすく、紫外線からも身を護ることができるので女性にとっては嬉しいですね。',
      '一方で、アウトドアは、開放感と本格的な雰囲気を味わえるメリットを持ちます。大会などに出場するようなプレイヤーに向いていると言えるでしょう。太陽の位置や風の強さなども実際の試合では大きな影響があるので、普段から慣れておくことも非常に重要な要素です。',
      'インドアの場合には、冷暖房が完備してある方が快適にプレイできる。特に夏場の熱中症を予防する効果が期待できるでしょう。天井までの高さはロブを考慮して、距離が10メートル以上は欲しいところだ。',
      'インドア/アウトドアでサーフェス（コートの素材）が異なるので適したシューズを用意しましょう。インドアはカーペットが多く、アウトドアはオムニコート（砂入り人工芝）が多いです。その他にもハードコートやクレーコートもあるので要チェックです。',
    ],
  },
  {
    title: 'テニススクールの料金',
    body: [
      'テニススクールの料金は、1ヶ月あたり9,000円から15,000円の間が相場と言えるでしょう。クラスのレベルやレッスン時間に応じて異なるため、安い＝お得ではないので注意が必要です。振替の持ち越し数なども要チェック。',
      'その他、レッスンの参加人数によっても1人あたりの打てる球数が変わるので、とにかく多く打ちたい人は少人数制レッスンを推奨しているスクールがオススメです。',
    ],
  },
  {
    title: 'レッスンの受講定員数',
    body: [
      'レッスンの受講定員数は、コーチ1人につき6人から10人程度というのが目安となります。なるべく少なめの人数の方が、ボールを打つ回数が増えるのでオススメ。',
      'あまりに少ないとコミュニケーションが少なくなるので、程よい人数が嬉しいです。コーチが2人というレッスンもあるので、その場合は別メニューも同時進行出来るのでありがたいです。',
    ],
  },
  {
    title: 'レッスン時間',
    body: [
      '1レッスンの時間もスクールを選ぶポイントになるでしょう。80分のスクールもあれば90分のスクールもあるので、自分にあった時間を選ぶと良いでしょう。',
      'また、週1回の月4回がスタンダードだが、中には忙しい人向けに月2回やもっとプレイしたい人の為にチケットで追加できるスクールもあります。',
    ],
  },
];

// ─── セクション見出し（taiken のグレー帯 + 任意のヒント行） ──
function OSec({ ja, en, hint }) {
  return (
    <>
      <SecHead ja={ja} en={en} />
      {hint && <div className="xs mute" style={{ padding: '8px 12px 0' }}>{hint}</div>}
    </>
  );
}

// ─── 3校の位置関係マップ（一覧の地図デザインに合わせる＋Googleマップリンク） ──
function OSchoolMap({ schools }) {
  const pins = [{ top: '42%', left: '26%' }, { top: '30%', left: '62%' }, { top: '58%', left: '72%' }];
  return (
    <div style={{ background: 'var(--gray-50)', padding: '12px', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
      {/* 地図（一覧と同じ Leaflet プレースホルダ） */}
      <div style={{ position: 'relative', height: 170, borderRadius: 'var(--r-card)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
        <Img label="地図（Leaflet + CARTO Positron）" ratio={false} style={{ position: 'absolute', inset: 0 }} />
        {schools.map((s, i) => (
          <span key={s.id} style={{
            position: 'absolute', top: pins[i].top, left: pins[i].left, transform: 'translate(-50%,-50%)',
            width: 20, height: 20, borderRadius: 3, background: 'var(--em-600)', color: '#fff',
            fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,.3)',
          }}>{String.fromCharCode(65 + i)}</span>
        ))}
      </div>

      {/* 凡例（A/B/C + Google Mapリンク） */}
      <div className="card" style={{ marginTop: 10 }}>
        {schools.map((s, i) => (
          <a key={s.id}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', textDecoration: 'none',
              borderTop: i === 0 ? 'none' : '1px solid var(--gray-100)',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{
                width: 18, height: 18, borderRadius: 3, flexShrink: 0,
                background: 'var(--em-600)', color: '#fff', fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{String.fromCharCode(65 + i)}</span>
              <span className="sm" style={{ color: 'var(--gray-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.name} {s.branch}・{s.walk}
              </span>
            </div>
            <span className="xs" style={{ color: 'var(--em-700)', flexShrink: 0, marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              Google Mapで見る{Ico.chevR}
            </span>
          </a>
        ))}
      </div>
      <div className="xs mute" style={{ marginTop: 8 }}>※位置はイメージです</div>
    </div>
  );
}

// ─── 要点セル ───────────────────────────────────────────────
function OKeyPoint({ label, value, sub, num }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div className="xs mute" style={{ marginBottom: 2, letterSpacing: '0.03em' }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>
        <span className={num ? 'num' : ''}>{value}</span>
      </div>
      {sub && <div className="xs mute" style={{ marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ─── 概要カード ─────────────────────────────────────────────
function OSummaryCard({ school, highlight }) {
  const badges = [];
  if (highlight.cheapest) badges.push({ label: '最安', bg: 'var(--em-600)', fg: '#fff', bd: 'var(--em-600)' });
  if (highlight.closest) badges.push({ label: '駅チカNo.1', bg: 'var(--gray-900)', fg: '#fff', bd: 'var(--gray-900)' });
  if (highlight.indoor) badges.push({ label: '唯一のインドア', bg: 'var(--em-50)', fg: 'var(--em-700)', bd: 'var(--em-100)' });
  if (highlight.bestCampaign) badges.push({ label: '特典充実', bg: '#fff7ed', fg: '#9a3412', bd: '#fed7aa' });

  return (
    <div className="card">
      {/* 施設画像（3:2） */}
      <Img label="スクール外観" />

      <div style={{ padding: 12 }}>
        {/* バッジ */}
        {badges.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 9 }}>
            {badges.map((b) => (
              <span key={b.label} style={{
                display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 700, lineHeight: 1,
                padding: '4px 7px', borderRadius: 'var(--r-chip)',
                background: b.bg, color: b.fg, border: `1px solid ${b.bd}`, whiteSpace: 'nowrap',
              }}>{b.label}</span>
            ))}
          </div>
        )}

        {/* 校名 */}
        <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px', lineHeight: 1.4 }}>
          {school.name} {school.branch}
        </h3>
        <div className="sm mute" style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
          <span style={{ color: 'var(--em-600)' }}>{Ico.train}</span>{school.station}・{school.walk}
        </div>

        {/* 3つの要点 */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
          padding: '12px 0', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)',
          marginBottom: 12,
        }}>
          <OKeyPoint label="月謝" value={`${school.monthlyMin.toLocaleString()}円〜`} sub="/月" num />
          <OKeyPoint label="立地" value={school.walk} sub={school.court} />
          <OKeyPoint label="体験" value={school.trialPrice ? `${school.trialPrice.toLocaleString()}円` : '有料'} sub={school.trialPrice ? '' : '要問合'} num={!!school.trialPrice} />
        </div>

        {/* キャンペーン */}
        <div style={{
          background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 'var(--r-card)',
          padding: '10px 12px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 3, background: 'var(--amber-500)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0,
          }}>%</div>
          <div>
            <div className="xs" style={{ color: '#9a3412', letterSpacing: '0.05em', fontWeight: 700, marginBottom: 2, fontFamily: 'var(--font-mono)' }}>CAMPAIGN</div>
            <div className="sm" style={{ color: 'var(--gray-700)', lineHeight: 1.5 }}>{school.campaign}</div>
          </div>
        </div>

        {/* タグライン */}
        <p className="sm" style={{ lineHeight: 1.7, color: 'var(--gray-700)', margin: '0 0 12px' }}>
          {school.tagline}
        </p>

        {/* 詳細リンク */}
        <a href="#" className="btn btn-out btn-block">スクール詳細を見る{Ico.chevR}</a>
      </div>
    </div>
  );
}

// ─── 違いだけ比較表 ─────────────────────────────────────────
function ODiffTable({ schools }) {
  const rows = [
    { label: '月謝（最安）', values: schools.map(s => `${s.monthlyMin.toLocaleString()}円〜`), highlightIdx: schools.findIndex(s => s.monthlyMin === Math.min(...schools.map(x => x.monthlyMin))), num: true },
    { label: '最寄り駅', values: schools.map(s => s.station), highlightIdx: null, small: true },
    { label: '駅から', values: schools.map(s => s.walk), highlightIdx: schools.findIndex(s => s.walkMin === Math.min(...schools.map(x => x.walkMin))) },
    { label: 'コート', values: schools.map(s => s.court), highlightIdx: null },
    { label: '入会金', values: schools.map(s => `${s.entry.toLocaleString()}円`), highlightIdx: schools.findIndex(s => s.entry === Math.min(...schools.map(x => x.entry))), num: true },
    { label: '体験料金', values: schools.map(s => s.trialPrice ? `${s.trialPrice.toLocaleString()}円` : '要問合'), highlightIdx: null },
    { label: 'ジュニア育成', values: schools.map(s => s.juniorAcademy ? 'あり' : '—'), highlightIdx: schools.findIndex(s => s.juniorAcademy), skipIfAllSame: true },
    { label: 'チケット制', values: schools.map(s => s.ticket ? 'あり' : '—'), highlightIdx: schools.findIndex(s => s.ticket), skipIfAllSame: true },
    { label: 'ソフトテニス', values: schools.map(s => s.softTennis ? 'あり' : '—'), highlightIdx: schools.findIndex(s => s.softTennis), skipIfAllSame: true },
  ];

  const visible = rows.filter(r => !r.skipIfAllSame || new Set(r.values).size > 1);
  const hiddenSameCount = rows.filter(r => r.skipIfAllSame && new Set(r.values).size === 1).length;

  const cols = '80px 1fr 1fr 1fr';

  return (
    <div style={{ marginTop: 12 }}>
      {/* ヘッダー */}
      <div style={{
        display: 'grid', gridTemplateColumns: cols, gap: 6, padding: '10px 12px',
        background: 'var(--em-600)', color: '#fff', borderRadius: 'var(--r-card) var(--r-card) 0 0', fontSize: 11,
      }}>
        <div style={{ opacity: 0.75, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em' }}>ITEM</div>
        {schools.map((s) => (
          <div key={s.id} style={{ textAlign: 'center' }}>
            <div style={{ opacity: 0.8, fontSize: 8.5, marginBottom: 2, lineHeight: 1.2 }}>{s.name}</div>
            <div style={{ fontSize: 10, fontWeight: 700, lineHeight: 1.2 }}>{s.branch}</div>
          </div>
        ))}
      </div>

      {/* 行 */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderTop: 'none', borderRadius: '0 0 var(--r-card) var(--r-card)', overflow: 'hidden' }}>
        {visible.map((r, ri) => (
          <div key={ri} style={{
            display: 'grid', gridTemplateColumns: cols, gap: 6, padding: '12px', alignItems: 'center',
            borderTop: ri === 0 ? 'none' : '1px solid var(--gray-100)',
          }}>
            <div className="xs mute" style={{ letterSpacing: '0.02em' }}>{r.label}</div>
            {r.values.map((v, i) => {
              const isHigh = r.highlightIdx === i;
              return (
                <div key={i} style={{
                  textAlign: 'center', fontSize: r.small ? 9.5 : 12, lineHeight: r.small ? 1.35 : 1.2,
                  fontWeight: isHigh ? 800 : 500, color: isHigh ? 'var(--em-700)' : 'var(--gray-700)', position: 'relative',
                }}>
                  <span className={r.num ? 'num' : ''}>{v}</span>
                  {isHigh && (
                    <div style={{ position: 'absolute', top: -6, left: 0, right: 0, textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'var(--em-600)' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {hiddenSameCount > 0 && (
        <div style={{
          marginTop: 10, padding: '10px 12px', background: 'var(--gray-50)', borderRadius: 'var(--r-chip)',
          fontSize: 11, color: 'var(--gray-500)', display: 'flex', gap: 6, alignItems: 'center',
        }}>
          <span style={{
            display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: 'var(--gray-300)',
            color: '#fff', textAlign: 'center', fontSize: 10, lineHeight: '14px', fontWeight: 700,
          }}>i</span>
          3校で同じ項目（{hiddenSameCount}件）は省略しています
        </div>
      )}
    </div>
  );
}

// ─── シンプルなリンク一覧カード（他エリア／関連コラム共用） ──
function OLinkListCard({ items }) {
  return (
    <div className="card" style={{ marginTop: 12 }}>
      {items.map((item, i) => (
        <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '13px 12px', textDecoration: 'none', color: 'var(--gray-700)',
          borderTop: i === 0 ? 'none' : '1px solid var(--gray-100)',
        }}>
          <span className="sm" style={{ lineHeight: 1.6 }}>{item.title}</span>
          <span style={{ color: 'var(--em-600)', flexShrink: 0 }}>{Ico.chevR}</span>
        </a>
      ))}
    </div>
  );
}

// ─── 概要比較フレーム本体 ───────────────────────────────────
function OverviewCompareFrame() {
  const schools = OSCHOOLS;
  const { cheapest, closest, indoor, bestCampaign } = getODiffs();

  return (
    <div className="pf">
      <SiteHeader variant="top" />
      <Crumb items={['ホーム', '比較', '東京都', '用賀・溝の口']} />

      {/* Hero */}
      <div className="px" style={{ padding: '14px 12px 16px', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--em-600)', letterSpacing: '0.1em', marginBottom: 6 }}>
          YOGA · MIZONOKUCHI / TENNIS
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.45 }}>
          【用賀・溝の口エリア】人気のテニススクール比較
        </h1>
        <p className="sm mute" style={{ margin: '8px 0 0', lineHeight: 1.7 }}>
          立地・料金・雰囲気を1画面でざっくり掴む→気になった1校で申込み。
        </p>
      </div>

      {/* 位置関係マップ（一覧の地図デザインに合わせる） */}
      <OSec ja="3校の位置関係" en="MAP" hint="用賀・溝の口エリア" />
      <div style={{ height: 8 }} />
      <OSchoolMap schools={schools} />

      {/* サマリーカード */}
      <OSec ja="まずは概要を見る" en="STEP 01" hint="スワイプなしで縦に読める" />
      <div className="px" style={{ padding: '4px 12px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {schools.map((s) => (
            <OSummaryCard key={s.id} school={s}
              highlight={{
                cheapest: s.id === cheapest.id,
                closest: s.id === closest.id,
                indoor: s.id === indoor?.id,
                bestCampaign: s.id === bestCampaign.id,
              }} />
          ))}
        </div>
      </div>

      {/* 違いだけ比較表 */}
      <OSec ja="違うところだけ見る" en="STEP 02" hint="同じ項目は畳んでいます" />
      <div className="px" style={{ padding: '4px 12px 16px' }}>
        <ODiffTable schools={schools} />
      </div>

      {/* まとめCTA */}
      <div className="px" style={{ padding: '8px 12px 20px' }}>
        <div style={{ background: 'var(--em-600)', color: '#fff', borderRadius: 'var(--r-card)', padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', opacity: 0.85, marginBottom: 8 }}>
            NEXT STEP
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.5, marginBottom: 14 }}>
            気になる1校を選んで<br />まずは体験レッスンへ
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {schools.map((s) => (
              <a key={s.id} href="#" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 14px', background: '#fff', borderRadius: 'var(--r-chip)',
                textDecoration: 'none', color: 'var(--gray-900)', fontSize: 13, fontWeight: 700, border: '1px solid #fff',
              }}>
                <span>{s.name} {s.branch}</span>
                <span style={{ fontSize: 11, color: 'var(--em-700)', display: 'inline-flex', alignItems: 'center', gap: 2 }}>体験申込{Ico.chevR}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 他のエリアの比較 */}
      <OSec ja="他のエリアの比較" en="OTHER AREAS" />
      <div className="px" style={{ padding: '4px 12px 16px' }}>
        <OLinkListCard items={O_OTHER_AREAS} />
      </div>

      {/* 選ぶ際のポイント */}
      <OSec ja="選ぶ際のポイント" en="GUIDE" hint="失敗しない5つのチェック項目" />
      <div className="px" style={{ padding: '4px 12px 16px' }}>
        <div className="card" style={{ padding: '2px 14px', marginTop: 4 }}>
          {O_GUIDE_POINTS.map((point, i) => (
            <div key={point.title} style={{ padding: '16px 0', borderTop: i === 0 ? 'none' : '1px solid var(--gray-100)' }}>
              <div className="xs mute" style={{ marginBottom: 4 }}>選ぶ際のポイント</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.01em' }}>「{point.title}」</h3>
              {point.body.map((para, pi) => (
                <p className="sm" key={pi} style={{ lineHeight: 1.8, color: 'var(--gray-700)', margin: pi === 0 ? '0 0 10px' : '10px 0' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 関連コラム */}
      <OSec ja="関連コラム" en="COLUMN" />
      <div className="px" style={{ padding: '4px 12px 24px' }}>
        <OLinkListCard items={O_RELATED_COLUMNS} />
      </div>
    </div>
  );
}

Object.assign(window, { OverviewCompareFrame });
