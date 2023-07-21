import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'

type CreateIdentityProps = {
	userPool: awsCognito.UserPool
	userPoolClient: awsCognito.UserPoolClient
}

export function createIdentity(scope: Construct, props: CreateIdentityProps) {
	const identityPool = new IdentityPool(
		scope,
		`postconfirmation-example-identityPool`,
		{
			identityPoolName: `postconfirmation-example-identityPool`,
			allowUnauthenticatedIdentities: true,
			authenticationProviders: {
				userPools: [
					new UserPoolAuthenticationProvider({
						userPool: props.userPool,
						userPoolClient: props.userPoolClient,
					}),
				],
			},
		}
	)
	return identityPool
}
