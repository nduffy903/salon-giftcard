import { selectors, textFields, buttons } from '../support/constants.js';

// TODO: CICD
// TODO: README

describe('purchase gift vouchers', () => {
  beforeEach(() => {
    cy.visit('https://gift-cards.phorest.com/salons/demous');
    cy.intercept('GET', '/salons/demous/confirm?*')
        .as('getConfirmation');
    cy.intercept('POST', '/salons/demous/payments')
        .as('postPayments');
    cy.intercept('GET', '/salons/demous/payment?purchase_number=*')
        .as('getPayments');
    cy.intercept('POST', 'https://merchant-ui-api.stripe.com/elements/wallet-config')
        .as('postStripeWalletConfig');
    cy.intercept('GET', '/salons/demous/success?purchase_number=*')
        .as('getPaymentStatus');
  });

  it('users can purchase $50 gift voucher for themselves', () => {
    cy.get('#option50').check();
    cy.get(textFields.purchaserEmailTextField).type('test@test.com');
    cy.get(textFields.purchaserFirstNameTextField).type('Joe');
    cy.get(textFields.purchaserLastNameTextField).type('Bloggs');
    cy.get(selectors.checkoutPrice).should('contain.text', '$50.00');

    cy.get(buttons.checkoutButton).eq(1).click();
    cy.wait('@getConfirmation').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.request.query.paymentAmount).to.equal('50');
      expect(interception.request.query.voucherValue).to.equal('50');
    });

    cy.get(selectors.confirmVoucherValue).should('contain.text', '$50.00');
    cy.get(selectors.confirmPurchaserEmailValue).should('contain.text', 'test@test.com');
    cy.get(selectors.confirmRecipientEmailValue).should('contain.text', 'test@test.com');

    cy.get(buttons.confirmButton).click();
    cy.wait('@postPayments').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.wrap(interception.response.body.purchase_number).as('purchaseNumber');
    });
    cy.wait('@getPayments').then((interception) => {
      // expect(interception.request.query).to.equal(purchaseNumber);
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.wait('@postStripeWalletConfig').its('response.statusCode').should('eq', 200);

    cy.get(selectors.stripePaymentCardDetailsiFrame).scrollIntoView();
    cy.get(selectors.stripePaymentCardDetailsiFrame).should('be.visible').then((iframe) => {
      cy.wrap(iframe.contents().find(textFields.stripeCardNumberTextField))
          .type('4111111111111111');
      cy.wrap(iframe.contents().find(textFields.stripeCardExpiryTextField))
          .type('1223');
      cy.wrap(iframe.contents().find(textFields.stripeCardCvcTextField))
          .type('999').should('have.value', '999');
    });

    cy.get(buttons.stripeConfirmPurchaseButton).click();
    cy.wait('@getPaymentStatus').its('response.statusCode').should('eq', 200);
    cy.get(selectors.paymentStatusText).should('have.text', 'Payment accepted, thank you!');
  });

  it('users can purchase $50 gift voucher for themselves', () => {
    cy.get('#option50').check();
    cy.get(selectors.sendVoucherToSomeoneElseTab).click();
    cy.get(textFields.purchaserEmailTextField).type('test@test.com');
    cy.get(textFields.purchaserFirstNameTextField).type('Joe');
    cy.get(textFields.purchaserLastNameTextField).type('Bloggs');
    cy.get(textFields.recipientEmailTextField).type('friend@test.com');
    cy.get(textFields.recipientMessageTextField).type('Dear Friend, From Joe');
    cy.get(selectors.checkoutPrice).should('contain.text', '$50.00');

    cy.get(buttons.checkoutButton).eq(1).click();
    cy.wait('@getConfirmation').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.request.query.paymentAmount).to.equal('50');
      expect(interception.request.query.voucherValue).to.equal('50');
    });

    cy.get(selectors.confirmPurchaserEmailValue).should('contain.text', 'test@test.com');
    cy.get(selectors.confirmRecipientEmailValue).should('contain.text', 'friend@test.com');

    cy.get(buttons.confirmButton).click();
    cy.wait('@postPayments').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.wrap(interception.response.body.purchase_number).as('purchaseNumber');
    });
    cy.wait('@getPayments').then((interception) => {
      // expect(interception.request.query).to.equal(purchaseNumber);
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.wait('@postStripeWalletConfig').its('response.statusCode').should('eq', 200);

    cy.get(selectors.stripePaymentCardDetailsiFrame).scrollIntoView();
    cy.get(selectors.stripePaymentCardDetailsiFrame).should('be.visible').then((iframe) => {
      cy.wrap(iframe.contents().find(textFields.stripeCardNumberTextField))
          .type('4111111111111111');
      cy.wrap(iframe.contents().find(textFields.stripeCardExpiryTextField))
          .type('1223');
      cy.wrap(iframe.contents().find(textFields.stripeCardCvcTextField))
          .type('999').should('have.value', '999');
    });

    cy.get(buttons.stripeConfirmPurchaseButton).click();
    cy.wait('@getPaymentStatus').its('response.statusCode').should('eq', 200);
    cy.get(selectors.paymentStatusText).should('have.text', 'Payment accepted, thank you!');
  });

});
