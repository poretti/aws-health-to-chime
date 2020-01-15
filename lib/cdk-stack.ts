import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';

export class HealthToChimeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, "HealthToChimeLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(15),
      code: lambda.Code.asset("dist/src"),
      handler: "app.handler",
      deadLetterQueueEnabled: true,
      environment: {
        chimeRoomWebhook: "some-webhook"
      }
    });

    new events.Rule(this, "AwsHealthEvents", {
      description: "Send AWS Health events to the specified target",
      enabled: true,
      eventPattern: {
        // https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html#health-event-types
        detailType: ["AWS Health Event"],
        source: ["aws.health"],
        detail: {
          eventTypeCategory: ["issue", "accountNotification", "scheduledChange"]
        },
      },
      targets: [new eventsTargets.LambdaFunction(lambdaFunction)],
    });
  }
}