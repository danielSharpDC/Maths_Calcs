// Code pour la calculatrice graphique
// avant-propos :
// Nous travaillons dans un repère 2D avec pour origine le coin supérieur gauche de la zone d'affichage
// Donc il est important de faire une translation de l'origine vers le centre de la zone
// Voir cours de Mathématique du lycéé
// Fin avant-propos
// récupération des éléments pour le graphique 
var area=document.querySelector("#area");
area.style.overflow="auto";
var w=512, h=32;	// w est la taille du quadrillage et h est 
var context=area.getContext("2d");

btn=document.querySelector("#btn");
rel=document.querySelector("#rel");
// Fonction permettant d'afficher le quadrillage avec pour paramêtre l'espace entre 2 lignes
function quadrillage(u){	// Il s'agit enfaite d'une matrice
	context.lineWidth="0.3";	// Epaisseur des lignes du quadrillage
	context.beginPath();	// Commencer le dessin
	for(var i=0; i<=w; i++){	// boucle pour parcourir horizontalement
		if(parseInt(i)%u==0){	// si i est est multiple de u alors on trace la li
			for(var j=0; j<=w; j++){	// boucle pour parcourir verticalement
				if(parseInt(j)%u==0){	// si j est multiple de u, alors on verouille le point i et 
					context.lineTo(i,j);	// on trace la ligne verticale puis
					context.moveTo(i+u,j+u);	// on passe à la ligne suivante à une unité graphique
				}
			}	
		}
	}
	context.stroke();	// on a fini le dessin
}
// L'origine du repère
function Origine(){
	this.X=w/2;
	this.Y=w/2;
}
// class Repere avec pour paramêtre le point d'origine et l'unité graphique
function Repere(O,u){
	this.U=u;
	this.abscisse=function(){	// Méthode permettant de créer l'axe des abscisses
		context.lineWidth="1";	// Largeur de la ligne
		context.beginPath();	// Dessin de l'axe
		var i=-u, k=-h/8+1;	// k est le texte affiché dans le repère (Remarque: k=-3)
		while(i<=w){
			context.lineTo(i+u,O.Y);
			if(parseInt(i)%u==0){
				context.font="10px callibri";	// police des graduations
				context.fillText(k,i+2*u,O.Y+u/4);	// affichage des nombres dans le repère
				k++;
			}
		i+=1;
		}
		context.stroke();
	};

	this.ordonne=function(){ // Méthode pour l'axe des ordonnées
		context.lineWidth="1";
		var i=-u,k=h/8-1;
		context.beginPath();
		while(i<=w){
			context.lineTo(O.X,i+u);
			if(parseInt(i)%u==0){
				context.font="10px callibri";
				context.fillText(k,O.X-u/4,i+2*u);
				k--;
			}
			i+=1;
		}
		context.stroke();
	};
}
// Fonction qui retourne l'image d'un nombre par la fonction entrée
function f(x){
	var enter=document.querySelector("#enter").value; // recupération de la fonction entrée
	var tab=new Array("exp(","cos(","sin(","tan(","atan(","acos(","asin(","cosh(","sinh(","tanh(","acosh(","asinh(","atanh(","log(","sqrt("), t=new Array("+","-","*","/"); 
	
	for(var i=0;i<=tab.length-1;i++){
		if(enter.indexOf(tab[i])!=-1){	// Si la fonction entrée contient une fonction mathématique usuel
			enter="Math."+enter;
		}
	}
	return eval(enter);	// on retourne l'évaluation
}

// Fonction qui trace le graphe de la fonction
function graphe(O,u){
	i=-w/u;
	context.strokeStyle="rgba(42,16,140,1)";	// Couleur du graphe
	context.lineWidth="2";	//	Largeur de la ligne du graphe
	context.beginPath(); 	// On commence le traçage
	
	while(i<(w/u)){
		var a=((-f(i)*u+O.Y));	// On calcul l'image pour chaque i puis on multiplie par l'unité graphique et on fais la translation dans le nouveau repère. 
		context.lineTo(i*u+O.X,a);	// On place le point apartenant au graphe
		i+=0.01;	// On incrémente i
	}
	context.stroke();
}
//exécution.....
var O=new Origine(), rep=new Repere(O,64);

quadrillage(32);
rep.abscisse();
rep.ordonne();

btn.onclick=function (){
	graphe(O,64);
};
rel.onclick=function(){
	context.clearRect(0,0,w,w);
	context.lineWidth="1";
	context.strokeStyle="rgba(0,0,0,1)";
	quadrillage(32);
	rep.abscisse();
	rep.ordonne();
};
