import {useEffect,useState} from 'react';

const navigation=[
  ['Home','top'],
  ['Cakes','cakes'],
  ['Flavours','flavours'],
  ['Build yours','builder'],
  ['Gallery','gallery'],
  ['Reviews','reviews'],
  ['FAQ','faq'],
  ['Contact','contact'],
];

export default function Header(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  const goHome=event=>{
    event.preventDefault();
    close();
    window.scrollTo({top:0,left:0,behavior:'auto'});
    window.history.replaceState(null,'',`${window.location.pathname}${window.location.search}`);
  };

  useEffect(()=>{
    document.body.classList.toggle('menu-open',open);
    const handleEscape=event=>{if(event.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',handleEscape);
    return ()=>{
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown',handleEscape);
    };
  },[open]);

  return <header className="site-header" id="top">
    <a className="brand brand-logo brand-lockup" href="#top" aria-label="Cake Story by Megha home" onClick={goHome}>
      <span className="logo-frame"><img src="/assets/cake-story-logo-320.png" alt="Cake Story By Megha Official Logo"/></span>
      <span className="brand-lockup-copy"><strong>Cake Story</strong><small>by Megha</small><i>Homemade with love</i></span>
    </a>

    <button className={`nav-toggle ${open?'open':''}`} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(current=>!current)}>
      <span/><span/><span/>
    </button>

    <nav id="main-navigation" className={`nav-links ${open?'open':''}`} aria-label="Main navigation">
      <div className="mobile-menu-heading">
        <span>Explore Cake Story</span>
      </div>
      <div className="mobile-menu-links">
        {navigation.map(([label,id])=><a key={id} href={`#${id}`} onClick={id==='top'?goHome:close}>{label}<i>→</i></a>)}
      </div>
      <a className="button button-primary mobile-menu-cta" href="#builder" onClick={close}>Create your cake <span>→</span></a>
      <small className="mobile-menu-note">Handcrafted with care in Dighi, Pune</small>
    </nav>

    <a className="button button-dark header-cta" href="#builder">Create your cake <span>→</span></a>
  </header>;
}
