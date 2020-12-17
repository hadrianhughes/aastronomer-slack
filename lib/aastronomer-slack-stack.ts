import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigatewayv2'

export class AAStronomerSlackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const api = new apig.HttpApi(this, 'AAStronomerSlackAPI', {
      apiName: 'aastronomer-slack-api',
      createDefaultStage: true
    })
  }
}
