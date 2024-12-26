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


function toggleMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}


function logout() {
    alert("Logging out...");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html"; 
}


function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById('editName').value = currentUseruserName || '';
        document.getElementById('editEmail').value = currentUser.email || '';
        document.getElementById('editProfileModal').style.display = 'block'; 
    } else{
        alert("No user is currently logged in.");
    }
}


function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none'; 
}


function saveProfile(event) {
    event.preventDefault(); 

    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();


    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    
    if (currentUser) {
        if (newName) {
            currentUser.userName = newName; 
        }
        if (newEmail) {
            currentUser.email = newEmail; 
        }

        
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Profile changes saved!"); 
        closeEditProfileModal(); 
        setAvatarInitials(); 
    } else {
        alert("No user is currently logged in.");
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (query) {
        const recipes = JSON.parse(localStorage.getItem("Recipes")) || []; 
        const filteredRecipes = recipes.filter(recipe => 
            recipe.recipeName.toLowerCase().includes(query) || 
            recipe.ingredients.toLowerCase().includes(query) || 
            recipe.tags.toLowerCase().includes(query)
        );

    
        displaySearchResults(filteredRecipes);
    } else {
        alert("Please enter a search term.");
    }
}

function displaySearchResults(recipes) {
    const recipeCardsContainer = document.getElementById('recipe-cards');
    recipeCardsContainer.innerHTML = ""; 

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h3>${recipe.recipeName}</h3>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Tags: ${recipe.tags}</p>
                <p>Preparation Time: ${recipe.preparationTime} minutes</p>
                <p>Cuisine Type: ${recipe.cuisineType}</p>
                <img src="${recipe.imageURL}" alt="${recipe.recipeName}" style="width: 100%; height: auto; border-radius: 8px;">
            `;
            recipeCardsContainer.appendChild(recipeCard);
        });
    } else {
        recipeCardsContainer.innerHTML = "<p>No recipes found.</p>";
    }
}