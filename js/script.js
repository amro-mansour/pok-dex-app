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

// This will return the two functions defined above, so then they can be called outside of the function
  return {
    add: add,
    getAll: getAll
  };
})();


// This function is used to add an object to the pokemonList in the above pokemonRepository
pokemonRepository.add({name: 'Machamp', height: 1.6, types: 'fighting'});

// This function is using the function getAll.() and the forEach to display the content of the pokemonList array on the browser
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('Pokemon Name: ' + pokemon.name + '. Height: ' + pokemon.height + 'm. Type: ' + pokemon.types + '<br>');
})
