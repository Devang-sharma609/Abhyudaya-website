import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from "@supabase/supabase-js";

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

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID parameter is required" },
        { status: 400 }
      );
    }

    // Get event title from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.CLOUDINARY_API_SECRET || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: event } = await supabase
      .from("events")
      .select("title")
      .eq("id", eventId)
      .single();
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Format title for folder name (remove spaces, lowercase)
    const folderName = event.title.toLowerCase().replace(/\s+/g, '-');
    
    // Query Cloudinary for images in the specified folder
    const result = await cloudinary.search
      .expression(`resource_type:image AND folder=${folderName}*`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    // Extract and return the image URLs
    const images = result.resources.map((resource: any) => ({
      url: resource.secure_url,
      id: resource.public_id,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return NextResponse.json(
      { error: "Failed to fetch images from Cloudinary" },
      { status: 500 }
    );
  }
} 