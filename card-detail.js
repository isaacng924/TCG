import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: 'bba20bca-f035-46ec-babe-eb0eb10d847c' });

const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

pokemon.card.find(cardId)
    .then(card => {
        document.getElementById('card-image').src = card.images.large;
        document.getElementById('card-name').textContent = card.name;
        document.getElementById('card-details').textContent = card.flavorText || 'No description available.';
    })
    .catch(error => console.error(error));
