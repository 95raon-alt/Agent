const fs=require('fs'),path=require('path'),ot=require('opentype.js');
const root=__dirname,data=JSON.parse(fs.readFileSync(path.join(root,process.argv[2]||'capture.json'),'utf8'));
const font=name=>{const b=fs.readFileSync('C:/Windows/Fonts/'+name);return ot.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const fonts={latin:font('arial.ttf'),latinBold:font('arialbd.ttf'),korean:font('malgun.ttf'),koreanBold:font('malgunbd.ttf'),symbols:font('seguisym.ttf')};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
let seq=0,defs=[];
const split=s=>{let d=0,a=[],b='';for(const c of s){if(c==='(')d++;if(c===')')d--;if(c===','&&!d){a.push(b.trim());b='';}else b+=c;}if(b.trim())a.push(b.trim());return a;};
const rgba=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return {c,a:1};const v=m[1].split(',').map(Number);return {c:`rgb(${v[0]},${v[1]},${v[2]})`,a:v.length>3?v[3]:1};};
const paint=(c,attr='fill')=>{const p=rgba(c);return `${attr}="${p.c}" ${attr}-opacity="${p.a}"`;};
function gradient(str,w,h){
 const radial=str.startsWith('radial'),repeat=str.startsWith('repeating');
 const args=split(str.slice(str.indexOf('(')+1,-1));let first=args[0],direction='180deg';
 if(!/^(rgb|#|transparent|white|black)/.test(first))direction=args.shift();
 const stops=args.map(s=>{const m=s.match(/^(rgba?\([^)]+\)|#[\da-f]+|[a-z]+)(?:\s+([-\d.]+)(%|px))?/i);return m?{color:m[1],pos:m[2]===undefined?null:+m[2]/(m[3]==='%'?100:(direction==='90deg'?w:h))}:null;}).filter(Boolean);
 if(!stops.length)return null;
 if(stops[0].pos===null)stops[0].pos=0;if(stops.at(-1).pos===null)stops.at(-1).pos=1;
 for(let i=0;i<stops.length;i++)if(stops[i].pos===null){let j=i;while(stops[j].pos===null)j++;const a=stops[i-1].pos,b=stops[j].pos;for(let k=i;k<j;k++)stops[k].pos=a+(b-a)*(k-i+1)/(j-i+1);i=j;}
 const id='grad'+seq++;let attrs='';
 if(radial){const at=direction.match(/at\s+([\d.]+)%\s+([\d.]+)%/);attrs=`cx="${at?at[1]:'50'}%" cy="${at?at[2]:'50'}%" r="80%"`;}
 else {let deg=parseFloat(direction);if(!Number.isFinite(deg))deg=direction.includes('right')?90:direction.includes('left')?270:direction.includes('top')?0:180;
 const a=deg*Math.PI/180,dx=Math.sin(a),dy=-Math.cos(a);let extent=Math.abs(dx)*w+Math.abs(dy)*h;let x1=w/2-dx*extent/2,y1=h/2-dy*extent/2,x2=w/2+dx*extent/2,y2=h/2+dy*extent/2;
 if(repeat){const end=stops.at(-1).pos||1;x2=x1+(x2-x1)*end;y2=y1+(y2-y1)*end;stops.forEach(s=>s.pos/=end);}
 attrs=`gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${repeat?' spreadMethod="repeat"':''}`;}
 defs.push(`<${radial?'radial':'linear'}Gradient id="${id}" ${attrs}>${stops.map(s=>{const p=rgba(s.color);return `<stop offset="${Math.max(0,Math.min(1,s.pos))}" stop-color="${p.c}" stop-opacity="${p.a}"/>`;}).join('')}</${radial?'radial':'linear'}Gradient>`);return `fill="url(#${id})"`;
}
function textPath(t){let d='',advance=t.x||0;const bold=+t.weight>=600;
 const chars=t.chars||Array.from(t.text).map(ch=>{const f=fonts[(ch.codePointAt(0)>255?'korean':'latin')+(bold?'Bold':'')],r={ch,x:advance,y:t.y};advance+=f.getAdvanceWidth(ch,t.size);return r;});
 for(const c of chars){if(/[\ufe00-\ufe0f\u200d]/.test(c.ch))continue;let f=fonts[(c.ch.codePointAt(0)>255?'korean':'latin')+(bold?'Bold':'')];if(!f.charToGlyphIndex(c.ch))f=fonts.symbols;d+=f.charToGlyph(c.ch).getPath(c.x,c.y,t.size).toPathData(2);}
 return `<path id="${esc(t.text.slice(0,60))}" d="${d}" ${paint(t.color)}/>`;
}
function render(n){
 const s=n.style,w=n.w,h=n.h,m=n.m.join(' '),rx=Math.min(w/2,h/2,parseFloat(s.borderTopLeftRadius)||0);let own='';
 const rect=attrs=>`<rect width="${w}" height="${h}" rx="${rx}" ${attrs}/>`;
 if(rgba(s.backgroundColor).a>0)own+=rect(paint(s.backgroundColor));
 if(s.backgroundImage!=='none')for(const b of split(s.backgroundImage).reverse()){if(b.includes('gradient(')){const p=gradient(b,w,h);if(p)own+=rect(p);}}
 const bw=['Top','Right','Bottom','Left'].map(k=>parseFloat(s['border'+k+'Width'])||0);
 if(bw.every(v=>v===bw[0])&&bw[0]>0)own+=rect(`fill="none" ${paint(s.borderTopColor,'stroke')} stroke-width="${bw[0]}"`);
 else for(let i=0;i<4;i++){if(!bw[i])continue;const coords=[`x1="0" y1="0" x2="${w}" y2="0"`,`x1="${w}" y1="0" x2="${w}" y2="${h}"`,`x1="0" y1="${h}" x2="${w}" y2="${h}"`,`x1="0" y1="0" x2="0" y2="${h}"`][i];own+=`<line ${coords} ${paint(s['border'+['Top','Right','Bottom','Left'][i]+'Color'],'stroke')} stroke-width="${bw[i]}"/>`;}
 own+=n.texts.map(textPath).join('');
 let children=n.children.map(render).join('');
 if(n.svg){let svg=n.svg;for(const t of n.svgTexts){const f=fonts[(Array.from(t.text).some(c=>c.codePointAt(0)>255)?'korean':'latin')+(+t.weight>=600?'Bold':'')],p=f.getPath(t.text,0,0,t.size),b=p.getBoundingBox();const sx=t.w/(b.x2-b.x1||1),sy=t.h/(b.y2-b.y1||1);svg=svg.replace(new RegExp('<path data-outline="'+t.id+'"[^>]*>(?:</path>)?'),`<path d="${p.toPathData(2)}" transform="translate(${t.x-b.x1*sx} ${t.y-b.y1*sy}) scale(${sx} ${sy})" ${paint(t.color)}/>`);}children+=svg;}
 let content=`<g transform="matrix(${m})">${own}</g>${children}`;
 if(s.clipPath.startsWith('polygon')){const id='clip'+seq++,pts=split(s.clipPath.slice(8,-1)).map(p=>p.split(' ').map((v,i)=>parseFloat(v)*(v.endsWith('%')?(i?h:w)/100:1)).join(',')).join(' ');defs.push(`<clipPath id="${id}"><polygon points="${pts}" transform="matrix(${m})"/></clipPath>`);content=`<g clip-path="url(#${id})">${content}</g>`;}
 else if(s.overflowX==='hidden'||s.overflowY==='hidden'){const id='clip'+seq++;defs.push(`<clipPath id="${id}"><rect width="${w}" height="${h}" rx="${rx}" transform="matrix(${m})"/></clipPath>`);content=`<g clip-path="url(#${id})">${content}</g>`;}
 return `<g id="${esc(n.name)}" opacity="${s.opacity}">${content}</g>`;
}
fs.mkdirSync(path.join(root,'output'),{recursive:true});const manifest=[];
for(const [i,n] of data.sections.entries()){
 defs=[];const content=render(n),y=n.m[5],height=n.h;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${n.w}" height="${height}" viewBox="0 0 ${n.w} ${height}"><defs>${defs.join('')}</defs><g transform="translate(${-n.m[4]} ${-y})">${content}</g></svg>`;
 const name=String(i+1).padStart(2,'0')+'-'+n.name.replace(/[^\w-]/g,'-');fs.writeFileSync(path.join(root,'output',name+'.svg'),svg);manifest.push({name,y,height,file:name+'.svg',bytes:svg.length});
}
fs.writeFileSync(path.join(root,'output','manifest.json'),JSON.stringify(manifest,null,2));console.log(JSON.stringify(manifest));

