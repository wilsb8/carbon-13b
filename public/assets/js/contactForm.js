const form = document.querySelector('.php-email-form');
const errorDiv = document.querySelector('.error-message');
const successDiv = document.querySelector('.sent-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(form);
    const response = await fetch('/', {
      method: 'POST',
      body: formData,
      redirect: 'manual', // Prevent automatic redirect
    });

    if (response.ok) {
      // Show success message
      successDiv.style.display = 'block';
      errorDiv.style.display = 'none';
      form.reset(); // Clear the form

      // Optionally, scroll to the success message
      successDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      const data = await response.json();
      // Show error message from the JSON response
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      errorDiv.textContent = data.error;
    }
  } catch (error) {
    // Show error message
    errorDiv.style.display = 'block';
    successDiv.style.display = 'none';
    errorDiv.textContent = 'An error occurred while sending the message.';
  }
});
