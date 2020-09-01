import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sst from "@serverless-stack/resources";

export default class S3Stack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    this.bucket = new s3.Bucket(this, 'uploads', {
      cors: [{
        allowedMethods: [ 'GET', 'PUT', 'POST', 'DELETE', 'HEAD' ],
        allowedOrigins: [ '*' ],
        allowedHeaders: [ '*' ],
        maxAge: 3000,
      }],
    });

    // Output values
    new cdk.CfnOutput(this, 'uploadsBucketArn', {
      exportName: app.logicalPrefixedName("ExtAttachmentsBucketArn"),
      value: this.bucket.bucketArn,
    });
    new cdk.CfnOutput(this, 'uploadsBucketName', {
      exportName: app.logicalPrefixedName("ExtAttachmentsBucket"),
      value: this.bucket.bucketName,
    });
  }
}
