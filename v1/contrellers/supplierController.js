const Supplier = require("../../models/supplier");

exports.querySuppliers = async (req, res) => {
  try {
    let query ={};
     query = req.query;
    // Basic input validation (can be enhanced with Joi or other validation libraries)
    if (!query.location || !query.nature_of_business) {
      return res.status(400).json({
        error:
          "Please provide all required fields: location, nature_of_business, and manufacturing_process.",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const suppliers = await Supplier.find({location :query.location ,nature_of_business :query.nature_of_business} )
      .skip((page - 1) * limit)
      .limit(limit);

    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "No suppliers found." });
    }

    // Respond with the fetched suppliers
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers: ", error);
    res.status(500).json({ error: "Server error." });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const {
      supplier_id,
      company_name,
      website,
      location,
      nature_of_business,
      manufacturing_processes,
    } = req.body;

    // Input validation // we can use another validation like joi but we use this because it's small tasks
    if (
      !supplier_id ||
      !company_name ||
      !website ||
      !location ||
      !nature_of_business ||
      !manufacturing_processes
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const existSupplierId = await Supplier.findOne({
      supplier_id,
    });
    if (existSupplierId) {
      return res.status(400).json({ error: "This suplier Id existed" });
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
    res.status(201).json({
      message: "Supplier created successfully",
      supplier: newSupplier,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};
