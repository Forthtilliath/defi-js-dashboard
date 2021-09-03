import * as data from './data.js';
import * as utils from './utils.js';

const Elements = {
    links: document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>,
    pages: document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>,
    divFilter: document.querySelector('.sectionFilter') as HTMLDivElement,
    divGames: document.querySelector('.sectionContent') as HTMLDivElement,
}

const Images = {
    medals : {
        '1st': new Image(),
        '2nd': new Image(),
        '3rd': new Image(),
    },
    // avatars : []
};

Images.medals['1st'].setAttribute('src', './images/medals/1st.png');
Images.medals['2nd'].setAttribute('src', './images/medals/2nd.png');
Images.medals['3rd'].setAttribute('src', './images/medals/3rd.png');
Images.medals['1st'].classList.add('medal');
Images.medals['2nd'].classList.add('medal');
Images.medals['3rd'].classList.add('medal');

let tabExtansionsActive = new Array<number>();
let tabPlayers = new Array<IPlayer>();
let tabGamesFiltered = new Array<IDataGame>();

(function init() {
    // Event pour le changement de page
    Elements.links.forEach((link) => link.addEventListener('click', changePage));

    // Création des checkboxs pour les extansions
    data.extansions.forEach(createCheckboxExtansion);
    data.players.forEach(createPlayersArray);
    // Génération de l'historique des parties
    tabGamesFiltered = getFilteredGames();
    displayGames();
})();

// Création Array from json
function createPlayersArray(player: IDataPlayer) {
    const avatar = document.createElement('img');

    avatar.classList.add('avatar');
    avatar.src = 'images/players/' + player.image;
    avatar.setAttribute('title', player.name);

    tabPlayers[player.id] = { ...player, avatar };
}

//
function getFilteredGames() {
    return data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansionsActive));
}

// Modification DOM
function createCheckboxExtansion(extansion: { id: number; name: string }) {
    const container = document.createElement('span') as HTMLSpanElement;
    const label = document.createElement('label') as HTMLLabelElement;
    const checkbox = document.createElement('input') as HTMLInputElement;

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

    Elements.pages.forEach((page) => page.classList.remove('active'));
    pageElement.classList.add('active');
}

// Event : Update display
function toggleExtansion(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const id = Number(checkbox.getAttribute('data-id'));

    if (checkbox.checked) {
        tabExtansionsActive.push(id);
        tabExtansionsActive.sort((a, b) => a - b);
    } else {
        var index = tabExtansionsActive.indexOf(id);
        if (index !== -1) {
            tabExtansionsActive.splice(index, 1);
        }
    }

    tabGamesFiltered = getFilteredGames();
    displayGames();
}

// Event : Update display
function displayGames() {
    while (Elements.divGames.firstChild) Elements.divGames.firstChild.remove();

    tabGamesFiltered.forEach((game) => {
        const gameElement = document.createElement('div');
        const leftElement = document.createElement('div');
        const rightElement = document.createElement('div');

        game.players.forEach((player:number) => {
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

function getPodium(scores: number[], position: number, maxValue: number) {
    const scoresFiltered = scores.filter(score => score < maxValue);
    const maxScore = Math.max(...scoresFiltered);
    const playersMax = scoresFiltered.reduce((c, score, i) => score === maxScore ? c.concat(i) : c, new Array<number>());
    console.log(playersMax);
    console.log(playersMax.map(index => tabPlayers[index]));

    return {
        points: maxScore,
        players: playersMax.map(index => tabPlayers[index])
    };
}
