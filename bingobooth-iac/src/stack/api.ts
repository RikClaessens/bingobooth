import {
  CfnOutput,
  Stack,
  aws_apigatewayv2 as apigwv2,
  aws_lambda_nodejs as lambda_nodejs,
} from 'aws-cdk-lib';
import { CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';

interface ApiProps {
  stage: string;
}

class BingoboothApi extends Construct {
  private readonly api: apigwv2.HttpApi;
  private readonly stage: string;
  constructor(scope: Stack, id: string, props: ApiProps) {
    super(scope, id);
    this.stage = props.stage;

    this.api = new apigwv2.HttpApi(this, `bingobooth-api-${this.stage}`, {
      disableExecuteApiEndpoint: false,
      corsPreflight: {
        allowMethods: [CorsHttpMethod.POST, CorsHttpMethod.GET],
        allowOrigins: ['*'],
      },
    });

    this.addEndpoint('validatePlaylistUrl', [apigwv2.HttpMethod.POST]);

    new CfnOutput(this, 'ApiEndpoint', {
      value: this.api.apiEndpoint,
    });
  }

  addEndpoint(functionName: string, methods: apigwv2.HttpMethod[]) {
    const lambdaFunction = new lambda_nodejs.NodejsFunction(
      this,
      functionName,
      {
        functionName: `${functionName}-${this.stage}`,
        entry: `src/handlers/${functionName}.ts`,
      },
    );
    const integration = new HttpLambdaIntegration(
      `${functionName}Integration`,
      lambdaFunction,
    );

    this.api.addRoutes({
      path: '/',
      methods,
      integration: integration,
    });
  }
}

export default BingoboothApi;
