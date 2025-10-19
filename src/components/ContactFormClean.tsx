"use client"

import React, { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ContactFormProps = {
  data?: {
    title: string
    subtitle: string
    form: {
      name: string
      email: string
      phone: string
      message: string
      submit: string
    }
  }
}

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Default data if none provided
  const defaultData = {
    title: "Get In Touch",
    subtitle: "Ready to start your project? Let's discuss how we can help you achieve your goals.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      message: "Project Description",
      submit: "Send Message"
    }
  }

  const contactData = data || defaultData

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simple form submission - replace with your preferred method
    try {
      // Example: Replace with your form handling service
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("✅ Message sent successfully!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        alert("⚠️ There was an error sending your message. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("⚠️ Connection error. Please check your internet connection.")
    }
  }

  const { title, subtitle, form } = contactData

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-teal/8 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-brand-navy/8 rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium text-brand-navy">
              {form.name}
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="h-12 text-base"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-brand-navy">
              {form.email}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="h-12 text-base"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium text-brand-navy">
              {form.phone}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              className="h-12 text-base"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-medium text-brand-navy">
              {form.message}
            </Label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold gap-2 bg-brand-teal text-white hover:bg-brand-teal/90 
                       transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-lg hover:shadow-brand-teal/25
                       active:scale-95 active:transition-none
                       group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/20 to-transparent 
                           translate-x-[-100%] group-hover:translate-x-[100%] 
                           transition-transform duration-700 ease-out"></div>
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="relative z-10">{form.submit}</span>
          </Button>
        </form>
      </div>
    </section>
  )
}