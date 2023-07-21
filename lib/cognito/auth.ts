import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'

type CreateSaasAuth = {}

export function createAuth(scope: Construct, props: CreateSaasAuth) {
	const userPool = new awsCognito.UserPool(
		scope,
		`postconfirmation-example-userpool`,
		{
			userPoolName: `postconfirmation-example-userpool`,
			selfSignUpEnabled: true,
			accountRecovery: awsCognito.AccountRecovery.PHONE_AND_EMAIL,
			userVerification: {
				emailStyle: awsCognito.VerificationEmailStyle.CODE,
			},
			autoVerify: {
				email: true,
			},
			standardAttributes: {
				email: {
					required: true,
					mutable: true,
				},
			},
		}
	)

	const userPoolClient = new awsCognito.UserPoolClient(
		scope,
		`postconfirmation-example-userpoolClient`,
		{ userPool }
	)

	return { userPool, userPoolClient }
}
