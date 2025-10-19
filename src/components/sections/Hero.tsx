import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">
            AI-Powered Web Development
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Δημιουργούμε Ιστοσελίδες που{' '}
            <span className="text-primary">Πουλάνε</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70 max-w-3xl mx-auto">
            Προσφέρουμε ολοκληρωμένες λύσεις web development με τη χρήση τεχνητής νοημοσύνης 
            για μέγιστη απόδοση και μοναδική εμπειρία χρήστη.
          </p>
          
          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-x-8 gap-y-4 flex-wrap">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-foreground/60">Έργα</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-foreground/60">Επιτυχία</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-foreground/60">Υποστήριξη</div>
            </div>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Ξεκινήστε Σήμερα
            </Button>
            <Button variant="outline" size="lg">
              Μάθετε Περισσότερα
            </Button>
          </div>
          
          {/* Social Proof */}
          <p className="mt-8 text-sm text-foreground/60">
            100+ ικανοποιημένοι πελάτες
          </p>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-primary/10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  )
}