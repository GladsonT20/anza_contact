document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form's default behavior
  
      // Gather form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };
  
      try {
        // Send form data to the server
        const response = await fetch("/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message); // Success message
          form.reset(); // Clear the form
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  