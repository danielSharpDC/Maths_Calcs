// Code pour la calculatrice pour mathématiques
// Recupération des zones d'affichage 
var ecran=document.getElementById("ecran");
var ecran2=document.getElementById("ecran2");
// On recupère tous les boutons
var btn=document.getElementsByTagName("button"),
tab=new Array(),	// Tableau de ce que l'utilisateur voit
t=new Array();	// Tableau des résultats temporaires
t[0]=tab[0]="null";	// Initialisation du tableau
var y=0, x=0, s, r, c=0;	// Ces variables nous permet de déterminer les fonctions exécutés
// On initialise les écrans
ecran.value="";	// Ecran supérieur
ecran2.value="0";	// Ecran inférieur
// Fonction permettant d'afficher un nombre à l'écran
function nbr(n){
	if(y==5){	// S'il y'a eu élévation au carré
		if(x==3){	// et S'il y'a eu exécution de la fonction puissance
			ecran2.value=n+'';
			y=0;
			x=0;
		}else{
			ecran2.value=n+"";
			y=0;
		}
	}else if(x==3){	// S'il y'a eu exécution de la fonction puissance
			ecran2.value=n+'';
			r=parseFloat(n);
			y=0;
			x=0;
	}else{
			if(ecran2.value=="0"){
				ecran2.value=n+"";
			}else{
				ecran2.value+=n+"";
			}
	}
 
}

 function sinus(){
	fonctU("sin");
}
// Fonction élever au carré
function square(){
 	var s=parseFloat(ecran2.value); 
	ecran.value+=s+"^"+2;
	ecran2.value=s*s;
	tab.push(s+"^"+2);	// On ajoute ce que l'utilisateur voit dans le tableau tab
	t.push(ecran2.value);	// On ajoute le résultat dans le tableau t
	x=2;	// Souvenez vous de ça (signifie qu'on a fait appel à une fonction mathématique unaire)
	document.getElementById("hist").innerHTML+=s+"^"+2+"="+ecran2.value+"</br>";
}
// fonction x puissance y
function powxy(){
 	s=parseFloat(ecran2.value); 
	ecran.value+=s+"^";	// On ajoute le symbole puissance à l'écran
	ecran2.value="0";
	tab.push(s+"^");	// On ajoute ce que l'utilisateur voit dans le tableau
	t.push(ecran2.value);	// On ajoute 
	x=3;	// Souvenez vous de ça
	c=1;	// Souvenez vous de ça
}

function asinus(){
	fonctU("asin");
}
 function cosnus(){
	fonctU("cos");
}

function acosnus(){
	fonctU("acos");
}

 function tangente(){
	fonctU("tan");
}

function atangente(){
	fonctU("atan");
}


var sin=document.getElementById("sin"),
cos=document.getElementById("cos"),
tan=document.getElementById("tan"),
x2=document.getElementById("x2"),
xy=document.getElementById("xy"),
asin=document.getElementById("asin");
asin.style.display="none"; 	
xy.addEventListener("click", powxy, false);
x2.addEventListener("click", square, false);
sin.addEventListener("click", sinus, false);
cos.addEventListener("click", cosnus, false);
tan.addEventListener("click", tangente, false);

