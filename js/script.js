// This creates a funcion with IIFE method in order make the variable contained local and not global
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// This function allows to push other elements to the array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('This is not a pokemon');
    }
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

// This function uses fetch to GET the list of pokemon from the API in the apiUrl variable, then it uses the add() function to push those pokemons to the pokemonList Array
  function loadList() {
   return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         name: item.name,
         detailsUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function (e) {
     console.error(e);
   })
 }

// This function is needed to get the details of each pokemon
 function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function ()  {
      console.log(item);
    });
  }

// This will return the functions defined above, so then they can be called outside of the IIFE function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


// This function is using the function getAll.() and the forEach to display the content of the pokemonList array on the browser
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

  });
});
