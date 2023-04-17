// Edit a Review JS
const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="review-title"]').value;
  const review_body = document.querySelector('input[name="review-body"]').value;
  let URL = document.URL;
  let URL_array = URL.split("/");
  let id = URL_array[URL_array.length - 1];

  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      review_body,
      review_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
};

// Edit
document
  .querySelector(".edit-review-form")
  .addEventListener("submit", editFormHandler);
