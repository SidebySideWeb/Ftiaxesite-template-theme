import { Clock, Euro, TrendingUp, Shield, Smartphone, Zap, Target, Wrench, Lightbulb, Rocket, LucideIcon } from "lucide-react"

/**
 * Features component
 * Displays a grid of features/services with icons, titles, and descriptions
 * 
 * Available icons:
 * - zap: ⚡ Speed/Performance
 * - clock: 🕒 Time/Efficiency  
 * - euro: 💰 Cost/Pricing
 * - trendingUp: 📈 Growth/Results
 * - shield: 🛡️ Security/Protection
 * - smartphone: 📱 Mobile/Responsive
 * - target: 🎯 Target/Precision
 * - wrench: 🔧 Tools/Development
 * - lightbulb: 💡 Ideas/Innovation
 * - rocket: 🚀 Launch/Growth
 */

type FeaturesProps = {
  data?: {
    title: string
    subtitle: string
    items: {
      icon: string
      title: string
      description: string
    }[]
  }
}

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  euro: Euro,
  trendingUp: TrendingUp,
  shield: Shield,
  smartphone: Smartphone,
  zap: Zap,
  target: Target,
  wrench: Wrench,
  lightbulb: Lightbulb,
  rocket: Rocket,
}

export default function Features({ data }: FeaturesProps) {
  // Default data if none provided
  const defaultData = {
    title: "Γιατί να επιλέξετε εμάς",
    subtitle: "Προσφέρουμε ολοκληρωμένες λύσεις web development με σύγχρονη τεχνολογία και επαγγελματική υποστήριξη.",
    items: [
      {
        icon: "zap",
        title: "Γρήγορη Ανάπτυξη",
        description: "Παραδίδουμε το website σας σε 48 ώρες χωρίς συμβιβασμούς στην ποιότητα."
      },
      {
        icon: "smartphone",
        title: "Responsive Design",
        description: "Τέλεια προβολή σε όλες τις συσκευές - desktop, tablet, και κινητό."
      },
      {
        icon: "shield",
        title: "Ασφάλεια & Ταχύτητα",
        description: "SSL πιστοποιητικά, γρήγορη φόρτωση, και προστασία από κυβερνοεπιθέσεις."
      },
      {
        icon: "trendingUp",
        title: "SEO Optimized",
        description: "Ενσωματωμένο SEO για καλύτερη κατάταξη στις μηχανές αναζήτησης."
      },
      {
        icon: "wrench",
        title: "Τεχνική Υποστήριξη",
        description: "24/7 υποστήριξη και συντήρηση για να είναι πάντα online το site σας."
      },
      {
        icon: "euro",
        title: "Προσιτές Τιμές",
        description: "Ξεκινάμε από μόλις 250€ για έναν πλήρως λειτουργικό ιστότοπο."
      }
    ]
  }

  const featuresData = data || defaultData
  const { title, subtitle, items } = featuresData

  return (
    <section
      id="features"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', textTransform: 'none' }}>
            {title}
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', textTransform: 'none' }}>
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((feature, index) => {
            const Icon = iconMap[feature.icon.toLowerCase()] || Zap

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-teal" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-navy mb-2" style={{ fontSize: '16px', fontFamily: 'Roboto, system-ui, sans-serif', textTransform: 'none' }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', textTransform: 'none' }}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}