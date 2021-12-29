const poke_container = document.getElementById('poke_container');
const pokemons_number = 151; //since there are 150 pokemons in gen 1, mew not included :")
const colors = {
	fire: '#F08030',               //colour of bg of card based on type
	grass: '#78C850',                    
	electric: '#F8D030',
	water: '#6890F0',
	ground: '#E0C068',
	rock: '#B8A038',
	fairy: '#EE99AC',
	poison: '#A040A0',
	bug: '#A8B820',
	dragon: '#7038F8',
	psychic: '#F85888',
	flying: '#A890F0',
	fighting: '#C03028',
	normal: '#A8A878'
};
alert("This site is still a work in progress since the previous site from which the image used to be fetched was taken down! More features will be added to make the UI/UX better as time passes! :)");
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);          //id goes from 1 to 150 in this case
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;         //that id comes here
	const res = await fetch(url);                           //pokemon data is fetched from API
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');      //div created 
	pokemonEl.classList.add('pokemon');       // class added

	const poke_types = pokemon.types.map(type => type.type.name);   
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //lmao Grammar -_-
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;  //bg colour is based on the type 

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />    
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;         //used that site for fetching pokemon sprites and then within that its adjusted

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl); //the pokemons are added slowly in the page
}

fetchPokemons(); //tadaaaa!!
