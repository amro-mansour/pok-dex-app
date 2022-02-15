// This is an Array containing different objects. These objects contain a list Pokemons with their specific features
let pokemonList = [
  {name: 'Psyduck', height: 0.8, types: 'water'},
  {name: 'Gastly', height: 1.3, types: ['ghost','poison']},
  {name: 'Charizard', height: 1.7, types: ['fire','flying']},
  {name: 'Mewtwo', height: 2, types: 'psychic'}
]

// This is a loop used to display on the browser the Pokemons names and heights, it also displays a special text next to the tallest Pokemon 
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.9) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '- Wow, that’s big!' + '<br>');
  } else { document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '<br>');
  }
}
