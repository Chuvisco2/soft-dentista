module.exports = (req, res, next) => {
  if (!req.user || !req.user.companyId) {
    return res.status(403).json({ error: 'Access denied, no company associated.' });
  }
  next();
};
