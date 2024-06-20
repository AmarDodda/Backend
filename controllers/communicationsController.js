const Customer = require('../models/customer');
const Communications = require('../models/communications');
const sendEmail = require('../utils/nodemailer');
const generateFeedbackEmail = require('../templates/combinedEmail');

exports.sendCombinedEmail = async (req, res) => {
  const customerId = req.params.customerId;

  try {
  
    
    const customer = await Customer.findOne({ customerId });
   

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const latestPurchase = customer.purchaseHistory[0];
    const emailContent = generateFeedbackEmail(customer.name, {
      product: latestPurchase.product,
      quantity: latestPurchase.quantity,
      date: latestPurchase.date,
      customerId: customer._id,
    });

    // Send email
    await sendEmail(customer.email, 'We value your feedback and you can raise your queries', emailContent);

    // Save communication history
    const newCommunication = new Communications({
      customer: customerId,
      communicationType: 'email',
      subject: 'We value your feedback',
      content: 'Email sent to customer', 
      emailContent: emailContent,
    });

    await newCommunication.save();

    res.status(200).json({ message: 'Feedback email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
};

exports.getCommunications = async(request,response)=>{
  try {
    const communications = await Communications.find();
    response.status(200).json(communications);
  } catch (error) {
    console.error('Error retrieving communications:', error);
    response.status(500).json({ message: 'Failed to retrieve communications', error: error.message });
  }
}
