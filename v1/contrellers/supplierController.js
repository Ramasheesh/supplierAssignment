const Supplier = require("../../models/supplier");

exports.querySuppliers = async (req, res) => {
  try {
    const {
      location,
      nature_of_business,
      manufacturing_process,
      page = 1,
      limit = 10,
    } = req.query;

    // Input validation
    if (!location || !nature_of_business || !manufacturing_process) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
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
    res.status(500).json({ error: "Server error." });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const { supplier_id, company_name, website, location, nature_of_business, manufacturing_processes } = req.body;

    // Input validation // we can use another validation like joi but we use this because it's small tasks
    if (!supplier_id || !company_name || !website || !location || !nature_of_business || !manufacturing_processes) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const newSupplier = new Supplier({
      supplier_id,
      company_name,
      website,
      location,
      nature_of_business,
      manufacturing_processes,
    });

    await newSupplier.save();
    res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};
