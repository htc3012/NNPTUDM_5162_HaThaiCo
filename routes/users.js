var express = require('express');
var router = express.Router();
let userSchema = require('../schemas/users');

// GET /api/v1/users
router.get('/', async function (req, res, next) {
  try {
    let users = await userSchema
      .find({ isDeleted: false })
      .populate({ path: 'role', select: 'name description' });

    res.status(200).send({
      success: true,
      message: 'GET USERS SUCCESS',
      data: users
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// POST /api/v1/users
router.post('/', async function (req, res, next) {
  try {
    let newUser = new userSchema({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      status: req.body.status,
      role: req.body.role,
      loginCount: req.body.loginCount
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: 'CREATE USER SUCCESS',
      data: newUser
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// POST /api/v1/users/enable
router.post('/enable', async function (req, res, next) {
  try {
    let result = await userSchema.findOneAndUpdate(
      {
        email: req.body.email,
        username: req.body.username,
        isDeleted: false
      },
      { status: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'USER NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'ENABLE USER SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// POST /api/v1/users/disable
router.post('/disable', async function (req, res, next) {
  try {
    let result = await userSchema.findOneAndUpdate(
      {
        email: req.body.email,
        username: req.body.username,
        isDeleted: false
      },
      { status: false },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'USER NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'DISABLE USER SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// GET /api/v1/users/:id
router.get('/:id', async function (req, res, next) {
  try {
    let result = await userSchema
      .findOne({ _id: req.params.id, isDeleted: false })
      .populate({ path: 'role', select: 'name description' });

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'USER NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'GET USER SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'USER NOT FOUND'
    });
  }
});

// PUT /api/v1/users/:id
router.put('/:id', async function (req, res, next) {
  try {
    let result = await userSchema.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'USER NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'UPDATE USER SUCCESS',
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/v1/users/:id (soft delete)
router.delete('/:id', async function (req, res, next) {
  try {
    let result = await userSchema.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'USER NOT FOUND'
      });
    }

    res.status(200).send({
      success: true,
      message: 'DELETE USER SUCCESS',
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
