const weatherAPIKey = "5c032efb9895c47b96ffd88e5f753068";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const product = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }

];

//menu section

function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//greeting section

function celciusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}

function greetingHandler() {

    let currentHour = new Date().getHours();
    let greetingText;

    if (currentHour < 12) {
        greetingText = "Good Morning!";
    } else if (currentHour < 19) {
        greetingText = "Good Afternoon!";
    } else if (currentHour < 24) {
        greetingText = "Good Evening!";
    } else {
        greetingText = "Welcome!";
    }
}

//taking system date
//updating the time every second with setInterval

function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
    }, 1000)
}

//Gallery Selection
//src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"

function galleryHandler() {

    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    //<img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" 
    //data-array-index="0" data-selected="true">


    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        /*  if (index === 0){
             thumb.dataset.selected = true;
         }else{
             thumb.dataset.selected = false;
         } */
        thumb.addEventListener("click", function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });

            e.target.dataset.selected = true;

        });

        thumbnails.appendChild(thumb);
    });

}
//Products Section
function populateProducts(productList) {
    let productSelection = document.querySelector(".products-area");
    productSelection.textContent = "";

    productList.forEach(function (product, index) {

        //creating div element and selecting class .product-item
        let productElm = document.createElement('div');
        productElm.classList.add("product-item");

        //create product image section
        let productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;

        //create product details section
        let productDetails = document.createElement('div');
        productDetails.classList.add("product-details");

        //create header section
        let productTitle = document.createElement('h3');
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement('p');
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement('p');
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement('p');
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price : "Free";

        //append to product details
        productDetails.appendChild(productTitle);
        productDetails.appendChild(productAuthor);
        productDetails.appendChild(priceTitle);
        productDetails.appendChild(productPrice);

        //appending to product elment div
        productElm.appendChild(productImage);
        productElm.appendChild(productDetails);
        productSelection.appendChild(productElm);
    });
}


function productsHandler() {
    //selecting div class products-area

    let freeProducts = product.filter(item => !item.price || item.price < 0);

    let paidProducts = product.filter(item => item.price > 0);

    // Run a loop through each product
    populateProducts(product);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = product.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function (e) {
        if (e.target.id === "all") {
            populateProducts(product);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id == "free") {
            populateProducts(freeProducts);
        }

    });
}

function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `${currentYear} All rights Reserved`;

}

navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude;
    let longtitude = position.coords.longitude;

    let url = weatherAPIURL
        .replace("{lat}", latitude)
        .replace("{lon}", longtitude)
        .replace("{API key}", weatherAPIKey);

    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherCondition = data.weather[0].description;
            const userLocation = data.name;
            let temperature = data.main.temp;
            let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)} outside.`;
            let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celciusToFahr(temperature).toFixed(1)} outside.`;

            document.querySelector("p#weather").innerHTML = celsiusText;

            //on click for radio button 
            document.querySelector(".weather-group").addEventListener("click", function (e) {
                if (e.target.id == "celsius") {
                    document.querySelector("p#weather").innerHTML = celsiusText;
                } else if (e.target.id == "fahr") {
                    document.querySelector("p#weather").innerHTML = fahrText;
                }
            });
        });
});


//Page Load
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();