const express = require("express");
const router = express.Router();
const Team = require("../db/models/team-model");

router.get("/", (req, res) => {
  Team.find({}).then(teams => res.send(teams));
});

router.get("/:teamId", (req, res) => {
  Team.findOne({ _id: req.params.teamId }).then(team => res.send(team));
});

router.post("/", async (req, res) => {
  const team = new Team({
    title: req.body.title,
    users: req.body.users
  });
  const savedTeam = await team.save();
  res.send(savedTeam);
});

// patch a specific user
router.patch("/:teamId", async (req, res) => {
  try {
    const updatedTeam = await Team.updateOne({ _id: req.params.teamId }, { $set: req.body });
    res.send(updatedTeam);
  } catch (err) {
    res.send({ message: err });
  }
});

router.delete("/:teamId", (req, res) => {
  Team.findOneAndRemove({ _id: req.params.teamId }).then(deletedTeam => res.send(deletedTeam));
});

module.exports = router;
