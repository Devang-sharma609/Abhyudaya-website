const { v2: cloudinary } = require('cloudinary');
require('dotenv').config(); // Load environment variables from .env file

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listAllCloudinaryFolders() {
  try {
    console.log('Checking Cloudinary connection...');
    console.log('Credentials:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set',
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
    });
    
    // Get all folders in the root
    const result = await cloudinary.api.root_folders();
    console.log('\nRoot folders:');
    result.folders.forEach((folder) => {
      console.log(`- ${folder.name}`);
    });
    
    // For each root folder, get subfolders recursively
    for (const folder of result.folders) {
      await listSubfolders(folder.path);
    }
    
  } catch (error) {
    console.error('Error fetching Cloudinary folders:', error);
  }
}

async function listSubfolders(path) {
  try {
    const result = await cloudinary.api.sub_folders(path);
    if (result.folders && result.folders.length > 0) {
      console.log(`\nSubfolders in ${path}:`);
      result.folders.forEach((folder) => {
        console.log(`- ${folder.name} (full path: ${folder.path})`);
      });
      
      // Recursively list subfolders
      for (const folder of result.folders) {
        await listSubfolders(folder.path);
      }
    }
  } catch (error) {
    console.error(`Error fetching subfolders for ${path}:`, error);
  }
}

// Execute the function
listAllCloudinaryFolders()
  .then(() => console.log('Done listing Cloudinary folders'))
  .catch(err => console.error('Script execution failed:', err));