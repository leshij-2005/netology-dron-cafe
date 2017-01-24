describe('when open customer page', function(){
  beforeEach(function() {
    browser.executeScript('window.localStorage.user = JSON.stringify({"_id":"587c5733d7a5500b40390257","name":"asdas","email":"al@qweqw.ru","balance":164,"__v":0});');
    browser.get('http://localhost:3000');
    browser.executeScript('window.localStorage.clear();');
  });

  it('should form hidden', function(){
    var form = element(by.className('auth'));

    expect(form.isDisplayed()).toBeFalsy();
  });

  it('should show customer', function(){
    var customer = element(by.className('customer'));
    var name = element(by.className('profile__name'));
    var email = element(by.className('profile__email'));
    var balance = element(by.className('profile__balance'));

    expect(customer.isDisplayed()).toBeTruthy();

    expect(name.getText()).toEqual('asdas');
    expect(email.getText()).toEqual('al@qweqw.ru');
    expect(balance.getText()).toEqual('164 Credits');
  });
});