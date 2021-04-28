const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Signing } = require('@credify/crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', function (req, res) {
  res.send('hello world')
});

app.post('/decrypt', function (req, res) {
  const { password, signing_secret } = req.body;
  if (!password || !signing_secret) {
    return res.send("invalid body");
  }
  const s = new Signing();
  s.importPrivateKey(signing_secret, password);
  const key = s.exportPrivateKey();
  const response = { key };
  res.json(response);
});

app.post('/encrypt', function (req, res) {
  const { password, key } = req.body;
  if (!password || !key) {
    return res.send("invalid body");
  }
  const s = new Signing();
  s.importPrivateKey(key);
  const signing_secret = s.exportPrivateKey(password);
  const response = { signing_secret };
  res.json(response);
});

app.listen(port);
