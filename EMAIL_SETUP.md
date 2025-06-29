# Email Configuration Setup Guide

This guide will help you set up email functionality for your portfolio contact form.

## Option 1: Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. In Google Account Security settings
2. Go to "2-Step Verification"
3. Scroll down to "App passwords"
4. Select "Mail" and "Other (custom name)"
5. Enter "Portfolio Website" as the name
6. Copy the generated 16-character password

### Step 3: Update Environment Variables
Create or update your `.env.local` file:

\`\`\`env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
\`\`\`

## Option 2: Custom SMTP Setup

If you prefer using a different email provider:

### Step 1: Get SMTP Credentials
Get SMTP settings from your email provider:
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587
- **AWS SES**: email-smtp.region.amazonaws.com, port 587

### Step 2: Update Environment Variables
\`\`\`env
SMTP_HOST=your-smtp-host
SMTP_PORT=465
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
\`\`\`

### Step 3: Update API Route
Uncomment the SMTP configuration in `app/api/contact/route.ts` and comment out the Gmail configuration.

## Testing the Setup

### Test Email Configuration
Visit: `http://localhost:3000/api/contact/test`

This endpoint will verify your email configuration without sending actual emails.

### Test Contact Form
1. Fill out the contact form on your website
2. Submit the form
3. Check that:
   - You receive the message at bosedevashish7@gmail.com
   - The sender receives a confirmation email
   - No errors appear in the console

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use App Passwords** - Never use your actual Gmail password
3. **Rate Limiting** - The API includes basic rate limiting (3 emails per 15 minutes per IP)
4. **Input Validation** - All form inputs are validated server-side

## Deployment

### Vercel Deployment
1. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `EMAIL_USER` and `EMAIL_PASS`

### Other Platforms
Add the environment variables in your hosting platform's environment configuration.

## Troubleshooting

### Common Issues

1. **"Invalid login"** - Check your app password is correct
2. **"Connection timeout"** - Check your SMTP settings
3. **"Rate limited"** - Wait 15 minutes or adjust rate limiting in the API

### Debug Mode
Check the browser console and server logs for detailed error messages.

### Test Endpoint
Use the test endpoint to verify configuration: `/api/contact/test`
