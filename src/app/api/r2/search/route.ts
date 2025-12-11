import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { createS3Client, listAllObjects } from '@/lib/s3';

export async function GET(request: NextRequest) {
  try {
    const bucket = config.awsS3Bucket;
    const searchParams = request.nextUrl.searchParams;
    const prefix = searchParams.get('prefix') || '';
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Missing required parameter: filename' },
        { status: 400 }
      );
    }

    const s3Client = createS3Client();

    // List all objects recursively under the prefix
    const objects = await listAllObjects(s3Client, bucket, prefix);

    // Filter objects by filename
    const matches = objects
      .filter(obj => {
        if (!obj.Key) return false;

        // Get the filename from the key (last part after /)
        const parts = obj.Key.split('/');
        const objectFilename = parts[parts.length - 1];

        // Case-insensitive partial match
        return objectFilename.toLowerCase().includes(filename.toLowerCase());
      })
      .map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      }));

    return NextResponse.json({
      bucket,
      prefix,
      filename,
      matches,
      count: matches.length,
    });

  } catch (error) {
    console.error('Error searching for file:', error);
    return NextResponse.json(
      {
        error: 'Failed to search for file',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
