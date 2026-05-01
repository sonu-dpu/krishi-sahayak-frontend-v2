import { messaging, saveTokenToServer } from "@/lib/firebase";

import { useAuth } from "@clerk/clerk-react";
import { getToken } from "firebase/messaging";
import { useEffect } from "react";

export const useMessaging = () => {
  const { getToken: getClerkToken } = useAuth();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    console.log("user", isSignedIn);
    if (!isSignedIn) return;
    getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VPID,
    })
      .then(async (currentToken) => {
        if (currentToken) {
          await saveTokenToServer(currentToken, getClerkToken);

          console.log("currentToken", currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, [getClerkToken, isSignedIn]);
};
