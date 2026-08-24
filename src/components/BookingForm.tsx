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
}

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
      const formDataObj = new FormData()
      formDataObj.append('firstName', formData.firstName)
      formDataObj.append('lastName', formData.lastName)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)
      formDataObj.append('city', formData.city)
      formDataObj.append('subject', formData.subject)
      formDataObj.append('message', formData.message)

      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body: formDataObj,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          subject: '',
          message: '',
        })
        formRef.current?.reset()
      } else {
        setStatus('error')
        setErrorMessage('Failed to send message. Please try again.')
      }
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
            <div className={styles.formFields}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
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
                  placeholder="Please tell me about yourself and how I can be of service. How did you hear about me?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {status === 'error' && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}

            <div className={styles.actions}>
              <div className={styles.captcha} aria-hidden="true">
                <span className={styles.captchaBox} />
                <span>I'm not a robot</span>
              </div>

              <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
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
