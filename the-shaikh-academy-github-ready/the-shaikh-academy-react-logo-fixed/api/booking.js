
const coaches = {
  India: 'Jakeer Hussain',
  Germany: 'Mohammad',
  'United Kingdom': 'Wasif Faiz'
};

const programs = [
  'Private Coaching',
  'Junior Development',
  'Adult Tennis',
  'Performance Training',
  'Group Coaching'
];

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Competitive'
];

const preferredTimes = [
  '',
  'Morning',
  'Afternoon',
  'Evening'
];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const data = req.body || {};

    const {
      name,
      email,
      phone,
      age,
      country,
      program,
      level,
      preferredDate,
      preferredTime,
      goals,
      message
    } = data;

    const validEmail =
      typeof email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      email.length <= 254;

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 120 ||
      !validEmail ||
      !Object.hasOwn(coaches, country) ||
      !programs.includes(program) ||
      !levels.includes(level) ||
      typeof goals !== 'string' ||
      !goals.trim() ||
      goals.length > 3000
    ) {
      return res.status(400).json({
        error: 'Please provide valid booking details.'
      });
    }

    if (
      age &&
      (
        !Number.isInteger(Number(age)) ||
        Number(age) < 3 ||
        Number(age) > 110
      )
    ) {
      return res.status(400).json({
        error: 'Invalid player age.'
      });
    }

    if (
      preferredDate &&
      (
        typeof preferredDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
        Number.isNaN(Date.parse(preferredDate))
      )
    ) {
      return res.status(400).json({
        error: 'Invalid preferred date.'
      });
    }

    if (!preferredTimes.includes(preferredTime || '')) {
      return res.status(400).json({
        error: 'Invalid preferred time.'
      });
    }

    if (
      (phone && (typeof phone !== 'string' || phone.length > 50)) ||
      (message && (typeof message !== 'string' || message.length > 3000))
    ) {
      return res.status(400).json({
        error: 'Invalid additional information.'
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');

      return res.status(500).json({
        error: 'Email service is not configured.'
      });
    }

    const coach = coaches[country];

    const fields = [
      ['Player Name', name],
      ['Email Address', email],
      ['Phone / WhatsApp', phone],
      ['Player Age', age],
      ['Country', country],
      ['Assigned Coach', coach],
      ['Coaching Program', program],
      ['Playing Level', level],
      ['Preferred Date', preferredDate],
      ['Preferred Time', preferredTime],
      ['Tennis Goals', goals],
      ['Additional Information', message]
    ];

    const htmlRows = fields.map(([label, value]) => `
      <tr>
        <td style="
          padding:14px;
          border-bottom:1px solid #dddddd;
          font-weight:bold;
          vertical-align:top;
          width:38%;
        ">
          ${escapeHtml(label)}
        </td>
        <td style="
          padding:14px;
          border-bottom:1px solid #dddddd;
          white-space:pre-wrap;
          vertical-align:top;
        ">
          ${escapeHtml(value || 'Not provided')}
        </td>
      </tr>
    `).join('');

    const html = `
      <div style="
        font-family:Arial,sans-serif;
        max-width:700px;
        margin:0 auto;
        color:#101a28;
      ">
        <div style="
          background:#101a28;
          color:#ffffff;
          padding:30px;
        ">
          <h1 style="
            margin:0;
            font-size:23px;
            letter-spacing:2px;
          ">
            THE SHAIKH ACADEMY
          </h1>

          <p style="
            margin-bottom:0;
            color:#e3b18e;
            letter-spacing:1px;
          ">
            INDIA · GERMANY · UNITED KINGDOM
          </p>
        </div>

        <div style="padding:30px 10px;">
          <h2>New Coaching Booking Request</h2>

          <p>
            A player has submitted a booking request
            through The Shaikh Academy website.
          </p>

          <table style="
            width:100%;
            border-collapse:collapse;
            font-size:14px;
          ">
            ${htmlRows}
          </table>

          <p style="
            margin-top:30px;
            padding:18px;
            background:#f4f2ed;
            font-size:13px;
          ">
            This is a booking enquiry only.
            The session has not been confirmed.
            Please contact the player to arrange
            availability and pricing.
          </p>
        </div>

        <div style="
          background:#101a28;
          color:#ffffff;
          padding:20px;
          text-align:center;
          font-size:12px;
        ">
          THE SHAIKH ACADEMY
          <br/>
          www.theshaikhacademy.com
        </div>
      </div>
    `;

    const response = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'The Shaikh Academy <enquiries@theshaikhacademy.com>',
          to: ['info@theshaikhacademy.com'],
          reply_to: email,
          subject: `New Booking Request — ${coach} — ${program}`,
          html
        })
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();

      console.error(
        'Resend booking error:',
        response.status,
        errorDetails
      );

      return res.status(502).json({
        error: 'Unable to send booking request.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking request submitted successfully.'
    });

  } catch (error) {
    console.error('Booking API error:', error);

    return res.status(500).json({
      error: 'Unable to process booking request.'
    });
  }
}
