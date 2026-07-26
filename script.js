/* =====================================================
   CLOUD BRIDGE TOURS & TRAVELS
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   WAIT FOR PAGE TO LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar nav a");


    if (menuIcon) {

        menuIcon.addEventListener("click", function () {

            navbar.classList.toggle("mobile-active");

        });

    }


    /* CLOSE MOBILE MENU AFTER CLICK */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("mobile-active");

        });

    });



    /* =================================================
       SEARCH TABS
    ================================================= */

    const searchTabs = document.querySelectorAll(".search-tabs button");


    searchTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {


            // Remove active class from all tabs

            searchTabs.forEach(function (item) {

                item.classList.remove("active");

            });


            // Add active class to selected tab

            this.classList.add("active");


            // Get selected service

            const serviceName = this.innerText.trim();


            console.log(
                "Selected service:",
                serviceName
            );


        });

    });



    /* =================================================
       TRIP TYPE
    ================================================= */

    const tripRadios =
        document.querySelectorAll(
            'input[name="trip"]'
        );


    tripRadios.forEach(function (radio) {

        radio.addEventListener("change", function () {


            console.log(
                "Trip Type:",
                this.parentElement.innerText.trim()
            );


        });

    });



    /* =================================================
       SWAP FROM / TO
    ================================================= */

    const swapButton =
        document.querySelector(".swap");


    const inputBoxes =
        document.querySelectorAll(
            ".location-row .input-box"
        );


    if (swapButton && inputBoxes.length >= 2) {


        swapButton.addEventListener(
            "click",
            function () {


                const fromText =
                    inputBoxes[0]
                    .querySelector("span");


                const toText =
                    inputBoxes[1]
                    .querySelector("span");


                const temporary =
                    fromText.innerText;


                fromText.innerText =
                    toText.innerText;


                toText.innerText =
                    temporary;


            }
        );


    }



    /* =================================================
       FROM / TO INPUT BOX
    ================================================= */

    const locationInputs =
        document.querySelectorAll(
            ".location-row .input-box"
        );


    locationInputs.forEach(function (input) {


        input.addEventListener(
            "click",
            function () {


                const span =
                    this.querySelector("span");


                if (
                    span.innerText.includes(
                        "departure"
                    )
                ) {


                    const city =
                        prompt(
                            "Enter departure city:"
                        );


                    if (city) {

                        span.innerText =
                            city;

                    }


                }


                else if (
                    span.innerText.includes(
                        "destination"
                    )
                ) {


                    const city =
                        prompt(
                            "Enter destination city:"
                        );


                    if (city) {

                        span.innerText =
                            city;

                    }


                }


            }
        );


    });



    /* =================================================
       DATE SELECTION
    ================================================= */

    const dateInputs =
        document.querySelectorAll(
            ".input-box"
        );


    dateInputs.forEach(function (box) {


        const text =
            box.querySelector("span");


        const icon =
            box.querySelector(
                ".fa-calendar"
            );


        if (
            text &&
            icon
        ) {


            box.addEventListener(
                "click",
                function () {


                    const selectedDate =
                        prompt(
                            "Enter date (DD-MM-YYYY):"
                        );


                    if (selectedDate) {

                        text.innerText =
                            selectedDate;

                    }


                }
            );


        }


    });



    /* =================================================
       TRAVELLER SELECTOR
    ================================================= */

    const passengerBox =
        document.querySelector(
            ".passengers .input-box"
        );


    if (passengerBox) {


        passengerBox.addEventListener(
            "click",
            function () {


                let adults =
                    prompt(
                        "How many travellers?"
                    );


                if (
                    adults !== null &&
                    adults !== "" &&
                    !isNaN(adults) &&
                    Number(adults) > 0
                ) {


                    adults =
                        Number(adults);


                    const travellerText =
                        this.querySelector(
                            "span"
                        );


                    travellerText.innerHTML =

                        "<b>" +
                        adults +
                        "</b> Traveller" +

                        (
                            adults > 1
                                ? "s"
                                : ""
                        ) +

                        ", Economy";


                }


            }
        );


    }



    /* =================================================
       SEARCH FLIGHTS
    ================================================= */

    const searchButton =
        document.querySelector(
            ".search-btn"
        );


    if (searchButton) {


        searchButton.addEventListener(
            "click",
            function () {


                alert(
                    "Thank you! Your flight search request has been received."
                );


            }
        );


    }



    /* =================================================
       GET A QUOTE BUTTON
    ================================================= */

    const quoteButton =
        document.querySelector(
            ".quote-btn"
        );


    if (quoteButton) {


        quoteButton.addEventListener(
            "click",
            function () {


                const name =
                    prompt(
                        "Please enter your name:"
                    );


                if (name) {


                    const phone =
                        prompt(
                            "Please enter your phone number:"
                        );


                    if (phone) {


                        alert(

                            "Thank you, " +
                            name +
                            "!\n\n" +

                            "Our travel consultant will contact you soon."

                        );


                    }


                }


            }
        );


    }



    /* =================================================
       BOOK NOW BUTTONS
    ================================================= */

    const bookButtons =
        document.querySelectorAll(
            ".package-bottom button"
        );


    bookButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                const packageCard =
                    this.closest(
                        ".package-card"
                    );


                const packageName =
                    packageCard
                    .querySelector("h3")
                    .innerText;


                alert(

                    "You selected:\n\n" +

                    packageName +

                    "\n\n" +

                    "Our team will contact you for booking details."

                );


            }
        );


    });



    /* =================================================
       VIEW ALL DESTINATIONS
    ================================================= */

    // const viewButtons =
    //     document.querySelectorAll(
    //         ".view-btn"
    //     );


    // viewButtons.forEach(function (button) {


    //     button.addEventListener(
    //         "click",
    //         function () {


    //             alert(

    //                 "More destinations and packages will be available soon!"

    //             );


    //         }
    //     );


    // });



    // /* =================================================
    //    DISCOVER MORE ABOUT US
    // ================================================= */

    // const discoverButtondiscover-btn =
    //     document.querySelector(
    //         ".discover-btn"
    //     );
         

    // if (discoverButton) {


    //     discoverButton.addEventListener(
    //         "click",
    //         function () {


    //             document
    //                 .querySelector(
    //                     ".about"
    //                 )
    //                 .scrollIntoView({

    //                     behavior: "smooth"

    //                 });


    //         }
    //     );


    // }
    /* =================================================
   DISCOVER MORE ABOUT US
================================================= */

