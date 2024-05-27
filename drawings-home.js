const test = document.getElementById('drawings')
let singleContainerVisible = false;
let originalStyles;

let backButtonContainer = document.getElementById('backButtonContainer');

backButtonContainer.style.display = "none";


fetch('drawings.json')
    .then(response => response.json())
    .then(data => jsononscreen(data));

function jsononscreen(data) {
    console.log(data)
    let count = 0;
    test.innerHTML = "";
    data.forEach(element => {
        console.log(element)
        test.innerHTML += "<div class='artcards'> " + "<img data-index=" + count + " src='" + element.path + "' alt='' style='width: 300px;' />"
            + "<li>" + "<span>" + "TITLE: " + "</span>" + element.title + "</li>" + "<li>" + "<span>" + "YEAR: " + "</span>" + element.date + "</li>" + "</div>";
        count++
    });

    let itemlist = document.querySelectorAll(".artcards")
    itemlist.forEach(element => {
        element.addEventListener("click", showDetail)
    });

    originalStyles = test.getAttribute('style');
    backButtonContainer.style.display = "none";
}




function showDetail(event) {
    console.log(event.srcElement.dataset.index);
    test.innerHTML = "";
    fetch('drawings.json')
        .then(response => response.json())
        .then(data => {
            console.log(data[event.srcElement.dataset.index].path);
            const currentItem = data[event.srcElement.dataset.index];

            const singleItemDiv = document.createElement('div');
            singleItemDiv.classList.add('singleitem');

            const image = document.createElement('img');
            image.src = currentItem.path;
            image.alt = '';

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');

            const titlePriceDiv = document.createElement('div');
            titlePriceDiv.classList.add('titleprice');

            const titleLi = document.createElement('li');
            titleLi.innerHTML = "<span> TITLE: </span>" + currentItem.title;

            const buyLi = document.createElement('li');
            if (currentItem.buyLink) {
                const buyLink = document.createElement('a');
                buyLink.href = currentItem.buyLink;
                buyLink.classList.add('buyButton');
                buyLink.target = '_blank';
                buyLink.textContent = 'BUY';
                buyLi.appendChild(buyLink);
            } else {
                const contactButton = document.createElement('a');
                contactButton.href = 'contact.html';
                contactButton.classList.add('contactButton');
                contactButton.textContent = 'CONTACT ME TO PURCHASE THIS ITEM';
                buyLi.appendChild(contactButton);
            }

            titlePriceDiv.appendChild(titleLi);
            titlePriceDiv.appendChild(buyLi);

            const yearLi = document.createElement('li');
            yearLi.innerHTML = "<span> YEAR: </span>" + currentItem.date;

            const priceLi = document.createElement('li');
            priceLi.innerHTML = "<span> PRICE: </span>" + currentItem.price;

            const descriptionLi = document.createElement('li');
            descriptionLi.innerHTML = "<span> DESCRIPTION: </span>" + currentItem.summary;

            detailsDiv.appendChild(titlePriceDiv);
            detailsDiv.appendChild(yearLi);
            detailsDiv.appendChild(priceLi);
            detailsDiv.appendChild(descriptionLi);

            singleItemDiv.appendChild(image);
            singleItemDiv.appendChild(detailsDiv);

            test.appendChild(singleItemDiv);

            test.removeAttribute('style');

            const containerDiv = document.getElementById('drawings');
            containerDiv.classList.add('singlecontainer');

            backButtonContainer.style.display = "block";
            backButtonContainer.innerHTML = "";
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.addEventListener('click', () => {
                test.parentNode.classList.remove('singlecontainer');
                test.innerHTML = "";
                test.setAttribute('style', originalStyles);
                jsononscreen(data);
                backButtonContainer.style.display = "none";
            });
            backButtonContainer.appendChild(backButton);
        });
}