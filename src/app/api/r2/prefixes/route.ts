import { NextRequest, NextResponse } from 'next/server';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { config } from '@/lib/config';
import { createS3Client } from '@/lib/s3';

export async function GET(request: NextRequest) {
  try {
    // Get configuration
    const bucket = config.awsS3Bucket;

    // Get prefix from query parameters
    const searchParams = request.nextUrl.searchParams;
    const prefix = searchParams.get('prefix') || '';

    // Create S3 client
    const s3Client = createS3Client();

    // List objects with the given prefix and delimiter to get folder-like structure
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);

    // Debug logging
    console.log('S3 Response:', {
      prefix: prefix,
      commonPrefixes: response.CommonPrefixes,
      contents: response.Contents?.length,
    });

    // Extract prefixes (folders) from CommonPrefixes
    const prefixes = response.CommonPrefixes?.map(cp => {
      const prefixPath = cp.Prefix || '';
      // Remove trailing slash
      return prefixPath.replace(/\/$/, '');
    }) || [];

    return NextResponse.json({
      bucket,
      prefix,
      prefixes: prefixes.sort(),
      count: prefixes.length,
    });

  } catch (error) {
    console.error('Error listing R2 prefixes:', error);
    return NextResponse.json(
      {
        error: 'Failed to list R2 prefixes',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}