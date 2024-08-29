const joi = require('joi');

//______________________________________________________________________
const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) {
            return {
                message: error.details[0].message.replace(/['"]+/g, ""),
                path: error.details[0].path,
                type: error.details[0].type
            };
        } else {
            return false; // No error, validation passed
        }
    } catch (error) {
        throw error;
    }
};
//______________________________________________________________________

const createSupplier = async (data) => {
    const schema = joi.object({
        supplier_id: joi.string().required(),
        company_name: joi.string().required(),
        website: joi.string().required(),
        location: joi.array().items(joi.string().required()).required(),
        nature_of_business: joi.array().items(joi.string().valid('small_scale', 'medium_scale', 'large_scale')).required(),
        manufacturing_processes: joi.array().items(joi.string().valid('moulding', '3d_printing', 'casting', 'coating')).required(),
    });

    const validationResult = await validateSchema(data, schema);

    if (validationResult) {
        return validationResult; 
    }

    return false;
};

const supplier = async (data) => {
    const schema = joi.object({
        company_name: joi.string().optional(),
        location: joi.array().items(joi.string().trim()).optional(),
        nature_of_business: joi.array().items(joi.string().valid('small_scale', 'medium_scale', 'large_scale')).optional(),
        manufacturing_processes: joi.array().items(joi.string().valid('moulding', '3d_printing', 'casting', 'coating')).optional(),
      });
    const validationResult = await validateSchema(data, schema);
    if (validationResult) {
        return validationResult;
    }
    return false; 
};

// Export the functions
module.exports = {
    createSupplier,
    supplier
};
