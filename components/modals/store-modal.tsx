"use client";

import { UseStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModal = UseStoreModal();

  return (
    <Modal
      title="Nueva tienda"
      description="Crea una tienda nueva para manejar tus productos y categorías"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Formulario para crear una tienda nueva 
    </Modal>
  )
}