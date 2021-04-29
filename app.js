const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Signing, Encryption } = require('@credify/crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', function (req, res) {
  res.send('hello world')
});

app.post('/decrypt', async function (req, res) {
  const { password, signing_secret, encryption_secret } = req.body;
  if (!password) {
    return res.send("invalid body");
  }
  const s = new Signing();
  const e = new Encryption();
  if (signing_secret) {
    s.importPrivateKey(signing_secret, password);
  }
  if (encryption_secret) {
    await e.importPrivateKey(encryption_secret, password);
  }
  let signing_private_key = "";
  let encryption_private_key = "";
  try {
    signing_private_key = s.exportPrivateKey();
  } catch (e) {
    console.log(e);
  }
  try {
    encryption_private_key = await e.exportPrivateKey();
  } catch (e) {
    console.log(e);
  }

  const response = { signing_private_key, encryption_private_key };
  await res.json(response);
});

app.post('/encrypt', async function (req, res) {
  const { password, signing_private_key, encryption_private_key } = req.body;
  if (!password) {
    return res.send("invalid body");
  }
  const s = new Signing();
  const e = new Encryption();
  if (signing_private_key) {
    s.importPrivateKey(signing_private_key);
  }
  if (encryption_private_key) {
    await e.importPrivateKey(encryption_private_key)
  }
  let signing_secret = "";
  let encryption_secret = "";
  try {
    signing_secret = s.exportPrivateKey(password);
  } catch (e) {
    console.log(e);
  }
  try {
    encryption_secret = await e.exportPrivateKey(password);
  } catch (e) {
    console.log(e);
  }

  const response = { signing_secret, encryption_secret };
  await res.json(response);
});

app.listen(port);
