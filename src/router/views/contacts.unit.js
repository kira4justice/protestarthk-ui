import Contacts from './contacts';
import '@plugins/element-ui';

describe('@views/contacts', () => {
  it('is a valid view', () => {
    expect(Contacts).toBeAViewComponent();
  });
});
