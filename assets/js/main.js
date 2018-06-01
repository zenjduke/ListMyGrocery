// Initialize Firebase
var config = {
  apiKey: "AIzaSyAv4LEtQLVpVXB-gGFVPR1F4sLAUEc3-jA",
  authDomain: "team-awesome-recipe2list.firebaseapp.com",
  databaseURL: "https://team-awesome-recipe2list.firebaseio.com",
  projectId: "team-awesome-recipe2list",
  storageBucket: "team-awesome-recipe2list.appspot.com",
  messagingSenderId: "1046269523078"
};

firebase.initializeApp(config);

var database = firebase.database();

//menu

function openLeftMenu() {
    document.getElementById("leftMenu").style.display = "block";
}
function closeLeftMenu() {
    document.getElementById("leftMenu").style.display = "none";
}
function openRightMenu() {
    document.getElementById("rightMenu").style.display = "block";
}
function closeRightMenu() {
    document.getElementById("rightMenu").style.display = "none";
}


//-------------listIngredients function dumps API ingredients into Array and Object below. They ingreidentArray appears on the page.

// ** ingredientArray as "1 tps sugar" ///// ingredientObject lists unit, amount and name in separate arrays ie. amount (1), unit (tps), and name (sugar). 
var masterList = [];

var masterObject = {
  amount: [],
  unit: [],
  name: [],
}

var ingredientArray = [];

var ingredientObject = {
  amount: [],
  unit: [],
  name: [],
}

// ---------myIngredient OBJECT For Added Recipes
var myIngredientObject = {
  amount: [],
  unit: [],
  name: [] 
};

var myIngredients = [];

// ---------RecipeAPP OBJECT

