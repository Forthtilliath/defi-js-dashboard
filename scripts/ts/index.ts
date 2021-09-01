const links = document.querySelectorAll('.link') as NodeListOf<HTMLLinkElement>;
const pages = document.querySelectorAll('.section') as NodeListOf<HTMLDivElement>;

const changePage = (e:MouseEvent) => {
    e.preventDefault();
    let element = e.target as HTMLElement;
    let tag = element.tagName;
    while (tag !== 'A') {
        element = element.parentNode as HTMLElement;
        tag = element.tagName;
    }
    
    const idElement = element.getAttribute('href') as string;
    const pageElement = document.querySelector(idElement) as HTMLDivElement;

    pages.forEach(page => page.classList.remove('active'));
    pageElement.classList.add('active');
}

links.forEach(link => link.addEventListener('click', changePage));
