"use client"

import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  
  const[isMounted, setIsMounted] = useState(false);

  //evita las renderizaciones innecesarias antes de que el componente esté montado

  useEffect (() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};