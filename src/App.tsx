import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import {PopoverProvider} from "./providers/PopoverProvider";
import {EditorProvider} from "./providers/EditorProvider";
import {GridEditorConfig} from "./grid/grid-config";
import {StickyEditorConfig} from "./sticky/sticky-config";
import {ListEditorConfig} from "./list/list-config";
import {TabEditorConfig} from "./tab/tab-config";
import {SectionEditorConfig} from "./section/section-config";

const ROUTES = {
  '#grid': GridEditorConfig,
  '#sticky': StickyEditorConfig,
  '#list': ListEditorConfig,
  '#tab': TabEditorConfig,
  '#section': SectionEditorConfig,
};

const App = () => {
  const config = ROUTES[location.hash];

  return (
    <DialogProvider>
      <PopoverProvider>
        {
          config ? <EditorProvider config={config}></EditorProvider> : <div>Invalid</div>
        }
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
