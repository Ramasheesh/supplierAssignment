const Supplier = require("../../models/supplier");
const validate = require('../vailidations/supplierVailidation')

exports.querySuppliers = async (req, res) => {
  try {
    const validateData = await validate.supplier(req.body);
    if (validateData) {
        return res.status(400).json(validateData); 
    }
    const qry ={};
    const queryData = req.query;
    console.log('queryData: ', queryData);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if(queryData.location){
      qry.location =  { $regex: new RegExp(queryData.location.trim(), 'i') };
    }
    if(queryData.nature_of_business){
      qry.nature_of_business = queryData.nature_of_business;
    }
    if(queryData.manufacturing_processes){
      qry.manufacturing_processes =queryData.manufacturing_processes;
    }
    if(queryData.company_name){
      qry.company_name = queryData.company_name;
    }
    const suppliers = await Supplier.find(qry)
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
    const validateData = await validate.createSupplier(req.body);
    if (validateData) {
        return res.status(400).json(validateData);
    }
    const {
      supplier_id,
      company_name,
      website,
      location,
      nature_of_business,
      manufacturing_processes,
    } = req.body;

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
