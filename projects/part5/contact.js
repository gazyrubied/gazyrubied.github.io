const showEmailResult = async (e) => {
    e.preventDefault();
    const result = document.getElementById("success-message");
    let response = await getEmailResult();
    if (response.status == 200) {
        result.style.display = "block";
        result.innerHTML = "Your message has been sent successfully!";
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "An error occurred. Please try again.";
    }
};

const getEmailResult = async (e) => {
    const form = document.getElementById("contact-form");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        });
        return response;
    } catch (error) {
        console.log(error);
        return { status: 500 }; 
    }
};

document.getElementById("contact-form").onsubmit = showEmailResult;
