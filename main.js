const express = require('express');
const app = express();
const port = 3000;

const accountSid = 'ACb32c05703c2627fe10edccd6db18d682';
const authToken = '38e55a71e39c56c1f089fff9da7526b4';
const client = require('twilio')(accountSid, authToken);


app.get('/movimento', (req, res) => {
  client.messages
    .create({
      from: 'whatsapp:+14155238886', // número sandbox Twilio
      to: 'whatsapp:+554598431884', // seu número de WhatsApp
      body: `🚨 Movimento detectado às ${new Date().toLocaleTimeString()}!`

    })
    .then(message => {
      console.log('Mensagem enviada. SID:', message.sid);
      res.send('Mensagem enviada com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).send('Erro ao enviar mensagem');
    });
});

app.get('/', (req,res) => {
  res.send("The API  is running ✅");
})

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
