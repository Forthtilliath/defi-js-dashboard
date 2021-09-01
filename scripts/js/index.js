import * as data from './data.js';
import * as utils from './utils.js';
const links = document.querySelectorAll('.link');
const pages = document.querySelectorAll('.section');
const divFilter = document.querySelector('.sectionFilter');
const divGames = document.querySelector('.sectionContent');
let tabExtansions = new Array();
let tabPlayers = new Array();
let gamesFiltered = data.games;
links.forEach((link) => link.addEventListener('click', changePage));
data.extansions.forEach(createCheckboxExtansion);
data.players.forEach(createPlayersArray);
displayGames();
function changePage(e) {
    e.preventDefault();
    let element = e.target;
    let tag = element.tagName;
    while (tag !== 'A') {
        element = element.parentNode;
        tag = element.tagName;
    }
    const idElement = element.getAttribute('href');
    const pageElement = document.querySelector(idElement);
    pages.forEach((page) => page.classList.remove('active'));
    pageElement.classList.add('active');
}
function displayGames() {
    while (divGames.firstChild)
        divGames.firstChild.remove();
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
function toggleExtansion(e) {
    const checkbox = e.target;
    const id = Number(checkbox.getAttribute('data-id'));
    if (checkbox.checked) {
        tabExtansions.push(id);
        tabExtansions.sort((a, b) => a - b);
    }
    else {
        var index = tabExtansions.indexOf(id);
        if (index !== -1) {
            tabExtansions.splice(index, 1);
        }
    }
    gamesFiltered = data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
    console.log(gamesFiltered);
    displayGames();
}
function createCheckboxExtansion(extansion) {
    const container = document.createElement('span');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
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
function createPlayersArray(player) {
    tabPlayers[player.id] = player;
}
