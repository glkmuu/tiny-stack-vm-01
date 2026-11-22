import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const S='01146:;?0000000099999995999599999990000000000000044000000000000058000000000000004414';
function run(p,q){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),s=0,c=0,l=0,i=0,x=0,t=0,n=p.length;
let d=e=>({o:o.slice(0,l),c:e});
for(;;){
if(t==1e6)return d(10);
if(x<0||x>=n)return d(9);
let a=p[x];
if(!(a<8||a>15&&a<35||a>47&&a<53||a>63&&a<66||a>79&&a<84))return d(5);
let m=a==1?1:a==2?4:a>47&&a<52?2:0;
if(x+m>=n)return d(9);
t++;
let y=x+1+m,z=S.charCodeAt(a)-48,po=z>>2,pu=z&3;
if(s<po)return d(2);
if(s-po+pu>256)return d(3);
x=y;
if(a<8){
if(a==0)return d(0);
if(a==1){D[s++]=(p[y-1]<<24)>>24;continue}
if(a==2){D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;continue}
if(a==3){s--;continue}
if(a==4){D[s]=D[s-1];s++;continue}
if(a==5){let v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;continue}
if(a==6){D[s]=D[s-2];s++;continue}
let v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;continue}
if(a>15&&a<35){
if(a==23){D[s-1]=-D[s-1];continue}
if(a==27){D[s-1]=~D[s-1];continue}
let b=D[s-1],e=D[s-2];
if(a==16)D[s-2]=e+b;
else if(a==17)D[s-2]=e-b;
else if(a==18)D[s-2]=Math.imul(e,b);
else if(a==19){if(!b)return d(4);D[s-2]=e==-2147483648&&b==-1?e:(e/b)|0}
else if(a==20){if(!b)return d(4);D[s-2]=b==-1?0:e%b}
else if(a==21){if(!b)return d(4);D[s-2]=(e>>>0)/(b>>>0)}
else if(a==22){if(!b)return d(4);D[s-2]=(e>>>0)%(b>>>0)}
else if(a==24)D[s-2]=e&b;
else if(a==25)D[s-2]=e|b;
else if(a==26)D[s-2]=e^b;
else if(a==28)D[s-2]=e<<(b&31);
else if(a==29)D[s-2]=e>>(b&31);
else if(a==30)D[s-2]=e>>>(b&31);
else if(a==32)D[s-2]=e==b?1:0;
else if(a==33)D[s-2]=e<b?1:0;
else D[s-2]=(e>>>0)<(b>>>0)?1:0;
s--;continue}
if(a>47&&a<53){
if(a==51){if(c==64)return d(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;continue}
if(a==52){if(!c)return d(8);x=C[--c];continue}
let r=((p[y-2]|p[y-1]<<8)<<16)>>16;
if(a==48){x=y+r;continue}
let v=D[--s];
if(a==49?v==0:v!=0)x=y+r;
continue}
if(a==64){let e=D[s-1];if(e<0||e>255)return d(6);D[s-1]=M[e];continue}
if(a==65){let e=D[s-1],v=D[s-2];if(e<0||e>255)return d(6);s-=2;M[e]=v;continue}
if(a==80){let v=String(D[s-1]);if(l+v.length>65536)return d(11);s--;for(let k=0;k<v.length;k++)o[l++]=v.charCodeAt(k);continue}
if(a==81){if(l+1>65536)return d(11);o[l++]=D[--s]&255;continue}
if(a==82){D[s++]=i<q.length?q[i++]:-1;continue}
return d(D[--s]&255)}}
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(let id of readdirSync(I).sort()){
let r=run(readFileSync(I+'/'+id+'/program.bin'),readFileSync(I+'/'+id+'/input.bin'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/stdout.bin',r.o);
writeFileSync(O+'/'+id+'/exit.txt',r.c+'\n')}