var recipeApp = {

    // ----- RECIPE INFORMATION MODAL 
    openRecipeSearch: function(){
        
    
      // Get the modal
      var modal = document.getElementById('mySearchModal');
  
      // Get the button that opens the modal
      var btn = document.getElementById("complexSearch");

      // Get the search button that closes the modal
      var closebtn = document.getElementById("recipe-search");
  
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("searchClose")[0];
  
      // When the user clicks on the button, open the modal 
  
      modal.style.display = "block";
      
  
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }

      closebtn.onclick = function() {
        modal.style.display = "none";
      }
  
      // When the user clicks anywhere outside of the modal, close it
      
      if (event.target == modal) {
            modal.style.display = "none";
          }
          console.log("made it x 2");
      
    },

    openAddRecipe: function(){
      // ------------- RECIPE INFORMATION MODAL 
  
    // Get the modal
    var modal = document.getElementById('yourRecipeModal');

    console.log("made it");

    // Get the button that opens the modal
    var btn = document.getElementById("addRecipeButton");

    // Get the search button that closes the modal
    var closebtn = document.getElementById("add-recipe-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("addClose")[0];

    // When the user clicks on the button, open the modal 

    modal.style.display = "block";
    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    closebtn.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    
    if (event.target == modal) {
          modal.style.display = "none";
        }
        console.log("made it x 2");
    
  },

    openIngredientSearch: function(){
      // ------------- RECIPE INFORMATION MODAL 
    // Get the modal
    var modal = document.getElementById('myIngredientModal');

    console.log("made it");

    // Get the button that opens the modal
    var btn = document.getElementById("ingredientSearch");

    // Get the button that closes the modal
    var closebtn = document.getElementById("ingredient-search");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("ingredientClose")[0];

    // When the user clicks on the button, open the modal 

    modal.style.display = "block";
    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

     // When the user clicks on <span> (x), close the modal
     closebtn.onclick = function() {
      modal.style.display = "none";
  }

    // When the user clicks anywhere outside of the modal, close it
    
    if (event.target == modal) {
          modal.style.display = "none";
        }
        console.log("made it x 2");
    
  },

    openNutritionResults: function(){
      // ------------- RECIPE INFORMATION MODAL 
    
    // Get the modal
    var modal = document.getElementById('myNutritionModal');

    // Get the button that opens the modal
    var btn = document.getElementById("nutritionSearch");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("nutritionClose")[0];

    // When the user clicks on the button, open the modal 

    modal.style.display = "block";
    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        $(".nutrition-header").empty();
        $(".nutrition-body").empty();
    }

    // When the user clicks anywhere outside of the modal, close it
    
    if (event.target == modal) {
          modal.style.display = "none";
        }
    
    },

     // ----- USER ADDED RECIPES MODAL 
     showUserAddedRecipes: function(){
    
      // Get the modal
      var modal = document.getElementById('addedRecipesModal');
  
      // Get the button that opens the modal
      var btn = document.getElementById("addedRecipes");
  
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("addedRecipesClose")[0];
  
      // When the user clicks on the button, open the modal 
  
      modal.style.display = "block";
      
  
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }

      closebtn.onclick = function() {
        modal.style.display = "none";
      }
  
      // When the user clicks anywhere outside of the modal, close it
      
      if (event.target == modal) {
            modal.style.display = "none";
          }
          console.log("showing recipes added by user");
      
    },

      // listIngredients will create buttons from ingredientArray, or buttons for eahc ingredient in one clicked recipe. From here, user can choose what needs to be added to their personal list. (And possibly change amounts?)

    listIngredients: function(){
  
      // Looping through the array of topics
      for (var i = 0; i < ingredientArray.length; i++) {
    
        var ingredientItem = $("<button>").attr("id", "ingredient-item").attr("ingredient-name", ingredientObject.name[i]).attr("ingredient-unit", ingredientObject.unit[i]).attr("ingredient-amount", ingredientObject.amount[i]);

        ingredientItem.text(ingredientArray[i]).addClass("w3-btn").attr("ingredient-full", ingredientArray[i]);
        
      // Adding the button to the buttons-view div
      $("#ingredient-view").append(ingredientItem);
      }
      
    },
 
    learnMore: function() {

      // ------------- RECIPE INFORMATION MODAL 
  
    // Get the modal
    var modal = document.getElementById('myModal');

    console.log("made it");

    // Get the button that opens the modal
    var btn = document.getElementById("learn-more");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 

    modal.style.display = "block";

    var addAll = document.getElementById("add-all");
    
    addAll.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    
    if (event.target == modal) {
          modal.style.display = "none";
        }
        console.log("made it x 2");
    },

    searchRecipeComplex: function(){

      // Searching 20 recipes from search input

      var searchedFood = $("#food-input").val().trim();

      var d = document.getElementById("dietType");
      var diet = d.options[d.selectedIndex].value;
      // Pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.

      // var cuisine = $("#cuisine-input").val().trim();

      // One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american. 

      var exclusions = $("#exclude-input").val().trim();
      // A comma-separated list of ingredients or ingredient types that must not be contained in the recipes.

      var selected = [];
      $('.intolerances input:checked').each(function() {
      selected.push($(this).val());
      });

      var intolerances = selected.join(",");
      
      // Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.

      var m = document.getElementById("mealType");
      var mealType = m.options[m.selectedIndex].value;
      //One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.

      console.log(searchedFood);
      console.log(intolerances);
      // console.log(cuisine);
      console.log(diet);
      console.log(exclusions);
      console.log(mealType);

      $.ajax({
        url:"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet="+diet+"&excludeIngredients="+exclusions+"&instructionsRequired=true&intolerances="+intolerances+"&limitLicense=false&number=18&offset=0&query="+searchedFood+"&type="+mealType,
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("X-Mashape-Key", "LrkalLNxQhmshrafGm4A9Ku2Q0Erp1NXSbIjsnfduvX2Pmrre8");
        },
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
        },
        error: function(){
          console.log("Cannot get data");
        }
      })
      
      .then(function(response) {
    
        var recipeList = response.results;
        
      
        console.log(recipeList);

      for (var i = 0; i < recipeList.length; i++) {

          // Creating a w3 cards for recipe photo and title
          var recipeID = recipeList[i].id;
          console.log(recipeID);

          var image = recipeList[i].image;
          imageType = image.split(".");
          fileType = imageType[1];
          
          console.log(fileType);

          
          var recipeContainer = $("<div>").addClass("w3-card-4").addClass("recipe");

          // Storing the result title
          var title = recipeList[i].title;

	        var recipeTextBlock = $("<span>").addClass("w3-container w3-pale-red").addClass("recipeTextBlock");

          var learnMoreBtn = $("<button>").attr("id", "learn-more").text("Learn more").addClass("w3-button w3-hover-red w3-display-bottomright w3-small w3-black learnMore").attr("recipeID", recipeID);

          // Creating a paragraph tag with the result recipe's title
          var h = $("<h4>").text(title);

          // Creating an image tag
          var recipeImage = $("<img>").addClass("recipeImage");

          // Giving the image tag an src attribute of a proprty pulled off the result recipe
          recipeImage.attr("src", "https://spoonacular.com/recipeImages/"+recipeID+"-312x231."+fileType);
          
          recipeTextBlock.append(h);
          //recipeTextBlock.append(learnMoreBtn);
          recipeContainer.prepend(recipeTextBlock);
          recipeContainer.append(learnMoreBtn);
          recipeContainer.append(recipeImage);


          // Prepending the recipeContainer to the "#recipes-appear-here" div in the HTML
          $("#recipe-view").append(recipeContainer);
        }

      })
    },


    searchByIngredients: function(){
      // Searching 20 recipes from search input

      var ingredients = $("#ingredient-input").val().trim();
      //A comma-separated list of ingredients that the recipes should contain.
 

      $.ajax({
          url:"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+ingredients+"&limitLicense=false&number=18&ranking=1",
          // Ranking = Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
          beforeSend: function(xhr) { 
            xhr.setRequestHeader("X-Mashape-Key", "LrkalLNxQhmshrafGm4A9Ku2Q0Erp1NXSbIjsnfduvX2Pmrre8");
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          success: function (data) {
            console.log(data);
          },
          error: function(){
            console.log("Cannot get data");
          }
        })
    
      .then(function(response) {

        console.log(response);
        // var recipes = response.filter(recipe => recipe.spoonacularScore > 75);
        // console.log(recipes);

        var recipeList = response;

      for (var i = 0; i < recipeList.length; i++) {

      if (recipeList[i].title !== "Lavash") {

       var recipeID = response[i].id;
          
       console.log(recipeID);

       var image = response[i].image;
       imageType = image.split(".");
       fileType = imageType[2];
       
       console.log(fileType);

       var recipeContainer = $("<div>").addClass("w3-card-4").addClass("recipe").attr("recipeID", recipeID);

       // Storing the result item's rating
       var title = recipeList[i].title;

       var recipeTextBlock = $("<span>").addClass("w3-container w3-pale-blue").addClass("recipeTextBlock");

       var learnMoreBtn = $("<button>").attr("id", "learn-more").text("Learn more").addClass("w3-button w3-hover-red w3-display-bottomright w3-small w3-black learnMore").attr("recipeID", recipeID);

       // Creating a paragraph tag with the result item's rating
       var h = $("<p>").text(title);

       // Creating an image tag
       var recipeImage = $("<img>").addClass("recipeImage");

       // Giving the image tag an src attribute of a proprty pulled off the result item
       recipeImage.attr("src", "https://spoonacular.com/recipeImages/"+recipeID+"-312x231."+fileType);

       // Appending the paragraph and personImage we created to the "recipeContainer" div we created
       recipeTextBlock.append(h);
       //recipeTextBlock.append(learnMoreBtn);
	     recipeContainer.prepend(recipeTextBlock);
	     recipeContainer.append(learnMoreBtn);
       recipeContainer.append(recipeImage);

       // Prepending the recipeContainer to the "#recipes-appear-here" div in the HTML
       $("#recipe-view").append(recipeContainer);
          }
        else 
        console.log("HELP");}
        })
       },

       nutritionSearch: function() {

          var searchedNutrition = $(".nutrition-input").val().trim();
      
          console.log(searchedNutrition);
      
          // Constructing a recipeQuery for the RECIPE SEARCH feature
          var nutritionQuery = "https://api.edamam.com/api/nutrition-data?&app_id=dd8b998e&app_key=e728ac0838caa165f2400074d1072016&ingr=" + searchedNutrition;
      
          console.log(nutritionQuery);
                  
          // Performing an AJAX request with the nutritionQuery
            $.ajax({
              url: "https://api.edamam.com/api/nutrition-data?app_id=dd8b998e&app_key=e728ac0838caa165f2400074d1072016&ingr=" + searchedNutrition,
      
                type: "GET",
                dataType: "json",
                contentType: "application/json",
      
                error: function(){
                  console.log("Cannot get data");
                }
              })
              
              .then(function(response) {
        
                console.log(response);
                
                // var nutritionTitle = $("<h1>").text(searchedNutrition);
                var nutritionTitle = $("<h1>").text("1 large egg");

                 $("#nutrition-header").append(nutritionTitle);

                 var calciumPercent = response.totalDaily.CA;
                 var calciumNutrients = response.totalNutrients.CA;

                 var carbPercent = response.totalDaily.CHOCDF;
                 var carbNutrients = response.totalNutrients.CHOCDF;

                 var proteinPercent = response.totalDaily.PROCNT;
                 var proteinNutrients = response.totalNutrients.PROCNT;

                 var fatPercent = response.totalDaily.FAT;
                 var fatNutrients = response.totalNutrients.FAT;

                 var calories = response.calories;
                 console.log(calories);

                 var c = $("<h3>").text("Calories: 71 kcal");
             
                 var br = $("<br>");

                //  var c = $("<h3>").text("Calories: "+calories+ " kcal");
                //  var carbs = $("<h3>").text("Carbohydrates: "+carbNutrients.quantity+" "+carbNutrients.unit);
                //  var protein = $("<h3>").text("Protein: "+proteinNutrients.quantity+" "+proteinNutrients.unit);
                //  var fat = $("<h3>").text("Fat: "+fatNutrients.quantity+" "+fatNutrients.unit);

                //TESTING 
                var carbs = $("<h3>").text("Carbohydrates: 23g");
                var protein = $("<h3>").text("Protein: 44g");
                var fat = $("<h3>").text("Fat: 14g");

                 $(".nutrition-body").append(c).append(br);
                 $(".nutrition-body").append(carbs).append(br);
                 $(".nutrition-body").append(protein).append(br);
                 $(".nutrition-body").append(fat).append(br);
            
                })
              },

       checkout: function(){
        //Empty button div before rendering buttons
        $(".w3-ul").empty();
      
        // Looping through the array of topics
        for (var i = 0; i < masterList.length; i++) {
        
          var listItem = $("<li>").addClass("w3-bar w3-card-2 w3-margin");
    
          var span = $("<span>").addClass("w3-button w3-white w3-xlarge w3-right w3-circle w3-margin").attr("onclick", "this.parentElement.style.display='none'");

          var x = $("<i>").addClass("fa fa-close");

          span.append(x);

          var listImageDiv = $("<div>");
          
          var img = $("<img>").attr("src", "assets/images/shopping/cut.svg").addClass("w3-bar-item w3-circle w3-hide-small w3-left").attr("style", "width:85px");

          listImageDiv.append(img);

          var itemDiv = $("<div>").addClass("w3-bar-item");

          var itemAmount = masterObject.amount[i];
          var itemUnit = masterObject.unit[i];
          var itemName = masterObject.name[i];

          console.log(itemAmount);

          var nameSpan = $("<span>").addClass("w3-large");

          var h = $("<h3>").text(itemName);
          nameSpan.append(h);
          var amountSpan = $("<span>").text(" "+itemAmount);
          var unitSpan = $("<span>").text(" "+itemUnit);

          itemDiv.append(nameSpan).append(amountSpan).append(unitSpan);

          listItem.append(span).append(listImageDiv).append(itemDiv);

          $(".w3-ul").append(listItem);

        }
      },
       
        checkout: function(){
        //Empty button div before rendering buttons
        $(".w3-ul").empty();
      
        // Looping through the array of topics
        for (var i = 0; i < masterList.length; i++) {
        
          var listItem = $("<li>").addClass("w3-bar w3-card-2 w3-margin");
    
          var span = $("<span>").addClass("w3-button w3-white w3-xlarge w3-right w3-circle w3-margin").attr("onclick", "this.parentElement.style.display='none'");

          var x = $("<i>").addClass("fa fa-close");

          span.append(x);

          var listImageDiv = $("<div>");
          
          var img = $("<img>").attr("src", "assets/images/shopping/cut.svg").addClass("w3-bar-item w3-circle w3-hide-small w3-left").attr("style", "width:85px");

          listImageDiv.append(img);

          var itemDiv = $("<div>").addClass("w3-bar-item");

          var itemAmount = masterObject.amount[i];
          var itemUnit = masterObject.unit[i];
          var itemName = masterObject.name[i];

          console.log(itemAmount);

          var nameSpan = $("<span>").addClass("w3-large");

          var h = $("<h3>").text(itemName);
          nameSpan.append(h);
          var amountSpan = $("<span>").text(" "+itemAmount);
          var unitSpan = $("<span>").text(" "+itemUnit);

          itemDiv.append(nameSpan).append(amountSpan).append(unitSpan);

          listItem.append(span).append(listImageDiv).append(itemDiv);

          $(".w3-ul").append(listItem);

        }
      },

};

