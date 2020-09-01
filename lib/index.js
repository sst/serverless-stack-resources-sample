import S3Stack from './s3';
import CognitoStack from './cognito';
import DynamoDBStack from './dynamodb';

export default function main(app) {
  const s3 = new S3Stack(app, "s3");
  new DynamoDBStack(app, "dynamodb");
  new CognitoStack(app, "cognito", { bucketArn: s3.bucket.bucketArn });
}

