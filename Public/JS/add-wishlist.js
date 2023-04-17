// Add a want to watch title JS
const addWishFormHandler = async (event) => {
  event.preventDefault();

  const wishlist_title = document.querySelector('input[name="wishlist-title"]')
    .value;

  const response = await fetch(`/api/wishlists`, {
    method: "POST",
    body: JSON.stringify({
      wishlist_title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

// Add
document
  .querySelector(".new-wishlist-form")
  .addEventListener("submit", addWishFormHandler);
