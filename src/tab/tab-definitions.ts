export interface ITabData {
  editor: string;
  version: number;
  tabs: Tab[];
}

export const NienowGrid = 'nienow.grid';
export const NienowSticky = 'nienow.sticky';
export const DataVersion = 1;

export interface Tab {
  title?: string;
  text?: string;
}
