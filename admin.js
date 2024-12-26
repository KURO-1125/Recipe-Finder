function checkUserRole() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const addRecipeButton = document.getElementById("add-recipe-button");

    if (currentUser && currentUser.isAdmin) {
        addRecipeButton.style.display = "block";
        displayAllRecipes(); 
    } else {
        window.location.href = "user.html";
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

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <h3>${recipe.recipeName}</h3>
            <p>Tags: ${recipe.tags}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Preparation Time: ${recipe.preparationTime}</p>
            <p>Cuisine Type: ${recipe.cuisineType}</p>
            <img src="${recipe.imageURL}" alt="${recipe.recipeName}" style="width: 100px; height: auto;">
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeCardsContainer.appendChild(recipeCard);
    });
}


function editRecipe(index) {
    const recipes = getRecipes();
    const recipe = recipes[index];

    document.getElementById("recipename").value = recipe.recipeName;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("preparation-time").value = recipe.preparationTime;
    document.getElementById("cuisine-type").value = recipe.cuisineType;
    document.getElementById("tags").value = recipe.tags;

    
    const hiddenIndexInput = document.createElement("input");
    hiddenIndexInput.type = "hidden";
    hiddenIndexInput.id = "edit-index";
    hiddenIndexInput.value = index;
    document.getElementById("edit-details-form").appendChild(hiddenIndexInput);

    
    document.getElementById("editRecipeModal").style.display = "block";
}

function closeEditRecipeModal() {
    document.getElementById("editRecipeModal").style.display = "none"; 
    const editForm = document.getElementById("edit-details-form");
    editForm.reset(); 
    const hiddenIndexInput = document.getElementById("edit-index");
    if (hiddenIndexInput) {
        hiddenIndexInput.remove(); 
    }
}

function deleteRecipe(index) {
    const recipes = getRecipes();
    recipes.splice(index, 1); 
    localStorage.setItem("Recipes", JSON.stringify(recipes)); 
    displayAllRecipes(); 
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
