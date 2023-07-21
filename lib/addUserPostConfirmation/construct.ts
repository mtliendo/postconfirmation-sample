import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path = require('path')

type CreateAddUserFuncProps = {}
export const createAddUserFunc = (
	scope: Construct,
	props: CreateAddUserFuncProps
) => {
	const addUserFunc = new NodejsFunction(
		scope,
		`postconfirmation-example-addUserFunc`,
		{
			functionName: `postconfirmation-example-addUserFunc`,
			runtime: Runtime.NODEJS_16_X,
			handler: 'handler',
			entry: path.join(__dirname, `./main.ts`),
		}
	)

	return addUserFunc
}
