import { CfnOutput } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const table = new dynamodb.Table(this, app.logicalPrefixedName("notes"), {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'noteId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Output values
    new CfnOutput(this, 'notesTableName', {
      exportName: app.logicalPrefixedName("ExtNotesTableName"),
      value: table.tableName,
    });
    new CfnOutput(this, 'notesTableArn', {
      exportName: app.logicalPrefixedName("ExtNotesTableArn"),
      value: table.tableArn,
    });
  }
}
