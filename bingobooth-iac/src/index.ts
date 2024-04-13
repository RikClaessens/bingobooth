#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { BingoboothIacStack } from './stack/bingobooth-stack';

const app = new cdk.App();
new BingoboothIacStack(app, 'BingoboothIacStack', { stage: 'dev' });
