import * as data from './data.js';

const links = document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>;
const pages = document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>;
const filter = document.querySelector('.sectionFilter') as HTMLDivElement;

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

links.forEach((link) => link.addEventListener('click', changePage));

data.extansions.forEach((extansion) => {
    const container = document.createElement('span') as HTMLSpanElement;
    const label = document.createElement('label') as HTMLLabelElement;
    const checkbox = document.createElement('input') as HTMLInputElement;

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
