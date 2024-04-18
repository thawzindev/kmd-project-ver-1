import { create } from "zustand";

interface Store {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useOpenSidebar = create<Store>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set(() => ({ isOpen: false })),
}));

export default useOpenSidebar;
