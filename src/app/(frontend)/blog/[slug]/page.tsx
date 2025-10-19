import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Blog Σύντομα Διαθέσιμο
          </h1>
          <p className="text-gray-600 mb-8">
            Το blog σύστημα είναι έτοιμο και περιμένει το περιεχόμενό σας.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Άρθρο: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-teal-high-contrast text-white rounded-lg hover:bg-navy transition-colors focus:outline-navy focus:ring-navy"
            aria-label="Go back to blog index"
          >
            Πίσω στο Blog
          </Link>
        </div>
      </div>
    </div>
  )
}