// Lorsqu'on clique sur seconde fonction
function second(){
	if(btn[11].innerHTML=="↓"){
		btn[11] .innerHTML="↑";
	    btn[11].style.background="#c0c0c0";
		btn[11] .style.color="black";
	    sin.innerHTML="sin";
	    cos.innerHTML="cos";
	    tan.innerHTML="tan";
	    sin.removeEventListener("click", asinus, false);
	 	sin.addEventListener("click", sinus, false);
	 	cos.removeEventListener("click", acosnus, false);
	 	cos.addEventListener("click", cosnus, false);
	 	tan.removeEventListener("click", atangente, false);
	 	tan.addEventListener("click", tangente, false);
	}else{
		btn[11].innerHTML="↓";
		sin.innerHTML="sin-1";
		cos.innerHTML="cos-1";
	    tan.innerHTML="tan-1";
		sin.removeEventListener("click", sinus, false);
	 	sin.addEventListener("click", asinus, false); 	
	 	cos.removeEventListener("click", cosnus, false);
	 	cos.addEventListener("click", acosnus, false);
	 	tan.removeEventListener("click", tangente, false);
	 	tan.addEventListener("click", atangente, false);
		 btn[11].style.background="rgba(42,16,140,1)";
		 btn[11].style.color="white";
	}
}
// Lorsque qu'on desactive seconde fonction
function first(){
	btn[10].innerHTML="↑";
	btn[10].onclick=second;
}
// Fonction pour les parenthèses
function brack(b){
	if(b=="("){
		ecran.value+=b+"";
		ecran2.value="0";
	}else{			
		ecran.value+=ecran2.value+b+"";
		ecran2.value="";
	}
}
// Fonction effectuant les calculs arithmétiques avec en paramètre l'opérateur			
function arith(o){
	if(ecran.value==''){	//	Si l'écran supérieur est vide 
		ecran.value+=ecran2.value+""+o;
		ecran2.value="0";
	}else{
		 var compt=0, res=ecran.value;
		 for(var j=1; j <=tab.length-1; j++){
			if(res.indexOf(tab[j])!=-1){	// Si l'écran supérieur contient des symboles
				compt+=1;
			}
		}
		if(compt>0){
			if(x==2){	// Si on viens de faire appel à une fonction mathématique unaire
				ecran.value+=o;
				ecran2.value="0";
				y=5;	// Souvenez vous de ça
				x=0;	// On reintialise x
				
			}else{
				ecran.value+= ecran2.value+o;
				ecran2.value="0";
			}
		}else{
			ecran.value+=ecran2.value+o;
			ecran2.value="0";
		}
	}

}
// Fonction exécuté lors du clique sur le bouton egale
function equal(){
	var res;	// Cette variable doit contenir l'expression à évaluer
	if(ecran2.value!=""&&ecran2.value!="0"){
		res=ecran.value;
		res=res.replace("×", "*");
		res=res.replace("÷", "/");
		var compt=0;
		
		if(c==1){	// S'il ya le symbole puissance
			var a=res.indexOf('^'), l=s+'', m=r+'';
			var f=l.length, g=m.length;
			var sub=res.substring(a-f, a+g);
			res=res.replace(sub, eval(Math.pow(s, r)));
			ecran2.value=res;
			document.getElementById("hist").innerHTML+=s+"^"+r+"="+res+"</br>";
			ecran.value="";
			x=0;
			c=0;
			res="";
			return 0;
		}

		for(var j=1; j <=tab.length-1; j++){
			if(res.indexOf(tab[j])!=-1){
				compt+=1;
			}
		}

		if(compt>0){
			for(var i=1; i <=tab.length-1; i++){
				res=res.replace(tab[i], t[i]);
			}
			if(x<2){
				 res+=ecran2.value+"";
				 y=0;
			}
		}else{
			
			   res+=ecran2.value+"";
		}
	}else{
		res=ecran.value+"0";
	    res=res.replace("×", "*");
		res=res.replace("÷", "/");
		for(var i=1; i<=tab.length-1; i++){
			res=res.replace(tab[i], t[i]);
		}
	}
	try{
		ecran2.value=eval(res)+"";
		ecran.value="";
		res=res.replace("*", "×");
		res=res.replace("/", "÷");
		 for(var i= tab.length-1; i>=1; i--){
			res=res.replace(t[i], tab[i]);
		}
		document.getElementById("hist").innerHTML+=res+"="+ecran2.value+"</br>";
		tab.splice(1, tab.length-1);
	    t.splice(1, t.length-1);
	}catch(e){
		ecran2.value="Error : "+e;
	}
}
// Au clique sur le Bouton effacer ecran inférieur
btn[12].onclick=function(){
	ecran2.value="0";
};
// Au clique sur le Bouton effacer tous les écrans
btn[13].onclick=function(){
	ecran2.value="0";
	ecran.value="";
};
// Au clique sur le bouton effacer précédent
btn[14].onclick=function(){
	var cop=ecran2.value;
	ecran2.value=cop.substring(0, cop.length-1);
};
// Fonction mathématiques unaire
function fonctU(f){
	var val= f+"("+ecran2.value+")";
	var fo="Math."+val, temp=ecran.value; 
	ecran.value+=val;
	ecran2.value=eval(fo);
	tab.push(val);
	t.push(ecran2.value); 
	x=2;	// Souvenez vous de ça (signifie qu'on a fait appel à une fonction mathématique unaire)
	document.getElementById("hist").innerHTML+=val+"="+ecran2.value+"</br>";
}