let SNSClient, PublishCommand;
let S3Client, PutObjectCommand;

try {
  const sns = require('@aws-sdk/client-sns');
  SNSClient = sns.SNSClient;
  PublishCommand = sns.PublishCommand;

  const s3 = require('@aws-sdk/client-s3');
  S3Client = s3.S3Client;
  PutObjectCommand = s3.PutObjectCommand;
} catch (err) {}

const REGION = process.env.AWS_REGION || 'us-east-1';

async function sendEmergencySMS(phoneNumber, message) {
  if (!SNSClient || !process.env.AWS_ACCESS_KEY_ID) {
    return { status: 'SIMULATED', messageId: 'sim-sns-' + Date.now() };
  }

  try {
    const snsClient = new SNSClient({ region: REGION });
    const command = new PublishCommand({ Message: message, PhoneNumber: phoneNumber });
    const response = await snsClient.send(command);
    return { status: 'SENT', messageId: response.MessageId };
  } catch (err) {
    return { status: 'ERROR', error: err.message };
  }
}

async function uploadReportToS3(bucketName, reportFileName, reportData) {
  if (!S3Client || !process.env.AWS_ACCESS_KEY_ID) {
    return { status: 'SIMULATED', fileUrl: `https://${bucketName || 'dam-flood-reports'}.s3.${REGION}.amazonaws.com/${reportFileName}` };
  }

  try {
    const s3Client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({
      Bucket: bucketName || 'dam-flood-reports',
      Key: reportFileName,
      Body: typeof reportData === 'string' ? reportData : JSON.stringify(reportData),
      ContentType: 'application/json'
    });
    await s3Client.send(command);
    const fileUrl = `https://${bucketName || 'dam-flood-reports'}.s3.${REGION}.amazonaws.com/${reportFileName}`;
    return { status: 'UPLOADED', fileUrl };
  } catch (err) {
    return { status: 'ERROR', error: err.message };
  }
}

module.exports = {
  sendEmergencySMS,
  uploadReportToS3
};
