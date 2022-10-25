export interface ISectionData {
  editor: string;
  version: number;
  title?: boolean;
  sections: Section[];
}

export interface Section {
  title?: string;
  text?: string;
}
