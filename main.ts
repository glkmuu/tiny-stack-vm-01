import*as F from'fs';
const S='01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414';
function run(p,q){
let D=new Int32Array(256),C=[],M=D.slice(),o=Buffer.alloc(65536),s=0,c=0,l=0,i=0,x=0,t=1e6,n=p.length;
let d=e=>[o.slice(0,l),e];
for(;;){
if(--t<0)return d(10);
if(x>>>0>=n)return d(9);
let a=p[x],m=a>47&a<52?2:a==2?4:a==1,y=x+1+m;
if(y>n)return d(9);
let z=S.charCodeAt(a)-48;
if(s<z>>2)return d(2);
if(s-(z>>2)+(z&3)>256)return d(3);
x=y;
if(!a)return d(0);
if(a<8){
a<3?D[s++]=a==1?p[y-1]<<24>>24:p.readInt32LE(y-4):a==3?s--:a==4|a==6?(D[s]=D[s-1-(a>5)],s++):a==5?[D[s-1],D[s-2]]=[D[s-2],D[s-1]]:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
}else if(a>15&a<35&a!=31){
let b=D[s-1];
if(a>18&a<23&!b)return d(4);
if(a==23|a==27)D[s-1]=a<25?-D[s-1]:~D[s-1];
else{let e=D[s-2],u=e>>>0,v=b>>>0;D[s-2]=a<19?a==16?e+b:a==17?e-b:Math.imul(e,b):a<23?a==19?e/b:a==20?e%b:a==21?u/v:u%v:a<27?a==24?e&b:a==25?e|b:e^b:a<31?a==28?e<<b:a==29?e>>b:e>>>b:a==32?e==b:a==33?e<b:u<v;s--}
}else if(a>47&a<53){
let u=p.readInt16LE(y-2);
if(a<51){if(a==48||(D[--s]==0)==(a==49))x=y+u}
else if(a==51){if(c==64)return d(7);C[c++]=y;x=u&65535}
else{if(!c)return d(8);x=C[--c]}
}else if(a>63&a<66){
let e=D[s-1];
if(e>>>8)return d(6);
a<65?D[s-1]=M[e]:(M[e]=D[s-2],s-=2);
}else if(a==80){
let g=''+D[--s];
if(l+g.length>65536)return d(11);
l+=o.write(g,l);
}else if(a==81){
if(l>65535)return d(11);
o[l++]=D[--s]&255;
}else if(a==82)D[s++]=q[i++]??-1;
else return d(a==83?D[--s]&255:5);
}}
let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,R=F.readFileSync,W=F.writeFileSync;
for(let d of F.readdirSync(I)){let[o,e]=run(R(I+'/'+d+'/program.bin'),R(I+'/'+d+'/input.bin')),h=O+'/'+d+'/';F.mkdirSync(h,{recursive:!0});W(h+'stdout.bin',o);W(h+'exit.txt',e+'\n')}
