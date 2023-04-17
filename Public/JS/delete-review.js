// Delete a Review JS
const delRevFormHandler = async (event) => {
  event.preventDefault();

  let URL = document.URL;
  let URL_array = URL.split("/");
  let id = URL_array[URL_array.length - 1];

  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      review_id: id,
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

// Delete
document
  .querySelector(".delete-review-btn")
  .addEventListener("click", delRevFormHandler);
