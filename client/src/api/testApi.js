// client/src/api/testApi.js
export const fetchTestMessage = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/test");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from backend:", error);
    return { message: "❌ Backend connection failed" };
  }
};
