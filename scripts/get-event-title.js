// scripts/get-event-title.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get event ID from command line argument
const eventId = process.argv[2];

if (!eventId) {
  console.error('Please provide an event ID as an argument');
  console.log('Usage: node scripts/get-event-title.js <event_id>');
  process.exit(1);
}

async function getEventTitle(id) {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in .env file');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Query the events table
    const { data, error } = await supabase
      .from("events")
      .select("id, title")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      console.log(`No event found with ID: ${id}`);
      return null;
    }
    
    // Get the folder name format
    const folderName = data.title.toLowerCase().replace(/\s+/g, '-');
    
    console.log('Event details:');
    console.log(`ID: ${data.id}`);
    console.log(`Title: ${data.title}`);
    console.log(`Folder name format: ${folderName}`);
    
    return data.title;
  } catch (error) {
    console.error('Error fetching event title:', error);
    return null;
  }
}

// Execute the function
getEventTitle(eventId)
  .then(() => console.log('Done'))
  .catch(err => console.error('Script execution failed:', err));