import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadAudioToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string = 'audio/mpeg'
): Promise<string> => {
  const key = `recordings/${uuidv4()}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET || 'maranotter-recordings',
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read' as const,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload audio to S3');
  }
};

export const deleteAudioFromS3 = async (fileUrl: string): Promise<void> => {
  const key = fileUrl.split('.com/')[1];

  const params = {
    Bucket: process.env.AWS_S3_BUCKET || 'maranotter-recordings',
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error('Failed to delete audio from S3');
  }
};

export default s3;
