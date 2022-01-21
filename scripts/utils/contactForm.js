function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Function to close form by ESC key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

//Functions for the form submission and logging results to the console
const formField = document.querySelector("form");

function logToConsole() {
    const element = formField.elements;
    console.log ("First name: ", element.firstName.value);
    console.log ("Last name: ", element.lastName.value);
    console.log ("Email: ", element.email.value);
    console.log ("Message: ", element.message.value);
}

formField.addEventListener("submit", (e) => {
    e.preventDefault();
    logToConsole();
    formField.reset();
    closeModal();
});