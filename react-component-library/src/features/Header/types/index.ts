export type HeaderPaletteHandlers = {
  setMain: (value: string) => void;
};

export type UseHeaderPaletteResult = {
  main: string;
  handlers: HeaderPaletteHandlers;
};
export type UseDrawerHandlers = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

export type UseDrawerResult = {
  open: boolean;
  handlers: UseDrawerHandlers;
};