//-------------Get Ingredients,Instructions and Ready In Minutes From Listed Recipe


$(document).on('click','.learnMore',function(){
  event.preventDefault();

  var id = $(this).attr("recipeID");
  console.log(id);

  $(".modal-header").empty();
  $(".modal-body").empty();
  $("#ingredient-view").empty();

  $.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("X-Mashape-Key", "LrkalLNxQhmshrafGm4A9Ku2Q0Erp1NXSbIjsnfduvX2Pmrre8");
    },
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function(){
      console.log("Cannot get data");
    }
  })
  
  .then(function(response) {

    console.log(response);

    var fullInstructions = response.instructions;

    var instructions = fullInstructions.split(". ");

    var ol = $("<ol>");

    for (var i = 0; i < instructions.length; i++){
      var li = $("<li>").text((i+1+". ")+instructions[i]);
      ol.append(li);
    }

    var minutes = response.readyInMinutes;
    var title = $("<h1>").text(response.title);

    var m = $("<p>").text("Ready in "+minutes+" minutes.");


    $(".modal-header").append(title);
    $(".modal-header").append(m);
    $(".modal-body").append(ol);

    var ingredientResult = response.extendedIngredients;

    console.log(instructions);
    console.log("Ready in "+minutes+" minutes.");

    for (var i = 0; i <ingredientResult.length; i++){

    var ingredientList = ingredientResult[i].original;
    var amountList = ingredientResult[i].amount;
    var unitList = ingredientResult[i].unit;
    var nameList = ingredientResult[i].name;

    ingredientArray.push(ingredientList);
    ingredientObject.amount.push(amountList);
    ingredientObject.unit.push(unitList);
    ingredientObject.name.push(nameList);
  
  }
    console.log(ingredientArray);
    console.log(ingredientObject);

    recipeApp.listIngredients();
  
  })
  });

  //-------------OPEN USER ADDED RECIPES MODAL
  $(document).on('click','#addedRecipes',function(){
    event.preventDefault();
    recipeApp.showUserAddedRecipes();
  });

  //-------------OPEN SEARCH NEW RECIPE MODAL
  $(document).on('click','#complexSearch',function(){
    event.preventDefault();
    recipeApp.openRecipeSearch();
  });

  //-------------OPEN SEARCH BY INGREDIENT MODAL
  $(document).on('click','.ingredientButton',function(){
    event.preventDefault();
    recipeApp.openIngredientSearch();
  });

  //-------------OPEN ADD RECIPE

  $(document).on('click','#addRecipeButton',function(){
    event.preventDefault();
    recipeApp.openAddRecipe();
  });

  //-------------SEARCH NEW RECIPES

  $(document).on('click','#recipe-search',function(){
    event.preventDefault();
    $("#recipe-view").empty();
    recipeApp.searchRecipeComplex();
  });

  //-------------SEARCH RECIPES USING INGREDIENTS YOU HAVE

  $(document).on('click','#ingredient-search',function(){
    event.preventDefault();
    $("#recipe-view").empty();
    recipeApp.searchByIngredients();
  });

