#!/usr/bin/env node

/**
 * Simple API-based admin for content management
 * Use this while the admin UI has compatibility issues
 */

const API_URL = 'http://localhost:3000/api';

async function createUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: 'admin'
      })
    });
    
    const result = await response.json();
    console.log('User created:', result);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    const result = await response.json();
    console.log('Login result:', result);
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function updateHomepage(data) {
  try {
    const response = await fetch(`${API_URL}/globals/homepage`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('Homepage updated:', result);
    return result;
  } catch (error) {
    console.error('Error updating homepage:', error);
  }
}

async function getHomepage() {
  try {
    const response = await fetch(`${API_URL}/globals/homepage`);
    const result = await response.json();
    console.log('Homepage data:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error getting homepage:', error);
  }
}

// Example usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'create-user') {
    const email = args[1];
    const password = args[2];
    createUser(email, password);
  } else if (command === 'login') {
    const email = args[1];
    const password = args[2];
    loginUser(email, password);
  } else if (command === 'update-homepage') {
    const title = args[1];
    const description = args[2];
    updateHomepage({ title, description });
  } else if (command === 'get-homepage') {
    getHomepage();
  } else {
    console.log('Available commands:');
    console.log('  node scripts/admin-api.js create-user <email> <password>');
    console.log('  node scripts/admin-api.js login <email> <password>');
    console.log('  node scripts/admin-api.js get-homepage');
    console.log('  node scripts/admin-api.js update-homepage "New Title" "New Description"');
  }
}

module.exports = { createUser, loginUser, updateHomepage, getHomepage };