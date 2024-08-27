const Supplier = require('../../models/supplier');

exports.querySuppliers = async (req, res) => {
  try {
    const { location, nature_of_business, manufacturing_process, page = 1, limit = 10 } = req.query;

    // Input validation
    if (!location || !nature_of_business || !manufacturing_process) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Build the query
    const query = {
      location,
      nature_of_business,
      manufacturing_processes: manufacturing_process,
    };

    const suppliers = await Supplier.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};
