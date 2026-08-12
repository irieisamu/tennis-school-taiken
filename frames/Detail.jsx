// Detail.jsx — スクール詳細画面 ★今回対象
// 仕様: tennis365_ui_requirements_detail_page.txt

function Section({ ja, en, children, pad = true }) {
  return (
    <section style={{ marginBottom: 14 }}>
      <SecHead ja={ja} en={en} />
      <div style={pad ? { padding: '12px' } : null}>{children}</div>
    </section>
  );
}

// 項目の見出し帯（グレーバンド見出し + 本文）。体験レッスン/料金/施設情報で共用
function FieldBand({ label, children }) {
  return (
    <div>
      <div style={{ background: 'var(--gray-100)', padding: '6px 12px', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)' }}>{label}</div>
      <div style={{ padding: '8px 12px 12px' }}>{children}</div>
    </div>
  );
}

function DetailFrame() {
  const s = SCHOOLS[0];
  const thumbs = ['外観', 'コートA', 'コートB', 'ロビー', '受付'];

  // 口コミ（項目別の詳細レビュー）
  const REVIEWS = [
    {
      rating: 5.0, date: '2021年5月28日', who: '20代後半男性',
      meta: [['スクール歴', '1年未満'], ['クラス', '上級クラス'], ['体験＆入会', '体験のみ']],
      fields: [
        ['このスクールを選んだ理由', '冷暖房完備の室内コートで、天候を気にせず通える点に惹かれました。駅から近いのも決め手です。'],
        ['体験レッスンの感想', 'コーチが丁寧に指導してくれて、レベル分けもはっきりしているので上達を実感できました。'],
        ['スクールの雰囲気', '生徒同士の距離が近く和やかな雰囲気で、初対面でも馴染みやすかったです。'],
        ['施設設備', '更衣室やロビーも清潔で快適。ラケットレンタルもあり手ぶらで通えます。'],
        ['その他', '振替がしやすく、忙しい人でも続けやすいと思います。'],
      ],
    },
    {
      rating: 4.0, date: '2020年11月3日', who: '40代女性',
      meta: [['スクール歴', '3年以上'], ['クラス', '中級クラス'], ['体験＆入会', '入会済み']],
      fields: [
        ['このスクールを選んだ理由', '自宅から近く、ナイターがあるので仕事帰りにも通いやすいと感じました。'],
        ['体験レッスンの感想', '少人数でしっかり見てもらえ、質問もしやすい雰囲気でした。'],
        ['スクールの雰囲気', '明るく前向きなコーチが多く、通うのが楽しみになります。'],
        ['施設設備', 'インドアで空調が効いており、夏でも快適にプレーできます。'],
        ['その他', '大会やイベントも定期的にあり、目標を持って続けられます。'],
      ],
    },
  ];

  return (
    <div className="pf" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <SiteHeader variant="detail" />
      <Crumb items={['ホーム', '東京都', '世田谷区', s.name]} />

      {/* 5. 基本情報 + メインビジュアル */}
      <div style={{ padding: '12px 12px 0' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, lineHeight: 1.4 }}>{s.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <Rating score={s.rating} count={s.reviews} />
        </div>

        {/* 住所・最寄り駅 + 地図リンク */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <div className="sm" style={{ flex: 1, minWidth: 0, color: 'var(--gray-700)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--em-600)', flex: '0 0 auto' }}>{Ico.pin}</span>{s.addr}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <span style={{ color: 'var(--em-600)', flex: '0 0 auto' }}>{Ico.train}</span>{s.station}
            </div>
          </div>
          <a href="#" aria-label="地図で見る" style={{
            flex: '0 0 auto', width: 56, height: 56, borderRadius: 'var(--r-card)',
            border: '1px solid var(--em-600)', color: 'var(--em-700)', background: '#fff',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            textDecoration: 'none', fontWeight: 800, fontSize: 11,
          }}>{Ico.pin}<span>MAP</span></a>
        </div>
      </div>
      <div style={{ padding: '10px 12px 14px' }}>
        <Img label="メイン画像（3:2）" />
        <div className="hscroll" style={{ gap: 6, marginTop: 6 }}>
          {thumbs.map((t, i) => (
            <div key={i} style={{ flex: '0 0 68px' }}>
              <Img label={t} ratio={false} style={{ height: 46, borderRadius: 4, border: i === 0 ? '2px solid var(--em-600)' : '1px solid var(--gray-200)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 6. スクール紹介（末尾に特徴タグ） */}
      <Section ja="スクール紹介" en="ABOUT">
        <p className="base" style={{ margin: 0, color: 'var(--gray-800)' }}>
          {s.desc} 経験豊富なコーチ陣が、一人ひとりのレベルに合わせて丁寧に指導します。
        </p>
        {s.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
      </Section>

      {/* 7. レッスンイメージ（2列サムネ、動画は再生アイコン） */}
      <Section ja="レッスンイメージ" en="LESSON">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ l: '初心者クラス', v: false }, { l: 'ラリー練習', v: true }, { l: 'ジュニア', v: false }, { l: 'サーブ強化', v: true }].map((it, i) => (
            <div key={i}>
              <div style={{ position: 'relative' }}>
                <Img label={it.l} />
                {it.v && (
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(5,150,105,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.play}</span>
                  </span>
                )}
              </div>
              <div className="sm" style={{ fontWeight: 700, marginTop: 4 }}>{it.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. こんな方におすすめ（有料限定） */}
      <Section ja="こんな方におすすめ" en="FOR YOU">
        <div className="sm" style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingBottom: 10, marginBottom: 8, borderBottom: '1px solid var(--gray-200)' }}>
          <span className="mute" style={{ fontWeight: 700 }}>平均年齢</span>
          <span className="base" style={{ fontWeight: 800 }}>30〜50代</span>
        </div>
        {['健康のため、週1回運動したい', 'テニス仲間を作りたい', '大会を目指したい'].map((p, i) => (
          <div key={i} className="base" style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3px 0' }}>
            <span style={{ color: 'var(--em-600)', flex: '0 0 auto', marginTop: 3 }}>{Ico.check}</span>{p}
          </div>
        ))}
      </Section>

      {/* 9. お得情報・キャンペーン */}
      <Section ja="お得情報・キャンペーン" en="CAMPAIGN">
        <div className="card">
          <Img label="キャンペーンバナー" />
          <div style={{ padding: '10px 12px' }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>入会金0円キャンペーン</div>
            <p className="sm" style={{ margin: '4px 0', color: 'var(--gray-700)' }}>今なら入会金11,000円が無料。体験レッスン当日入会でラケットレンタルも無料に。</p>
            <div className="xs mute" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{Ico.clock}2026/8/1 〜 2026/8/31</div>
          </div>
        </div>
      </Section>

      {/* 10. 体験レッスン（複数・カード。項目ごとに見出し帯。直後にCTA） */}
      <Section ja="体験レッスン" en="TRIAL">
        {[
          {
            n: '① 一般向け体験レッスン', price: 2200,
            body: 'スクール生と一緒に実際のスクールのレッスンを体験。ボールがたくさん打てます。',
            cls: '＜中級クラス＞',
            schedule: ['平日：10:00-17:00、18:00-20:00', '土日祝：10:00-17:00、18:00-20:00'],
          },
          {
            n: '② ジュニア向け体験レッスン', price: 2000,
            body: '4歳〜中学生対象。年齢・レベル別のクラスで基礎から楽しく体験できます。',
            cls: '＜ジュニアクラス＞',
            schedule: ['平日：16:00-19:00', '土：10:00-15:00'],
          },
        ].map((t, i) => (
          <div key={i} className="card" style={{ padding: 0, marginBottom: 10, overflow: 'hidden' }}>
            <div style={{ fontWeight: 800, fontSize: 15, padding: '12px' }}>{t.n}</div>

            <FieldBand label="体験料金">
              <div className="price-row"><span className="val"><span className="num">{t.price.toLocaleString()}</span>円</span></div>
            </FieldBand>

            <FieldBand label="体験レッスン内容">
              <p className="base" style={{ margin: 0 }}>{t.body}</p>
            </FieldBand>

            <FieldBand label="時間割">
              <div className="base" style={{ fontWeight: 700 }}>{t.cls}</div>
              {t.schedule.map((row, j) => (
                <div key={j} className="base" style={{ marginTop: 2 }}>{row}</div>
              ))}
              <Img label="時間割画像" ratio={false} style={{ height: 88, borderRadius: 4, marginTop: 8 }} />
              <a href="#" className="sm" style={{ display: 'inline-block', marginTop: 8, color: 'var(--em-600)', textDecoration: 'underline' }}>詳細や最新情報は公式サイトにて</a>
            </FieldBand>
          </div>
        ))}
        <button className="btn btn-block"><span>{Ico.ticket}</span>Webで体験を申し込む</button>
      </Section>

      {/* 11. 口コミ・評判（項目別の詳細レビュー） */}
      <Section ja="口コミ・評判" en="REVIEW">
        {/* サマリー（平均） */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 30, fontWeight: 800 }} className="num">{s.rating.toFixed(1)}</div>
          <div><Rating score={s.rating} count={s.reviews} size={16} /></div>
        </div>

        {/* 個別の口コミ */}
        {REVIEWS.map((rv, i) => (
          <div key={i} className="card" style={{ padding: 0, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px' }}>
              {/* 評価 + 投稿日 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Rating score={rv.rating} size={18} />
                <span className="xs mute">{rv.date}</span>
              </div>

              {/* 投稿者プロフィール */}
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: 'var(--gray-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', flex: '0 0 auto',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4" /><path d="M4 20c0-4.2 4-6.5 8-6.5s8 2.3 8 6.5z" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="base" style={{ fontWeight: 800 }}>{rv.who}</div>
                  <div className="xs mute" style={{ marginTop: 3, lineHeight: 1.7 }}>
                    {rv.meta.map(([k, v], j) => (
                      <span key={j} style={{ marginRight: 12, whiteSpace: 'nowrap' }}>{k}：<span style={{ color: 'var(--gray-700)', fontWeight: 600 }}>{v}</span></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 項目別（体験レッスン等と同じ見出し帯） */}
            {rv.fields.map(([label, text], j) => (
              <FieldBand key={j} label={label}>
                <p className="base" style={{ margin: 0, color: 'var(--gray-700)' }}>{text}</p>
              </FieldBand>
            ))}
          </div>
        ))}

        <button className="btn btn-out btn-block" style={{ marginTop: 12 }}>評判をもっと見る（{s.reviews}件）{Ico.chevR}</button>
      </Section>

      {/* 12. レッスン料金（項目ごとに見出し帯） */}
      <Section ja="レッスン料金" en="PRICE">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <FieldBand label="入会金"><div className="base">3,300円</div></FieldBand>
          <FieldBand label="年会費"><div className="base">なし</div></FieldBand>
          <FieldBand label="料金システム"><div className="base">月謝</div></FieldBand>
          <FieldBand label="一般">
            {['平日昼間：4,000円/月', '平日夜間：4,000円/月', '土日祝日昼間：5,000円/月', '土日祝日夜間：5,000円/月'].map((r, j) => (
              <div key={j} className="base" style={{ marginTop: j ? 2 : 0 }}>{r}</div>
            ))}
          </FieldBand>
          <FieldBand label="ジュニア">
            {['平日昼間：4,000円/月', '土日祝日昼間：5,000円/月'].map((r, j) => (
              <div key={j} className="base" style={{ marginTop: j ? 2 : 0 }}>{r}</div>
            ))}
          </FieldBand>
          <FieldBand label="レッスンの振替"><div className="base">振替期限は翌月末まで</div></FieldBand>
          <div style={{ padding: '4px 12px 12px' }}>
            <a href="#" className="sm" style={{ color: 'var(--em-600)', textDecoration: 'underline' }}>詳細や最新情報は公式サイトにて</a>
          </div>
        </div>
      </Section>

      {/* 13. コーチ */}
      <Section ja="コーチ" en="COACH">
        {[
          { n: '田中 健一', role: 'ヘッドコーチ', d: '元大学テニス部監督。初心者指導を得意とします。' },
          { n: '佐藤 美咲', role: 'ジュニア担当', d: 'キッズ・ジュニアのレッスンを10年以上担当。' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i ? '1px solid var(--gray-100)' : 0 }}>
            <div style={{ flex: '0 0 56px' }}>
              <Img label="COACH" ratio={false} style={{ width: 56, height: 56, borderRadius: '50%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800 }}>{c.n}</div>
              <p className="sm" style={{ margin: '3px 0 0', color: 'var(--gray-700)' }}>{c.d}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* 14. アクセス */}
      <Section ja="アクセス" en="ACCESS">
        <Img label="Google Map（keyless埋め込み）" ratio={false} style={{ height: 150, borderRadius: 'var(--r-card)' }} />
        <div className="sm" style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}><span style={{ color: 'var(--em-600)' }}>{Ico.pin}</span>{s.addr}</div>
          <div style={{ marginTop: 6, fontWeight: 700 }}>最寄り駅</div>
          <ul style={{ margin: '4px 0 0', paddingLeft: 18, color: 'var(--gray-700)' }}>
            <li>小田急線 経堂駅 徒歩3分</li>
            <li>小田急線 千歳船橋駅 徒歩12分</li>
          </ul>
        </div>
        <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }}>Google Mapで見る</button>
      </Section>

      {/* 15. 施設情報（項目ごとに見出し帯） */}
      <Section ja="施設情報" en="INFO">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <FieldBand label="スクール名"><div className="base">{s.name}</div></FieldBand>
          <FieldBand label="住所">
            <div className="base num">〒156-0051</div>
            <div className="base">{s.addr}</div>
          </FieldBand>
          <FieldBand label="電話番号"><div className="base num">03-5426-5080</div></FieldBand>
          <FieldBand label="受付時間"><div className="base num">11:00-18:00</div></FieldBand>
          <FieldBand label="公式サイト">
            <a href="#" className="base" style={{ color: 'var(--em-600)', textDecoration: 'underline', wordBreak: 'break-all' }}>https://www.s-re.jp/kyodo/</a>
          </FieldBand>
        </div>
      </Section>

      <div style={{ height: 8 }} />

      {/* 16. 下部固定CTA（電話=アウトライン / Web体験=塗り、flex-1で同比重） */}
      <div className="cta-bar">
        <a href="#" className="btn btn-out">{Ico.phone}電話する</a>
        <a href="#" className="btn">{Ico.web}Webで体験を申し込む</a>
      </div>
    </div>
  );
}

Object.assign(window, { DetailFrame });
