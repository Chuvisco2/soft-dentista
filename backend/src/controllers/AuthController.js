const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  // Simular autenticação (substituir com lógica real de autenticação)
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
