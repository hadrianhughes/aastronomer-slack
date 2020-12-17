#!/usr/bin/env node
require('dotenv').config()
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AAStronomerSlackStack } from '../lib/aastronomer-slack-stack';

const app = new cdk.App();
new AAStronomerSlackStack(app, 'AAStronomerSlackStack', {
  env: {
    region: process.env.REGION
  }
});
