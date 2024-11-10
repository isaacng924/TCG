const apiKey = 'bba20bca-f035-46ec-babe-eb0eb10d847c';  // Replace with your actual API key
const pageSize = 20;
let currentPage = 1;
let selectedSupertype = "";

const cardContainer = document.querySelector('.card-list-container');
const paginationControls = document.querySelector('.pagination-controls');
const supertypeFilter = document.getElementById('supertype-filter');
const searchInput = document.getElementById('search-input'); // Search input field
const searchButton = document.getElementById('search-button'); // Search button

// Fetch cards and render for a given page
function fetchAndDisplayCards(page) {
    const supertype = supertypeFilter.value;
    const searchQuery = searchInput.value.trim();  // Get trimmed search input value
    console.log("Selected Supertype:", supertype);
    let query = `?pageSize=${pageSize}&page=${page}&orderBy=name`;

    // Add supertype filter if selected
    if (supertype) {
        query += `&q=supertype:${supertype}`;
    }

    // Add name search if input is provided
    if (searchQuery) {
        query += (supertype ? ` AND ` : `&q=`) + `name:${searchQuery}`;
    }

    fetch(`https://api.pokemontcg.io/v2/cards${query}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            cardContainer.innerHTML = ''; // Clear previous cards
            data.data.forEach(card => displayCard(card)); // Display each card
            setupPaginationControls(page, data.totalCount);
        })
        .catch(error => console.error('Error fetching cards:', error));
}

// Display each card in the container
function displayCard(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.onclick = () => goToCardDetail(card.id);

    const cardImg = document.createElement('img');
    cardImg.src = card.images.small;
    cardImg.alt = card.name;

    cardDiv.appendChild(cardImg);
    cardContainer.appendChild(cardDiv);
}

// Setup pagination controls based on the current page and total cards
function setupPaginationControls(page, totalCount) {
    paginationControls.innerHTML = ''; // Clear existing controls
    const totalPages = Math.ceil(totalCount / pageSize);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = page <= 1;
    prevButton.onclick = () => changePage(page - 1);
    paginationControls.appendChild(prevButton);

    const pageIndicator = document.createElement('span');
    pageIndicator.textContent = `Page ${page} of ${totalPages}`;
    pageIndicator.style.margin = '0 10px';
    paginationControls.appendChild(pageIndicator);

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = page >= totalPages;
    nextButton.onclick = () => changePage(page + 1);
    paginationControls.appendChild(nextButton);
}

// Change page and re-fetch data
function changePage(page) {
    currentPage = page;
    fetchAndDisplayCards(currentPage);
}

// Display card detail page
function goToCardDetail(cardId) {
    window.location.href = `card-detail.html?id=${cardId}`;
}

// Event listener for supertype filter change
supertypeFilter.addEventListener('change', () => {
    currentPage = 1; // Reset to the first page
    fetchAndDisplayCards(currentPage);
});

// Event listener for search button click
searchButton.addEventListener('click', () => {
    currentPage = 1; // Reset to the first page
    fetchAndDisplayCards(currentPage);
});

// Initial fetch of cards
fetchAndDisplayCards(currentPage);
