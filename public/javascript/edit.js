const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: { 'Content-Type': 'application/json' },

  });

  if (response.ok) {
  document.location.replace('/dashboard');
  } else {
    alert('Unable to update post.');
  }
};

const deleteClickHandler = async function() {
  const response = await fetch(`/api/posts/${postId}`, {
    // Create the functionality to help create the buttons for your website.
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
  document.location.replace('/dashboard');
  } else {
    alert('Unable to delete post.');
  }


  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
