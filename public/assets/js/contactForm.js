const form = document.querySelector('.php-email-form');
const errorDiv = document.querySelector('.error-message');
const successDiv = document.querySelector('.sent-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    body: formData,
    redirect: 'manual', // Prevent automatic redirect
  })
    .then((response) => {
      if (response.ok) {
        // Show success message
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        form.reset(); // Clear the form

        // Optionally, scroll to the success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
      } else {
        return response.json().then((data) => {
          // Show error message from the JSON response
          errorDiv.style.display = 'block';
          successDiv.style.display = 'none';
          errorDiv.textContent = data.error;
        });
      }
    })
    .catch((error) => {
      // Show error message
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      errorDiv.textContent = 'An error occurred while sending the message.';
    });
});
