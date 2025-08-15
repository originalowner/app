async function sendAcknowledgmentEmail() {
  const apiUrl = "https://8k4lke68zk.execute-api.ap-south-1.amazonaws.com/myprodstage_ppppp"; // Replace with your actual API Gateway URL

  const requestBody = {
    email: "recipient@example.com",
    firstname: "John",
    lastname: "Doe",
    name: "John",
    message: "I'm interested in your services. Please contact me back!"
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data.message);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}