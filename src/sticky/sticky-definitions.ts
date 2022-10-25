export interface IStickyData {
  editor: string;
  version: number;
  sections: { [key: number]: IStickySectionData };
}

export interface IStickySectionData {
  index?: number;
  title?: string;
  text?: string;
}
