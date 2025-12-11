import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { createS3Client, listAllObjects } from '@/lib/s3';

export async function GET(request: NextRequest) {
  try {
    const bucket = config.awsS3Bucket;
    const searchParams = request.nextUrl.searchParams;
    const prefix = searchParams.get('prefix') || '';

    const s3Client = createS3Client();

    // List all objects recursively under the prefix
    const objects = await listAllObjects(s3Client, bucket, prefix);

    // Calculate total size
    const totalSize = objects.reduce((sum, obj) => sum + (obj.Size || 0), 0);
    const objectCount = objects.length;

    return NextResponse.json({
      bucket,
      prefix,
      totalSize,
      objectCount,
      // Human-readable size
      humanReadableSize: formatBytes(totalSize),
    });

  } catch (error) {
    console.error('Error calculating size:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate size',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}