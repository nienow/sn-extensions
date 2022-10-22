export interface ITabData {
  editor: string;
  version: number;
  tabs: Tab[];
}

export interface Tab {
  title?: string;
  text?: string;
}
