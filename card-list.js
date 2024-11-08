
const apiKey = 'bba20bca-f035-46ec-babe-eb0eb10d847c';  // Replace with your actual API key

// Fetch cards from the Pokémon TCG API
fetch('https://api.pokemontcg.io/v2/cards?pageSize=20&page=1', {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey
    }
})
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        const cardContainer = document.querySelector('.card-list-container');
        
        // Loop through the data and display cards
        data.data.forEach(card => {
            // Create card elements
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.onclick = () => goToCardDetail(card.id);  // Add click event
            
            // Add card image and name
            const cardImg = document.createElement('img');
            cardImg.src = card.images.small;  // Small image URL
            cardImg.alt = card.name;

            const cardName = document.createElement('p');
            cardName.textContent = card.name;

            // Append elements
            cardDiv.appendChild(cardImg);
            cardDiv.appendChild(cardName);
            cardContainer.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error fetching cards:', error));

function goToCardDetail(cardId) {
    window.location.href = `card-detail.html?id=${cardId}`;
}
