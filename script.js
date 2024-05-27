const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const mobile = document.getElementsByClassName('mobile-nav')[0]


toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})



toggleButton.addEventListener('click', () => {
    mobile.classList.toggle('active')
})


// homepage.js
function openItem(itemId) {
    fetch('homepage.json')
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id === itemId);
            if (item) {
                localStorage.setItem('selectedItem', JSON.stringify(item));

                window.location.href = 'item.html';
            } else {
                console.log('Item not found');
            }
        })
        .catch(error => console.log(error));
}