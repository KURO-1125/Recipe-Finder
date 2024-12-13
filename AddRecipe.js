const detailsForm = document.getElementById("details-form");
const recipeName = document.getElementById("recipename");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const preparationTime = document.getElementById("preparation-time");
const cuisineType = document.getElementById("cuisine-type");
const tags = document.getElementById("tags");
const imageUpload = document.getElementById("imageupload");
const submitBtn = document.getElementById("submit-btn");

function getRecipes() {
    const recipes = localStorage.getItem("Recipes");
    if (recipes) {
        return JSON.parse(recipes);
    } else {
        return [];
    }
}

function saveRecipe(recipeName, ingredients, instructions, preparationTime, cuisineType, tags, imageURL) {
    const recipes = getRecipes();
    recipes.push({ recipeName, ingredients, instructions, preparationTime, cuisineType, tags, imageURL });
    localStorage.setItem("Recipes", JSON.stringify(recipes));
}

detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const recipeNameValue = recipeName.value.trim();
    const ingredientsValue = ingredients.value.trim();
    const instructionsValue = instructions.value.trim();
    const preparationTimeValue = preparationTime.value.trim();
    const cuisineTypeValue = cuisineType.value.trim();
    const tagsValue = tags.value.trim();
    const file = imageUpload.files[0];

    if (recipeNameValue && ingredientsValue && instructionsValue && preparationTimeValue && cuisineTypeValue && tagsValue && file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            saveRecipe(recipeNameValue, ingredientsValue, instructionsValue, preparationTimeValue, cuisineTypeValue, tagsValue, base64);
            detailsForm.reset();
            alert("Recipe Saved Successfully");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please fill in all fields.");
    }
});