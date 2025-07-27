export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-primary-navy text-primary-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary-gold mb-6">
          Tailwind CSS Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-platinum p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary-charcoal mb-2">
              Test Card 1
            </h2>
            <p className="text-primary-charcoal">
              This card should have a platinum background
            </p>
          </div>
          
          <div className="bg-primary-gold p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary-navy mb-2">
              Test Card 2
            </h2>
            <p className="text-primary-navy">
              This card should have a gold background
            </p>
          </div>
          
          <div className="bg-primary-silver p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary-navy mb-2">
              Test Card 3
            </h2>
            <p className="text-primary-navy">
              This card should have a silver background
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}