// const discoverButton =
// document.querySelector(".discover-btn");

// if (discoverButton) {

// discoverButton.addEventListener("click", function () {

//     // Open About page
//     window.location.href = "about.html";

// });

// }

   /* =================================================
   VIEW ALL DESTINATIONS
================================================= */

const viewButtons =
document.querySelectorAll(".view-btn");

viewButtons.forEach(function (button) {

button.addEventListener("click", function () {

    // No popup
    // The button will follow its normal href link

});

});


/* =================================================
DISCOVER MORE ABOUT US
================================================= */

Button =
document.querySelector(".discover-btn");

if (discoverButton) {

discoverButton.addEventListener("click", function (event) {

    const aboutSection =
        document.querySelector(".about");

    if (aboutSection) {

        event.preventDefault();

        aboutSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

});

}

    /* =================================================
       NEWSLETTERconst discover
    ================================================= */

    const newsletterButton =
        document.querySelector(
            ".newsletter button"
        );


    const newsletterInput =
        document.querySelector(
            ".newsletter input"
        );


    if (
        newsletterButton &&
        newsletterInput
    ) {


        newsletterButton.addEventListener(
            "click",
            function () {


                const email =
                    newsletterInput.value.trim();


                /* CHECK EMAIL */

                if (email === "") {


                    alert(
                        "Please enter your email address."
                    );


                    return;

                }


                /* SIMPLE EMAIL VALIDATION */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {


                    alert(
                        "Please enter a valid email address."
                    );


                    return;

                }


                alert(

                    "Thank you for subscribing!\n\n" +

                    "You will receive our latest travel offers."

                );


                newsletterInput.value = "";


            }
        );


    }



    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    const allLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allLinks.forEach(function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    targetId === ""
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });


                }


            }
        );


    });



    /* =================================================
       NAVBAR SHADOW ON SCROLL
    ================================================= */

    window.addEventListener(
        "scroll",
        function () {


            const navbar =
                document.querySelector(
                    ".navbar"
                );


            if (
                window.scrollY > 50
            ) {


                navbar.style.boxShadow =

                    "0 4px 15px rgba(0,0,0,0.15)";


            }

            else {


                navbar.style.boxShadow =

                    "0 2px 10px rgba(0,0,0,0.05)";


            }


        }
    );



    /* =================================================
       PACKAGE CARD HOVER EFFECT
    ================================================= */

    const packageCards =
        document.querySelectorAll(
            ".package-card"
        );


    packageCards.forEach(function (card) {


        card.addEventListener(
            "mouseenter",
            function () {


                this.style.cursor =
                    "pointer";


            }
        );


    });



    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "Cloud Bridge Tours & Travels website loaded successfully!"
    );


});