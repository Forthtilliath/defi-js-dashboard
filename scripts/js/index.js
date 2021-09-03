import * as data from './data.js';
import * as utils from './utils.js';
const Elements = {
    links: document.querySelectorAll('.link'),
    pages: document.querySelectorAll('.section'),
    divFilter: document.querySelector('.sectionFilter'),
    divGames: document.querySelector('.sectionContent'),
};
const Images = {
    medals: {
        '1st': new Image(),
        '2nd': new Image(),
        '3rd': new Image(),
    },
};
Images.medals['1st'].setAttribute('src', './images/medals/1st.png');
Images.medals['2nd'].setAttribute('src', './images/medals/2nd.png');
Images.medals['3rd'].setAttribute('src', './images/medals/3rd.png');
Images.medals['1st'].classList.add('medal');
Images.medals['2nd'].classList.add('medal');
Images.medals['3rd'].classList.add('medal');
let tabExtansionsActive = new Array();
let tabPlayers = new Array();
let tabGamesFiltered = new Array();
(function init() {
    Elements.links.forEach((link) => link.addEventListener('click', changePage));
    data.extansions.forEach(createCheckboxExtansion);
    data.players.forEach(createPlayersArray);
    tabGamesFiltered = getFilteredGames();
    displayGames();
})();
function createPlayersArray(player) {
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = 'images/players/' + player.image;
    avatar.setAttribute('title', player.name);
    tabPlayers[player.id] = Object.assign(Object.assign({}, player), { avatar });
}
function getFilteredGames() {
    return data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansionsActive));
}
function createCheckboxExtansion(extansion) {
    const container = document.createElement('span');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const { id, name } = extansion;
    tabExtansionsActive.push(id);
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
    Elements.divFilter.appendChild(container);
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
    Elements.pages.forEach((page) => page.classList.remove('active'));
    pageElement.classList.add('active');
}
function toggleExtansion(e) {
    const checkbox = e.target;
    const id = Number(checkbox.getAttribute('data-id'));
    if (checkbox.checked) {
        tabExtansionsActive.push(id);
        tabExtansionsActive.sort((a, b) => a - b);
    }
    else {
        var index = tabExtansionsActive.indexOf(id);
        if (index !== -1) {
            tabExtansionsActive.splice(index, 1);
        }
    }
    tabGamesFiltered = getFilteredGames();
    displayGames();
}
function displayGames() {
    while (Elements.divGames.firstChild)
        Elements.divGames.firstChild.remove();
    tabGamesFiltered.forEach((game) => {
        const gameElement = document.createElement('div');
        const leftElement = document.createElement('div');
        const rightElement = document.createElement('div');
        game.players.forEach((player) => {
            const avatarElement = document.createElement('img');
            avatarElement.classList.add('avatar');
            avatarElement.src = 'images/players/' + tabPlayers[player].image;
            avatarElement.setAttribute('title', tabPlayers[player].name);
            leftElement.appendChild(avatarElement);
        });
        let nbPodiumLeft = 3;
        let maxValue = 9999;
        rightElement.appendChild(Images.medals['1st'].cloneNode(true));
        const podium_1 = getPodium(game.scores, 1, maxValue);
        podium_1.players.forEach(player => rightElement.appendChild(player.avatar.cloneNode(true)));
        rightElement.appendChild(document.createTextNode(podium_1.points + 'pts'));
        nbPodiumLeft -= podium_1.players.length;
        maxValue = podium_1.points;
        if (nbPodiumLeft >= 2) {
            rightElement.appendChild(Images.medals['2nd'].cloneNode(true));
            const podium_2 = getPodium(game.scores, 1, maxValue);
            podium_2.players.forEach(player => rightElement.appendChild(player.avatar.cloneNode(true)));
            rightElement.appendChild(document.createTextNode(podium_2.points + 'pts'));
            nbPodiumLeft -= podium_2.players.length;
            maxValue = podium_1.points;
        }
        if (nbPodiumLeft > 0) {
            rightElement.appendChild(Images.medals['3rd'].cloneNode(true));
            const podium_3 = getPodium(game.scores, 1, maxValue);
            podium_3.players.forEach(player => rightElement.appendChild(player.avatar.cloneNode(true)));
            rightElement.appendChild(document.createTextNode(podium_3.points + 'pts'));
        }
        gameElement.appendChild(leftElement);
        gameElement.appendChild(rightElement);
        Elements.divGames.appendChild(gameElement);
    });
}
function getPodium(scores, position, maxValue) {
    const scoresFiltered = scores.filter(score => score < maxValue);
    const maxScore = Math.max(...scoresFiltered);
    const playersMax = scoresFiltered.reduce((c, score, i) => score === maxScore ? c.concat(i) : c, new Array());
    console.log(playersMax);
    console.log(playersMax.map(index => tabPlayers[index]));
    return {
        points: maxScore,
        players: playersMax.map(index => tabPlayers[index])
    };
}
