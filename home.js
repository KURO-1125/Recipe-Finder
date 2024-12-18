function checkUserRole() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const addRecipeButton = document.getElementById("add-recipe-button");
    const searchRecipeButton = document.getElementById("search-recipe-button");

    if (currentUser && currentUser.isAdmin) {
        addRecipeButton.style.display = "block";
        searchRecipeButton.style.display = "none"; 
        displayAllRecipes(); 
    } else {
        addRecipeButton.style.display = "none"; 
        searchRecipeButton.style.display = "block"; 
    }
}
checkUserRole();

function setAvatarInitials() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const avatar = document.getElementById("user-avatar");
    const userNameElement = document.getElementById("user-name"); 

    if (currentUser && currentUser.userName) {
        const initials = currentUser.userName.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
        avatar.textContent = initials; 
        userNameElement.textContent = currentUser.userName;
    } else {
        avatar.textContent = "?"; 
        userNameElement.textContent = "Guest"; 
    }
}

setAvatarInitials();

function getRecipes() {
    const recipes = localStorage.getItem("Recipes");
    return recipes ? JSON.parse(recipes) : [];
}

function displayAllRecipes() {
    const recipes = getRecipes(); 
    const recipeCardsContainer = document.getElementById("recipe-cards");
    recipeCardsContainer.innerHTML = ""; 

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <h3>${recipe.recipeName}</h3>
            <p>Tags: ${recipe.tags}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Preparation Time: ${recipe.preparationTime}</p>
            <p>Cuisine Type: ${recipe.cuisineType}</p>
            <img src="${recipe.imageURL}" alt="${recipe.recipeName}" style="width: 100px; height: auto;">
        `;
        recipeCardsContainer.appendChild(recipeCard);
    });
}


function toggleMenu(){
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
}

window.onclick = function (event) {
    if (!event.target.matches('.avatar')) {
        const dropdowns = document.getElementsByClassName('dropdown');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};


function editProfile() {
    const modal = document.getElementById('editProfileModal');
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        document.getElementById('editName').value = currentUser.userName || '';
        document.getElementById('editEmail').value = currentUser.email || '';
        modal.style.display = 'flex'; 
    } else {
        alert("No user is currently logged in.");
    }
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.style.display = 'none'; 
}

function logout() {
    alert("Logging out...");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function saveProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();

    if (newName) {
        currentUser.userName = newName;
    }
    if (newEmail) {
        currentUser.email = newEmail;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert("Profile changes saved!");
    closeEditProfileModal();
}
