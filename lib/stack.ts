import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAuth } from './cognito/auth'
import { createAddUserFunc } from './addUserPostConfirmation/construct'
import { createIdentity } from './cognito/identity'
import { createUserTable } from './tables/userTable'
import { UserPoolOperation } from 'aws-cdk-lib/aws-cognito'

export class PostconfirmationSampleStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		const addUserFunc = createAddUserFunc(this, {})
		const userTable = createUserTable(this, {})
		const cognitoAuth = createAuth(this, {})
		const cognitoIdentity = createIdentity(this, {
			userPool: cognitoAuth.userPool,
			userPoolClient: cognitoAuth.userPoolClient,
		})

		addUserFunc.addEnvironment('USER_TABLE_NAME', userTable.tableName)
		addUserFunc.addToRolePolicy(
			new cdk.aws_iam.PolicyStatement({
				actions: ['dynamodb:PutItem'],
				resources: [userTable.tableArn],
			})
		)

		cognitoAuth.userPool.addTrigger(
			UserPoolOperation.POST_CONFIRMATION,
			addUserFunc
		)
	}
}
