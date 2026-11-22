import*as F from'node:fs';
const S='01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414';
function run(p,q){
let D=new Int32Array(256),C=[],M=D.slice(),o=Buffer.alloc(65536),s=0,c=0,l=0,i=0,x=0,t=1e6,n=p.length;
let d=e=>[o.slice(0,l),e];
let A=[(e,b)=>e+b,(e,b)=>e-b,(e,b)=>Math.imul(e,b),(e,b)=>(e/b)|0,(e,b)=>e%b,(e,b)=>(e>>>0)/(b>>>0),(e,b)=>(e>>>0)%(b>>>0),0,(e,b)=>e&b,(e,b)=>e|b,(e,b)=>e^b,0,(e,b)=>e<<(b&31),(e,b)=>e>>(b&31),(e,b)=>e>>>(b&31),0,(e,b)=>+(e==b),(e,b)=>+(e<b),(e,b)=>+((e>>>0)<(b>>>0))];
for(;;){
if(--t<0)return d(10);
if(x<0|x>=n)return d(9);
let a=p[x];
let m=a==1?1:a==2?4:a>47&&a<52?2:0;
if(x+m>=n)return d(9);
let y=x+1+m,z=S.charCodeAt(a)-48;
if(s<z>>2)return d(2);
if(s-(z>>2)+(z&3)>256)return d(3);
x=y;
if(a<8){
if(a==0)return d(0);
if(a==1){D[s++]=p[y-1]<<24>>24;continue}
if(a==2){D[s++]=p[y-4]|p[y-3]<<8|(p[y-2]|p[y-1]<<8)<<16;continue}
if(a==3){s--;continue}
if(a==4||a==6){D[s]=D[s-1-(a>5)],s++;continue}
if(a==5){[D[s-1],D[s-2]]=[D[s-2],D[s-1]];continue}
[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];continue}
if(a>15&&a<35&&a!=31){
if(a==23||a==27){D[s-1]=a==23?-D[s-1]:~D[s-1];continue}
let b=D[s-1],e=D[s-2];
if(a>18&&a<23&&!b)return d(4);
D[s-2]=A[a-16](e,b);s--;continue}
if(a>47&&a<53){
let u=p[y-2]|p[y-1]<<8;
if(a>50){if(a==51){if(c==64)return d(7);C[c++]=y;x=u}else{if(!c)return d(8);x=C[--c]}continue}
if(a==48||(D[--s]==0)==(a==49))x=y+(u<<16>>16);
continue}
if(a>63&&a<66){let e=D[s-1];if(e&~255)return d(6);if(a<65)D[s-1]=M[e];else{M[e]=D[s-2];s-=2}continue}
if(a==80){let v=Buffer.from(''+D[--s]);if(l+v.length>65536)return d(11);o.set(v,l);l+=v.length;continue}
if(a==81){if(l>65535)return d(11);o[l++]=D[--s]&255;continue}
if(a==82){D[s++]=q[i++]??-1;continue}
return d(a==83?D[--s]&255:5)}}
let E=process.env,R=F.readFileSync,W=F.writeFileSync,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
for(let id of F.readdirSync(I)){
let r=run(R(I+'/'+id+'/program.bin'),R(I+'/'+id+'/input.bin'));
let e=O+'/'+id+'/';
F.mkdirSync(e,{recursive:true});
W(e+'stdout.bin',r[0]);
W(e+'exit.txt',r[1]+'\n')}
