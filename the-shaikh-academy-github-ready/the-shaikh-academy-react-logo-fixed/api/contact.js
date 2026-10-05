export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, location, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please complete the required fields.' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'The Shaikh Academy <enquiries@theshaikhacademy.com>',
        to: ['info@theshaikhacademy.com'],
        reply_to: email,
        subject: `New Coaching Enquiry — ${name}`,
        html: `
          <h2>New enquiry from The Shaikh Academy website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location / Country:</strong> ${location || 'Not provided'}</p>
          <p><strong>Interested in:</strong> ${interest || 'Not selected'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return res.status(500).json({ error: 'Unable to send enquiry.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to send enquiry.' });
  }
}
