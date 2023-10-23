"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

const isClient = typeof window !== `undefined` && !!window.document;

export function Persistprovider({ children }: { children: React.ReactNode }) {
  if (isClient) {
    return (
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    );
  }

  return null;
}
