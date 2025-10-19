import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsPayload {
  type: 'web-vital' | 'custom-event' | 'performance'
  metric?: string
  value?: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  url?: string
  timestamp?: number
  userAgent?: string
  sessionId?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: AnalyticsPayload = await request.json()
    
    // Validate required fields
    if (!data.type) {
      return NextResponse.json(
        { error: 'Missing required field: type' },
        { status: 400 }
      )
    }

    // Add request metadata
    const analyticsData = {
      ...data,
      timestamp: data.timestamp || Date.now(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      referrer: request.headers.get('referer') || null,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsData)
    }

    // In production, you would send this to your analytics service
    // Examples:
    // - Google Analytics 4 Measurement Protocol
    // - Mixpanel
    // - Custom database
    // - Third-party analytics service
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics 4
      if (process.env.GA_MEASUREMENT_ID && process.env.GA_API_SECRET) {
        try {
          const gaPayload = {
            client_id: data.sessionId || 'anonymous',
            events: [{
              name: data.type === 'web-vital' ? 'web_vitals' : 'custom_event',
              params: {
                metric_name: data.metric,
                metric_value: data.value,
                metric_rating: data.rating,
                page_location: data.url,
              },
            }],
          }

          await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(gaPayload),
          })
        } catch (error) {
          console.error('Failed to send to Google Analytics:', error)
        }
      }

      // Example: Send to your own database
      // await db.analytics.create({
      //   data: analyticsData
      // })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  })
}