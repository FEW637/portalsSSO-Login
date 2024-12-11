const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'admin-cli');
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios({
      method: 'post',
      url: 'https://dev-sso.techberry.co.th/realms/master/protocol/openid-connect/token',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Auth error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});