const showEmailResults = async (e) => {
  e.preventDefault();
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "Please wait..."; // Display loading message

  try {
    const emailResponse = await getEmailResults();
    if (emailResponse.status == 200) {
      resultElement.innerHTML = "Email Successfully Sent";
      resultElement.style.color = "lightgreen";
    } else {
      resultElement.innerHTML = "Sorry, your email was not sent.";
      resultElement.style.color = "red";
    }
  } catch (error) {
    console.log(error);
    resultElement.innerHTML = "Sorry, your email couldn't be sent";
    resultElement.style.color = "red"; 
  }
};
const getEmailResults = async () => {
  const Form = document.getElementById("contact-form");
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  const emailResults = document.getElementById("email-results");
  const result = document.createElement("p");
  result.innerHTML = "Sending...";
  emailResults.innerHTML = "";
  emailResults.appendChild(result);
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
    result.innerHTML = "Sorry, your email failed to send.";
    result.style.color = "red";
  }
};

document.getElementById("contact-form").onsubmit = showEmailResult;