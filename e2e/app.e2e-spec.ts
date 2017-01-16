import { AngularTodoSamplpPage } from './app.po';

describe('angular-todo-samplp App', function() {
  let page: AngularTodoSamplpPage;

  beforeEach(() => {
    page = new AngularTodoSamplpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
