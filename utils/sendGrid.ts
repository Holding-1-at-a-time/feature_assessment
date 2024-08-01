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