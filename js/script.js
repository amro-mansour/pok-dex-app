// This creates a funcion with IIFE method in order make the variable contained local and not global
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
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
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('btn-lg');
    button.classList.add('btn-block');
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
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // This is to create a close button that will be on the modal, once the button is clicked, we'll exit the modal
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // Here we create the elements that will be inside the modal, these will contain the info about the pokemon, such as: name; an image; height; type.
    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name.toUpperCase();

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', item.imageUrl);

    let heightElement = document.createElement('p');
    heightElement.innerText = ('Height: ' + item.height);

    let typeElement = document.createElement('p');
    typeElement.innerText = ('Types: ' + item.types);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    modalContainer.appendChild(modal);

    // This class is added in order for the modal to be visible once selected
    modalContainer.classList.add('is-visible');
  } 
  
  // This function is need to exit the modal 
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // This event listener is using the above hideModal function to exit the modal by clicking the Escape button on the keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // This event listener is using the hideModal function to exit the modal by clicking outside of it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  })
  


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
