import { AngularTodosamplePage } from './app.po';

describe('angular-todo-sample App', function() {
  let page: AngularTodosamplePage;

  beforeEach(() => {
    page = new AngularTodosamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
