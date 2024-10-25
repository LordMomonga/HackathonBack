const Applications = require("../models/Applications");

checkAlreadyApplied = (req, res, next) => {
  // Username
  Applications.findOne({
    student_id: req.userId
  }).exec((err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (application) {
      res.status(400).send({ message: "Failed! Already applied for classroom" });
      return;
    }

    next();
  });
};


const verifyApply = {
    checkAlreadyApplied
};

module.exports = verifyApply;