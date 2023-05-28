const form = document.querySelector('.php-email-form');
const errorDiv = document.querySelector('.error-message');
const successDiv = document.querySelector('.sent-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(form);

    // Convert FormData to JSON
    const formDataJSON = Object.fromEntries(formData.entries());

    const response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify(formDataJSON), // send JSON data
      headers: {
        'Content-Type': 'application/json' // specify content type
      },
      redirect: 'manual',
    });

    const responseBody = await response.text();
    console.log('*** Response Body:', responseBody);

    if (response.ok) {
      if (response.headers.get('content-type').includes('application/json')) {
        const data = JSON.parse(responseBody);  // Parse the response body as JSON
        console.log('*** Data:', data);
        successDiv.textContent = data.message;
      }

      successDiv.style.display = 'block';
      errorDiv.style.display = 'none';
      form.reset();

      successDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (response.headers.get('content-type').includes('application/json')) {
        const data = JSON.parse(responseBody);  // Parse the response body as JSON
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        errorDiv.textContent = data.error;
      } else {
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        errorDiv.textContent = 'An error occurred while sending the message.';
      }
    }
  } catch (error) {
    errorDiv.style.display = 'block';
    successDiv.style.display = 'none';
    errorDiv.textContent = 'An error occurred while sending the message.';
  }
});
