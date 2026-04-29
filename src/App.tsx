import "./App.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { messaging } from "./lib/firebase";
import { useMessaging } from "./hooks/useMessaging";

function App() {
  useMessaging();
  useEffect(() => {
    console.log("messaging.app.options.measurementId", messaging.app);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((err) => {
          console.error("SW registration failed:", err);
        });
    }
  }, []);
  return (
    <div className="h-screen">
      <RouterProvider router={createRouter({ routeTree })} />
    </div>
  );
}

export default App;