//-------------Learn more about individual recipe

$(document).on('click','#learn-more',function(){
  event.preventDefault();
  recipeApp.learnMore();
});

//-------------SELECT INGREDIENTS TO PUSH TO MASTER LIST

$(document).one('click','#ingredient-item' ,function(){
  event.preventDefault();
  var ingredient = $(this).attr("ingredient-full");
  var unit = $(this).attr("ingredient-name");
  var name = $(this).attr("ingredient-unit");
  var amount = $(this).attr("ingredient-amount");
  console.log(ingredient);

  var checkmark = $("<img>").attr("src", "assets/images/checkmark.png");
  $(this).append(checkmark);

  masterList.push(ingredient);
  masterObject.amount.push(amount);
  masterObject.unit.push(unit);
  masterObject.name.push(name);
  console.log(masterList);
  console.log(masterObject);
});

//-------------PUSH ALL INGREDIENTS FROM ONE RECIPE TO MASTER LIST

$(document).on('click','#add-all',function(){
  event.preventDefault();

  var checkmark = $("<img>").attr("src", "assets/images/checkmark.png");
  $(this).append(checkmark);

  for (var i = 0; i<ingredientArray.length; i++){
    masterList.push(ingredientArray[i]);
  }

  for (var i = 0; i<ingredientObject.amount.length; i++){
    masterObject.amount.push(ingredientObject.amount[i]);
  }

  for (var i = 0; i<ingredientObject.name.length; i++){
    masterObject.name.push(ingredientObject.name[i]);
  }

  for (var i = 0; i<ingredientObject.unit.length; i++){
    masterObject.unit.push(ingredientObject.unit[i]);
  }

  console.log(masterList);
  console.log(masterObject);
});

