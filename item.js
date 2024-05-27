document.addEventListener('DOMContentLoaded', () => {

    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));


    const imageElement = document.getElementById('single-img');
    imageElement.src = selectedItem.path;

    const titleElement = document.getElementById('title');
    titleElement.textContent = selectedItem.title;

    const dateElement = document.getElementById('date');
    dateElement.textContent = selectedItem.date;

    const descriptionElement = document.getElementById('description');
    descriptionElement.textContent = selectedItem.summary;
});