const Query = require('../models/query');

const submitQuery = async (req, res) => {
  try {
    const { consumerId, name, subject, message } = req.body;

    if (!consumerId) {
      return response.status(400).json({ message: 'Consumer ID is required' });
    }

    const query = new Query({
      consumerId: consumerId,
      name,
      subject,
      message,
    });

    await query.save();

    res.status(201).json({ query});
  } catch (error) {
    res.status(500).json({ message: 'Error submitting query', error });
  }
};

const getQueries = async (request, response) => {
  try {
    const queries = await Query.find();
    response.status(200).json(queries);
  } catch (error) {
    console.error('Error retrieving queries:', error);
    response.status(500).json({ message: 'Failed to retrieve queries', error: error.message });
  }
};

module.exports = {
  submitQuery,
  getQueries
};