//-------------CHECKOUT // PUSH SELECTED INGREDIENTS TO MASTER LIST

$(document).one('click','#checkout',function(){
  event.preventDefault();
  $("#recipe-view").empty();
  var checkmark = $("<img>").attr("src", "assets/images/checkmark.png");
  // $(this).append(checkmark);
  recipeApp.checkout();
  openRightMenu();
});

//-------------NUTRITION SEARCH

$(document).on('click','#nutrition-search',function(){
  event.preventDefault();
  $("#nutrition-view").empty();
  recipeApp.nutritionSearch();
  recipeApp.openNutritionResults();
});


$("#add-ingredient-btn").on("click", function(event) {
  event.preventDefault();

  var recipeAmount = $("#amount").val().trim();
  myIngredientObject.amount.push(recipeAmount);

  var recipeName = $("#name").val().trim();
  myIngredientObject.name.push(recipeName);

  var recipeUnit = $("#unit").val().trim();
  myIngredientObject.unit.push(recipeUnit);

  // for (var i=0; i<myIngredientObject.length; i++){
  //    var newAmount =  myIngredientObject.amount[i];
  //    var newUnit =  myIngredientObject.unit[i];
  //    var newName =  myIngredientObject.name[i];

  var newIngredient = recipeAmount + 
     " "+ recipeUnit + " " + recipeName +" ";

  myIngredients.push(newIngredient);

  $("myIngredient-view").text(myIngredients);

  console.log(myIngredientObject);
  console.log(newIngredient);
  console.log(myIngredients);

  $("#amount").val("");
  $("#name").val("");
  $("#unit").val("");

  $("#add-ingredient-btn").text("Add Another Ingredient");
  $("#myIngredient-view").text(newIngredient+ " added to this recipe.");

});


