const generateCombinedEmail = (customerName, purchaseDetails) => {
  return `
    <h3>Hi ${customerName},</h3>
    <p>Thank you for your recent purchase! We see that you bought ${purchaseDetails.quantity} of ${purchaseDetails.product} on ${purchaseDetails.date}.</p>
    <p>We would love to hear about your experience. Could you please share your feedback by clicking the link below?</p>
    <a href="http://localhost:5173/consumerregister">Give Feedback</a>
    <p>You can also raise any queries you have <a href="http://localhost:5173/consumerregister">here</a>.</p>
    <p>Already have an account?<a href="http://localhost:5173/consumerlogin">Visit here</a></p>
    <p>Thank you!</p>
  `;
};

module.exports = generateCombinedEmail;
