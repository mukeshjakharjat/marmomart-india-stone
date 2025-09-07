// WhatsApp Business API utilities for Facebook Meta integration

interface WhatsAppConfig {
  accessToken: string
  phoneNumberId: string
  verifyToken: string
  apiVersion: string
}

interface SendMessageParams {
  to: string
  template: string
  components?: any[]
}

interface SendOTPParams {
  phoneNumber: string
  otp: string
  templateName?: string
}

class WhatsAppAPI {
  private config: WhatsAppConfig

  constructor(config: WhatsAppConfig) {
    this.config = config
  }

  async sendTemplateMessage({ to, template, components = [] }: SendMessageParams) {
    const url = `https://graph.facebook.com/${this.config.apiVersion}/${this.config.phoneNumberId}/messages`
    
    const payload = {
      messaging_product: 'whatsapp',
      to: to.replace(/\D/g, ''), // Remove non-digits
      type: 'template',
      template: {
        name: template,
        language: {
          code: 'en'
        },
        components
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to send message')
      }

      return {
        success: true,
        messageId: data.messages[0].id,
        status: data.messages[0].message_status
      }
    } catch (error: any) {
      console.error('WhatsApp API Error:', error)
      throw error
    }
  }

  async sendOTP({ phoneNumber, otp, templateName = 'marmomart_otp_template' }: SendOTPParams) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      template: templateName,
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: otp
            }
          ]
        }
      ]
    })
  }

  async sendOrderUpdate(phoneNumber: string, orderNumber: string, status: string) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      template: 'marmomart_order_update',
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: orderNumber
            },
            {
              type: 'text',
              text: status
            }
          ]
        }
      ]
    })
  }

  async sendQuoteReady(phoneNumber: string, quoteName: string, amount: string) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      template: 'marmomart_quote_ready',
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: quoteName
            },
            {
              type: 'text',
              text: amount
            }
          ]
        }
      ]
    })
  }

  verifyWebhook(mode: string, token: string, challenge: string) {
    if (mode === 'subscribe' && token === this.config.verifyToken) {
      return challenge
    }
    throw new Error('Webhook verification failed')
  }

  handleWebhookEvent(body: any) {
    // Handle incoming webhook events
    if (body.object === 'whatsapp_business_account') {
      body.entry?.forEach((entry: any) => {
        entry.changes?.forEach((change: any) => {
          if (change.field === 'messages') {
            const messages = change.value.messages
            const statuses = change.value.statuses
            
            // Handle message status updates
            if (statuses) {
              statuses.forEach((status: any) => {
                console.log(`Message ${status.id} status: ${status.status}`)
                // Update your database with delivery status
              })
            }
            
            // Handle incoming messages (for customer support)
            if (messages) {
              messages.forEach((message: any) => {
                console.log(`Received message from ${message.from}: ${message.text?.body}`)
                // Handle customer inquiries
              })
            }
          }
        })
      })
    }
  }
}

// Initialize WhatsApp API (use environment variables in production)
export const whatsappAPI = new WhatsAppAPI({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || 'demo_token',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'demo_phone_id',
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'demo_verify_token',
  apiVersion: 'v18.0'
})

// Template configurations for Facebook Business Manager
export const whatsappTemplates = {
  otp: {
    name: 'marmomart_otp_template',
    category: 'AUTHENTICATION',
    language: 'en',
    components: [
      {
        type: 'BODY',
        text: 'Your MarmoMart verification code is {{1}}. Valid for 10 minutes. Do not share this code with anyone.'
      }
    ]
  },
  orderUpdate: {
    name: 'marmomart_order_update',
    category: 'UTILITY',
    language: 'en',
    components: [
      {
        type: 'BODY',
        text: 'Hi! Your MarmoMart order {{1}} status has been updated to: {{2}}. Track your order at marmomart.com/orders'
      }
    ]
  },
  quoteReady: {
    name: 'marmomart_quote_ready',
    category: 'UTILITY',
    language: 'en',
    components: [
      {
        type: 'BODY',
        text: 'Great news! Your quote for {{1}} is ready. Total amount: ₹{{2}}. View details at marmomart.com/dashboard'
      }
    ]
  }
}