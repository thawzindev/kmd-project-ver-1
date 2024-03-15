import { create } from "zustand";

interface DeleteModalStore {
  isOpen: boolean;
  name: string;
  slug: string;
  onOpen: (slug: string, name: string) => void;
  onClose: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  name: "",
  slug: "",
  onOpen: (slug, name) => set({ isOpen: true, slug, name }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
