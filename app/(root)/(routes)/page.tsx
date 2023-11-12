"use client"

import { useEffect } from "react";

import { UseStoreModal } from "@/hooks/use-store-modal";

const RootPage = () => {
  const onOpen = UseStoreModal((state) => state.onOpen);  
  const isOpen = UseStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
export default RootPage;