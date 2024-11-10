// Replace with your actual API key
const apiKey = 'bba20bca-f035-46ec-babe-eb0eb10d847c';

// Extract the card ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

// Elements to populate card details
const cardImage = document.getElementById('card-image');
const cardName = document.getElementById('card-name');
const cardDetails = document.getElementById('card-details');

// Function to fetch and display card details
function fetchCardDetails(id) {
    // Check if the card ID is valid
    if (!id) {
        cardName.textContent = 'Error: Card ID not found';
        return;
    }

    // API request to fetch the card details
    fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Card not found (ID: ${id})`);
        }
        return response.json();
    })
    .then(data => {
        const card = data.data;

        // Populate the page with card details
        cardImage.src = card.images.large || card.images.small;  // Use larger image if available
        cardImage.alt = card.name;
        cardName.textContent = card.name;
        cardDetails.textContent = `
            Supertype: ${card.supertype || 'N/A'}
            Subtype: ${card.subtypes ? card.subtypes.join(', ') : 'N/A'}
            Set: ${card.set ? card.set.name : 'N/A'}
            Rarity: ${card.rarity || 'N/A'}
        `;
    })
    .catch(error => {
        cardName.textContent = 'Error fetching card details';
        cardDetails.textContent = error.message;
        console.error('Error:', error);
    });
}

// Fetch and display the card details
fetchCardDetails(cardId);

