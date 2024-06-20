const Feedback = require('../models/feedback');

const FeedbackController = async (request, response) => {
  try {
    const { consumerId, name, product, rating, comment, date } = request.body;

    if (!consumerId && !request.userId) {
      return response.status(400).json({ message: 'Consumer ID is required' });
    }

    const newFeedback = new Feedback({
      consumerId: consumerId || request.userId,
      name,
      product,
      rating: parseInt(rating),
      comment,
      date: date ? new Date(date) : new Date(),
    });

    await newFeedback.save();

    response.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    response.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

const getFeedbacks = async (request, response) => {
  try {
    const feedbacks = await Feedback.find();
    response.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    response.status(500).json({ message: 'Failed to retrieve feedbacks', error: error.message });
  }
};


module.exports = {
    FeedbackController,
    getFeedbacks,
  };
