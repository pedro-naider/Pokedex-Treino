const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const botaoVoltar = document.querySelector('.btn-prev');
const botaoAvancar = document.querySelector('.bnt-next');

let procurarPokemon = 1;

const fetchPokemon = async (pokemon) => {
   const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if (APIResponse.status === 200) {
   const data = await APIResponse.json();
   return data;
    } 
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

if (data) {

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    // debugar console.log(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']); debugar

input.value = '';
procurarPokemon = data.id
}
else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não existe';
    pokemonNumber.innerHTML = '';
 } 
}

form.addEventListener('submit', (event) => {
 event.preventDefault();

renderPokemon(input.value.toLowerCase());
input.value = '';


});

botaoVoltar.addEventListener('click', (event) => {
    procurarPokemon -= 1;
    renderPokemon(procurarPokemon);
    // alert('Pokemon Anterior');
});
botaoAvancar.addEventListener('click', (event) => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
    // alert('Próximo Pokemon');
});

renderPokemon('1');



