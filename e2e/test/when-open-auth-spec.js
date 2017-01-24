describe('when open auth page', function(){
  it('should show form', function(){
    browser.get('http://localhost:3000');

    var form = $('auth');

    expect(form.isDisplayed()).toBeTruthy();
  });

  it('should customer hidden', function(){
    browser.get('http://localhost:3000');

    var customer = element(by.className('customer'));

    expect(customer.isDisplayed()).toBeFalsy();
  });
});