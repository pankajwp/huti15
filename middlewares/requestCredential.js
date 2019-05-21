module.exports = (req, res, next) => {
  if (req.user.credit < 1) {
    return res.status (403).send ({
      error: 'You are forbidden from using this service, please add credit.',
    });
  }

  next ();
};
