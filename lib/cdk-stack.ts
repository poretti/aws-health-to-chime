import * as cdk from '@aws-cdk/core';
import lambda = require("@aws-cdk/aws-lambda");

export class HealthToChimeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "HealthToChimeLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("dist/src"),
      handler: "app.handler",
      environment: {
        myVar: "myVar"
      }
    });
  }
}