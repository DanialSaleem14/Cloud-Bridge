/* =====================================================
   CLOUD BRIDGE TOURS & TRAVELS
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("mobile-active");
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navbar.classList.remove("mobile-active");
        });
    });


    /* =================================================
       SMOOTH SCROLL FOR INDEX PAGE SECTIONS
    ================================================= */

    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#" || targetId === "") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================================
       SEARCH TABS
    ================================================= */

    const searchTabs =
        document.querySelectorAll(".search-tabs button");

    searchTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            searchTabs.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* =================================================
       TRIP TYPE
    ================================================= */

    const tripRadios =
        document.querySelectorAll('input[name="trip"]');

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

        swapButton.addEventListener("click", function () {

            const fromText =
                inputBoxes[0].querySelector("span");

            const toText =
                inputBoxes[1].querySelector("span");

            if (fromText && toText) {

                const temporary =
                    fromText.innerText;

                fromText.innerText =
                    toText.innerText;

                toText.innerText =
                    temporary;

            }

        });

    }


    /* =================================================
       FROM / TO INPUT
    ================================================= */

    const locationInputs =
        document.querySelectorAll(
            ".location-row .input-box"
        );

    locationInputs.forEach(function (input) {

        input.addEventListener("click", function () {

            const span =
                this.querySelector("span");

            if (!span) return;

            if (
                span.innerText.includes("departure")
            ) {

                const city =
                    prompt("Enter departure city:");

                if (city) {
                    span.innerText = city;
                }

            }

            else if (
                span.innerText.includes("destination")
            ) {

                const city =
                    prompt("Enter destination city:");

                if (city) {
                    span.innerText = city;
                }

            }

        });

    });


    /* =================================================
       DATE SELECTION
    ================================================= */

    const dateInputs =
        document.querySelectorAll(".input-box");

    dateInputs.forEach(function (box) {

        const text =
            box.querySelector("span");

        const icon =
            box.querySelector(".fa-calendar");

        if (text && icon) {

            box.addEventListener("click", function () {

                const selectedDate =
                    prompt(
                        "Enter date (DD-MM-YYYY):"
                    );

                if (selectedDate) {
                    text.innerText =
                        selectedDate;
                }

            });

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
                        this.querySelector("span");

                    if (travellerText) {

                        travellerText.innerHTML =
                            "<b>" +
                            adults +
                            "</b> Traveller" +
                            (adults > 1 ? "s" : "") +
                            ", Economy";

                    }

                }

            }
        );

    }


    /* =================================================
       SEARCH FLIGHTS
    ================================================= */

    const searchButton =
        document.querySelector(".search-btn");

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
       GET A QUOTE
    ================================================= */

    const quoteButton =
        document.querySelector(".quote-btn");

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
                    this.closest(".package-card");

                if (packageCard) {

                    const packageName =
                        packageCard.querySelector("h3");

                    if (packageName) {

                        alert(
                            "You selected:\n\n" +
                            packageName.innerText +
                            "\n\n" +
                            "Our team will contact you for booking details."
                        );

                    }

                }

            }
        );

    });


    /* =================================================
       VIEW ALL DESTINATIONS
       NO POPUP
    ================================================= */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                // Allow normal link navigation
                // No popup

            }
        );

    });


    /* =================================================
       DISCOVER MORE ABOUT US
       NO POPUP
    ================================================= */

    const discoverButton =
        document.querySelector(".discover-btn");

    if (discoverButton) {

        discoverButton.addEventListener(
            "click",
            function (event) {

                const aboutSection =
                    document.querySelector(".about");

                if (aboutSection) {

                    event.preventDefault();

                    aboutSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =================================================
       NEWSLETTER
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

                if (email === "") {

                    alert(
                        "Please enter your email address."
                    );

                    return;

                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(email)
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
       NAVBAR SHADOW ON SCROLL
    ================================================= */

    window.addEventListener(
        "scroll",
        function () {

            const currentNavbar =
                document.querySelector(".navbar");

            if (!currentNavbar) return;

            if (window.scrollY > 50) {

                currentNavbar.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.15)";

            } else {

                currentNavbar.style.boxShadow =
                    "0 2px 10px rgba(0,0,0,0.05)";

            }

        }
    );


    /* =================================================
       PACKAGE CARD HOVER
    ================================================= */

    const packageCards =
        document.querySelectorAll(".package-card");

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