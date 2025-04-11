import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from "@supabase/supabase-js";

// Make sure environment variables are loaded
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('Missing Cloudinary environment variables in API route');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  console.log('Cloudinary config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set',
    api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
  });

  try {
    // Get the folder parameter from the URL
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('folder');
    
    console.log('Event ID:', eventId);

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID parameter is required" },
        { status: 400 }
      );
    }

    // Get event title from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    if (!supabaseKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json(
        { error: "Server configuration error - Missing Supabase credentials" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: event, error: supabaseError } = await supabase
      .from("events")
      .select("title")
      .eq("id", eventId)
      .single();
    
    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: "Database error", details: supabaseError.message },
        { status: 500 }
      );
    }
    
    console.log('Event data:', event);
    
    if (!event) {
      return NextResponse.json(
        { error: `Event not found with ID: ${eventId}` },
        { status: 404 }
      );
    }
    
    // Format title for folder name (remove spaces, lowercase)
    const folderName = event.title.toLowerCase().replace(/\s+/g, '-');
    console.log('Looking for folder:', folderName);
    
    // UPDATED: Look for images in event-highlights/[folder-name] structure
    try {
      const fullFolderPath = `event-highlights/${folderName}`;
      console.log('Searching Cloudinary path:', fullFolderPath);
      
      const result = await cloudinary.search
        .expression(`resource_type:image AND folder=${fullFolderPath}`)
        .sort_by('created_at', 'desc')
        .max_results(100)
        .execute();
        
      console.log(`Found ${result.resources?.length || 0} images in folder ${fullFolderPath}`);

      const images = result.resources?.map((resource: any) => ({
        url: cloudinary.url(resource.public_id, {
          secure: true,
          format: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
          width: 'auto',
          crop: 'scale'
        }),
        id: resource.public_id,
      })) || [];
      
      return NextResponse.json({ images });
    } catch (error) {
      console.error('Cloudinary search error:', error);
      
      // Try fallback to direct folder name without event-highlights prefix
      try {
        console.log('Trying fallback search for folder:', folderName);
        
        const result = await cloudinary.search
          .expression(`resource_type:image AND folder=${folderName}`)
          .sort_by('created_at', 'desc')
          .max_results(100)
          .execute();
          
        console.log(`Found ${result.resources?.length || 0} images in fallback folder ${folderName}`);

        const images = result.resources?.map((resource: any) => ({
          url: cloudinary.url(resource.public_id, {
            secure: true,
            format: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
            width: 'auto',
            crop: 'scale'
          }),
          id: resource.public_id,
        })) || [];
        
        if (images.length > 0) {
          return NextResponse.json({ images });
        }
        
        // If no images found with either approach, return empty array
        return NextResponse.json({ images: [] });
      } catch (fallbackError) {
        console.error('All Cloudinary attempts failed:', fallbackError);
        return NextResponse.json(
          { error: "Failed to fetch images from Cloudinary" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('General API error:', error);
    return NextResponse.json(
      { error: "Server error processing request" },
      { status: 500 }
    );
  }
} 