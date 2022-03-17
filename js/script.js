// This creates a funcion with IIFE method in order make the variable contained local and not global
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=300';
  let modalContainer = document.querySelector('#modal-container');

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
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add('btn', 'btn-warning', 'btn-lg', 'btn-block', 'button-custom', 'search-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal')
    // Here is added an event listener to the button created, it's activted once the button is clicked. Also the event handler will log the pokemon that's been clicked
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });

    // This function will run once the DOM is ready for JavaScript code to execute. It contains an event listener that fires once a key is pressed, to then search for the pokemon 
    $(document).ready(function(){
    $('#search-pokemon').on('keyup', function() {
    let value = $(this).val().toLowerCase();
    $(".search-button").filter(function() {   // This filters each pokemon by the 'search-button' class
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    });
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
      item.types = [];
      details.types.forEach(function(detail) {
        item.types.push(detail.type.name);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function ()  {
      showModal(item);
    });
  }

  
  // This function is added to create a modal that appears once a pokemon is clicked on the browser, the modal will show the pokemon characteristics(which are defined inside the function)
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    // This creates an element for the name of the pokemon in the modal
    let nameElement = $('<h1>' + item.name + '</h1>');

    // This creates the element for the image to add in the modal
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', item.imageUrl);

    // This creates the element to the display the pokemons height in the modal
    let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');

    // This creates the element to display the type of pokemon in the modal 
    let typesElement = $('<p>' + 'Types: ' + item.types + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    
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

