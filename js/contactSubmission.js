document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameField.value;
        const email = emailField.value;
        const subject = subjectField.value;
        const message = messageField.value;

        const submissionResponse = document.createElement("div");
        submissionResponse.classList.add("submission-response");

        if (name && email && subject && message) {
            fetch('https://api.mirlex.co.tz/modern-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                submissionResponse.textContent = `Dear ${name}, your message has been sent successfully!`;
                submissionResponse.classList.add("success");
                form.reset();
            })
            .catch(error => {
                submissionResponse.textContent = "An error occurred while sending your message. Please try again.";
                submissionResponse.classList.add("error");
            });
        } else {
            submissionResponse.textContent = "Please fill in all the fields.";
            submissionResponse.classList.add("error");
        }

        form.appendChild(submissionResponse);

        setTimeout(() => {
            submissionResponse.remove();
        }, 5000);
    });
});
