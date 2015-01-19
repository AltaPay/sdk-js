/**
 * Recognized auth types (aka PaymentRequest.authType)
 * @type {{payment: string, paymentAndCapture: string, subscription: string, subscriptionAndCharge: string, verifyCard: string}}
 */
AuthType = {
      payment: 'payment'
    , paymentAndCapture: 'paymentAndCapture'
    , subscription: 'subscription'
    , subscriptionAndCharge: 'subscriptionAndCharge'
    , verifyCard: 'verifyCard'
}