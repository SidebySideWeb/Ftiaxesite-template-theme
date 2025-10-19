import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section id="contact" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Επικοινωνήστε μαζί μας
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Στείλτε μας μήνυμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-xl">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                Όνομα
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-foreground/20 placeholder:text-foreground/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Το όνομά σας"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-foreground/20 placeholder:text-foreground/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-foreground">
                Τηλέφωνο
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-foreground/20 placeholder:text-foreground/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Το τηλέφωνό σας"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-foreground">
                Μήνυμα
              </label>
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-foreground/20 placeholder:text-foreground/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Περιγράψτε το project σας..."
                />
              </div>
            </div>
            
            <div>
              <Button type="submit" size="lg" className="w-full">
                Αποστολή Μηνύματος
              </Button>
            </div>
          </form>
        </div>
        
        {/* Additional Info */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Γρήγορη Απάντηση</h3>
              <p className="mt-2 text-sm text-foreground/70">Απαντάμε σε όλα τα μηνύματα εντός 24 ωρών</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Δωρεάν Συμβουλή</h3>
              <p className="mt-2 text-sm text-foreground/70">Πρώτη συνάντηση και συμβουλή χωρίς κόστος</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Εγγύηση Ποιότητας</h3>
              <p className="mt-2 text-sm text-foreground/70">100% ικανοποίηση ή επιστροφή χρημάτων</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}