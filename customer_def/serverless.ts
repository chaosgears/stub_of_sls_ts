import {AlgoliaBuilder} from '../core_algolia/algoliaBuilder'

module.exports = new AlgoliaBuilder()
    .withCustomApiGatewayConfig({
        restApiId: "arn::aws::abcd",
        restApiRootResourceId: "arn:aws::abcdefgh123"
    })
    .withFunction({
        "FunctionAbc": {
            handler: 'handler2.handler',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'hello123',
                    }
                }
            ],
            environment: {
                "NEW_BUCKET_ARN": {
                    "Fn::GetAtt": [
                        "MyS3BucketTwo",
                        "Arn"
                    ]
                }
            }
        }
    })
    .withCustomCFNResourceSection({
        Resources: {
            "MyS3BucketTwo": {
                Type: "AWS::S3::Bucket",
                Properties: {
                    "BucketName": "arbitrary-name-tdudek-should-not-be-existin123g-two"
                }
            }
        }
    })
    .buildServerlessTemplate()