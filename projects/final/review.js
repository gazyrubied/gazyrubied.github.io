document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', submitReview);
});

const submitReview = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
      const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
          const result = await response.json();
          console.log('Review submitted successfully:', result);
      } else {
          console.error('Error submitting review:', response.statusText);
      }
  } catch (error) {
      console.error('Error submitting review:', error.message);
  }
};
