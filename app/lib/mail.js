import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendSupportEmail({
  creatorEmail,
  creatorName,
  fromName,
  amount,
  message,
  method,
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #0a0a0f; color: #f0ece4; margin: 0; padding: 0; }
        .container { max-width: 520px; margin: 40px auto; background: #13131c; border-radius: 16px; overflow: hidden; border: 1px solid rgba(232,164,92,0.2); }
        .header { background: linear-gradient(135deg, #e8a45c, #c4813a); padding: 32px; text-align: center; }
        .header h1 { margin: 0; color: #0a0a0f; font-size: 28px; }
        .body { padding: 32px; }
        .amount { font-size: 48px; font-weight: 700; color: #e8a45c; text-align: center; margin: 24px 0; font-family: monospace; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(232,164,92,0.1); }
        .detail-label { color: rgba(240,236,228,0.5); font-size: 14px; }
        .detail-value { font-weight: 600; font-size: 14px; }
        .message-box { background: rgba(232,164,92,0.08); border: 1px solid rgba(232,164,92,0.2); border-radius: 10px; padding: 16px; margin: 20px 0; font-style: italic; color: rgba(240,236,228,0.8); }
        .footer { text-align: center; padding: 20px; color: rgba(240,236,228,0.3); font-size: 12px; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 700; }
        .bkash { background: rgba(226,19,110,0.2); color: #e2136e; }
        .nagad { background: rgba(240,90,40,0.2); color: #f05a28; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>☕ Get Me a Chai</h1>
          <p style="margin:8px 0 0; color:#0a0a0f; opacity:0.8">নতুন সাপোর্ট পেয়েছেন!</p>
        </div>
        <div class="body">
          <p style="text-align:center; font-size:18px;">হ্যালো <strong>${creatorName}</strong>! 🎉</p>
          <div class="amount">৳${amount}</div>
          <div class="detail-row">
            <span class="detail-label">সাপোর্টার</span>
            <span class="detail-value">${fromName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">পেমেন্ট পদ্ধতি</span>
            <span class="detail-value">
              <span class="badge ${method === "bKash" ? "bkash" : "nagad"}">${method}</span>
            </span>
          </div>
          ${
            message
              ? `
          <div class="detail-row">
            <span class="detail-label">বার্তা</span>
          </div>
          <div class="message-box">"${message}"</div>
          `
              : ""
          }
          <p style="text-align:center; margin-top:24px; color:rgba(240,236,228,0.6); font-size:14px;">
            আপনার ড্যাশবোর্ডে সম্পূর্ণ বিবরণ দেখুন।
          </p>
        </div>
        <div class="footer">© ২০২৬ Get Me a Chai • সর্বস্বত্ব সংরক্ষিত</div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Get Me a Chai" <${process.env.EMAIL_USER}>`,
    to: creatorEmail,
    subject: `☕ ${fromName} আপনাকে ৳${amount} পাঠিয়েছেন!`,
    html,
  });
}
