import copy,json,math,re
from pathlib import Path
import xml.etree.ElementTree as E
ROOT=Path(__file__).parent/'output'
NS='http://www.w3.org/2000/svg'
E.register_namespace('',NS)
def mul(a,b):
 return [a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]]
I=[1,0,0,1,0,0]
def trans(t):
 m=I[:]
 for k,v in re.findall(r'(\w+)\(([^)]+)\)',t):
  a=list(map(float,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',v)))
  if k=='matrix':n=a
  elif k=='translate':n=[1,0,0,1,a[0],a[1] if len(a)>1 else 0]
  elif k=='scale':n=[a[0],0,0,a[1] if len(a)>1 else a[0],0,0]
  elif k=='rotate':
   r=math.radians(a[0]);n=[math.cos(r),math.sin(r),-math.sin(r),math.cos(r),0,0]
   if len(a)>2:n=mul(mul([1,0,0,1,a[1],a[2]],n),[1,0,0,1,-a[1],-a[2]])
  else:continue
  m=mul(m,n)
 return m
manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
for item in manifest:
 old=E.parse(ROOT/item['file']).getroot();out=E.Element('{'+NS+'}svg',dict(old.attrib));defs=old.find('{'+NS+'}defs')
 if defs is not None:out.append(copy.deepcopy(defs))
 def visit(e,m=I,opacity=1,style=None,isroot=False):
  tag=e.tag.rsplit('}',1)[-1]
  if tag in ['defs','clipPath','title','desc']:return
  style=dict(style or {})
  for k in ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','fill-rule','fill-opacity','stroke-opacity']:
   if k in e.attrib:style[k]=e.attrib[k]
  opacity*=float(e.get('opacity','1'));m=mul(m,trans(e.get('transform','')))
  if tag=='svg' and not isroot:
   x,y=float(e.get('x','0')),float(e.get('y','0'));v=list(map(float,e.get('viewBox','0 0 '+e.get('width','1')+' '+e.get('height','1')).split()))
   w,h=float(e.get('width',str(v[2]))),float(e.get('height',str(v[3])));sc=min(w/v[2],h/v[3]);m=mul(m,[sc,0,0,sc,x+(w-v[2]*sc)/2-v[0]*sc,y+(h-v[3]*sc)/2-v[1]*sc])
  if tag in ['g','svg']:
   for c in e:visit(c,m,opacity,style)
  else:
   n=copy.deepcopy(e)
   for k in ['class','style','clip-path','mask','transform']:n.attrib.pop(k,None)
   for k,v in style.items():n.set(k,v)
   n.set('transform','matrix('+' '.join(f'{a:.6f}' for a in m)+')');n.set('opacity',str(opacity));out.append(n)
 visit(old,isroot=True)
 item['flatFile']=item['file'].replace('.svg','-flat.svg');E.ElementTree(out).write(ROOT/item['flatFile'],encoding='utf-8',xml_declaration=True)
(ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Created',len(manifest),'flat SVGs with frame-level vector shapes.')
