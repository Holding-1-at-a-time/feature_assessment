import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationEmail = async (paymentDetails) => {
  const msg = {
    to: paymentDetails.email,
    from: 'no-reply@yourdomain.com',
    subject: 'Payment Confirmation',
    text: `Your payment of $${paymentDetails.amount} was successful.`,
    html: `<strong>Your payment of $${paymentDetails.amount} was successful.</strong>`,
  };

  await sendgrid.send(msg);
};


sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendReminderEmail = async (bookingDetails, time) => {
  const msg = {
    to: bookingDetails.client.email,
    from: 'no-reply@yourdomain.com',
    subject: 'Appointment Reminder',
    text: `This is a reminder for your upcoming appointment on ${bookingDetails.date}.`,
  };

  await sendGrid.send(msg);
};