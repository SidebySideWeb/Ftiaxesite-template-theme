export default async function BlogPage() {
  // Blog system is prepared but not yet active
  // This page will be fully functional when you're ready to use the blog
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Blog Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog - FtiAxesite.gr
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Συμβουλές, οδηγοί και νέα για την ανάπτυξη ιστοσελίδων
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-12">
          <div className="bg-teal/10 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Blog Σύντομα Διαθέσιμο!
            </h3>
            <p className="text-gray-600 mb-6">
              Το blog σύστημα είναι έτοιμο και περιμένει το περιεχόμενό σας. Μπορείτε να ξεκινήσετε να δημιουργείτε άρθρα από το admin panel.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                <strong>Για να ξεκινήσετε:</strong>
              </p>
              <ol className="text-left text-sm text-gray-600 space-y-2 max-w-md mx-auto">
                <li>1. Πηγαίνετε στο <code className="bg-gray-100 px-2 py-1 rounded">/admin</code></li>
                <li>2. Κλικ στο &ldquo;Collections&rdquo; → &ldquo;Posts&rdquo;</li>
                <li>3. Κλικ &ldquo;Create New&rdquo; για το πρώτο σας άρθρο</li>
                <li>4. Γράψτε το περιεχόμενο και κάντε &ldquo;Save&rdquo;</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}