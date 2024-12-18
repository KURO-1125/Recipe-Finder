const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

function getRecipes() {
    const recipes = localStorage.getItem("Recipes");
    return recipes ? JSON.parse(recipes) : [];
}

function displayRecipes(recipes) {
    searchResults.innerHTML = ""; 
    if (recipes.length === 0) {
        searchResults.innerHTML = "<p>No recipes found.</p>";
        return;
    }
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <h3>${recipe.recipeName}</h3>
            <p>Tags: ${recipe.tags}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Preparation Time: ${recipe.preparationTime}</p>
            <p>Cuisine Type: ${recipe.cuisineType}</p>
            <img src="${recipe.imageURL}" alt="${recipe.recipeName}" style="width: 100px; height: auto;">
        `;
        searchResults.appendChild(recipeDiv);
    });
}

function searchRecipes(query) {
    const recipes = getRecipes();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.recipeName.toLowerCase().includes(query.toLowerCase()) || 
        recipe.tags.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(query.toLowerCase()) ||
        recipe.cuisineType.toLowerCase().includes(query.toLowerCase())
    );
    displayRecipes(filteredRecipes);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchRecipes(query);
    } else {
        alert("Please enter a search term.");
    }
});