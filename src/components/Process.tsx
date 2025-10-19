import { FileText, Wand2, CheckCircle2, Rocket, Lightbulb, Wrench, Smartphone, Target, LucideIcon } from "lucide-react"

/**
 * Process component
 * Shows the step-by-step development process with icons and colors
 * 
 * Available icons:
 * - fileText: 📄 Planning/Requirements
 * - wand2: 🎨 Design/Development
 * - checkCircle2: ✅ Testing/Launch
 * - rocket: 🚀 Launch/Deploy
 * - lightbulb: 💡 Strategy/Ideas
 * - wrench: 🔧 Implementation
 * - smartphone: 📱 Mobile Optimization
 * - target: 🎯 Target/Focus
 */

type ProcessProps = {
  data?: {
    title: string
    subtitle: string
    steps: {
      number: string
      icon: string
      title: string
      description: string
      color?: "teal" | "navy"
    }[]
  }
}

const iconMap: Record<string, LucideIcon> = {
  fileText: FileText,
  wand2: Wand2,
  checkCircle2: CheckCircle2,
  rocket: Rocket,
  lightbulb: Lightbulb,
  wrench: Wrench,
  smartphone: Smartphone,
  target: Target,
}

const colorMap = {
  teal: {
    bg: "bg-teal/10",
    border: "border-teal",
    iconBg: "bg-teal",
    numberBg: "bg-teal",
    hoverBg: "hover:bg-teal/20",
  },
  navy: {
    bg: "bg-navy/10",
    border: "border-navy",
    iconBg: "bg-navy",
    numberBg: "bg-navy",
    hoverBg: "hover:bg-navy/20",
  },
}

export default function Process({ data }: ProcessProps) {
  // Default data if none provided
  const defaultData = {
    title: "Η Διαδικασία μας",
    subtitle: "Ακολουθούμε μια δοκιμασμένη διαδικασία για να δημιουργήσουμε το τέλειο website για την επιχείρησή σας.",
    steps: [
      {
        number: "1",
        icon: "lightbulb",
        title: "Ανάλυση & Σχεδιασμός",
        description: "Κατανοούμε τις ανάγκες σας και σχεδιάζουμε την ιδανική λύση για την επιχείρησή σας.",
        color: "teal" as const
      },
      {
        number: "2", 
        icon: "wrench",
        title: "Ανάπτυξη & Υλοποίηση",
        description: "Αναπτύσσουμε το website χρησιμοποιώντας τις πιο σύγχρονες τεχνολογίες.",
        color: "navy" as const
      },
      {
        number: "3",
        icon: "rocket",
        title: "Έλεγχος & Δημοσίευση",
        description: "Ελέγχουμε κάθε λεπτομέρεια και δημοσιεύουμε το website σας online.",
        color: "teal" as const
      }
    ]
  }

  const processData = data || defaultData
  const { title, subtitle, steps } = processData

  return (
    <section id="process" className="py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon.toLowerCase()] || FileText
              const colors = colorMap[step.color || "teal"]

              return (
                <div key={index} className="relative">
                  <div
                    className={`relative ${colors.bg} ${colors.hoverBg} border-2 ${colors.border} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 h-full flex flex-col items-center text-center`}
                  >
                    <div
                      className={`${colors.numberBg} text-white px-4 py-1 rounded-full text-sm font-bold mb-6`}
                    >
                      ΒΗΜΑ {step.number}
                    </div>

                    {/* Icon circle */}
                    <div
                      className={`w-20 h-20 rounded-full ${colors.iconBg} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-brand-navy mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}