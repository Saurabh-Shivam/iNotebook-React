const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 2 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Destructuring, i.e getting the values from the req.bodys
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.send(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
// We can also use post but while doing updatation we generally use put
router.put(
  "/updatenote/:id",
  fetchuser,
  // [
  //   body("title", "Enter a valid title").isLength({ min: 2 }),
  //   body("description", "Description must be atleast 5 characters").isLength({min: 5,}),],
  async (req, res) => {
    // Destructuring, i.e getting the values from the req.body
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find te note to be updated and update it

    // Checking to avoid being hacked or doing invalid things
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.send(404).send("Not Found");
    }

    // note.user.toString -> will give this(currently opened) note's id
    if (note.user.toString() !== req.user.id) {
      return res.send(401).send("Not Allowed");
    }

    // Note will be updated
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // -> if any new contact(user) comes it will be created automatically
    );
    res.json({ note });
  }
);

module.exports = router;
