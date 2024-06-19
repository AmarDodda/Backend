// const Customer = require('../models/customerModel');
// const Communication = require('../models/communicationModel');
// const sendEmail = require('../utils/nodemailer');
// const generateFeedbackEmail = require('../templates/feedbackEmail');

// exports.sendFeedbackEmail = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;
//     const customer = await Customer.findById(customerId);

//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     // Assuming you want the latest purchase for the customer
//     const latestPurchase = customer.purchaseHistory[0];

//     // Constructing the email content dynamically with actual product details
//     const emailContent = generateFeedbackEmail(customer.name, {
//       product: latestPurchase.product,
//       quantity: latestPurchase.quantity,
//       date: latestPurchase.date,
//       customerId: customer._id,
//     });

//     // Sending the email using nodemailer
//     await sendEmail(customer.email, 'Feedback and Query Form', emailContent);

//     // Saving the communication record in MongoDB
//     const communication = new Communication({
//       customer: customer._id,
//       communicationType: 'email',
//       subject: 'Feedback and Query Form',
//       content: emailContent,
//     });
//     await communication.save();

//     res.status(200).json({ message: 'Feedback and Query email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ message: 'Error sending email', error: error.message });
//   }
// };

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

    // Assuming you want to use the latest purchase for email content
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
      content: 'Email sent to customer', // Optional: You can customize this based on your needs
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
