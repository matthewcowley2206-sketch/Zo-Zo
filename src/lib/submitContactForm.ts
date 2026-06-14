import { site } from '../content/site'

export type ContactFormPayload = {
  firstName: string
  lastName: string
  company: string
  roleTitle: string
  email: string
  mobile: string
  message: string
}

type FormSubmitResponse = {
  success?: string
  message?: string
}

export async function submitContactForm(payload: ContactFormPayload) {
  const name = `${payload.firstName} ${payload.lastName}`.trim()

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `Website enquiry from ${name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: payload.email,
      _cc: site.contactCcEmail,
      name,
      company: payload.company || 'Not provided',
      role: payload.roleTitle || 'Not provided',
      email: payload.email,
      phone: payload.mobile || 'Not provided',
      message: payload.message,
    }),
  })

  const result = (await response.json().catch(() => ({}))) as FormSubmitResponse

  if (!response.ok || result.success !== 'true') {
    throw new Error(
      result.message ??
        'Unable to send your message right now. Please email matt@zoandzo.com.au directly.',
    )
  }

  return { emailSent: true }
}
