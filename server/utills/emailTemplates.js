export function generateVerificationOtpEmailTemplate(otpCode){
    return(
        `<div style="background-color: #f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background-color: #4a90e2; padding: 20px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Verify Your Email</h2>
        </div>

        <div style="padding: 30px;">
          <h1 style="font-size: 22px; margin-bottom: 10px;">Hello,</h1>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
            Thank you for signing up. Please use the one-time password (OTP) below to verify your email address:
          </p>

          <div style="margin: 20px 0; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #4a90e2; text-align: center; background-color: #f0f4ff; padding: 15px; border-radius: 6px;">
            ${otpCode}
          </div>

          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
            This code is valid for the next 15 minutes. If you did not request this, please ignore this email.
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
            Best regards,<br />
            The Support Team
          </p>
        </div>

        <div style="text-align: center; padding: 20px; font-size: 12px; color: #888888;">
          &copy; ${new Date().getFullYear()} Praful library . All rights reserved.
        </div>
      </div>
    </div>`
    )
}



export function generateForgotPasswordemailTemplate(resetPasswordUrl){
  return `<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <tr>
                <td>
                  <h2 style="color: #333333; margin-top: 0;">Reset Your Password</h2>
                  <p style="color: #555555; font-size: 16px;">
                    Hello,
                  </p>
                  <p style="color: #555555; font-size: 16px;">
                    We received a request to reset your password. Click the button below to choose a new password:
                  </p>
                  <p style="text-align: center; margin: 30px 0;">
                    <a href="${resetPasswordUrl}" 
                      style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 4px;">
                      Reset Password
                    </a>
                  </p>

                  <!-- Add the plain URL link here -->
                  <p style="color: #555555; font-size: 14px; word-break: break-all;">
                    Or copy and paste this link into your browser:<br />
                    <a href="${resetPasswordUrl}" style="color: #007BFF;">${resetPasswordUrl}</a>
                  </p>

                  <p style="color: #777777; font-size: 14px;">
                    If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.
                  </p>
                  <p style="color: #555555; font-size: 16px;">
                    Regards,<br/>
                    Library Management Team
                  </p>
                  <hr style="border: none; border-top: 1px solid #dddddd; margin: 30px 0;" />
                  <p style="color: #999999; font-size: 12px; text-align: center;">
                    &copy; ${new Date().getFullYear()} Library Management System. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`
}