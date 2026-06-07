const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

year.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

const temples = [
    {
        templeName: "Albuquerque New Mexico",
        location: "Albuquerque, New Mexico, United States",
        dedicated: "1998, June, 20",
        area: 34245,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Arequipa Peru",
        location: "Arequipa, Peru",
        dedicated: "2017, March, 4",
        area: 26969,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Asunción Paraguay",
        location: "Asunción, Paraguay",
        dedicated: "2001, February, 3",
        area: 11906,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Barranquilla Colombia",
        location: "Barranquilla, Colombia",
        dedicated: "2016, February, 20",
        area: 25349,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Bern Switzerland",
        location: "Bern, Switzerland",
        dedicated: "1953, August, 5",
        area: 35546,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Cedar City Utah",
        location: "Cedar City, Utah, United States",
        dedicated: "2015, August, 8",
        area: 42657,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Provo City Center Utah",
        location: "Provo, Utah, United States",
        dedicated: "2012, May, 12",
        area: 85084,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2010, October, 23",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Washington D.C. United States",
        location: "Washington D.C., United States",
        dedicated: "1968, December, 7",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
];

const gallery = document.querySelector(".gallery");
const pageTitle = document.querySelector("#page-title");

function displayTemples(filteredTemples) {
    gallery.innerHTML = "";

    filteredTemples.forEach((temple) => {
        const card = document.createElement("section");

        const name = document.createElement("h3");
        const location = document.createElement("p");
        const dedicated = document.createElement("p");
        const area = document.createElement("p");
        const image = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        image.setAttribute("src", temple.imageUrl);
        image.setAttribute("alt", temple.templeName);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "400");
        image.setAttribute("height", "250");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(image);

        gallery.appendChild(card);
    });
}

displayTemples(temples);

document.querySelector("#home").addEventListener("click", () => {
    pageTitle.textContent = "Home";
    displayTemples(temples);
});

document.querySelector("#old").addEventListener("click", () => {
    pageTitle.textContent = "Old Temples";
    displayTemples(
        temples.filter(
            temple => parseInt(temple.dedicated.split(",")[0]) < 1900
        )
    );
});

document.querySelector("#new").addEventListener("click", () => {
    pageTitle.textContent = "New Temples";
    displayTemples(
        temples.filter(
            temple => parseInt(temple.dedicated.split(",")[0]) > 2000
        )
    );
});

document.querySelector("#large").addEventListener("click", () => {
    pageTitle.textContent = "Large Temples";
    displayTemples(
        temples.filter(
            temple => temple.area > 90000
        )
    );
});

document.querySelector("#small").addEventListener("click", () => {
    pageTitle.textContent = "Small Temples";
    displayTemples(
        temples.filter(
            temple => temple.area < 10000
        )
    );
});