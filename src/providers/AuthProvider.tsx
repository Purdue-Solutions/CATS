import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { getFirebaseAuth } from "@/lib/firebase/utils";
import { User, onAuthStateChanged } from "firebase/auth";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getFirebaseAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (firebaseUser) => {
        setUser(firebaseUser);
    });

    return unsubscribe;
  }, [auth]);

  return <AuthContext.Provider value={ user }>{ children }</AuthContext.Provider>;
};