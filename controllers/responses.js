// Dependencies
const router = require('express').Router();

// Models
const Responses = require('../models/responses');

// Middleware
const restricted = require('../controllers/authCheck');

router.get('/:workflow', async (req, res) => {
  const { workflow } = req.params;
  // const { id: user_id } = req.user;
  try {
    res.status(200).json(await Responses.find({ workflow }));
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user responses' });
  }
});

router.get('/:workflow/:id', async (req, res) => {
  const { workflow, id } = req.params;
  // const { id: user_id } = req.user;
  try {
    res.status(200).json(await Responses.find({ id, workflow }));
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user responses' });
  }
});

router.post('/:workflow', async (req, res) => {
  const { workflow } = req.params;
  const { text, index, owner } = req.body;
  // const { id: user_id } = req.user;
  try {
    res.status(200).json(await Responses.add({ text, owner, workflow }));
  } catch (e) {
    res.status(500).json(e);
  }
});

// UPDATES THE RESPONSE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, owner, workflow, index } = req.body;
  const values = { id, text, owner, workflow, index };
  try {
    res.status(200).json(await Responses.update(values));
  } catch (error) {
    res.status(500).json({
      message: `Unable to update the question ${id}`,
    });
  }
});

// DELETE RESPONSE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Responses.remove(id).then(value => {
      if (value)
        res.status(200).json({ message: `Response ${id} deleted`, value });
      res.status(404).json({ message: `Response ${id} not found` });
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Answer.' });
  }
});

module.exports = router;