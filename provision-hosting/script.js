document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const domain = document.getElementById('domain').value.trim();
  const usecase = document.getElementById('usecase').value.trim();
  const agree = document.getElementById('agree').checked;
  const status = document.getElementById('formStatus');

  if (!name || !email || !domain || !usecase || !agree) {
    status.textContent = "Please complete all required fields.";
    status.style.color = "red";
    return;
  }

  // Simulate submission
  status.textContent = "Submitting...";
  status.style.color = "#333";

  // Simulate server call delay
  setTimeout(() => {
    status.textContent = "Success! Check your email for provisioning details.";
    status.style.color = "green";
    document.getElementById('signupForm').reset();
  }, 1500);
});