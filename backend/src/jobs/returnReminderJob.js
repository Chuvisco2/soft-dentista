const { Patient } = require('../models');
const NotificationService = require('../services/NotificationService');

module.exports = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const patients = await Patient.findAll({
    where: {
      lastVisit: {
        [Op.lte]: sixMonthsAgo,
      },
    },
  });

  for (const patient of patients) {
    NotificationService.sendWhatsAppMessage(patient.phone, 'Reminder: It\'s time for your routine check-up.');
  }
};
// Job para lembretes de retorno de pacientes
cron.schedule('0 8 * * *', async () => {
  const patients = await Patient.findAll({
    where: {
      // Suas condições para selecionar os pacientes
    },
  });

  patients.forEach(patient => {
    const message = `Olá ${patient.name}, é hora de agendar seu retorno!`;
    NotificationService.sendEmail(patient.email, 'Lembrete de Retorno', message);
  });
});
