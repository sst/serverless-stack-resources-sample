# Serverless Stack Resources SST Sample

This project uses [SST](https://github.com/serverless-stack/serverless-stack) to create the resources in the [Serverless Stack guide](https://serverless-stack.com).

It uses CDK instead of CloudFormation YAML in our note taking app — https://github.com/AnomalyInnovations/serverless-stack-demo-api

For example, this what creating the DynamoDB table looks like in the two versions.

``` diff
- Resources:
-   NotesTable:
-     Type: AWS::DynamoDB::Table
-     Properties:
-       TableName: ${self:custom.tableName}
-       AttributeDefinitions:
-         - AttributeName: userId
-           AttributeType: S
-         - AttributeName: noteId
-           AttributeType: S
-       KeySchema:
-         - AttributeName: userId
-           KeyType: HASH
-         - AttributeName: noteId
-           KeyType: RANGE
-       # Set the capacity to auto-scale
-       BillingMode: PAY_PER_REQUEST

+ const table = new dynamodb.Table(this, "notes", {
+   partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
+   sortKey: { name: 'noteId', type: dynamodb.AttributeType.STRING },
+   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
+ });
```

## Usage

Start by forking or cloning this repo.

Then install the dependencies.

```bash
$ npm install
```

## Commands

### `npm run build`

Build your app and synthesize your stacks.

Generates a `build/` directory with the compiled files and a `build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

### `npm test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Documentation

Learn more about the Serverless Stack Toolkit.

- [README](https://github.com/serverless-stack/serverless-stack)
- [@serverless-stack/cli](https://github.com/serverless-stack/serverless-stack/tree/master/packages/cli)
- [@serverless-stack/resources](https://github.com/serverless-stack/serverless-stack/tree/master/packages/resources)

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack), [join our chatroom](https://gitter.im/serverless-stack/Lobby), or [post on our forums](https://discourse.serverless-stack.com).
