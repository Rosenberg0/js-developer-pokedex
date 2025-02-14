const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalDetail = document.getElementById('modalDetail')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-pokemon='${JSON.stringify(pokemon)}'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function displayPokemonInfo(pokemon) {
    const detailHtml = `
        <span class="modalName">${pokemon.name}</span>
        <span class="modalNumber">#${pokemon.number}</span>
        <div>
            <ol class="allModalTypes">
                ${pokemon.types.map(type => `<li class="modalType">${type}</li>`).join('')}
            </ol>
            <img class="modalImage" src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <table>
            <tr>
                <td class="modalTitleDetail">Espécie</td>
                <td class="modalValueDetail">${pokemon.types.join(', ')}</td>
            </tr>
            <tr>
                <td class="modalTitleDetail">Peso</td>
                <td class="modalValueDetail">${pokemon.weight} Kg</td>
            </tr>
            <tr>
                <td class="modalTitleDetail">Altura</td>
                <td class="modalValueDetail">${pokemon.height} Cm</td>
            </tr>
            <tr>
                <td class="modalTitleDetail">Habilidades</td>
                <td class="modalValueDetail">${pokemon.abilities.join(', ')}</td>
            </tr>
        </table>
    `;
    modalDetail.innerHTML = detailHtml;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // Adiciona um listener para cada novo item
        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach(item => {
            item.addEventListener('click', () => {
                const pokemonData = JSON.parse(item.getAttribute('data-pokemon'));
                displayPokemonInfo(pokemonData);
            });
        });
    });
}

        



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});




