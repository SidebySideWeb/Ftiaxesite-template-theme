import { getPayload } from 'payload'
import config from '@payload-config'

async function findAdminUser() {
  try {
    const payload = await getPayload({
      config,
    })

    // Find all users
    const users = await payload.find({
      collection: 'users',
      limit: 10,
    })

    console.log('Found users:')
    users.docs.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Created: ${user.createdAt}`)
      console.log(`   Updated: ${user.updatedAt}`)
      console.log('---')
    })

    if (users.docs.length === 0) {
      console.log('No users found in database.')
    }

  } catch (error) {
    console.error('Error querying users:', error)
  }

  process.exit(0)
}

findAdminUser()