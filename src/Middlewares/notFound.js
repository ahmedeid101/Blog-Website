const notFound = (req, res, next) => {
  const message = `Not Found - ${req.originalUrl}`;
  res.status(404);
  next(new Error(message));
};

module.exports = notFound;
