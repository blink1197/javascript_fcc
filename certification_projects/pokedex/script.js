const input = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonImageContainer = document.getElementById('image-container');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const type1 = document.getElementById('type-1');
const type2 = document.getElementById('type-2');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');


const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


//Functions

const fetchData = async (nameOrId) => {
    const endpointUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
    try {
        const res = await fetch(endpointUrl);
        const data = await res.json();
        updateDisplay(data);
    } catch (err) {
        alert('Pokémon not found');
        console.log(err);
    }
};

const updateDisplay = (data) => {
    const { name, id, height, weight, sprites, stats, types } = data;
    const newImageElement = document.createElement('img');
    const lastImg = pokemonImageContainer.lastElementChild;
    if (lastImg.tagName === 'IMG') {
        lastImg.remove();
    }
    newImageElement.setAttribute('src', sprites["front_default"]);
    newImageElement.setAttribute('class', 'pokemon-sprite');
    pokemonImageContainer.appendChild(newImageElement);

    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = '#' + id;
    pokemonWeight.textContent = 'Weight: ' + weight;
    pokemonHeight.textContent = 'Height: ' + height;

    if (types[0]) {
        type1.textContent = types[0]['type']['name'].toUpperCase();
        type1.setAttribute('style', `background-color: ${colours[types[0]['type']['name']]}`);
    }

    if (types[1]) {
        type2.textContent = types[1]['type']['name'].toUpperCase();
        type2.setAttribute('style', `background-color: ${colours[types[1]['type']['name']]}`);
    }
    
    hp.textContent = stats[0]["base_stat"];
    attack.textContent = stats[1]["base_stat"];
    defense.textContent = stats[2]["base_stat"];
    specialAttack.textContent = stats[3]["base_stat"];
    specialDefense.textContent = stats[4]["base_stat"];
    speed.textContent = stats[5]["base_stat"];
 
};


const cleanInputString = (string) => string.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');




// Event Listeners
searchButton.addEventListener('click', () => {
    fetchData(cleanInputString(input.value));
});