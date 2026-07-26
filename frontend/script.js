// =========================
// WELCOME MESSAGE
// =========================

console.log("Welcome to Jackson Nyabera's Portfolio!");


// =========================
// DYNAMIC COPYRIGHT YEAR
// =========================

const currentYear = new Date().getFullYear();

const footerText = document.querySelector("footer p");

footerText.textContent =
    `© ${currentYear} Jackson Nyabera. All Rights Reserved.`;


// =========================
// NAVIGATION LINK INTERACTION
// =========================

const navigationLinks = document.querySelectorAll("nav a");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        console.log(`You clicked: ${link.textContent}`);

    });

});

// =========================
// MOBILE MENU
// =========================

const menuButton = document.querySelector("#menu-button");

const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", function() {

    navMenu.classList.toggle("active");

});

// =========================
// CONTACT FORM
// =========================

const contactForm = document.querySelector("#contact-form");

const formMessage = document.querySelector("#form-message");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.querySelector("#name").value;

    const email = document.querySelector("#email").value;

    const message = document.querySelector("#message").value;


    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        });


        const data = await response.json();


        formMessage.textContent = data.message;

        contactForm.reset();


    } catch (error) {

        formMessage.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    }

});