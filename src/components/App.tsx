import React from 'react';
import {DialogProvider} from "../providers/DialogProvider";
import GridEditor from "../grid/GridEditor";
import ListEditor from "../list/ListEditor";

const DEFAULT_ROUTE = <div>Invalid</div>;
const ROUTES = {
  '#grid': <GridEditor></GridEditor>,
  '#list': <ListEditor></ListEditor>
};

const App = () => {
  return (
    <DialogProvider>
      {
        ROUTES[location.hash] || DEFAULT_ROUTE
      }
    </DialogProvider>
  );
}

export default App
