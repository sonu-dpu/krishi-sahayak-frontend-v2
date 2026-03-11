import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  throw new Error("API_URL not set in environment variables.");
}

export const apiClient = axios.create({
  baseURL: baseUrl || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { baseUrl as API_BASE_URL };
// We can't directly use Clerk hooks outside React components,
// so the token needs to be passed explicitly to the API calls or
// we can set a global interceptor if we have a way to access the token globally.
//
// For this implementation, we'll pass the token to the functions that make the calls.
