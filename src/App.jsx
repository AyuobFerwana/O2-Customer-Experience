import React, {useEffect, useMemo, useState} from 'react';
import { Home, UtensilsCrossed, ReceiptText, Gift, Trophy, Percent, Users, UserRound, Search, ShoppingBag, Bell, ChevronLeft, Star, Flame, Clock3, MapPin, Heart, Plus, Minus, X, Zap, CheckCircle2, Crown, Sparkles, ArrowUpLeft, TicketPercent, WalletCards, ShieldCheck } from 'lucide-react';

const nav = [
  ['الرئيسية','home',Home],['المنيو','menu',UtensilsCrossed],['طلباتي','orders',ReceiptText],['المكافآت','rewards',Gift],['الولاء','loyalty',Trophy],['العروض','offers',Percent],['العائلة','family',Users],['حسابي','account',UserRound]
];
const foods = [
 {id:1,name:'O2 Fire Burger',desc:'لحم مشوي، صوص O2 الحار، جبنة مدخنة',price:7.9,cat:'برغر',tag:'الأكثر طلباً',emoji:'🍔'},
 {id:2,name:'Crispy Inferno',desc:'دجاج كرسبي، صوص سبايسي، كول سلو',price:6.5,cat:'دجاج',tag:'حار 🔥',emoji:'🍗'},
 {id:3,name:'Loaded Fries',desc:'بطاطا، تشيدر، هالبينو، صوص سري',price:4.25,cat:'مقبلات',tag:'جديد',emoji:'🍟'},
 {id:4,name:'O2 Family Box',desc:'وجبة عائلية كبيرة مع بطاطا ومشروبات',price:24.9,cat:'بوكسات',tag:'أفضل قيمة',emoji:'🍱'},
 {id:5,name:'Smoky Wrap',desc:'راب دجاج مدخن مع خضار وصوص الثوم',price:5.75,cat:'راب',tag:'خفيف',emoji:'🌯'},
 {id:6,name:'Red Velvet Shake',desc:'ميلك شيك ريد فيلفت كريمي',price:3.95,cat:'مشروبات',tag:'مميز',emoji:'🥤'},
];

