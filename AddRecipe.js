const detailsForm = document.getElementById("details-form");
const recipeName = document.getElementById("recipename");
const ingredients = document.getElementById("ingredients");
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

function saveRecipe(recipeName, ingredients, preparationTime, cuisineType, tags, imageURL) {
    const recipes = getRecipes();
    recipes.push({ recipeName, ingredients, preparationTime, cuisineType, tags, imageURL });
    localStorage.setItem("Recipes", JSON.stringify(recipes));
}

detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const recipeNameValue = recipeName.value.trim();
    const ingredientsValue = ingredients.value.trim();
    const preparationTimeValue = preparationTime.value.trim();
    const cuisineTypeValue = cuisineType.value.trim();
    const tagsValue = tags.value.trim();
    const file = imageUpload.files[0];

    const editIndex = document.getElementById("edit-index") ? document.getElementById("edit-index").value : null;

    if (recipeNameValue && ingredientsValue && preparationTimeValue && cuisineTypeValue && tagsValue && file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (editIndex !== null) {
                const recipes = getRecipes();
                recipes[editIndex] = {
                    recipeName: recipeNameValue,
                    ingredients: ingredientsValue,
                    preparationTime: preparationTimeValue,
                    cuisineType: cuisineTypeValue,
                    tags: tagsValue,
                    imageURL: base64
                };
                localStorage.setItem("Recipes", JSON.stringify(recipes));
                alert("Recipe Updated Successfully!");
            } else {
                saveRecipe(recipeNameValue, ingredientsValue, preparationTimeValue, cuisineTypeValue, tagsValue, base64);
                alert("Recipe Saved Successfully!");
            }

            detailsForm.reset();
            if (editIndex !== null) {
                document.getElementById("edit-index").remove();
            }
            setTimeout(() => {
                window.location.href = "admin.html"; 
            }, 1000); 
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please fill in all fields.");
    }
});