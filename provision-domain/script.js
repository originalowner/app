document.getElementById('subdomain-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const subdomain = document.getElementById('subdomain').value.trim();
  const target = document.getElementById('target').value.trim();
  const messageDiv = document.getElementById('message');

  messageDiv.textContent = 'Processing...';

  try {
    const response = await fetch('api/provision-subdomain.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subdomain, target })
    });

    const result = await response.json();

    if (response.ok) {
      messageDiv.textContent = `✅ Subdomain ${subdomain}.example.com created successfully!`;
    } else {
      messageDiv.textContent = `❌ Error: ${result.error || 'Unknown error'}`;
    }
  } catch (error) {
    messageDiv.textContent = `❌ Request failed: ${error.message}`;
  }
});