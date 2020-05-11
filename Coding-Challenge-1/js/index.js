function getInformation(pokeName) {
    if (!pokeName) {
        console.log(error)
    }

    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeName

    let settings = {
        method: 'GET'
    }

    fetch(url, settings)
        .then(jsonResponse => {
            if (jsonResponse.ok) {
                let json = jsonResponse.json()
                return json;
            }
            throw new Error(jsonResponse.statusText)
        })
        .then(response => {
            displayResults(response)
        })
        .catch(err => {
            console.log(err);
            displayResults(-1);
        })

}
/**
c. Add the code that is needed so that when the user clicks the button “Get data” and provides the
name or id of a Pokémon in the given input, you will connect to ThePokéAPI and from the results
you will display in screen the following:
i. Name of the Pokémon
ii. One of the sprites available (You choose which, don’t take too much time choosing)
iii. List of moves
iv. List of stats */

function displayResults(jsonResponse) {
    let results = document.querySelector('.js-search-results')
    if (jsonResponse == -1) {
        results += `
        <h1>No Pokemon Available :^(</h1>
        `
        console.log('no pokemon available');
    } else {
        results.innerHTML = ""
        console.log(jsonResponse.sprites.black_default)
        results.innerHTML += `
        <h1> Pokemon name : ${jsonResponse.name}</h1>
        <h2> Sprite : </h2>
        <img src=${jsonResponse.sprites.black_default}>
        <h3> Pokemon moves: </h3>
        `

        for (let i = 0;i<jsonResponse.moves.length;i++){
            //console.log(jsonResponse.moves[i].move.name);
            results.innerHTML += `
            <p>${jsonResponse.moves[i].move.name}</p>
            `
        }
        results.innerHTML += `
        <h3> Pokemon Stats: </h3>
        `
        for (let i = 0;i<jsonResponse.stats.length;i++){
            //console.log(jsonResponse.stats[i].stat.name);
            results.innerHTML += `
            <p>${jsonResponse.stats[i].stat.name}</p>
            `
        }
       
    }

}

function init() {

    let form = document.querySelector('.js-search-form');
    let pokeName = document.querySelector('.js-query');
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        getInformation(pokeName.value);
    })
}

init();