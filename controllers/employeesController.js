const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res
      .status(204)
      .json({ success: false, message: 'No employees found.' });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ success: false, message: 'First and last names are required.' });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: 'ID parameter is required.' });

  const employee = await Employee.findOne({ _id: id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `NO employee matches IDD ${req.body.id} ` });
  }
  if (firstname) employee.firstname = firstname;
  if (lastname) employee.lastname = lastname;

  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: 'Employee ID required.' });
  const employee = await Employee.findOne({ _id: id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `NO employee matches ID ${req.body.id} ` });
  }

  const result = await employee.deleteOne({ _id: id });

  res.json(result);
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: 'Employee ID required.' });
  const employee = await Employee.findOne({ _id: id }).exec();
  console.log('database', typeof employee);

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
