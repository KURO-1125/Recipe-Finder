const detailsForm = document.getElementById("details-form");
const userName = document.getElementById("username");
const recipeName = document.getElementById("recipename");
const submitBtn = document.getElementById("submit-btn");
const displayBtn = document.getElementById("display-details");
const recipeNameDisplay = document.getElementById("RecipeName-display");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const recipeDetails = {
        userName: userName.value,
        recipeName: recipeName.value,
    };

    // Converting and storing it in localStorage
    localStorage.setItem("RecipeDetails", JSON.stringify(recipeDetails));

    detailsForm.reset();
});

displayBtn.addEventListener("click", () => {
    const recipeDetails = JSON.parse(localStorage.getItem("RecipeDetails"));

    if (recipeDetails && recipeDetails.recipeName) {
        recipeNameDisplay.textContent = `Recipe Name : ${recipeDetails.recipeName} by ${recipeDetails.userName}`;
    } else {
        recipeNameDisplay.textContent = "No Recipe Found";
    }
});
