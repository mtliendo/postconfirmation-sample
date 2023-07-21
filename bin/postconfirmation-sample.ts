#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { PostconfirmationSampleStack } from '../lib/stack'

const app = new cdk.App()
new PostconfirmationSampleStack(app, 'PostconfirmationSampleStack', {
	env: { account: '842537737558', region: 'us-east-1' },
})
