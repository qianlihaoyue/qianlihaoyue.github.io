document.onselectstart = new Function("return false");
O    = new Array();
box  = 0;
img  = 0;
txt  = 0;
tit  = 0;
W    = 0;
H    = 0;
nI   = 0;
sel  = 0;
si   = 0;
ZOOM = 0;
rImg = 0;
//////////////////
speed = .06; // animation speed
delay = .5; // 1 = no delay
//////////////////

function dText(){
	txt.style.textAlign = tit.style.textAlign = (sel<ni 2)?"left":"right"; txt.innerhtml="O[sel].tx;" tit.innerhtml="O[sel].ti;" } function cobj(n, s, x, tx, ti){ this.n="n;" this.dim="s;" this.tx="tx;" this.ti="ti;" this.is="img[n];" this.vz="0;" this.sx="0;" this.x0="x;" this.x1="0;" this.zo="0;" this.over="function()" { with(this){ if(n!="sel){" o[sel].dim="100;" o[n].dim="ZOOM" * 100; sel="n;" l="0;" for(k="0;" k<ni; k++){ o[k].x0="l;" +="O[k].dim;" = ""; settimeout("dtext()", 32); this.anim="function" () vz="speed*(vz+(x1-sx)*delay);" x1 -="vz;" sx="(n==0)?0:O[n-1].x0+O[n-1].dim;" zo w="zo*si;" is.style.left="Math.round(l)+'px';" is.style.top="Math.round((H-w*rImg)*.5)+'px';" is.style.width="Math.round(w)+'px';" is.style.height="Math.round(w*rImg)+'px';" if(sel="=" n){ if(sel<ni*.5) tit.style.left="txt.style.left" math.round(l+w+6)+'px'; else math.round(l-(nx*.25)-6)+'px'; txt.style.top="Math.round(-(w*rImg)*.25)+'px';" tit.style.top="Math.round((w*rImg)*.33)+'px';" run(){ for(j in o)o[j].anim(); settimeout("run()", 16); doresize(){ tit.style.width="Math.round(nx*.25)+'px';" txt.style.width="Math.round(nx*.25)+'px';" tit.style.fontsize="(nx/30)+'px';" txt.style.fontsize="(nx/70)+'px';" with(box.style){ width="Math.round(W)+'px';" height="Math.round(H)+'px';" left="Math.round(nx/2-W/2)+'px';" top="Math.round(ny/2-H/2)+'px';" resize(){ nx="scr.offsetWidth;" ny="scr.offsetHeight;" si="(W-((nI+1)*6))/((ZOOM*100)+((nI-1)*100));" h="(100*si*rImg)+14;" doresize(); onresize="resize;" onload="function(){" scr="document.getElementById("screen");" box="document.getElementById("box");" tit="document.getElementById("tit");" txt="document.getElementById("txt");" img="box.getElementsByTagName("img");" lnk="document.getElementById("lnk").getElementsByTagName("a");" ni="img.length;" zoom="nI;" rimg="img[0].height/img[0].width;" resize(); s="ZOOM" x="0;" for(i="0;" i<ni; i++) var t="img[i].alt;" if(lnk[i].href! ) t+="<br><a href="" +lnk[i].href+'">'+Lnk[i].innerHTML+'';
		O[i] = new CObj(i, s, x, t, img[i].title);
		img[i].alt = "";
		img[i].title = "";
		img[i].onmousedown = new Function("return false;");
		img[i].onmouseover = new Function('O['+i+'].over();');
		if(Lnk[i].href!=""){
			/* ==== hyperlink ==== */
			img[i].onclick = new Function('window.open("'+Lnk[i].href+'","_blank");');
		}
		x += s;
		s = 100;
	}
	box.style.visibility = "visible";
	run();
}</ni>