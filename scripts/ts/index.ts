import * as data from './data.js';
import * as utils from './utils.js';

const links = document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>;
const pages = document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>;
const divFilter = document.querySelector('.sectionFilter') as HTMLDivElement;
const divGames = document.querySelector('.sectionContent') as HTMLDivElement;

interface IPlayer {
    id: number;
    name: string;
    image: string;
}

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

            leftElement.appendChild(avatarElement);
        });
        gameElement.appendChild(leftElement);
        gameElement.appendChild(rightElement);
        divGames.appendChild(gameElement);
    });
}

function getFilteredGames() {
    return data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
}

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
    console.log(gamesFiltered);
    displayGames();
}

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

function createPlayersArray(player: IPlayer) {
    tabPlayers[player.id] = player;
}
