document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quoteForm");
    const nameField = document.getElementById("quoteName");
    const emailField = document.getElementById("quoteEmail");
    const mobileField = document.getElementById("quoteMobile");
    const serviceField = document.getElementById("quoteService");
    const noteField = document.getElementById("quoteNote");
    const submissionResponse = document.getElementById("submissionResponse");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameField.value;
        const email = emailField.value;
        const mobile = mobileField.value;
        const service = serviceField.value;
        const note = noteField.value;

        submissionResponse.classList.remove("success", "error");

        if (name && email && mobile && service !== "Select A Service" && note) {
            fetch('https://api.mirlex.co.tz/modern-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile: mobile,
                    service: service,
                    note: note
                })
            })
            .then(response => response.json())
            .then(data => {
                submissionResponse.textContent = `Dear ${name}, your quote request has been sent successfully!`;
                submissionResponse.classList.add("success");
                form.reset();
            })
            .catch(error => {
                submissionResponse.textContent = "An error occurred while sending your quote request. Please try again.";
                submissionResponse.classList.add("error");
            });
        } else {
            submissionResponse.textContent = "Please fill in all the fields.";
            submissionResponse.classList.add("error");
        }

        setTimeout(() => {
            submissionResponse.textContent = "";
            submissionResponse.classList.remove("success", "error");
        }, 5000);
    });
});
