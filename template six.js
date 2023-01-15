// check if color in locla sotrage
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {

    document.documentElement.style.setProperty("--main--color", localStorage.getItem("color-option"));

    // Remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")
            // Add active class 
        if (element.dataset.color == mainColors) {
            element.classList.add("active")
        }
    });

};

// open the setting Box
let settingIcon = document.querySelector(".settingIcon");
let setBox = document.getElementById("setBox")
settingIcon.addEventListener("click", function() {
    setBox.classList.toggle("open");
    this.classList.toggle("fa-spin");

});

// switch colors
const colorsLis = document.querySelectorAll(".colors-list li")

colorsLis.forEach(li => {
    li.addEventListener("click", (e) => {
        //console.log(e.target.dataset.color) ## experte
        document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
        // set color on localStorage
        localStorage.setItem("color-option", e.target.dataset.color)

        handelActive(e);

    });
});



// Random Background Img
let backgroundOption = true;
// varibel to control intervel
let backgroundIntervel;
// check if there s local Storage random  Item
backgroundLocalItem = localStorage.getItem("background-option")

// check if  Random background localStorage is not Empty 
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgroundOption = true;
    } else {

        backgroundOption = false;

    };
    // Remove active calss from All span
    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active")
            // add class Active to Elements
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        document.querySelector(".random-background .no").classList.add("active")
    }
};


const randomBackgroundElements = document.querySelectorAll(".random-background span")


randomBackgroundElements.forEach(span => {
    span.addEventListener("click", (e) => {

        handelActive(e);

        if (e.target.dataset.background === "yes") {

            backgroundOption === true;

            randomize();

            localStorage.setItem("background-option", true)
        } else {

            backgroundOption === false;

            clearInterval(backgroundIntervel)

            localStorage.setItem("background-option", false)
        }

    });
});


function randomize() {
    if (backgroundOption == true) {
        let landinfPage = document.querySelector(".landing-page");
        let imgesArray = ["technoligy.5.jpeg", "technoligy.5.jpeg", "technoligy.8.jpeg", "technoligy.10 (2).jpeg"];

        backgroundIntervel = setInterval(() => {
            //  Get Rndom Number
            let randomNumber = Math.floor(Math.random() * imgesArray.length);

            // change background landingpage
            landinfPage.style.backgroundImage = 'url("photos/' + imgesArray[randomNumber] + '")'

        }, 5000);
    }
}

randomize();


// skills 
//  controll Elements

let skills = document.querySelector(".skills")
let skillProgress = document.querySelectorAll(".skill-progress span")


window.onscroll = function() {
    if (window.scrollY >= skills.offsetTop - 300) {
        skillProgress.forEach((span) => {
            span.style.width = span.dataset.width;
        });

    };
};

// creat poupp with img 

let ourGallery = document.querySelectorAll(".gallery img")

console.log(ourGallery)

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // creat overlay Elements
        let overlay = document.createElement("div");

        //  add class to overlay
        overlay.className = "popup-overlay";

        // append overlay to body
        document.body.appendChild(overlay);
        // creat the popup box
        let popupBox = document.createElement("div");
        // add class to popupBox
        popupBox.className = "popup-box"

        if (img.alt !== null) {
            // creat hidding
            let imgheading = document.createElement("h3");
            //    creat text for hidding
            let headingText = document.createTextNode(img.alt);
            // append text  to the heading
            imgheading.appendChild(headingText);

            // appen the heading to the popupBox

            popupBox.appendChild(imgheading)
        }
        // creat the img
        let popupImg = document.createElement("img");

        //   set img src
        popupImg.src = img.src;

        // add img to popupBox
        popupBox.appendChild(popupImg);
        // add the popupBox to body
        document.body.appendChild(popupBox);

        // creating close span

        let closeButton = document.createElement("span");

        // creat the close Button
        let closeBtnText = document.createTextNode("X");

        // add close button to span

        closeButton.appendChild(closeBtnText);
        // add class to closeButton
        closeButton.className = "close-button";

        // add close Button to popupBox

        popupBox.appendChild(closeButton);



    });
});

// close popup

let closeButton = document.querySelector(".close-button");
let popupBox = document.querySelector(".popup-box");


document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {

        e.target.parentNode.remove();

        //  remove overlay
        document.querySelector(".popup-overlay").remove();
    }
})

// select all bultes
// const allBultes = document.querySelectorAll(".nav-bultes .bultes");
const allBultes = document.querySelectorAll(".nav-bultes .bultes");


allBultes.forEach((bult) => {
    bult.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"

        });

    });
});

// handel active state

function handelActive(ev) {
    // Remove active class from all Elements
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    });
    // Add class active on self
    ev.target.classList.add("active")
}

let bultesSpan = document.querySelectorAll(".bultes-option span");
let navBultes = document.querySelector(".nav-bultes");
let buletLocalItem = localStorage.getItem("bultes-option");

if (buletLocalItem !== null) {

    bultesSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (buletLocalItem === "block") {
        navBultes.style.display = "block";
        document.querySelector(".bultes-option .yes").classList.add("active");

    } else {
        navBultes.style.display = "none";
        document.querySelector(".bultes-option .no").classList.add("active");
    };
};

bultesSpan.forEach((span) => {
    span.addEventListener("click", e => {
        if (span.dataset.display === "show") {
            navBultes.style.display = "block";
            localStorage.setItem("bultes-option", "block");

        } else {
            navBultes.style.display = "none";
            localStorage.setItem("bultes-option", "none");
        }

        handelActive(e);
    });
});

// Reset button

document.querySelector(".reset-option").onclick = function() {
    // localStorage.clear(); // to remove all the item in local storage
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bultes-option");

    window.location.reload();

};

console.log(document.querySelector(".reset-option"))