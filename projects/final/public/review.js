const getReviews = async () => {
  try {
      return (await fetch("/api/Reviews")).json();
  } catch (error) {
      console.log(error);
  }
};

const showReviews = async () => {
  let reviews = await getReviews();
  let reviewsDiv = document.getElementById("review-list");
  reviewsDiv.innerHTML = "";
  reviews.forEach((review) => {
      const section = document.createElement("section");
      section.classList.add("review");
      reviewsDiv.append(section);

      const a = document.createElement("a");
      a.href = "#";
      section.append(a);

      const h3 = document.createElement("h3");
      h3.innerHTML = review.title;
      a.append(h3);

      a.onclick = (e) => {
          e.preventDefault();
          displayDetails(review);
      };
  });
};

const displayDetails = (review) => {
  const reviewDetails = document.getElementById("review-details");
  reviewDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = review.name;
  reviewDetails.append(h3);

  const img = document.createElement("img");
  img.src = review.img;
  img.alt = review.name;
  img.classList.add("review-image");
  reviewDetails.append(img);

  const dLink = document.createElement("a");
  dLink.innerHTML = "&#x2715;";
  reviewDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  reviewDetails.append(eLink);
  eLink.id = "edit-link";

  const p = document.createElement("p");
  reviewDetails.append(p);
  p.innerHTML = `Name: ${review.name},Title: ${review.title}, Review: ${review.rating}, Analysis: ${review.analysis}, `;

  const ul = document.createElement("ul");
  reviewDetails.append(ul);
 

  eLink.onclick = (e) => {
      e.preventDefault();
      showEditForm(review);
  };

  dLink.onclick = (e) => {
      e.preventDefault();
      showDeleteConfirmation(review);
  };
};

const showEditForm = (review) => {
  const form = document.getElementById("add-edit-review-form");
  form._id.value = review._id;
  form.name.value = review.name;
  form.title.value = review.title;
  form.rating.value = review.rating;
  form.analysis.value = review.analysis;


  document.querySelector(".dialog").classList.remove("transparent");
  document.getElementById("add-edit-title").innerHTML = "Edit Review";
};
const addEditReview = async (e) => {
  e.preventDefault();
  const form = document.getElementById("add-edit-review-form");
  const formData = new FormData(form);

  try {
    if (form._id.value === "-1") {
      formData.delete("_id"); // Remove _id for new reviews
      const response = await fetch("/api/Reviews", {
        method: "POST",
        body: formData,
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        displayErrorMessage(errorData.message);
        console.error("Error with data:", errorData);
        return;
      }

      const newReview = await response.json();
      displayDetails(newReview);
    } else {
      const response = await fetch(`/api/Reviews/${form._id.value}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        displayErrorMessage(errorData.message);
        console.error("Error updating review", errorData);
        return;
      }

      const updatedReview = await response.json();
      displayDetails(updatedReview);
    }

    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showReviews();
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage("An unexpected error occurred.");
  }
};

const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);


const displayErrorMessage = (message) => {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
};
const showDeleteConfirmation = (review) => {
  const confirmDelete = window.confirm("Do you want to delete this review?");

  if (confirmDelete) {
      deleteReview(review);
  }
};

const deleteReview = async (review) => {
  let response = await fetch(`/api/Reviews/${review._id}`, {
      method: "DELETE",
  });

  if (response.status !== 200) {
      console.log("Error deleting");
      return;
  }

  showReviews(); // Refresh the review list after deletion
  document.getElementById("review-details").innerHTML = "";
  resetForm();
};

const resetForm = () => {
  const form = document.getElementById("add-edit-review-form");
  form.reset();
  form._id.value = "-1";

};

const showHideAdd = (e) => {
  e.preventDefault();
  document.querySelector(".dialog").classList.remove("transparent");
  document.getElementById("add-edit-title").innerHTML = "Add Review";
  resetForm();
};

window.onload = () => {
  showReviews();
  document.getElementById("add-edit-review-form").onsubmit = addEditReview;
  document.getElementById("add-link").onclick = showHideAdd;


  const reviewDetailsColumn = document.getElementById("review-details-column");
  reviewDetailsColumn.style.display = "none";


  const columnsTwoColumns = document.querySelector('.columns.two-columns');
  columnsTwoColumns.addEventListener('click', () => {

      reviewDetailsColumn.style.display = reviewDetailsColumn.style.display === 'none' ? 'block' : 'none';
  });

  document.querySelector(".close").onclick = () => {
      document.querySelector(".dialog").classList.add("transparent");


      reviewDetailsColumn.style.display = "none";
  };
};
