"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const config_1 = __importDefault(require("../../config"));
class CognitoService {
    constructor() {
        this.signUp = ({ name, gender, email, password }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let data;
                    const params = {
                        ClientId: config_1.default.cognitoClientId,
                        Password: password,
                        Username: email,
                        UserAttributes: [
                            {
                                Name: 'gender',
                                Value: gender
                            },
                            {
                                Name: 'name',
                                Value: name
                            }
                        ]
                    };
                    this.cognitoService
                        .signUp(params, (error, response) => {
                        if (error) {
                            console.log('signup error', error);
                            data = {
                                status: false,
                                message: 'user sign-up failed'
                            };
                            reject(error);
                        }
                        console.dir(response);
                        data = {
                            status: true,
                            message: 'user sign-up successful',
                            userSub: response === null || response === void 0 ? void 0 : response.UserSub,
                            userConfirmed: response === null || response === void 0 ? void 0 : response.UserConfirmed
                        };
                        resolve(data);
                    })
                        .promise();
                }
                catch (error) {
                    console.log('CognitoService signUp catch error', error);
                }
            });
        });
        this.confirmSignUp = ({ email, confirmationCode }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const params = {
                        ClientId: config_1.default.cognitoClientId,
                        Username: email,
                        ConfirmationCode: confirmationCode
                    };
                    this.cognitoService.confirmSignUp(params, (error) => {
                        if (error) {
                            console.log('confirmSignUp error', error);
                            reject(error);
                        }
                        resolve({
                            status: true,
                            message: 'Success'
                        });
                    });
                }
                catch (error) {
                    console.log('CognitoService confirmSignUp error', error);
                }
            });
        });
        this.signIn = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
                        Username: email,
                        Pool: this.cognitoUserpool
                    });
                    const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
                        Username: email,
                        Password: password
                    });
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: (result) => {
                            const idToken = result.getIdToken();
                            const accessToken = result.getAccessToken();
                            console.log(accessToken.payload.sub);
                            const response = {
                                status: true,
                                message: 'success',
                                sub: idToken.payload.sub,
                                name: idToken.payload.name,
                                gender: idToken.payload.gender,
                                accessToken: accessToken.getJwtToken()
                            };
                            resolve(response);
                        },
                        onFailure: (error) => {
                            reject({
                                status: false,
                                message: error
                            });
                            console.log('CognitoService SignIn error', error);
                        }
                    });
                }
                catch (error) {
                    console.log('CognitoService SignIn error', error);
                }
            });
        });
        this.cognitoService = new aws_sdk_1.default.CognitoIdentityServiceProvider({
            region: 'us-east-1'
        });
        this.cognitoUserpool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: config_1.default.cognitoUserpoolId,
            ClientId: config_1.default.cognitoClientId
        });
    }
}
exports.CognitoService = CognitoService;
