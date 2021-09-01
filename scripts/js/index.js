"use strict";
const links = document.querySelectorAll('.link');
const pages = document.querySelectorAll('.section');
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
    pages.forEach(page => page.classList.remove('active'));
    pageElement.classList.add('active');
};
links.forEach(link => link.addEventListener('click', changePage));
