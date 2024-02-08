let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        imageLink,
        author
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item", "col-5");

    let imageEl = document.createElement("img");
    imageEl.src = imageLink;
    imageEl.classList.add("w-100");
    resultItemEl.appendChild(imageEl);

    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = author;
    authorEl.classList.add("result-author");
    resultItemEl.appendChild(authorEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchBooks(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        console.log(searchInput);
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                if (search_results.length === 0) {
                    spinnerEl.classList.add("d-none");
                    let errorMessage = document.createElement("p");
                    errorMessage.textContent = "No results found";
                    errorMessage.classList.add("link-description", "text-center");
                    searchResultsEl.appendChild(errorMessage);
                } else {
                    displayResults(search_results);
                }
                console.log(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchBooks);