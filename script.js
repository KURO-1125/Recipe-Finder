const detailsForm = document.getElementById("details-form");
const userName = document.getElementById("username");
const recipeName = document.getElementById("recipename");
const submitBtn = document.getElementById("submit-btn");
const displayBtn = document.getElementById("display-details");
const recipeNameDisplay = document.getElementById("RecipeName-display");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("UserName",userName.value);
    localStorage.setItem("RecipeName",recipeName.value)

    detailsForm.reset();
});

displayBtn.addEventListener("click", () => {
    if(localStorage.getItem("RecipeName")){
        recipeNameDisplay.textContent = `Recipe Name : ${localStorage.getItem("RecipeName")} by ${localStorage.getItem("UserName")}`;
    }
    else{
        recipeNameDisplay.textContent = "No Recipe Found";
    }
});
