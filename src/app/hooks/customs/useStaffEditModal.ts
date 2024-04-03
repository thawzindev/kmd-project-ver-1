import { create } from "zustand";

interface EditModalStore {
  isOpen: boolean;
  payload: object;
  onOpen: (payload: object) => void;
  onClose: () => void;
}

const useStaffEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  payload: {},
  onOpen: (payload) => set({ isOpen: true, payload }),
  onClose: () => set({ isOpen: false }),
}));

export default useStaffEditModal;
