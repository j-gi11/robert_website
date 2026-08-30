import { useRef, useState } from 'react'
import { site } from '../data/site'
import styles from './BookingForm.module.css'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  subject: string
  message: string
  /** Honeypot — real visitors never see or fill this in. */
  company: string
}

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  subject: '',
  message: '',
  company: '',
}

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const canSubmit =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== ''

  const validateRequired = () => {
    if (!formData.firstName.trim()) return 'First name is required'
    if (!formData.lastName.trim()) return 'Last name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.message.trim()) return 'Message is required'
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationError = validateRequired()
    if (validationError) {
      setErrorMessage(validationError)
      setStatus('error')
      return
    }

    if (!site.formEndpoint) {
      const mailtoBody = `
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
City & State: ${formData.city}
Subject: ${formData.subject}

${formData.message}
      `.trim()

      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(formData.subject || 'Booking Inquiry')}&body=${encodeURIComponent(mailtoBody)}`
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const params = new URLSearchParams()
      params.append('firstName', formData.firstName)
      params.append('lastName', formData.lastName)
      params.append('email', formData.email)
      params.append('phone', formData.phone)
      params.append('city', formData.city)
      params.append('subject', formData.subject)
      params.append('message', formData.message)
      params.append('company', formData.company)

      // Apps Script Web Apps don't answer CORS preflights, so this has to
      // stay a "simple request" — no-cors mode, form-urlencoded body, no
      // custom headers. That also means the response is opaque: we can't
      // read response.ok, so a fetch that doesn't throw is treated as sent.
      await fetch(site.formEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })

      setStatus('success')
      setFormData(EMPTY_FORM)
      formRef.current?.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="booking" className={styles.bookingSection}>
      <div className={styles.bookingContent}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>BOOKING</span>
          <h2 className={styles.heading}>Let's talk</h2>
        </div>

        {status === 'success' ? (
          <div className={styles.successMessage}>
            <p>Thanks for reaching out! I'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.requiredNote}>* Required</p>

            <div className={styles.formFields}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <input
                  type="text"
                  name="city"
                  placeholder="City & State (open to travel!)"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <textarea
                  name="message"
                  placeholder="Please tell me about yourself and how I can be of service. How did you hear about me? *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Honeypot — visually hidden and out of tab order. Real
                  visitors never touch this; bots that fill every field will. */}
              <div className={styles.honeypot} aria-hidden="true">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className={styles.errorMessage} role="alert">
                {errorMessage}
              </div>
            )}

            <div className={styles.actions}>
              <button type="submit" className={styles.submitButton} disabled={!canSubmit || status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        )}

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Or email directly: <a href={site.emailHref}>{site.email}</a> · {site.location}
          </p>
        </div>
      </div>
    </section>
  )
}