function App(){
 const [page,setPage]=useState('home'); const [cart,setCart]=useState([]); const [liked,setLiked]=useState([1]); const [toast,setToast]=useState('');
 const cartCount=cart.reduce((a,b)=>a+b.qty,0); const total=cart.reduce((a,b)=>a+b.qty*b.price,0);
 const add=(f)=>{setCart(c=>{const x=c.find(i=>i.id===f.id); return x?c.map(i=>i.id===f.id?{...i,qty:i.qty+1}:i):[...c,{...f,qty:1}]});flash(`تمت إضافة ${f.name}`)};
 const flash=(t)=>{setToast(t);setTimeout(()=>setToast(''),1800)};
 const content={home:<HomePage go={setPage} add={add} liked={liked} setLiked={setLiked}/>,menu:<MenuPage add={add} liked={liked} setLiked={setLiked}/>,orders:<OrdersPage/>,rewards:<RewardsPage flash={flash}/>,loyalty:<LoyaltyPage/>,offers:<OffersPage flash={flash}/>,family:<FamilyPage/>,account:<AccountPage/>}[page];
 return <div className="app-shell">
   <div className="ambient a1"/><div className="ambient a2"/><div className="noise"/>
   <Header page={page} setPage={setPage} cartCount={cartCount}/>
   <main>{content}</main>
   <BottomNav page={page} setPage={setPage}/>
   <CartDock cart={cart} setCart={setCart} total={total}/>
   <LoyaltyCoach points={2000} page={page}/>
   {toast&&<div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
 </div>
}

function Header({page,setPage,cartCount}){return <header className="topbar"><button className="brand" onClick={()=>setPage('home')}><span className="o2mark">O<span>2</span></span><span className="brand-sub">EAT • EARN • ENJOY</span></button><nav>{nav.map(([t,k,I])=><button key={k} className={page===k?'active':''} onClick={()=>setPage(k)}><I size={17}/><span>{t}</span></button>)}</nav><div className="head-actions"><button className="icon-btn"><Bell size={19}/><i/></button><button className="bag-btn"><ShoppingBag size={19}/>{cartCount>0&&<b>{cartCount}</b>}</button></div></header>}

function HomePage({go,add,liked,setLiked}){return <>
 <section className="hero wrap">
  <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> تجربة O2 الجديدة</div><h1>مو بس وجبة.<br/><span>هذه تجربة تتحرك معك.</span></h1><p>اطلب أسرع، اجمع نقاط، افتح مستويات جديدة، وخلي كل زيارة لـ O2 فيها مفاجأة.</p><div className="hero-actions"><button className="primary" onClick={()=>go('menu')}>اطلب الآن <ArrowUpLeft size={18}/></button><button className="ghost" onClick={()=>go('loyalty')}>شوف مستواي <Trophy size={18}/></button></div><div className="ticker"><div>🔥 عرض اليوم: خصم 20% على O2 Fire Burger • ⭐ نقاط مضاعفة حتى 10 مساءً • 🎁 افتح Red Box عند 2,000 نقطة • 🔥 عرض اليوم: خصم 20% على O2 Fire Burger • ⭐ نقاط مضاعفة حتى 10 مساءً</div></div></div>
  <div className="hero-visual"><div className="orbit o-one">+35 XP</div><div className="orbit o-two">🔥 STREAK 6</div><div className="orbit o-three">LEVEL 04</div><div className="hero-dish"><div className="dish-glow"/><div className="food-emoji">🍔</div><span className="steam s1">〰</span><span className="steam s2">〰</span><span className="steam s3">〰</span></div><div className="floating-score"><Crown/><div><small>مستواك</small><strong>O2 RED</strong></div><b>86%</b></div></div>
 </section>
 <section className="wrap stats-grid"><Stat icon={<Flame/>} value="6 أيام" label="سلسلة الطلبات" accent/><Stat icon={<Star/>} value="1,720" label="نقطة O2"/><Stat icon={<ReceiptText/>} value="42" label="إجمالي الطلبات"/><Stat icon={<Clock3/>} value="18 دقيقة" label="متوسط التوصيل"/></section>
 <section className="wrap section"><Title eyebrow="PICKED FOR YOU" title="مختارات على مزاجك" sub="اقتراحات تتغير حسب طلباتك ونشاطك" action="عرض المنيو" onClick={()=>go('menu')}/><div className="food-grid">{foods.slice(0,4).map(f=><FoodCard key={f.id} f={f} add={add} liked={liked} setLiked={setLiked}/>)}</div></section>
 <section className="wrap split"><LoyaltyMini go={go}/><LiveOrder/></section>
 <section className="wrap section"><Title eyebrow="O2 MOMENTS" title="كل طلب إله لحظة" sub="مكافآت صغيرة تخلي التجربة ألطف"/><div className="moments"><Moment icon="🎯" title="تحدي الأسبوع" text="اطلب من 3 تصنيفات مختلفة" progress={66}/><Moment icon="🎁" title="Red Box" text="باقي 280 نقطة لفتح الصندوق" progress={86}/><Moment icon="⚡" title="Happy Hour" text="نقاط ×2 من 7 إلى 10 مساءً" progress={45}/></div></section>
 </>}

function Stat({icon,value,label,accent}){return <div className={'stat '+(accent?'accent':'')}><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span></div><i/></div>}
function Title({eyebrow,title,sub,action,onClick}){return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2><p>{sub}</p></div>{action&&<button onClick={onClick}>{action}<ChevronLeft size={17}/></button>}</div>}
function FoodCard({f,add,liked,setLiked}){const on=liked.includes(f.id);return <article className="food-card"><div className="food-photo"><span className="tag">{f.tag}</span><button className={'heart '+(on?'on':'')} onClick={()=>setLiked(x=>on?x.filter(i=>i!==f.id):[...x,f.id])}><Heart size={18} fill={on?'currentColor':'none'}/></button><div className="food-big">{f.emoji}</div><div className="scanline"/></div><div className="food-info"><div><h3>{f.name}</h3><p>{f.desc}</p></div><div className="food-bottom"><strong>${f.price.toFixed(2)}</strong><button onClick={()=>add(f)}><Plus size={18}/></button></div></div></article>}
function LoyaltyMini({go}){return <div className="panel loyalty-mini"><div className="panel-head"><div><span>O2 LOYALTY</span><h3>قريب من O2 X</h3></div><button onClick={()=>go('loyalty')}>التفاصيل</button></div><div className="tank-row"><div className="mini-tank"><div className="liquid" style={{height:'86%'}}><i/><i/></div><b>86%</b></div><div className="tank-copy"><strong>1,720 <small>نقطة</small></strong><p>باقي <b>280 نقطة</b> وتوصل لأعلى مستوى.</p><div className="levels"><span>BLACK</span><span className="done">RED</span><span className="next">PLATINUM</span></div></div></div></div>}
function LiveOrder(){return <div className="panel order-panel"><div className="panel-head"><div><span>LIVE ORDER</span><h3>طلبك قيد التحضير</h3></div><em>ORD-20491</em></div><div className="order-path"><Step done icon="✓" text="استلام"/><Step active icon="🔥" text="التحضير"/><Step icon="🛵" text="بالطريق"/><Step icon="🏠" text="وصل"/></div><div className="order-bottom"><div><small>الوقت المتوقع</small><strong>18 - 24 دقيقة</strong></div><button>تتبع مباشر <MapPin size={16}/></button></div></div>}
function Step({done,active,icon,text}){return <div className={'step '+(done?'done ':'')+(active?'active':'')}><i>{icon}</i><span>{text}</span></div>}
function Moment({icon,title,text,progress}){return <div className="moment"><div className="moment-top"><b>{icon}</b><span>{progress}%</span></div><h3>{title}</h3><p>{text}</p><div className="microbar"><i style={{width:progress+'%'}}/></div></div>}

function MenuPage({add,liked,setLiked}){const [q,setQ]=useState('');const [cat,setCat]=useState('الكل');const cats=['الكل',...new Set(foods.map(f=>f.cat))];const list=foods.filter(f=>(cat==='الكل'||f.cat===cat)&&f.name.toLowerCase().includes(q.toLowerCase()));return <div className="wrap page"><PageHero icon={<UtensilsCrossed/>} kicker="O2 MENU" title="اختار مزاجك" text="منيو ديناميكي سريع، واضح، ومصمم عشان توصل لطلبك بأقل خطوات."/><div className="menu-tools"><div className="search"><Search size={19}/><input placeholder="دوّر على وجبتك..." value={q} onChange={e=>setQ(e.target.value)}/></div><div className="chips">{cats.map(c=><button className={cat===c?'active':''} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div></div><div className="food-grid menu-grid">{list.map(f=><FoodCard key={f.id} f={f} add={add} liked={liked} setLiked={setLiked}/>)}</div></div>}
function OrdersPage(){return <div className="wrap page"><PageHero icon={<ReceiptText/>} kicker="YOUR ORDERS" title="طلباتك، بدون لف ودوران" text="تابع الحالي وارجع لأي طلب سابق بضغطة."/><div className="orders-layout"><LiveOrder/><div className="panel history"><div className="panel-head"><div><span>ORDER HISTORY</span><h3>آخر الطلبات</h3></div></div>{[20482,20471,20455].map((n,i)=><div className="history-row" key={n}><div className="order-icon"><ReceiptText/></div><div><strong>ORD-{n}</strong><span>{['أمس، 8:34 م','8 أغسطس، 6:15 م','2 أغسطس، 9:05 م'][i]}</span></div><b>${[18.5,12.25,26.7][i]}</b><button>إعادة الطلب</button></div>)}</div></div></div>}
function RewardsPage({flash}){return <div className="wrap page"><PageHero icon={<Gift/>} kicker="REWARDS" title="نقاطك إلها طعم" text="استبدل نقاط O2 بمكافآت حقيقية وخلّي كل طلب يقرّبك من شيء جديد."/><div className="reward-balance"><div><span>رصيدك الحالي</span><strong>1,720</strong><small>O2 POINTS</small></div><div className="pulse-ring"><Gift/><i/></div></div><div className="reward-grid">{[['🍔','برغر مجاني',850],['🍟','Loaded Fries',450],['🥤','مشروب مجاني',300],['🎁','Mystery Red Box',1500]].map(([e,t,p])=><div className="reward-card" key={t}><b>{e}</b><h3>{t}</h3><p>{p} نقطة</p><button onClick={()=>flash(`تم اختيار ${t}`)}>استبدال</button></div>)}</div></div>}
function LoyaltyPage(){
 const points=2000,max=2000;
 const [displayPoints,setDisplayPoints]=useState(0);
 const [celebrationPhase,setCelebrationPhase]=useState('off'); // off -> fx -> card
 const [glassMessageIndex,setGlassMessageIndex]=useState(0);
 const [glassMessageVisible,setGlassMessageVisible]=useState(true);
 useEffect(()=>{let raf;const start=performance.now(),duration=3900;const tick=(now)=>{const t=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-t,3);const next=Math.round(points*eased);setDisplayPoints(next);if(next>=2000&&points>=2000)setCelebrationPhase(p=>p==='off'?'fx':p);if(t<1)raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[points]);
 useEffect(()=>{if(celebrationPhase!=='fx')return;const timer=setTimeout(()=>setCelebrationPhase('card'),3200);return()=>clearTimeout(timer)},[celebrationPhase]);
 useEffect(()=>{if(celebrationPhase!=='card')return;const timer=setTimeout(()=>setCelebrationPhase('off'),9000);return()=>clearTimeout(timer)},[celebrationPhase]);
 useEffect(()=>{
  const timer=setInterval(()=>{
   setGlassMessageVisible(visible=>{
    if(visible) return false;
    setGlassMessageIndex(i=>(i+1)%4);
    return true;
   });
  },5000);
  return()=>clearInterval(timer);
 },[]);
 const tiers=[
  {key:'black',name:'أسود',en:'BLACK',from:0,to:200,color:'#15191f'},
  {key:'red',name:'أحمر',en:'RED',from:200,to:800,color:'#d9001b'},
  {key:'gold',name:'ذهبي',en:'GOLD',from:800,to:1300,color:'#e4a20a'},
  {key:'o2x',name:'O2 X',en:'O2 X',from:1300,to:2000,color:'#19c9ff'},
 ];
 const currentTier=points<200?tiers[0]:points<800?tiers[1]:points<1300?tiers[2]:tiers[3];
 const currentIndex=tiers.findIndex(t=>t.key===currentTier.key);
 const remaining=Math.max(0,max-points);
 const progress=Math.min(100,(points/max)*100);
 const messages=[
  {title:'أنت قريب من هدفك! 🔥',body:`باقي ${remaining.toLocaleString()} نقطة وتوصل لقمة O2 X`},
  {title:'كل نقطة تغيّر الكاسة ✨',body:'شوف اللون يرتفع مع كل طلب جديد'},
  {title:'استمر... باقي القليل 🚀',body:`أنجزت ${Math.round(progress)}% من رحلة الـ 2,000 نقطة`},
  {title:'المكافأة الكبيرة أقرب 🎁',body:'طلب جديد ممكن يرفعك خطوة كاملة'},
 ];
 const activeMessage=messages[glassMessageIndex];
 const fillHeight=(tier)=>Math.max(0,Math.min(points,tier.to)-tier.from)/max*100;
 const fillBottom=(tier)=>tier.from/max*100;
 const tierState=(tier)=>points>=tier.to?'complete':points>tier.from?'active':'locked';
 return <div className="wrap page loyalty-page loyalty-v12">
 {celebrationPhase!=='off'&&<div className={'o2-celebration phase-'+celebrationPhase} aria-live="polite">
   <div className="celebration-flash"/>
   <div className="fireworks">{Array.from({length:10}).map((_,i)=><span key={i} className={'firework fw-'+(i%5)} style={{'--i':i,'--delay':(i*.19)+'s','--left':(8+((i*19)%84))+'%','--top':(10+((i*17)%56))+'%'}}>{Array.from({length:12}).map((_,j)=><i key={j} style={{'--a':(j*30)+'deg','--c':j%4}}/>)}</span>)}</div>
   <div className="ribbon-field">{Array.from({length:24}).map((_,i)=><i key={i} style={{'--x':((i*43)%100)+'%','--d':(i%8)*.11+'s','--rot':((i*71)%360)+'deg'}}/>)}</div>
   <div className="confetti-field">{Array.from({length:84}).map((_,i)=><i key={i} style={{'--i':i,'--x':((i*37)%100)+'%','--d':(i%12)*.07+'s','--r':((i*47)%360)+'deg'}}/>)}</div>
   <div className="celebration-burst"/>
   <div className="celebration-prelude"><Sparkles/><strong>2,000</strong><span>وصلتها! 🎉</span><small>استعد... جائزتك تنفتح الآن</small></div>
   <div className="celebration-card"><div className="reward-orb"><Sparkles/><span>O2 X</span></div><small>LEVEL UNLOCKED</small><h2>وصلت 2,000 نقطة!</h2><p>مبروك! فتحت أعلى مستوى ومكافأة O2 X الخاصة فيك.</p><button onClick={()=>setCelebrationPhase('off')}>استلم جائزتك <Gift size={18}/></button></div>
 </div>}
 <section className="loyalty-cinematic-shell">
   <div className="loyalty-cinematic-title"><span>O2 LOYALTY EXPERIENCE</span><h1>مستويات الولاء</h1><p>كل نقطة تتجمع أمامك داخل الكاسة — من الأسود، للأحمر، للذهبي، ثم O2 X.</p></div>
   <div className="loyalty-cinematic-grid">
     <aside className="tier-board-v12">
       <div className="tier-board-head"><Trophy size={19}/><div><small>LEVEL MAP</small><h3>مستويات الولاء</h3></div></div>
       {[...tiers].reverse().map(t=><div className={'tier-row-v12 '+t.key+' '+tierState(t)} key={t.key}>
         <div className="tier-gem-v12"><i/></div><div><strong>{t.name}</strong><span>{t.from.toLocaleString()} - {t.to.toLocaleString()} نقطة</span></div><b>{points>=t.to?'✓':points>t.from?Math.round(((points-t.from)/(t.to-t.from))*100)+'%':'—'}</b>
       </div>)}
     </aside>

     <div className="glass-stage-v12" style={{'--fill-total':progress+'%'}}>
       {glassMessageVisible&&<div key={glassMessageIndex} className={'glass-message-v12 msg-'+glassMessageIndex}>
         <div className="message-spark-field-v13"><i/><i/><i/><i/></div>
         <div className="message-icon-v12"><Sparkles size={20}/><i/></div>
         <div className="message-copy-v13">
           <small>رسالة من كاسة O2</small>
           <strong>{activeMessage.title}</strong>
           <span>{activeMessage.body}</span>
           <div className="message-progress-v13"><i style={{width:progress+'%'}}/><b>{Math.round(progress)}%</b></div>
         </div>
       </div>}
       <div className="glass-aura-v12"/>
       <div className="glass-vessel-v12">
         <div className="glass-rim-v12"/>
         <div className="glass-body-v12">
           <div className="glass-chamber-v12">
             {tiers.map((t,i)=><div key={t.key} className={'liquid-tier-v12 '+t.key+' '+tierState(t)} style={{'--layer-bottom':fillBottom(t)+'%','--layer-height':fillHeight(t)+'%','--fill-delay':(.25+i*.55)+'s'}}><div className="liquid-texture-v12"/></div>)}
             <div className="glass-bubbles-v12" style={{height:progress+'%'}}>{Array.from({length:24}).map((_,i)=><i key={i} style={{'--bx':(8+((i*37)%84))+'%','--bs':(3+(i%5))+'px','--bd':(i%8)*.22+'s','--bt':(3.3+(i%4)*.55)+'s'}}/>)}</div>
             <div className="glass-surface-v12" style={{bottom:`calc(${progress}% - 5px)`}}><i/><i/></div>
             <div className="glass-sheen-v12"/>
           </div>
           <div className="glass-side-glow left"/><div className="glass-side-glow right"/>
         </div>
         <div className="glass-foot-v12"><i/><b/></div>
       </div>
       <div className="glass-scale-v12">{[2000,1300,800,200,0].map(n=><div key={n} style={{bottom:(n/max*100)+'%'}}><i/><span>{n.toLocaleString()}</span></div>)}</div>
       <div className="glass-points-v12">
         <div className="points-pulse-v13"><i/></div>
         <div className="points-copy-v13"><small>رصيدك الحالي</small><strong>{displayPoints.toLocaleString()}</strong><span>نقطة من {max.toLocaleString()}</span></div>
         <div className="points-mini-ring-v13" style={{'--p':progress}}><b>{Math.round(progress)}%</b></div>
       </div>
     </div>

     <aside className={'current-status-v12 '+currentTier.key}>
       <div className="member-mini-v12"><div className="member-face-v12">أ</div><div><strong>أحمد خليل</strong><span>عضو منذ 2022</span></div><i/></div>
       <div className="status-kicker-v12">مستواك الحالي</div>
       <div className="status-level-v12"><div className="status-gem-v12"><Star size={30}/></div><h2>{currentTier.name}</h2></div>
       <div className="status-divider-v12"/>
       <div className="remaining-v12"><span>باقي</span><strong>{remaining.toLocaleString()}</strong><p>نقطة للوصول إلى <b>قمة O2 X</b></p></div>
       <div className="status-progress-v12"><i style={{width:progress+'%'}}/><b>{Math.round(progress)}%</b></div>
       <small className="status-points-v12">{points.toLocaleString()} / {max.toLocaleString()} نقطة</small>
       <button className="status-action-v12">عرض جميع المزايا <ChevronLeft size={17}/></button>
       <div className="status-stats-v12"><div><Flame size={18}/><strong>6</strong><span>أيام متتالية</span></div><div><Zap size={18}/><strong>+303</strong><span>هذا الشهر</span></div></div>
     </aside>
   </div>

   <div className="earn-heading-v12"><i/><h2>اكسب المزيد من النقاط</h2><i/></div>
   <div className="earn-grid-v12">
     <div className="earn-card-v12"><div className="earn-icon-v12"><ShoppingBag/></div><div><h3>اطلب وجبتك المفضلة</h3><p>كل طلب يرفع مستوى الكاسة مباشرة.</p></div><b>+10 <small>لكل 1 ر.س</small></b></div>
     <div className="earn-card-v12"><div className="earn-icon-v12"><UtensilsCrossed/></div><div><h3>جرّب طبق جديد</h3><p>اكتشف صنف ما طلبته قبل.</p></div><b>+50 <small>نقطة</small></b></div>
     <div className="earn-card-v12"><div className="earn-icon-v12">🎂</div><div><h3>احتفل بعيد ميلادك</h3><p>مكافأة خاصة تنضاف تلقائيًا.</p></div><b>+200 <small>نقطة</small></b></div>
     <div className="earn-card-v12"><div className="earn-icon-v12"><Users/></div><div><h3>ادعُ أصدقاءك</h3><p>كل صديق جديد يقربك من الجائزة.</p></div><b>+100 <small>لكل صديق</small></b></div>
   </div>
 </section>
 </div>}

function Level({dot,name,done,active}){return <div className={(done?'done ':'')+(active?'active':'')}><i>{dot}</i><span>{name}</span></div>}
function OffersPage({flash}){return <div className="wrap page"><PageHero icon={<Percent/>} kicker="O2 OFFERS" title="العروض اللي بتلحقك" text="عروض واضحة، مؤقتة، ومخصصة حسب نشاطك."/><div className="offers-grid">{[['20% OFF','على Fire Burger','FIRE20','ينتهي بعد 05:42:18'],['2X POINTS','على طلبات المساء','O2NIGHT','7:00 - 10:00 مساءً'],['FREE FRIES','مع أي بوكس عائلي','FAMILY','هذا الأسبوع فقط']].map((o,i)=><div className={'offer '+(i===0?'hot':'')}><span>{o[0]}</span><h3>{o[1]}</h3><div className="coupon"><code>{o[2]}</code><button onClick={()=>flash('تم نسخ الكود')}>نسخ</button></div><small>{o[3]}</small></div>)}</div></div>}
function FamilyPage(){
 const members=[['أحمد','أ','Admin','1,720'],['لينا','ل','عضو','620'],['سارة','س','عضو','480'],['كريم','ك','Junior','215']];
 return <div className="wrap page"><PageHero icon={<Users/>} kicker="O2 FAMILY" title="العيلة تجمع نقاط أسرع" text="ملف عائلي واحد، مزايا مشتركة، ومفاجآت حسب المناسبات."/><div className="family-grid refined-family-grid">{members.map((m,i)=><div className="member refined-member" key={m[0]}><div className={`avatar refined-avatar family-avatar family-avatar-${i}`}><span className="family-initial">{m[1]}</span><i/></div><h3>{m[0]}</h3><span className="member-role">{m[2]}</span><b>{m[3]} نقطة</b><div className="member-glow"/></div>)}<button className="add-member"><Plus/><span>إضافة فرد</span></button></div><div className="family-banner"><span>🎂</span><div><h3>عيد ميلاد لينا بعد 9 أيام</h3><p>مكافأة عائلية خاصة رح تنفتح تلقائيًا.</p></div><button>شوف المفاجأة</button></div></div>}

function LoyaltyCoach({points,page}){
 const tiers=[
  {name:'BLACK',min:0,max:200,color:'black'},
  {name:'RED',min:200,max:800,color:'red'},
  {name:'GOLD',min:800,max:1300,color:'platinum'},
  {name:'O2 X',min:1300,max:2000,color:'o2x'}
 ];
 const idx=points<200?0:points<800?1:points<1300?2:3;
 const tier=tiers[idx];
 const remaining=Math.max(0,tier.max-points);
 const progress=Math.max(0,Math.min(100,((points-tier.min)/(tier.max-tier.min))*100));
 const [messageIndex,setMessageIndex]=useState(0);
 const [visible,setVisible]=useState(false);
 const messages=remaining===0?
  ['وصلت الهدف! مكافأتك جاهزة 🎉','O2 X صار إلك — افتح جائزتك الآن ✨']:
  [
   `باقي ${remaining.toLocaleString()} نقطة وتكمل ${tier.name} 🚀`,
   `أنت قطعت ${Math.round(progress)}% من ${tier.name} — كمّل! 🔥`,
   idx<3?`كل طلب يقربك من ${tiers[idx+1].name} ⭐`:`قريب من قمة O2 X... لا توقف الآن 💎`,
   remaining<=300?'أنت قريب جدًا من الجائزة — طلب واحد ممكن يفرق! 🎁':'اجمع نقاطك على مهلك... كل نقطة محسوبة ❤️'
  ];
 useEffect(()=>{
  const show=()=>{setVisible(true);setTimeout(()=>setVisible(false),5200)};
  const first=setTimeout(show,4200);
  const timer=setInterval(()=>{setMessageIndex(i=>(i+1)%messages.length);show()},12000);
  return()=>{clearTimeout(first);clearInterval(timer)};
 },[messages.length]);
 if(page==='menu'||page==='loyalty') return null;
 return <div className={'loyalty-nudge '+tier.color+(visible?' show':'')}>
  <div className="nudge-icon"><Trophy size={18}/><i/></div>
  <div className="nudge-copy"><small>O2 LOYALTY • {tier.name}</small><strong>{messages[messageIndex]}</strong><div className="nudge-progress"><i style={{width:progress+'%'}}/></div></div>
  <span>{points.toLocaleString()}</span>
 </div>
}

function AccountPage(){const [notifications,setNotifications]=useState(true);return <div className="wrap page"><PageHero icon={<UserRound/>} kicker="MY O2" title="حسابك مثل ما بتحب" text="بياناتك، تفضيلاتك، وأمانك بمكان واحد."/><div className="account-grid"><div className="panel profile-card"><div className="profile-avatar">أ<i/></div><h2>أحمد خليل</h2><p>عضو O2 منذ 2022</p><div className="profile-meta"><span><MapPin/>فرع الرمال</span><span><Crown/>O2 RED</span></div><button>تعديل الملف الشخصي</button></div><div className="panel settings"><Setting icon={<Bell/>} title="الإشعارات" sub="العروض، الطلبات، والمكافآت" toggle={notifications} setToggle={setNotifications}/><Setting icon={<WalletCards/>} title="طرق الدفع" sub="إدارة بطاقاتك المحفوظة"/><Setting icon={<MapPin/>} title="العناوين" sub="المنزل، العمل، وعناوين أخرى"/><Setting icon={<ShieldCheck/>} title="الأمان والخصوصية" sub="كلمة المرور وإعدادات الحساب"/></div></div></div>}
function Setting({icon,title,sub,toggle,setToggle}){return <div className="setting"><i>{icon}</i><div><strong>{title}</strong><span>{sub}</span></div>{setToggle?<button className={'switch '+(toggle?'on':'')} onClick={()=>setToggle(!toggle)}><i/></button>:<ChevronLeft/>}</div>}
function PageHero({icon,kicker,title,text}){return <div className="page-hero"><div className="page-icon">{icon}<i/></div><div><span>{kicker}</span><h1>{title}</h1><p>{text}</p></div></div>}
function BottomNav({page,setPage}){return <div className="bottom-nav">{nav.slice(0,5).map(([t,k,I])=><button className={page===k?'active':''} onClick={()=>setPage(k)}><I/><span>{t}</span></button>)}</div>}
function CartDock({cart,setCart,total}){const [open,setOpen]=useState(false);if(!cart.length)return null;const change=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));return <><button className="cart-dock" onClick={()=>setOpen(true)}><ShoppingBag/><b>{cart.reduce((a,b)=>a+b.qty,0)}</b><span>${total.toFixed(2)}</span></button>{open&&<div className="cart-overlay" onClick={()=>setOpen(false)}><aside onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span>YOUR BAG</span><h2>سلتك</h2></div><button onClick={()=>setOpen(false)}><X/></button></div><div className="cart-items">{cart.map(i=><div className="cart-item"><b>{i.emoji}</b><div><strong>{i.name}</strong><span>${i.price.toFixed(2)}</span></div><div className="qty"><button onClick={()=>change(i.id,-1)}><Minus/></button><b>{i.qty}</b><button onClick={()=>change(i.id,1)}><Plus/></button></div></div>)}</div><div className="cart-total"><span>المجموع</span><strong>${total.toFixed(2)}</strong></div><button className="checkout">إكمال الطلب <Zap/></button></aside></div>}</>}
export default App;
