const logout = async function () {
  const response = await fetch('/api/user/logout', {
    // Create the functionality to help create the buttons for your website.
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
