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

// Call the function to set the avatar initials when the page loads
setAvatarInitials();

// Function to toggle the dropdown menu
function toggleMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Function to handle logout
function logout() {
    alert("Logging out...");
    localStorage.removeItem("currentUser  ");
    window.location.href = "index.html"; // Redirect to login page
}

// Function to open the edit profile modal
function editProfile() {
    const currentUser   = JSON.parse(localStorage.getItem("currentUser  "));
    if (currentUser  ) {
        document.getElementById('editName').value = currentUser  .userName || '';
        document.getElementById('editEmail').value = currentUser  .email || '';
        document.getElementById('editProfileModal').style.display = 'block'; // Show modal
    } else{
        alert("No user is currently logged in.");
    }
}

// Function to close the edit profile modal
function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none'; 
}

// Function to save profile changes
function saveProfile(event) {
    event.preventDefault(); // Prevent the default form submission

    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();

    // Retrieve the current user from local storage
    const currentUser    = JSON.parse(localStorage.getItem("currentUser   "));

    // Update the user object with new values
    if (currentUser   ) {
        if (newName) {
            currentUser   .userName = newName; // Update name
        }
        if (newEmail) {
            currentUser   .email = newEmail; // Update email
        }

        // Save the updated user object back to local storage
        localStorage.setItem("currentUser   ", JSON.stringify(currentUser   ));

        alert("Profile changes saved!"); // Notify the user
        closeEditProfileModal(); // Close the modal
        setAvatarInitials(); // Update avatar initials
    } else {
        alert("No user is currently logged in.");
    }
}

// Function to perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (query) {
        // Here you can implement the logic to search through your recipes or data
        // For example, if you have an array of recipes:
        const recipes = JSON.parse(localStorage.getItem("Recipes")) || []; // Assuming recipes are stored in local storage
        const filteredRecipes = recipes.filter(recipe => 
            recipe.recipeName.toLowerCase().includes(query) || 
            recipe.ingredients.toLowerCase().includes(query) || 
            recipe.tags.toLowerCase().includes(query)
        );

        // Display the filtered results (you can implement a function to show results)
        displaySearchResults(filteredRecipes);
    } else {
        alert("Please enter a search term.");
    }
}

function displaySearchResults(recipes) {
    const recipeCardsContainer = document.getElementById('recipe-cards');
    recipeCardsContainer.innerHTML = ""; // Clear previous results

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