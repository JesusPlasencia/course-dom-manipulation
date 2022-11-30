// web api
// conection server
const BASE_URL = 'https://platzi-avo.vercel.app/api/avo';
const BASE_IMAGE = 'https://platzi-avo.vercel.app';

// container
const APP_CONTAINER = document.querySelector('div#app');

APP_CONTAINER.addEventListener('click', (event) => {
    if (event.target.nodeName === 'H2') {
        window.alert('Hello');
    }
})

async function fetchData() {
    let itemsFetch = [];
    const request = await fetch(BASE_URL);
    const { data } = await request.json();
    data.forEach(item => {
        console.log(item);

        const image = document.createElement('img');
        image.src = `${BASE_IMAGE + item?.image}`;
        image.classList = 'h-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
        
        const titleContainer = document.createElement('h2');
        const titleText = document.createTextNode(item?.name);
        titleContainer.appendChild(titleText);
        titleContainer.classList = 'text-lg';

        const priceContainer = document.createElement('p');
        priceContainer.className = 'text-gray-600';
        priceContainer.textContent = formatPrice(item?.price);

        const descriptionContainer = document.createElement('p');
        descriptionContainer.className = 'text-gray-600';
        descriptionContainer.textContent = item?.attributes?.description;

        const priceAndTitle = document.createElement("div");
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(titleContainer);
        priceAndTitle.appendChild(priceContainer);
        priceAndTitle.appendChild(descriptionContainer);

        const container = document.createElement('div');
        container.classList = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300'
        container.append(image, priceAndTitle);
        
        itemsFetch.push(container);
    });
    APP_CONTAINER.append(...itemsFetch);
}

const formatPrice = (price) => {
    const newPrice = window.Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(price);
    return newPrice;
}

fetchData();