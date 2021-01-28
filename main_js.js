let carts = document.querySelectorAll('.add-cart');
// const itemsContainer = document.getElementById("row_item");

// -----following codes to fetch data.json, then JSON.parse to localStorage and JSON.stringify------
// function addItem(item) {
//     const itemHTML = '<div class="row item">\n' +
//         '<div class="col-md-6 img">\n' +
//         '      <img class="item img" src="PhotoStudio/' + item.tag + '>\n' +
//         '</div>\n' +
//         '<div class="col-md-6 services">\n' +
//         '      <h4 class="productName">' + item.productName + '</h4>\n' +
//         '      <p class="details">' + item.description + '</p>\n' +
//         '      <p class="details">' + item.price + '</p>\n' +
//         '</div>\n' +
//         '</div>'
// itemsContainer.innerHTML += itemHTML;
// }

// function fetchProducts() {
//     fetch('./data.json')
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json);
//         });

let products = [{
        productId: 1,
        productName: "Wedding package",
        productCode: "DLJ-01",
        description: "We fly you to your dream destination in style. Let our team make the all the arrangements while you look your best for your special day, glamourous and effervescent.",
        price: 5000,
        image: "weddingPackage",
        imageUrl: "https://www.dusitthanilagunasingapore.com/public/wedding/images/Wedding_CelebrationsParties2_1100x750.jpg"
    },
    {
        productId: 2,
        productName: "Architectural",
        productCode: "DLJ-02",
        description: "We shoot onsite with our vast array lenses suited for capturing landscapes and large scales buildings intended for commercial purposes for your websites or brochures.",
        price: 1000,
        image: "architectural",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/50bce2dfe4b01f474524eb8e/1456799367252-43BJ5ESZ9AASFMJAUDEX/ke17ZwdGBToddI8pDm48kNnVUdz0LMwmPl0bUEdqt1x7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UY9kEpUDRFtF-iv7XsWZcTVPg8yOhK8LaOZuZMsCG_7vVVjs4-Y4P_C8EhABwvP0NA/image-asset.jpeg"
    },
    {
        productId: 3,
        productName: "Studio",
        productCode: "DLJ-03",
        description: "Whether it is for a corporate profiles,  ",
        price: 2000,
        image: "studio",
        imageUrl: "https://ohdearstudio.com.sg/wp-content/uploads/2020/11/Extended-Big-family-Photoshoot.jpg"
    },
    {
        productId: 4,
        productName: "Drone",
        productCode: "DLJ-04",
        description: "<Insert description for Drone>",
        price: 3500,
        image: "drone",
        imageUrl: "https://ak.picdn.net/shutterstock/videos/12740642/thumb/1.jpg"
    },
    {
        productId: 5,
        productName: "Outdoor",
        productCode: "DLJ-05",
        description: "<Insert description for Outdoor>",
        price: 3000,
        image: "outdoor",
        imageUrl: "https://singaporemotherhood.com/articles/wp-content/uploads/2019/01/Summer-and-family.jpg"
    },
    {
        productId: 6,
        productName: "Product",
        productCode: "DLJ-06",
        description: "<Insert description for Product >",
        price: 4500,
        image: "product",
        imageUrl: "https://www.hoopstudio.com.sg/wp-content/uploads/2018/10/stylized-photo-9.jpg"
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '',
            Object.values(cartItems).map((item) => {
                productContainer.innerHTML += `
                <div class="product">
                    <i class="delete far fa-times-circle fa-2x"></i>
                    <img class="cart-img" src="./PhotoStudio/${item.image}.jpg">  
                    <span class="sm-hide">${item.productName}</span>
                </div>
           <div class="price sm-hide">$${item.price}.00</div>

           <div class="quantity">
            <i class="decrease far fa-arrow-alt-circle-left fa-2x"></i>
            <span>${item.inCart}</span>
           <i class="increase far fa-arrow-alt-circle-right fa-2x"></i>
           </div>

           <div class="total">$${item.inCart * item.price}.00</div>`;
            });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }

}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            // console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            // console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            // console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product .delete');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    // console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}


// This if the function for the sign up form and it register the information in the local storage.
function store() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var userName = document.getElementById('userName').value;
    var email = document.getElementById('email').value;
    var pw = document.getElementById('pw').value;
    var address = document.getElementById('address').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var postal = document.getElementById('postal').value;
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (userName.length == 0) {
        alert('Please fill in Username');

    } else if (pw.length == 0) {
        alert('Please fill in password');

    } else if (userName.length == 0 && pw.length == 0) {
        alert('Please fill in username and password');

    } else if (pw.length > 8) {
        alert('Max of 8');

    } else if (!pw.match(numbers)) {
        alert('please add 1 number');

    } else if (!pw.match(upperCaseLetters)) {
        alert('please add 1 uppercase letter');

    } else if (!pw.match(lowerCaseLetters)) {
        alert('please add 1 lowercase letter');
    } else { alert('Account Created') };

    let stored_users = JSON.parse(localStorage.getItem('users'));

    if (stored_users) {
        stored_users.push({
            name: firstName,
            lastName,
            userId: userName,
            password: pw,
            add: address,
            country: country,
            state: state,
            postal: postal
        });
        localStorage.setItem('users', JSON.stringify(stored_users));
    } else {
        localStorage.setItem('users', JSON.stringify([{
            name: firstName,
            lastName,
            userId: userName,
            password: pw,
            add: address,
            country: country,
            state: state,
            postal: postal
        }]));

    }
}

//Function for the purpose of checking the user data against the local storage.
function check() {
    var usrName = document.getElementById('username');
    var usrPw = document.getElementById('password');

    let stored_users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < stored_users.length; i++) {
        if (stored_users[i].userId === usrName.value && stored_users[i].password === usrPw.value) {
            alert('You are logged in ' + usrName.value);
            window.location.href = "http://127.0.0.1:5500/final_project/home.html";

        } else {
            return alert('Access denied. Valid username and password is required.');
        }
    }
}



// function check(){
//     var storedName = localStorage.getItem('userId');
//     var storedPw = localStorage.getItem('password');

//     var userName = document.getElementById('username');
//     var userPw = document.getElementById('password');
//     // var userRemember = document.getElementById("rememberMe");

//     if(userName.value == storedName && userPw.value == storedPw){
//         alert('You are logged in.');
//     }else{
//         alert('Error on login');
//     }
// }

// function check() {
//     var usrName = document.getElementById('username');
//     var usrPw = document.getElementById('password');
//     let user = localStorage.getItem('users')
//     for(i=0; i < user.length ; i++){
//         var storedName = [];
//         var storedPw = [];
//         storedName[i]=localStorage.getItem('user[i]');
//         storedPw[i]=localStorage.getItem('password[i]');
//         if(usrName.value == storedName[i] && usrPw.value == storedPw[i]) {
//             alert('You are logged in.');
//         }else {
//             alert('ERROR.');
//         }
//     }  
// }

// function check()
// {
//    const hash = Object.fromEntries(
//    a.map(e => [e.name, e.password])
// )
// var username = document.getElementById('username').value;
// var password = document.getElementById('password').value;
// for (let key of hash) 
// {

//     if(key[0] === username && key[1]===atob(password))
//      {
//          alert('Login successful');
//      }

// else
//      {
//          alert('Login fail');
//      }
// }
// }

function addToCart() {
    alert("Added to cart !");
}


// when page loads, this will run and check it
onLoadCartNumbers();
displayCart();