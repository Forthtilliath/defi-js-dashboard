import * as data from './data.js';
import * as utils from './utils.js';
const links = document.querySelectorAll('.link');
const pages = document.querySelectorAll('.section');
const filter = document.querySelector('.sectionFilter');
let tabExtansions = new Array();
const changePage = (e) => {
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
};
const toggleExtansion = (e) => {
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
    const games = data.games.filter((game) => utils.compareArrays(game.extansions, tabExtansions));
    console.log(games);
};
const createCheckboxExtansion = (extansion) => {
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
    filter.appendChild(container);
};
links.forEach((link) => link.addEventListener('click', changePage));
data.extansions.forEach(createCheckboxExtansion);
