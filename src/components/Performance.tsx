'use client'

import { useEffect } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
}

interface WebVitalMetric {
  value: number
  delta: number
  id: string
  name: string
  navigationType: string
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

// Core Web Vitals thresholds (remove FID as it's deprecated)
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
}

function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function sendToAnalytics(metric: PerformanceMetric) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
  
  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Core Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }
  
  // Send to custom analytics endpoint if needed
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'web-vital',
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Fail silently in production
    })
  }
}

export default function Performance() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric: WebVitalMetric) => {
        sendToAnalytics({
          name: 'CLS',
          value: metric.value,
          rating: getRating('CLS', metric.value),
          delta: metric.delta,
        })
      })

      onFCP((metric: WebVitalMetric) => {
        sendToAnalytics({
          name: 'FCP',
          value: metric.value,
          rating: getRating('FCP', metric.value),
          delta: metric.delta,
        })
      })

      onLCP((metric: WebVitalMetric) => {
        sendToAnalytics({
          name: 'LCP',
          value: metric.value,
          rating: getRating('LCP', metric.value),
          delta: metric.delta,
        })
      })

      onTTFB((metric: WebVitalMetric) => {
        sendToAnalytics({
          name: 'TTFB',
          value: metric.value,
          rating: getRating('TTFB', metric.value),
          delta: metric.delta,
        })
      })

      onINP((metric: WebVitalMetric) => {
        sendToAnalytics({
          name: 'INP',
          value: metric.value,
          rating: getRating('INP', metric.value),
          delta: metric.delta,
        })
      })
    }).catch(() => {
      // Fail silently if web-vitals can't be loaded
    })
  }, [])

  // This component doesn't render anything
  return null
}

// Hook for manual performance tracking
export function usePerformanceTracking() {
  const trackCustomMetric = (name: string, value: number) => {
    sendToAnalytics({
      name,
      value,
      rating: 'good', // Default rating for custom metrics
    })
  }

  const startTiming = (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`)
    }
  }

  const endTiming = (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`)
      window.performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = window.performance.getEntriesByName(name, 'measure')[0]
      if (measure) {
        trackCustomMetric(name, measure.duration)
      }
    }
  }

  return { trackCustomMetric, startTiming, endTiming }
}