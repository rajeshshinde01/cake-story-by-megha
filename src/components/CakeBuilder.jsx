import {useMemo,useState} from 'react';
import {CONTACT,flavours} from '../data/content.js';

const titles=['What’s the occasion?','How much cake do you need?','How should it look?','When do you need it?'];
const blankPlan={occasion:'Birthday',servings:'12',flavour:'Chocolate Truffle',eggless:true,design:'Minimal & elegant',message:'',date:'',fulfilment:'Pickup from Dighi',pincode:''};

export default function CakeBuilder({preset}){
  const [step,setStep]=useState(preset?2:1);
  const [data,setData]=useState(()=>preset?{...blankPlan,flavour:preset.flavour,servings:preset.weight==='0.5 kg'?'6':'12'}:blankPlan);
  const [done,setDone]=useState(false);
  const set=(key,value)=>setData(current=>({...current,[key]:value}));

  const minDate=useMemo(()=>{const date=new Date();date.setDate(date.getDate()+1);return date.toISOString().split('T')[0]},[]);
  const estimate=useMemo(()=>{
    const servings=Number(data.servings);
    const standardBase=servings<=6?650:servings<=12?1100:servings<=20?1600:servings<=30?2200:3200;
    const selectedMenuPrice=preset&&((preset.weight==='0.5 kg'&&servings===6)||(preset.weight==='1 kg'&&servings===12))?preset.price:null;
    const designExtra=data.design.includes('Luxury')?500:data.design.includes('Kids')||data.design.includes('Photo')?300:data.design.includes('Floral')?250:0;
    const low=(selectedMenuPrice||standardBase)+designExtra;
    return [low,low+Math.max(300,Math.round(low*.22))];
  },[data.design,data.servings,preset]);

  const rows=[['Occasion',data.occasion],['Cake',`${data.flavour} · ${data.servings} servings`],['Preference',data.eggless?'Eggless':'Contains egg'],['Design',data.design],['Required on',data.date?new Date(`${data.date}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}):'Not selected'],['Fulfilment',data.fulfilment]];
  const message=encodeURIComponent(`Hi Megha, I'd like a cake quote.\n\n${rows.map(row=>`${row[0]}: ${row[1]}`).join('\n')}\nEstimated range shown: ₹${estimate[0].toLocaleString('en-IN')}–₹${estimate[1].toLocaleString('en-IN')}\n${data.message?`Cake message: ${data.message}\n`:''}Please confirm availability and final price.`);
  const next=()=>{if(step===4){if(!data.date)return;setDone(true)}else setStep(current=>current+1)};
  const restart=()=>{setData(blankPlan);setStep(1);setDone(false)};

  return <section className="builder-section" id="builder">
    <div className="builder-intro">
      <p className="eyebrow light"><span/> Your cake, your way</p>
      <h2>Let's create something<br/><em>just for you.</em></h2>
      <p>Answer a few simple questions. We’ll suggest the right size, estimate your price, and prepare a clear order request.</p>
      <ol className="builder-benefits"><li><b>01</b><span><strong>Simple choices</strong><small>No cake expertise needed</small></span></li><li><b>02</b><span><strong>Instant estimate</strong><small>Know the expected price range</small></span></li><li><b>03</b><span><strong>Personal confirmation</strong><small>Megha reviews every request</small></span></li></ol>
    </div>
    <div className="builder-card">
      {!done?<>
        <div className="step-head"><div><small>STEP {step} OF 4</small><strong>{titles[step-1]}</strong></div><div className="progress" aria-label={`Step ${step} of 4`}>{[1,2,3,4].map(number=><i key={number} className={number<=step?'done':''}/>)}</div></div>
        <form onSubmit={event=>event.preventDefault()}>
          {step===1&&<fieldset className="builder-step active"><legend className="sr-only">Choose occasion</legend><div className="choice-grid occasion-grid">{[['✦','Birthday','Make their day'],['♡','Anniversary','Celebrate your story'],['♔','Wedding','For the big day'],['☾','Baby celebration','Sweet beginnings'],['◇','Milestone','A proud moment'],['∞','Just because','No reason needed']].map(([icon,name,note])=><label key={name}><input type="radio" name="occasion" checked={data.occasion===name} onChange={()=>set('occasion',name)}/><span className="choice"><b>{icon}</b><strong>{name}</strong><small>{note}</small></span></label>)}</div></fieldset>}
          {step===2&&<fieldset className="builder-step active"><legend className="sr-only">Choose servings and flavour</legend>{preset&&<div className="builder-preset"><span>Selected from menu</span><strong>{preset.flavour} · {preset.weight} · ₹{preset.price}</strong></div>}<div className="form-grid"><label className="field">Guests / servings<select value={data.servings} onChange={event=>set('servings',event.target.value)}><option value="6">Up to 6 people — 0.5 kg</option><option value="12">7–12 people — 1 kg</option><option value="20">13–20 people — 1.5 kg</option><option value="30">21–30 people — 2 kg</option><option value="45">31–45 people — 3 kg</option></select></label><label className="field">Flavour<select value={data.flavour} onChange={event=>set('flavour',event.target.value)}>{flavours.map(item=><option key={item[0]} value={item[0]}>{item[0]}</option>)}</select></label></div><label className="toggle-line"><input type="checkbox" checked={data.eggless} onChange={event=>set('eggless',event.target.checked)}/><span/><b>Make it eggless</b><small>Available at no extra charge</small></label></fieldset>}
          {step===3&&<fieldset className="builder-step active"><legend className="sr-only">Choose design</legend><label className="field">Design style<select value={data.design} onChange={event=>set('design',event.target.value)}>{['Minimal & elegant','Floral','Kids theme','Photo cake','Luxury / gold','Tell you on WhatsApp'].map(option=><option key={option}>{option}</option>)}</select></label><label className="field">Cake message (optional)<input value={data.message} onChange={event=>set('message',event.target.value)} maxLength="50" placeholder="e.g. Happy 30th, Aditi!"/></label><label className="upload-box"><input type="file" accept="image/*"/><span>＋</span><strong>Add a reference image</strong><small>JPG or PNG · You can also share it later</small></label></fieldset>}
          {step===4&&<fieldset className="builder-step active"><legend className="sr-only">Delivery details</legend><div className="form-grid"><label className="field">Required date<input type="date" min={minDate} value={data.date} required onChange={event=>set('date',event.target.value)}/></label><label className="field">How should we send it?<select value={data.fulfilment} onChange={event=>set('fulfilment',event.target.value)}><option>Pickup from Dighi</option><option>Local delivery</option></select></label></div><label className="field pincode-field">Delivery postcode (if applicable)<input value={data.pincode} onChange={event=>set('pincode',event.target.value.replace(/\D/g,'').slice(0,6))} inputMode="numeric" placeholder="411015"/><small>We currently deliver around Dighi and nearby Pune areas.</small></label></fieldset>}
          <div className="builder-nav"><button type="button" className="button button-ghost" disabled={step===1} onClick={()=>setStep(current=>current-1)}>← Back</button><button type="button" className="button button-primary" onClick={next}>{step===4?'See my estimate':'Continue'} <span>→</span></button></div>
        </form>
      </>:<div className="quote-result"><p className="eyebrow"><span/> Your cake plan</p><h3>Lovely choice! Here’s your estimate.</h3>{rows.map(row=><div className="summary-row" key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}<div className="estimate"><span>Estimated range<small>Final quote after design review</small></span><strong>₹{estimate[0].toLocaleString('en-IN')}–₹{estimate[1].toLocaleString('en-IN')}</strong></div><a className="button button-primary full" href={`https://wa.me/${CONTACT.primaryRaw}?text=${message}`} target="_blank" rel="noreferrer">Send request on WhatsApp <span>↗</span></a><button className="text-button" onClick={restart}>Start again</button></div>}
    </div>
  </section>
}
