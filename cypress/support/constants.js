export const selectors = {
    checkoutPrice: '[data-target="checkout.price"]',
    confirmVoucherValue: '[id="confirm-voucher-value"]',
    confirmPurchaserEmailValue: '[id="confirm-purchaser-email"]',
    confirmRecipientEmailValue: '[id="confirm-recipient-email"]',
    sendVoucherToSomeoneElseTab: '[data-target="tabs.sendToOtherTab"]',
    confirmPurchaseButton: '[data-action="stripe-purchase#confirmPayment"]',
    paymentStatusText: '[class="text-xl font-medium mb-8"]',
    stripePaymentCardDetailsiFrame: 'iframe[name*="__privateStripeFrame"]'
}

export const textFields = {
    purchaserEmailTextField: '[data-target="email.purchaserEmailInput"]',
    purchaserFirstNameTextField: '[data-target="name.purchaserFirstNameInput"]',
    purchaserLastNameTextField: '[data-target="name.purchaserLastNameInput"]',
    recipientEmailTextField: '[data-target="email.recipientEmailInput"]',
    recipientMessageTextField: '[data-target="email.recipientMessageInput"]',
    stripeCardNumberTextField: '[data-elements-stable-field-name="cardNumber"]',
    stripeCardExpiryTextField: '[data-elements-stable-field-name="cardExpiry"]',
    stripeCardCvcTextField: '[data-elements-stable-field-name="cardCvc"]'
}

export const buttons = {
    checkoutButton: '[data-target="checkout.checkoutButton"]',
    confirmButton: '[data-action="confirm#confirmAction"]',
    stripeConfirmPurchaseButton: '[data-action="stripe-purchase#confirmPayment"]'
}

