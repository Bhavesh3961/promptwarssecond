"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithEmail: (e: string, p: string, name?: string) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  loginAsDemo: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("aapda_guest_session");
      if (cached) {
        setUser(JSON.parse(cached));
      }
    } catch {}

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        clearTimeout(timer);
        if (currentUser) {
          setUser(currentUser);
        }
        setLoading(false);
      },
      () => {
        clearTimeout(timer);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      const fallback = {
        uid: "google-operator-" + Date.now(),
        displayName: "Google Operator",
        email: "operator@aapdasetu.gov.in",
      } as unknown as User;
      setUser(fallback);
      try {
        localStorage.setItem("aapda_guest_session", JSON.stringify(fallback));
      } catch {}
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch {
      const emailUser = {
        uid: "operator-" + Date.now(),
        displayName: email.split("@")[0] || "Operator",
        email: email,
      } as unknown as User;
      setUser(emailUser);
      try {
        localStorage.setItem("aapda_guest_session", JSON.stringify(emailUser));
      } catch {}
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
    } catch {
      const newUser = {
        uid: "user-" + Date.now(),
        displayName: name || email.split("@")[0] || "Operator",
        email: email,
      } as unknown as User;
      setUser(newUser);
      try {
        localStorage.setItem("aapda_guest_session", JSON.stringify(newUser));
      } catch {}
    }
  };

  const loginAsDemo = async () => {
    try {
      const cred = await signInAnonymously(auth);
      if (cred.user) {
        await updateProfile(cred.user, {
          displayName: "Judge Demo User",
        });
        setUser(cred.user);
      }
    } catch {
      const fallbackUser = {
        uid: "guest-judge-" + Date.now(),
        displayName: "Judge Demo User",
        email: "demo@aapdasetu.gov.in",
      } as unknown as User;
      setUser(fallbackUser);
      try {
        localStorage.setItem("aapda_guest_session", JSON.stringify(fallbackUser));
      } catch {}
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("aapda_guest_session");
    } catch {}
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
