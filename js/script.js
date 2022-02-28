// This creates a funcion with IIFE method in order make the variable contained local and not global
let pokemonRepository = (function() {
  let pokemonList = [
  {name: 'Psyduck', height: 0.8, types: 'water'},
  {name: 'Gastly', height: 1.3, types:
  ['ghost','poison']},
  {name: 'Charizard', height: 1.7, types:
  ['fire','flying']},
  {name: 'Mewtwo', height: 2, types: 'psychic'}
  ];
// This function allows to push other elements to the array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

// This fuction is used to return the content of the pokemonList array
  function getAll() {
    return pokemonList;
  }

// This function is used to add a list of buttons to associate with the pokemons defined in the pokemonList array
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-custom');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // Here is added an event listener to the button created, it's activted once the button is clicked. Also the event handler will log the pokemon that's been clicked
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

// This will return the functions defined above, so then they can be called outside of the IIFE function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();


// This function is used to add an object to the pokemonList in the above pokemonRepository
pokemonRepository.add({name: 'Machamp', height: 1.6, types: 'fighting'});

// This function is using the function getAll.() and the forEach to display the content of the pokemonList array on the browser
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

})
