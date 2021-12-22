////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// TO JEST W REPOZYTORIUM CORE ALGOLII
/////// ROBIMY Z PONIŻSZEGO PACZKĘ, np. divante-serverless-algolia
/////// PCHAMY TO DO NPM REGISTRY
////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {AWS} from "@serverless/typescript";

let functionType: AWS['functions'];
let apiGatewayType: AWS['provider']['apiGateway'];
let cfnResource: AWS['resources']

export interface ServerlessYMLBuilder {
    buildServerlessTemplate(): AWS
    withFunction(functionDef: typeof functionType): ServerlessYMLBuilder
    withCustomApiGatewayConfig(apiGwConf: typeof apiGatewayType): ServerlessYMLBuilder
    withCustomCFNResourceSection(customCfnResourceSection: typeof cfnResource): ServerlessYMLBuilder
}

export class AlgoliaBuilder implements ServerlessYMLBuilder {

    private aws: AWS

    /// tutaj definiujemy "core"
    constructor() {
        this.aws = {
            service: {
                name: "algolia"
            },
            provider: {
                name: 'aws',
                region: 'eu-west-1',
                runtime: 'nodejs14.x'
            },
            functions: {
                "FunctionAbc": {
                    handler: 'handler.hello',
                    events: [
                        {
                            http: {
                                method: 'get',
                                path: 'hello',
                            }
                        }
                    ],
                }
            },
            resources: {
                Resources: {
                    "MyS3Bucket": {
                        Type: "AWS::S3::Bucket",
                        Properties: {
                            "BucketName": "arbitrary-name-tdudek-should-not-be-existin123g"
                        }
                    }
                }
            }
        };
    }

    public withCustomApiGatewayConfig(apiGwConf: typeof apiGatewayType): ServerlessYMLBuilder {
        this.aws.provider.apiGateway = { ...this.aws.provider.apiGateway, ...apiGwConf}
        return this
    }

    public withFunction(functionDef: typeof functionType): ServerlessYMLBuilder {
        this.aws.functions = { ...this.aws.functions, ...functionDef }
        return this
    }

    public withCustomCFNResourceSection(customCfnResourceSection: typeof cfnResource): ServerlessYMLBuilder {
        this.aws.resources = { ...this.aws.resources, ...customCfnResourceSection }
        return this
    }

    // to ofc rozszerzamy dalej

    public buildServerlessTemplate(): AWS {
        return this.aws
    }

}