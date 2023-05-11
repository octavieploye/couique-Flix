// * Hook Store for the modal that shows the movie info

import { create } from 'zustand';

export interface ModalStoreInterface {
    // The movieId is optional because the modal can be opened without a movieId
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

//  Create the store
const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => set({ movieId, isOpen: true }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
}));
export default useInfoModalStore;