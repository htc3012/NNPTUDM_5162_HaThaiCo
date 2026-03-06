var express = require('express');
var router = express.Router();
let roleSchema = require('../schemas/roles');

// GET /api/v1/roles
router.get('/', async function (req, res, next) {
  try {
    let roles = await roleSchema.find({ isDeleted: false });

    res.status(200).send({
      success: true,
      message: 'GET ROLES SUCCESS',
      data: roles
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// GET /api/v1/roles/:id
router.get('/:id', async function (req, res, next) {
  try {
    let result = await roleSchema.findOne({ _id: req.params.id, isDeleted: false });

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'ROLE NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'GET ROLE SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'ROLE NOT FOUND'
    });
  }
});

// POST /api/v1/roles
router.post('/', async function (req, res, next) {
  try {
    let newRole = new roleSchema({
      name: req.body.name,
      description: req.body.description
    });

    await newRole.save();

    res.status(201).send({
      success: true,
      message: 'CREATE ROLE SUCCESS',
      data: newRole
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// PUT /api/v1/roles/:id
router.put('/:id', async function (req, res, next) {
  try {
    let result = await roleSchema.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'ROLE NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'UPDATE ROLE SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/v1/roles/:id (soft delete)
router.delete('/:id', async function (req, res, next) {
  try {
    let result = await roleSchema.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'ROLE NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'DELETE ROLE SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
