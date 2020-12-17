import * as path from 'path'
import * as cdk from '@aws-cdk/core'
import { Tags } from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda-python'
import * as apig from '@aws-cdk/aws-apigatewayv2'
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'
import { PYTHON_RUNTIME } from './globals'

export class AAStronomerSlackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const subscribeUserLambda = new lambda.PythonFunction(this, 'SubscribeUserLambda', {
      runtime: PYTHON_RUNTIME,
      entry: path.join(__dirname, '..', 'lambdas', 'subscribe_user'),
      handler: 'handler'
    })

    const subscribeUserIntegration = new LambdaProxyIntegration({
      handler: subscribeUserLambda
    })

    const api = new apig.HttpApi(this, 'AAStronomerSlackAPI', {
      apiName: 'aastronomer-slack-api',
      createDefaultStage: true
    })
    Tags.of(api).add('Module', 'API')

    api.addRoutes({
      path: '/subscribe',
      methods: [apig.HttpMethod.POST],
      integration: subscribeUserIntegration
    })

    new cdk.CfnOutput(this, 'APIEndpoint', {
      exportName: 'SlackAPIEndpoint',
      value: api.url!
    })
  }
}
