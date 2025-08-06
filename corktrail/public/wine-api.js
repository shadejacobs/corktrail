const API_BASE_URL = "https://your-api-url.com"; // replace with actual API base URL
const API_KEY = "your_api_key_here"; // replace with your actual API key

async function fetchWineData(winename, vintage = "", currencycode = "USD") {
  const url = `${API_BASE_URL}?api_key=${API_KEY}&winename=${encodeURIComponent(winename)}&vintage=${vintage}&currencycode=${currencycode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Wine Data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch wine data:", error);
  }
}



