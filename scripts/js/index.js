import * as data from './data.js';
import * as utils from './utils.js';
const links = document.querySelectorAll('.link');
const pages = document.querySelectorAll('.section');
const divFilter = document.querySelector('.sectionFilter');
const divGames = document.querySelector('.sectionContent');
const medals = {
    '1st': new Image(),
    '2nd': new Image(),
    '3rd': new Image(),
};
medals['1st'].setAttribute('src', './images/medals/1st.png');
medals['2nd'].setAttribute('src', './images/medals/2nd.png');
medals['3rd'].setAttribute('src', './images/medals/3rd.png');
medals['1st'].classList.add('medal');
medals['2nd'].classList.add('medal');
medals['3rd'].classList.add('medal');
let tabExtansions = new Array();
let tabPlayers = new Array();
links.forEach((link) => link.addEventListener('click', changePage));
data.extansions.forEach(createCheckboxExtansion);
data.players.forEach(createPlayersArray);
let gamesFiltered = getFilteredGames();
displayGames();
function createPlayersArray(player) {
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = 'images/players/' + player.image;
    avatar.setAttribute('title', player.name);
    tabPlayers[player.id] = Object.assign(Object.assign({}, player), { avatar });
}
function getFilteredGames() {
    return data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
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
    gamesFiltered = getFilteredGames();
    displayGames();
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
            avatarElement.setAttribute('title', tabPlayers[player].name);
            leftElement.appendChild(avatarElement);
            rightElement.appendChild(medals['1st'].cloneNode(true));
            rightElement.appendChild(medals['2nd'].cloneNode(true));
            rightElement.appendChild(medals['3rd'].cloneNode(true));
            rightElement.appendChild(document.createTextNode(game.scores[0] + 'pts'));
        });
        gameElement.appendChild(leftElement);
        gameElement.appendChild(rightElement);
        divGames.appendChild(gameElement);
    });
}
function getPodium(position, maxValue = 1000) {
}
