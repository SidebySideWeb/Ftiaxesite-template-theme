/**
 * Script to create the first admin user for Payload CMS
 * This bypasses the broken create-first-user admin interface
 */

import { getPayload } from 'payload'
import config from '../payload.config.ts'

const createFirstUser = async () => {
  try {
    console.log('🚀 Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('👤 Creating first admin user...')
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ftiaxesite.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', user.email)
    console.log('🔐 Password: admin123')
    console.log('💡 You can now login at: http://localhost:3000/admin')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating user:', error)
    process.exit(1)
  }
}

createFirstUser()