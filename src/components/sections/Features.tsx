import { Zap, Smartphone, Shield, Euro, Clock, TrendingUp } from 'lucide-react'

interface Feature {
  name: string
  description: string
  icon: React.ReactNode
}

const features: Feature[] = [
  {
    name: 'Ταχύτητα & Απόδοση',
    description: 'Δημιουργούμε ιστοσελίδες με μέγιστη ταχύτητα φόρτωσης και βελτιστοποίηση για τις μηχανές αναζήτησης.',
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: 'Mobile-First Design',
    description: 'Κάθε ιστοσελίδα είναι πλήρως responsive και βελτιστοποιημένη για όλες τις συσκευές και οθόνες.',
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    name: 'Ασφάλεια & Αξιοπιστία',
    description: 'Χρησιμοποιούμε τις πιο σύγχρονες τεχνικές ασφαλείας για να προστατεύσουμε την ιστοσελίδα σας.',
    icon: <Shield className="h-6 w-6" />,
  },
  {
    name: 'Προσιτές Τιμές',
    description: 'Ανταγωνιστικές τιμές χωρίς συμβιβασμούς στην ποιότητα. Πληρώνετε μόνο για αυτό που χρειάζεστε.',
    icon: <Euro className="h-6 w-6" />,
  },
  {
    name: 'Γρήγορη Παράδοση',
    description: 'Παραδίδουμε τα έργα μας στον συμφωνημένο χρόνο χωρίς καθυστερήσεις και με πλήρη λειτουργικότητα.',
    icon: <Clock className="h-6 w-6" />,
  },
  {
    name: 'SEO Βελτιστοποίηση',
    description: 'Κάθε ιστοσελίδα δημιουργείται με ενσωματωμένο SEO για καλύτερη κατάταξη στις μηχανές αναζήτησης.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
]

export function Features() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Γιατί να Επιλέξετε το ftiaxesite.gr
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Προσφέρουμε ολοκληρωμένες λύσεις web development με σύγχρονες τεχνολογίες και 
            προσωπική εξυπηρέτηση για να δημιουργήσουμε την ιδανική ιστοσελίδα για την επιχείρησή σας.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-foreground/70">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}