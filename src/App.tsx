import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import GridEditor from "./grid/GridEditor";
import ListEditor from "./list/ListEditor";
import TabEditor from "./tab/TabEditor";
import {PopoverProvider} from "./providers/PopoverProvider";
import SectionEditor from "./section/SectionEditor";
import StickyEditor from "./sticky/StickyEditor";

const DEFAULT_ROUTE = <div>Invalid</div>;
const ROUTES = {
  '#grid': <GridEditor></GridEditor>,
  '#sticky': <StickyEditor></StickyEditor>,
  '#list': <ListEditor></ListEditor>,
  '#tab': <TabEditor></TabEditor>,
  '#section': <SectionEditor></SectionEditor>,
};

const App = () => {
  return (
    <DialogProvider>
      <PopoverProvider>
        {
          ROUTES[location.hash] || DEFAULT_ROUTE
        }
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
