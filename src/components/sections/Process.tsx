import { FileText, Wand2, CheckCircle2 } from 'lucide-react'

interface ProcessStep {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  color: 'teal' | 'navy'
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Ανάλυση & Σχεδιασμός",
    description: "Συζητάμε τις ανάγκες σας, αναλύουμε τον ανταγωνισμό και δημιουργούμε ένα λεπτομερές σχέδιο για την ιστοσελίδα σας.",
    icon: <FileText className="h-8 w-8" />,
    color: 'teal'
  },
  {
    number: "02", 
    title: "Ανάπτυξη & Design",
    description: "Δημιουργούμε το design και αναπτύσσουμε την ιστοσελίδα με τις πιο σύγχρονες τεχνολογίες για τη βέλτιστη απόδοση.",
    icon: <Wand2 className="h-8 w-8" />,
    color: 'navy'
  },
  {
    number: "03",
    title: "Δοκιμές & Παράδοση",
    description: "Κάνουμε εκτενείς δοκιμές, βελτιστοποιούμε την ιστοσελίδα και την παραδίδουμε έτοιμη για χρήση με πλήρη εκπαίδευση.",
    icon: <CheckCircle2 className="h-8 w-8" />,
    color: 'teal'
  }
]

export function Process() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Πώς Δουλεύουμε
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Η διαδικασία ανάπτυξης της ιστοσελίδας σας σε 3 απλά βήματα. Από την πρώτη συνάντηση 
            μέχρι το τελικό αποτέλεσμα, σας συνοδεύουμε σε κάθε στάδιο.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-primary/20 transform -translate-y-1/2" />
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-foreground/10 hover:shadow-lg transition-shadow">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                      ${step.color === 'teal' ? 'bg-primary' : 'bg-brand-navy'}
                    `}>
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`
                    h-16 w-16 rounded-xl flex items-center justify-center mb-6
                    ${step.color === 'teal' ? 'bg-primary/10 text-primary' : 'bg-brand-navy/10 text-brand-navy'}
                  `}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}