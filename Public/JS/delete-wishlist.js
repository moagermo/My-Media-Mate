// Delete a wishlist item JS
const delWishListFormHandler = async (event) => {
  event.preventDefault();

  let URL = document.URL;
  let URL_array = URL.split("/");
  let id = URL_array[URL_array.length - 1];

  const response = await fetch(`/api/wishlists/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      wishlist_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/list");
  } else {
    alert(response.statusText);
  }
};

// Delete
document
  .querySelector(".delete-wishlist-btn")
  .addEventListener("click", delWishListFormHandler);
