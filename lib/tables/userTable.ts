import { Construct } from 'constructs'
import * as awsDynamodb from 'aws-cdk-lib/aws-dynamodb'

type CreateUserTableProps = {}
export function createUserTable(
	scope: Construct,
	props: CreateUserTableProps
): awsDynamodb.Table {
	const userTable = new awsDynamodb.Table(
		scope,
		`postconfirmation-example-userTable`,
		{
			tableName: `postconfirmation-example-userTable`,
			billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
			partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
		}
	)

	return userTable
}
