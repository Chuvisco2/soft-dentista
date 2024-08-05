const cron = require('node-cron');
const { Patient } = require('../models');
const NotificationService = require('../services/NotificationService');

// Job para lembretes de troca de alinhadores
cron.schedule('0 8 * * *', async () => {
  const patients = await Patient.findAll({
    where: {
      // Suas condições para selecionar os pacientes
    },
  });

  patients.forEach(patient => {
    const message = `Olá ${patient.name}, lembre-se de trocar seu alinhador hoje!`;
    NotificationService.sendWhatsApp(patient.phone, message);
  });
});

