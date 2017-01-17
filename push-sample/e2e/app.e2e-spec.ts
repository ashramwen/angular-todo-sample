import { PushSamplePage } from './app.po';

describe('push-sample App', function() {
  let page: PushSamplePage;

  beforeEach(() => {
    page = new PushSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
