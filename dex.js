const poke_container = document.getElementById('poke_container');
const pokemons_number = 150; //since there are 150 pokemons in gen 1, mew not included :")
const colors = {
	fire: '#FDDFDF',               //colour of bg of card based on type
	grass: '#DEFDE0',                    
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
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
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
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
