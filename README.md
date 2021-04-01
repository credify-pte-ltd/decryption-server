# Decryption server

## Usage

```bash
$ yarn
$ yarn start
```

Now you can use this server at [POST] http://localhost:8000/

## Request

- password
- signing_secret

```json
 {
  "password": "123456aA@",
  "signing_secret": "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIGbMFcGCSqGSIb3DQEFDTBKMCkGCSqGSIb3DQEFDDAcBAipkA5qpuY2+gICJxAw\nDAYIKoZIhvcNAgkFADAdBglghkgBZQMEASoEEKK+IPKfszJqVDO9t0GE4N4EQDgC\nYIUaALLqEK+d+Y5D6SqOyBgpUGf/9Zsg3cZWlsZOEdwq5XzFDouDr4Lq3t/2f9z5\nzOCfLgAnxozmyZa+lYI=\n-----END ENCRYPTED PRIVATE KEY-----\n"
}
```
