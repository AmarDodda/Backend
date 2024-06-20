const Customer = require('../models/customer');

const customerController = {
  createCustomer: async (request, response) => {
    try {
      const { customerId,name, email, purchaseHistory, preferences } = request.body;
      const newCustomer = new Customer({
        customerId:customerId,
        name,
        email,
        purchaseHistory,
        preferences,
      });
      const savedCustomer = await newCustomer.save();
      response.status(201).json(savedCustomer);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getAllCustomers: async (request, response) => {
    try {
      const customers = await Customer.find();
      response.json(customers);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getCustomerById: async (request, response) => {
    try {
      const customerId = request.params.id;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return response.status(404).json({ message: 'Customer not found' });
      }
      response.json(customer);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  updateCustomerById: async (request, response) => {
    try {
      const customerId = request.params.id;
      const { name, email, purchaseHistory, preferences } = request.body;
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { name, email, purchaseHistory, preferences },
        { new: true }
      );
      if (!updatedCustomer) {
        return response.status(404).json({ message: 'Customer not found' });
      }
      response.json(updatedCustomer);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  deleteCustomerById: async (request, response) => {
    try {
      const customerId = request.params.id;
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
      if (!deletedCustomer) {
        return response.status(404).json({ message: 'Customer not found' });
      }
      response.json({ message: 'Customer deleted' });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = customerController;
