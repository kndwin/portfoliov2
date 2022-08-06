import create from "zustand";

type CanvasStore = {
  zoom: number;
  setZoom: (zoom: number) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  zoom: 100,
  setZoom: (zoom) => set((state) => ({ zoom })),
}));
