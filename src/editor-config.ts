export interface IEditorConfig {
  editor: () => JSX.Element;
  testData: string;
  transform: (text?: string) => any;
}

