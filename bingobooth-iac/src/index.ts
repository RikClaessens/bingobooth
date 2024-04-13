#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'dotenv/config';
import 'source-map-support/register';
import { BingoboothIacStack } from './stack/bingobooth-stack';

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error('SPOTIFY_CLIENT_ID= must be provided');
}
if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('SPOTIFY_CLIENT_SECRET= must be provided');
}

const app = new cdk.App();
new BingoboothIacStack(app, 'BingoboothIacStack', {
  stage: 'dev',
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
});
