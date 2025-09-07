# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/37b2efbc-c64a-4aa0-9c3c-5485cde04f53

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/37b2efbc-c64a-4aa0-9c3c-5485cde04f53) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Authentication)
- WhatsApp Business API Integration

## WhatsApp OTP Integration

This project includes WhatsApp OTP login functionality using Facebook's WhatsApp Business API.

### Setup Instructions:

1. **Facebook Business Account Setup:**
   - Create a Facebook Business account
   - Set up WhatsApp Business API
   - Get your Phone Number ID and Access Token

2. **Message Template Creation:**
   - Create an OTP message template in Facebook Business Manager
   - Template name: `marmomart_otp_template`
   - Template content: "Your MarmoMart verification code is {{1}}. Valid for 10 minutes. Do not share this code."

3. **Environment Variables:**
   ```
   WHATSAPP_ACCESS_TOKEN=your_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_VERIFY_TOKEN=your_verify_token
   ```

4. **Webhook Setup:**
   - Configure webhook URL in Facebook Developer Console
   - Handle incoming message status updates
   - Verify webhook with your verify token

### Features:
- **Secure OTP Delivery:** Uses WhatsApp's end-to-end encryption
- **Template Management:** Integrates with Facebook approved templates
- **Session Management:** Secure OTP session handling
- **User Experience:** Seamless login flow with countdown timers
- **Fallback Support:** Email login option available
- **Order Notifications:** Future WhatsApp order updates integration

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/37b2efbc-c64a-4aa0-9c3c-5485cde04f53) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
