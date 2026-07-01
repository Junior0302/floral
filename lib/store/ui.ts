import { create } from "zustand";

interface UiState {
  mobileNavOpen: boolean;
  pageLoading: boolean;
  closeMobileNavAfterLoad: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  navigateFromMobile: () => void;
  setPageLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  mobileNavOpen: false,
  pageLoading: false,
  closeMobileNavAfterLoad: false,

  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

  toggleMobileNav: () =>
    set((s) => ({
      mobileNavOpen: !s.mobileNavOpen,
      closeMobileNavAfterLoad: false,
    })),

  /** Clic lien mobile : garder le menu ouvert pendant le chargement */
  navigateFromMobile: () => set({ closeMobileNavAfterLoad: true }),

  setPageLoading: (loading) => {
    set({ pageLoading: loading });
    if (!loading && get().closeMobileNavAfterLoad) {
      set({ mobileNavOpen: false, closeMobileNavAfterLoad: false });
    }
  },
}));
