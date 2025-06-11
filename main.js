const express = require('express');
const app = express();
const port = 3000;

const accountSid = 'ACb32c05703c2627fe10edccd6db18d682';
const authToken = 'f43da464b1c18805c20aedf772c1cc2e';
const client = require('twilio')(accountSid, authToken); 

// Rota que o ESP32 irá chamar
app.get('/movimento', (req, res) => {
  client.messages
    .create({
      from: 'whatsapp:+14155238886', // número sandbox Twilio
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e', // seu template
      contentVariables: '{"1":"12/1","2":"3pm"}',        // substituições do template
      to: 'whatsapp:+554598431884' // seu número de WhatsApp
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

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
