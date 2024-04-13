import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import BingoboothApi from './api';

interface BingoboothStackProps extends cdk.StackProps {
  stage: string;
}

export class BingoboothIacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BingoboothStackProps) {
    super(scope, id, props);

    new BingoboothApi(this, 'BingoboothApi', { stage: props.stage });
  }
}
