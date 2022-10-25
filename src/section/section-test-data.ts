import {DataVersion, NienowSection} from '../constants';

export const SectionTestData = JSON.stringify({
  editor: NienowSection,
  version: DataVersion,
  title: true,
  sections: [
    {
      title: 'First',
      text: 'One'
    },
    {
      title: 'Second',
      text: 'Two'
    }
  ]
});
