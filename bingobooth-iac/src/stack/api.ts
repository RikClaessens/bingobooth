import {
  CfnOutput,
  Duration,
  Stack,
  aws_apigatewayv2 as apigwv2,
  aws_lambda_nodejs as lambda_nodejs,
} from 'aws-cdk-lib';
import { CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';

interface ApiProps {
  stage: string;
  spotify: {
    clientId: string;
    clientSecret: string;
  };
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
        allowMethods: [
          CorsHttpMethod.POST,
          CorsHttpMethod.GET,
          CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: ['*'],
        allowHeaders: [
          'Accept',
          'Content-Type',
          'Authorization',
          'X-Amz-Date',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
        ],
      },
    });

    this.addEndpoint({
      functionName: 'get-playlist',
      methods: [apigwv2.HttpMethod.POST],
      environment: {
        SPOTIFY_CLIENT_ID: props.spotify.clientId,
        SPOTIFY_CLIENT_SECRET: props.spotify.clientSecret,
      },
      memorySize: 512,
    });

    this.addEndpoint({
      functionName: 'get-tracks',
      methods: [apigwv2.HttpMethod.POST],
      environment: {
        SPOTIFY_CLIENT_ID: props.spotify.clientId,
        SPOTIFY_CLIENT_SECRET: props.spotify.clientSecret,
      },
      memorySize: 512,
    });

    new CfnOutput(this, 'ApiEndpoint', {
      value: this.api.apiEndpoint,
    });
  }

  addEndpoint({
    functionName,
    path,
    methods,
    environment,
    timeout,
    memorySize,
  }: {
    functionName: string;
    path?: string;
    methods: apigwv2.HttpMethod[];
    environment: Record<string, string>;
    timeout?: number;
    memorySize?: number;
  }) {
    if (!path) {
      path = `/${functionName}`;
    }
    const lambdaFunction = new lambda_nodejs.NodejsFunction(
      this,
      functionName,
      {
        functionName: `${functionName}-${this.stage}`,
        entry: `src/handlers/${functionName}.ts`,
        environment,
        timeout: timeout ? Duration.seconds(timeout) : undefined,
        memorySize: memorySize || 128,
      },
    );
    const integration = new HttpLambdaIntegration(
      `${functionName}Integration`,
      lambdaFunction,
    );

    this.api.addRoutes({
      path,
      methods,
      integration: integration,
    });
  }
}

export default BingoboothApi;
