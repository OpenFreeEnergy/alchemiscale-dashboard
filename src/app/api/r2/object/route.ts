import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { createS3Client, getObjectAsString } from '@/lib/s3';
import yaml from 'js-yaml';

export async function GET(request: NextRequest) {
  try {
    const bucket = config.awsS3Bucket;
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'Missing required parameter: key' },
        { status: 400 }
      );
    }

    const s3Client = createS3Client();

    // Get object content
    const content = await getObjectAsString(s3Client, bucket, key);

    // Parse as YAML if it's a YAML file
    let parsed: unknown = null;
    if (key.endsWith('.yaml') || key.endsWith('.yml')) {
      try {
        parsed = yaml.load(content);
      } catch (yamlError) {
        console.error('Failed to parse YAML:', yamlError);
        // Continue with raw content if YAML parsing fails
      }
    }

    return NextResponse.json({
      bucket,
      key,
      content,
      parsed,
      contentType: key.endsWith('.yaml') || key.endsWith('.yml') ? 'yaml' : 'text',
    });

  } catch (error) {
    console.error('Error loading object:', error);
    return NextResponse.json(
      {
        error: 'Failed to load object',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}