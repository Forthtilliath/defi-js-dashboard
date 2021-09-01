import * as data from './data.js';
import * as utils from './utils.js';

const links = document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>;
const pages = document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>;
const filter = document.querySelector('.sectionFilter') as HTMLDivElement;

let tabExtansions = new Array<number>();

const changePage = (e: MouseEvent) => {
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
};

const toggleExtansion = (e: Event) => {
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

    const games = data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
    console.log(games);
};

const createCheckboxExtansion = (extansion: { id: number; name: string }) => {
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

    filter.appendChild(container);
};

links.forEach((link) => link.addEventListener('click', changePage));

data.extansions.forEach(createCheckboxExtansion);
