$(document).ready (function(){

	var numCorrect = 0;
    	var currentQuestion = 0;

 $(".quiz-wrapper").css("display", "block");

$(".start").css("display","none");


var Bartender = function () 
{

	this.ObjQuestion = [{
		question: "1. Do ye like yer drinks strong?", 
	     Taste:"strong"

		},
		{
		question:"2.Do ye like it with a salty tang?",
		  Taste: "salty"
		
		},
		{
		question:"3.Are ye a lubber who likes it bitter?",
	  	Taste:"bitter"
		 
		},
		{
		question:"4. Would ye like a bit of sweetness with yer poison?",
	      	Taste: "sweet"
		 
		},
		{ 
		question:"5. Are ye one for a fruity finish?",
	     	Taste: "fruit"
		 

		}]
     this.userPreferences=[];
     this.CurrentQues =null;

	}

Bartender.prototype.createDrink =function (pantryobj) { 
   var Objprop ;
   this.PreparedDrink =[];


		var DrinkIngredeint="";

		var count =pantryobj.ingredients.length
		for ( i=0;i<Objbartender.userPreferences.length;i++)
		 {
		 	for (j=0;j<count;j++) {
		           if(this.userPreferences[i] == pantryobj.ingredients[j].category) {
		  
		                           this.PreparedDrink.push( pantryobj.ingredients[j].name);
		           }

		      }
		         DrinkIngredeint += this.PreparedDrink[Math.floor(Math.random() * this.PreparedDrink.length)] + "  "; 

		      console.log(this.PreparedDrink);
		      console.log(DrinkIngredeint);

		     // console.log("This is " + finaldrink);
		    }

		    Objbartender.DrinkIngredeint = DrinkIngredeint;  
}


function Ingredient(name, category){
  this.name = name;
  this.category = category;
}

	var Pantry = function(ingredients) {
            this.ingredients =ingredients;
	    }
var myPantry = new Pantry(
  [
  //adding two at once.
    new Ingredient('glug of Rum', 'strong'),
    new Ingredient('slug of Whiskey', 'strong'),
    new Ingredient('splash of Gin', 'strong'),
    new Ingredient('olive on a stick', 'salty'),
    new Ingredient('salt-dusted rim', 'salty'),
    new Ingredient('rasher of bacon', 'salty'),
    new Ingredient('shake of bitters', 'bitter'),
    new Ingredient('splash of tonic', 'bitter'),
    new Ingredient('twist of lemon peel', 'bitter'),
    new Ingredient('sugar cube', 'sweet'),
    new Ingredient('spoonful of honey', 'sweet'),
    new Ingredient('splash of Cola', 'sweet'),
    new Ingredient('slick of orange', 'fruity'),
    new Ingredient('dash of cassis', 'sweet'),
    new Ingredient('cherry on top', 'sweet')
  ]
);



var Objbartender = new Bartender();

//View//
function View() {
    this.btn = $('.nextBtn');
    this.resetbtn =$('.res');
    this.onClick = null;
    this.resetClick =null;
    this.resetbtn.click(this.resetview.bind(this));
    this.btn.click(this.nextQuestion.bind(this));


};

View.prototype.resetview=function() {
  this.resetClick();
};


View.prototype.nextQuestion =function() {

    var radioSelect = $('input:radio[name=answer]:checked').val();
    this.onClick(radioSelect);

}
View.prototype.render = function(display,htmldis,data){
		 var htmlTodisplay = this.htmllog.call(data,htmldis);
		 if(htmlTodisplay) {
		       $(display).html(htmlTodisplay);
		 }
		 else {
		  	 $(display).html(data);
		 }
};


View.prototype.htmllog = function(htmldis){

	 
	if (htmldis == "question") 
	{
	return `

	<form id="quiz">
		<h3>${this.Question}</h3>
		<p class="summary"></p>
		<p><input type="radio" name="answer" value="Yes" id="answerOne" value="0"> a. Yes <label for="answerOne" id="answer"></label></p>
	   <p><input type="radio" name="answer" value ="no" id="answerTwo" value="1"> b.  No<label for="answerTwo" id="answer"></label></p>
	  	</form>` 
		}
	else   {
	     
	     	 $(".quiz-wrapper").css("display", "none");
			 $(".results").css("display", "block");
		
		     return

	        }


};
// Model(Object or data) Enhancement for MVC

Bartender.prototype.StartQuiz=function() {
	 this.CurrentQues =0;
	//alert("minesh");
	var Ques = this.ObjQuestion[this.CurrentQues];
	console.log(Ques);
	var Question,category;
	return {
	           Question : Ques.question,
	            category : Ques.Taste

          };
};


Bartender.prototype.NextQuestion=function() {
    if(this.CurrentQues < 4) {
     this.CurrentQues++;
			 var Ques = this.ObjQuestion[this.CurrentQues];
			   console.log("nextquestion" + Ques);
			   var Question,category;
			  return {
			           Question : Ques.question,
			            category : Ques.Taste

			    };
      }
      return;

 };
 

//*****Main controller ****////

var Controller = function(model,view){
  //when contoller initialized bind these objects and events
	this.model =model;
	this.view=view;
    this.view.onClick = this.NextDisplayQUestion.bind(this);
    this.view.resetClick =this.resetform.bind(this);
};

Controller.prototype.resetform =function() {
       location.reload(true);
//	alert("reset i pressed");
}

Controller.prototype.NextDisplayQUestion = function(radioSelect) {
         
          if (radioSelect =="Yes") {
             //we are allowed to manupulate the model in a controller
             this.model.userPreferences.push(this.model.ObjQuestion[this.model.CurrentQues].Taste);         
            }

            var data = this.model.NextQuestion()
          if(data) {

                this.view.render('.quiz-wrapper', 'question',data); 
            }
   else {      
          
               this.model.createDrink(myPantry);
               console.log("No drink Selected     " +     this.model.DrinkIngredeint);
               if(this.model.DrinkIngredeint=="") {
                   
                     this.model.DrinkIngredeint =" No Drink Preference Selected"

               }
               this.view.render('#amountRight','serve',this.model.DrinkIngredeint);
        }
}

   Controller.prototype.init = function() {
       console.log("I am here");
     if (this.model.CurrentQues==null) {
         var data = this.model.StartQuiz();
         console.log("data:this" + data.Question);
          this.view.render('.quiz-wrapper', 'question',data); 
      }
   };

  var view = new View();
  var ctrl = new Controller(Objbartender,view);



$(function(){
     ctrl.init(); //Populate the first question by itself.
});


});




