const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, companyId: user.companyId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.json({ token, user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async register(req, res) {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      const token = jwt.sign({ id: user.id, companyId: user.companyId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return res.status(201).json({ token, user });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ error: error.message });
    }
  }
};
