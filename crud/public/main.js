document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#submissionsTable tbody");

  // Function to fetch and display data
  async function loadSubmissions() {
    try {
      const response = await fetch("/submissions"); // Fetch data from the backend
      const submissions = await response.json();

      if (submissions.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No data available</td></tr>";
      } else {
        tableBody.innerHTML = submissions
          .map(
            (sub) => `
            <tr>
              <td>${sub.id}</td>
              <td>${sub.name}</td>
              <td>${sub.email}</td>
              <td>${sub.message}</td>
            </tr>
          `
          )
          .join("");
      }
    } catch (error) {
      console.error("Error loading submissions:", error);
      tableBody.innerHTML = "<tr><td colspan='4'>Error fetching data</td></tr>";
    }
  }

  // Load data on page load
  loadSubmissions();
});
