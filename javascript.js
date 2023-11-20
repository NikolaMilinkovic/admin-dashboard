
// Search input field animation
const searchField = document.getElementById("search-input");
const submitBtn = document.getElementById("submit-btn").addEventListener("click", function() {

    searchField.classList.toggle("active-search-field");
    if(searchField.classList.contains("active-search-field")){
        searchField.classList.remove("inactive-search-field");
    }else{
        searchField.classList.add("inactive-search-field");
    }
});