//Button for adding recipes
$("#add-recipe-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var recipeName = $("#recipe-name-input").val().trim();
  var recipeMin = $("#recipe-min-input").val().trim();
  var recipeDiet = $("#recipe-diet-input").val().trim();
  var recipeType = $("#recipe-type-input").val().trim();

  var recipeIngredients = myIngredients.join(",");

  console.log(recipeIngredients);

  //Creates local "temporary" object for holding recipe data

  var newRecipe = {
    title: recipeName,
    minutes: recipeMin,
    diet: recipeDiet,
    type: recipeType,
    ingredients: recipeIngredients,
  };

  // Uploads recipe data to the database
  database.ref().push(newRecipe);

  // Logs everything to console
  console.log(newRecipe.title);
  console.log(newRecipe.minutes);
  console.log(newRecipe.diet);
  console.log(newRecipe.type);
  console.log(newRecipe.ingredients);

  // Alert
  $("#myIngredient-view").text(recipeName+ " successfully added!");

  // Clears all of the text-boxes
  $("#recipe-name-input").val("");
  $("#recipe-min-input").val("");
  $("#recipe-diet-input").val("");
  $("#recipe-type-input").val("");  
});


// 3. Create Firebase event for adding recipe to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var recipeName = childSnapshot.val().title;
  var recipeMin = childSnapshot.val().minutes;
  var recipeDiet = childSnapshot.val().diet;
  var recipeType = childSnapshot.val().type;
  var recipeIngredients = childSnapshot.val().ingredients;

  // recipe Info
  console.log(recipeName);
  console.log(recipeMin);
  console.log(recipeDiet);
  console.log(recipeType);
  console.log(recipeIngredients);

  $("#recipe-table > tbody").append("<tr class='w3-hover-green'"+myIngredients+"><td>" + recipeName + "</td><td>" + recipeMin + " minutes</td><td>" + recipeDiet + "</td><td>" + recipeType + "</td><td>" + recipeIngredients + "</td></tr>");

});