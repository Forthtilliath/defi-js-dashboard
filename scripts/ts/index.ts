import * as data from './data.js';
import * as utils from './utils.js';

const links = document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>;
const pages = document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>;
const divFilter = document.querySelector('.sectionFilter') as HTMLDivElement;
const divGames = document.querySelector('.sectionContent') as HTMLDivElement;

const medals = {
    '1st': new Image(),
    '2nd': new Image(),
    '3rd': new Image(),
}
medals['1st'].setAttribute('src', './images/medals/1st.png');
medals['2nd'].setAttribute('src', './images/medals/2nd.png');
medals['3rd'].setAttribute('src', './images/medals/3rd.png');
medals['1st'].classList.add('medal');
medals['2nd'].classList.add('medal');
medals['3rd'].classList.add('medal');


let tabExtansions = new Array<number>();
let tabPlayers = new Array<IPlayer>();

// Event pour le changement de page
links.forEach((link) => link.addEventListener('click', changePage));

// Création des checkboxs pour les extansions
data.extansions.forEach(createCheckboxExtansion);
data.players.forEach(createPlayersArray);
// Génération de l'historique des parties
let gamesFiltered = getFilteredGames();
displayGames();



// Création Array from json
function createPlayersArray(player: IDataPlayer) {
    const avatar = document.createElement('img');

    avatar.classList.add('avatar');
    avatar.src = 'images/players/' + player.image;
    avatar.setAttribute('title', player.name);

    tabPlayers[player.id] = {...player, avatar};
}

// 
function getFilteredGames() {
    return data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
}

// Creation DOM
function createCheckboxExtansion(extansion: { id: number; name: string }) {
    const container = document.createElement('span') as HTMLSpanElement;
    const label = document.createElement('label') as HTMLLabelElement;
    const checkbox = document.createElement('input') as HTMLInputElement;

    const { id, name } = extansion;
    tabExtansions.push(id);

    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-id', id.toString());
    checkbox.setAttribute('id', 'cbx_' + name.toLowerCase());
    checkbox.setAttribute('name', name.toLowerCase());
    checkbox.setAttribute('checked', 'true');
    checkbox.addEventListener('change', (e) => toggleExtansion(e));

    label.setAttribute('for', 'cbx_' + name.toLowerCase());
    label.innerText = name;

    container.classList.add('checkboxWrapper');
    container.appendChild(checkbox);
    container.appendChild(label);

    divFilter.appendChild(container);
}





// Event : Update display
function changePage(e: MouseEvent) {
    e.preventDefault();
    let element = e.target as HTMLElement;
    let tag = element.tagName;
    while (tag !== 'A') {
        element = element.parentNode as HTMLElement;
        tag = element.tagName;
    }

    const idElement = element.getAttribute('href') as string;
    const pageElement = document.querySelector(idElement) as HTMLDivElement;

    pages.forEach((page) => page.classList.remove('active'));
    pageElement.classList.add('active');
}

// Event : Update display
function toggleExtansion(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const id = Number(checkbox.getAttribute('data-id'));

    if (checkbox.checked) {
        tabExtansions.push(id);
        tabExtansions.sort((a, b) => a - b);
    } else {
        var index = tabExtansions.indexOf(id);
        if (index !== -1) {
            tabExtansions.splice(index, 1);
        }
    }

    gamesFiltered = getFilteredGames();
    displayGames();
}

// Event : Update display
function displayGames() {
    while (divGames.firstChild) divGames.firstChild.remove();

    gamesFiltered.forEach((game) => {
        const gameElement = document.createElement('div');
        const leftElement = document.createElement('div');
        const rightElement = document.createElement('div');

        game.players.forEach((player) => {
            const avatarElement = document.createElement('img');

            avatarElement.classList.add('avatar');
            avatarElement.src = 'images/players/' + tabPlayers[player].image;
            avatarElement.setAttribute('title', tabPlayers[player].name);

            leftElement.appendChild(avatarElement);

            rightElement.appendChild(medals['1st'].cloneNode(true));
            rightElement.appendChild(medals['2nd'].cloneNode(true));
            rightElement.appendChild(medals['3rd'].cloneNode(true));
            rightElement.appendChild(document.createTextNode(game.scores[0] + 'pts'))
        });

        gameElement.appendChild(leftElement);
        gameElement.appendChild(rightElement);
        divGames.appendChild(gameElement);
    });
}

function getPodium(position:number, maxValue:number = 1000) {
    // getMaxValue
    // getIndexes
    // getImages
}