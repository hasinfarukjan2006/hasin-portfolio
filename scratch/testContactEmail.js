const http = require('http');

const data = JSON.stringify({
  name: "Recruiter Test",
  email: "recruiter@techcompany.com",
  subject: "Software Engineering Opportunity - Verification Test",
  message: "Hello Hasin F, this is a test message sent from your portfolio website contact form to verify live email delivery to hasinfarukjan@gmail.com."
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let responseData = '';
  res.on('data', (chunk) => { responseData += chunk; });
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', responseData);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(data);
req.end();
