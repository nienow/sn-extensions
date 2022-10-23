export interface ISectionData {
  editor: string;
  version: number;
  sections: Section[];
}

export interface Section {
  title?: string;
  text?: string;
}
