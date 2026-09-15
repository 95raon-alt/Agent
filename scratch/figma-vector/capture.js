async function captureVectorPage(selector='header,main>section,body>section,footer') {
  await document.fonts.ready;
  window.scrollTo(0,0);
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
  const original=[...document.querySelectorAll('body *')];
  for(const e of original){
    if(e.closest('svg,script,style'))continue;
    for(const pseudo of ['::before','::after']){
      const s=getComputedStyle(e,pseudo);
      if(s.content==='none'||s.content==='normal'||s.display==='none')continue;
      const n=document.createElement('span');n.dataset.vectorPseudo=pseudo;
      for(const k of s)n.style.setProperty(k,s.getPropertyValue(k));
      n.textContent=s.content.slice(1,-1);n.style.pointerEvents='none';
      if(pseudo==='::before')e.prepend(n);else e.append(n);
    }
  }
  const suppress=document.createElement('style');suppress.textContent='*::before,*::after{content:none!important}*{animation:none!important;transition:none!important}';document.head.append(suppress);
  const names=['backgroundColor','backgroundImage','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderTopColor','borderRightColor','borderBottomColor','borderLeftColor','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius','opacity','overflowX','overflowY','clipPath','color','fontFamily','fontSize','fontWeight','fontStyle','letterSpacing','textTransform'];
  const linear=e=>{if(!e||e===document.documentElement)return new DOMMatrix();const m=linear(e.parentElement);const t=getComputedStyle(e).transform;return t==='none'?m:m.multiply(new DOMMatrix(t));};
  const geom=e=>{
    const r=e.getBoundingClientRect(),s=getComputedStyle(e),m=linear(e);
    const w=e.offsetWidth||parseFloat(s.width)||r.width,h=e.offsetHeight||parseFloat(s.height)||r.height;
    const xs=[0,m.a*w,m.c*h,m.a*w+m.c*h],ys=[0,m.b*w,m.d*h,m.b*w+m.d*h];
    return {w,h,m:[m.a,m.b,m.c,m.d,r.x-Math.min(...xs),r.y-Math.min(...ys)]};
  };
  let uid=0;
  function collect(e){
    const s=getComputedStyle(e),r=e.getBoundingClientRect();
    if(['SCRIPT','STYLE','LINK'].includes(e.tagName)||s.display==='none'||s.visibility==='hidden'||+s.opacity===0||!r.width||!r.height)return null;
    const g=geom(e),out={name:e.id||e.getAttribute('class')||e.tagName,...g,style:Object.fromEntries(names.map(k=>[k,s[k]])),children:[],texts:[]};
    if(e.tagName.toLowerCase()==='svg'){
      const clone=e.cloneNode(true),src=[e,...e.querySelectorAll('*')],dst=[clone,...clone.querySelectorAll('*')];out.svgTexts=[];
      src.forEach((n,i)=>{
        const cs=getComputedStyle(n);for(const k of ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','opacity'])dst[i].setAttribute(k,cs.getPropertyValue(k));
        if(n.tagName==='text'){
          const id='svgText'+uid++,b=n.getBBox();out.svgTexts.push({id,text:n.textContent,x:b.x,y:b.y,w:b.width,h:b.height,size:parseFloat(cs.fontSize),weight:cs.fontWeight,color:cs.fill});
          const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('data-outline',id);dst[i].replaceWith(path);
        }
      });
      clone.setAttribute('width',r.width);clone.setAttribute('height',r.height);clone.setAttribute('x',r.x);clone.setAttribute('y',r.y);clone.removeAttribute('class');out.svg=clone.outerHTML;return out;
    }
    const inv=new DOMMatrix(g.m).inverse();
    for(const n of e.childNodes){
      if(n.nodeType===3&&n.textContent.trim()){
        const fontSize=parseFloat(s.fontSize);ctx.font=`${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
        const mt=ctx.measureText('Hg한');const ascent=mt.fontBoundingBoxAscent||fontSize*.9,descent=mt.fontBoundingBoxDescent||fontSize*.25;
        const chars=[];let ix=0;
        for(const ch of n.textContent){
          const range=document.createRange();range.setStart(n,ix);ix+=ch.length;range.setEnd(n,ix);const b=range.getBoundingClientRect();
          if(!ch.trim()||!b.width||!b.height)continue;
          const center=new DOMPoint(b.x+b.width/2,b.y+b.height/2).matrixTransform(inv);
          const angle=Math.atan2(g.m[1],g.m[0]);const scale=Math.hypot(g.m[0],g.m[1]);
          const cw=Math.abs(Math.cos(angle))>.7?(b.width/scale-Math.abs(Math.sin(angle))*(ascent+descent))/Math.abs(Math.cos(angle)):ctx.measureText(ch).width;
          chars.push({ch:s.textTransform==='uppercase'?ch.toUpperCase():ch,x:center.x-Math.max(0,cw)/2,y:center.y+(ascent-descent)/2});
        }
        out.texts.push({text:n.textContent.trim(),chars,size:fontSize,weight:s.fontWeight,color:s.color,font:s.fontFamily});
      }
    }
    if(['INPUT','SELECT','TEXTAREA'].includes(e.tagName)){
      const val=e.tagName==='SELECT'?e.options[e.selectedIndex]?.text:(e.value||e.placeholder);
      if(val)out.texts.push({text:val,chars:null,x:parseFloat(s.paddingLeft)+2,y:g.h/2+parseFloat(s.fontSize)*.35,size:parseFloat(s.fontSize),weight:s.fontWeight,color:s.color,font:s.fontFamily});
    }
    const kids=[...e.children].sort((a,b)=>(parseInt(getComputedStyle(a).zIndex)||0)-(parseInt(getComputedStyle(b).zIndex)||0));
    for(const c of kids){const d=collect(c);if(d)out.children.push(d);}
    return out;
  }
  return {width:document.documentElement.clientWidth,height:document.body.scrollHeight,sections:[...document.querySelectorAll(selector)].map(collect).filter(Boolean)};
}
