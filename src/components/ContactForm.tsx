"use client"

import React, { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Send, MicOff } from "lucide-react"

// Speech Recognition types
interface SpeechRecognitionEvent {
  resultIndex: number
  results: {
    length: number
    [index: number]: {
      [index: number]: {
        transcript: string
      }
      isFinal: boolean
    }
  }
}

interface SpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

type ContactFormProps = {
  data?: {
    title: string
    subtitle: string
    form: {
      name: string
      email: string
      phone: string
      voicePrompt: string
      voiceListening: string
      voiceTranscript: string
      submit: string
    }
  }
}

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brief: "",
  })
  const [isListening, setIsListening] = useState(false)
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device (iOS/Android)
  React.useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    setIsMobile(/android|iphone|ipad|ipod/i.test(ua));
  }, []);

  // Default data if none provided
  const defaultData = {
    title: "Επικοινωνήστε μαζί μας",
    subtitle: "Στείλτε μας μήνυμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
    form: {
      name: 'Όνομα',
      email: 'Email',  
      phone: 'Τηλέφωνο',
      voicePrompt: 'Πατήστε το μικρόφωνο και περιγράψτε το project σας',
      voiceListening: 'Ακούω... Μιλήστε τώρα',
      voiceTranscript: 'Μετατροπή σε κείμενο:',
      submit: 'Αποστολή Μηνύματος'
    }
  }

  const contactData = data || defaultData

  // ✅ Handle form submission (Formspree)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("https://formspree.io/f/xyznlwpg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("✅ Το μήνυμά σου στάλθηκε με επιτυχία!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          brief: "",
        })
      } else {
        alert("⚠️ Υπήρξε σφάλμα στην αποστολή. Προσπάθησε ξανά.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("⚠️ Σφάλμα σύνδεσης. Έλεγξε τη σύνδεσή σου στο internet.")
    }
  }

  // ✅ Toggle speech recognition (start/stop)
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Η αναγνώριση φωνής δεν υποστηρίζεται στον browser σας.");
      return;
    }

    // On mobile: toggle start/stop on each tap
    if (isMobile) {
      if (isListening && recognitionInstance) {
        recognitionInstance.stop();
        setIsListening(false);
        return;
      }
    } else {
      // On desktop: stop if already listening
      if (isListening && recognitionInstance) {
        recognitionInstance.stop();
        setIsListening(false);
        return;
      }
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setRecognitionInstance(recognition);

    recognition.lang = "el-GR";
    recognition.continuous = false;
    recognition.interimResults = true;

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      const combined = finalTranscript || interimTranscript;
      if (combined.trim()) {
        setFormData((prev) => ({ ...prev, brief: combined.trim() }));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
      try {
        recognition.stop();
      } catch {}
      alert("⚠️ Πρόβλημα με το μικρόφωνο ή την αναγνώριση φωνής.");
    };

    recognition.onend = () => {
      if (finalTranscript.trim()) {
        setFormData((prev) => ({
          ...prev,
          brief: finalTranscript.trim(), // Replace instead of append to avoid duplication
        }));
      }
      setIsListening(false);
    };

    recognition.start();
  };

  const { title, subtitle, form } = contactData

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal/8 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-navy/8 rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Form */}
        <form 
          action="https://formspree.io/f/xyznlwpg"
          method="POST"
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium text-navy">
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
              placeholder="Το όνομά σου"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-navy">
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
            <Label htmlFor="phone" className="text-base font-medium text-navy">
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
              placeholder="+30 123 456 7890"
            />
          </div>

          {/* Voice Input */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-navy">Περιγραφή Project</Label>

            <div
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all ${
                isListening ? "border-teal bg-teal/5" : "border-gray-200"
              }`}
            >
              <button 
                type="button" 
                onClick={handleVoiceInput} 
                className="relative group"
                aria-label={isListening ? "Σταματήστε την ηχογράφηση" : "Ξεκινήστε την ηχογράφηση φωνής"}
                aria-describedby="voice-input-description"
              >
                {/* Screen reader text */}
                <span className="sr-only">
                  {isListening ? "Σταματήστε την ηχογράφηση" : "Ξεκινήστε την ηχογράφηση φωνής"}
                </span>
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-red-500" />
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-50 bg-red-500" />
                  </>
                )}
                <div
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${
                    isListening ? "bg-red-500" : "bg-navy"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-12 h-12 text-white animate-pulse" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </div>
              </button>

              <p
                id="voice-input-description"
                className={`mt-6 text-center font-medium ${
                  isListening ? "text-red-500" : "text-navy"
                }`}
              >
                {isListening
                  ? isMobile
                    ? "Πατήστε ξανά στο μικρόφωνο για να σταματήσει η ηχογράφηση"
                    : "Πατήστε ξανά για να σταματήσει η ηχογράφηση"
                  : form.voicePrompt}
              </p>
            </div>

            {/* Transcript */}
            {formData.brief && (
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm font-medium mb-2 text-navy">
                  {form.voiceTranscript}
                </p>
                <p className="text-gray-700">{formData.brief}</p>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, brief: "" }))}
                  className="text-sm mt-2 underline text-teal"
                >
                  Καθαρισμός
                </button>
              </div>
            )}
          </div>

          {/* Hidden input for voice transcript */}
          <input
            type="hidden"
            name="brief"
            value={formData.brief}
          />

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold gap-2 bg-navy text-white hover:bg-navy/90 
                       transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-lg hover:shadow-navy/25
                       active:scale-95 active:transition-none
                       group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-transparent 
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
