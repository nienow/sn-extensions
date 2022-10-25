import {DataVersion, NienowSticky} from '../constants';

export const StickyTestData = JSON.stringify({
  editor: NienowSticky,
  version: DataVersion,
  sections: {
    1: {title: 'Test One', text: 'Note One', index: 0},
    2: {title: 'Test Two', text: 'Note Two', index: 1}
  }
});
