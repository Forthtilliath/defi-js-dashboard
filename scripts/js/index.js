import * as data from './data.js';
const links = document.querySelectorAll('.link');
const pages = document.querySelectorAll('.section');
const filter = document.querySelector('.sectionFilter');
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
links.forEach((link) => link.addEventListener('click', changePage));
data.extansions.forEach((extansion) => {
    const container = document.createElement('span');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const name = extansion.name;
    container.classList.add('checkboxWrapper');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', name.toLowerCase());
    checkbox.setAttribute('name', name.toLowerCase());
    checkbox.setAttribute('checked', 'true');
    label.setAttribute('for', name.toLowerCase());
    label.innerText = name;
    container.appendChild(checkbox);
    container.appendChild(label);
    filter.appendChild(container);
});
