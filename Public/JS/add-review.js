// Add a review JS
const addRevFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="review-title"]').value;
  const review_body = document.querySelector('input[name="review-body"]').value;

  const response = await fetch(`/api/reviews`, {
    method: "POST",
    body: JSON.stringify({
      title,
      review_body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

// Add
document
  .querySelector(".new-review-form")
  .addEventListener("submit", addRevFormHandler);
