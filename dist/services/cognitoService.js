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
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const config_1 = __importDefault(require("../config"));
class CognitoService {
    constructor() {
        this.getCognitoUser = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
                        Username: email,
                        Pool: this.cognitoUserpool
                    });
                    resolve(this.cognitoUser.getUsername());
                }
                catch (error) {
                    reject('user not found');
                }
            });
        });
        this.signUp = ({ email, password, name, gender }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const nameAttribute = new amazon_cognito_identity_js_1.CognitoUserAttribute({
                        Name: 'name',
                        Value: name
                    });
                    const genderAttribute = new amazon_cognito_identity_js_1.CognitoUserAttribute({
                        Name: 'gender',
                        Value: gender
                    });
                    this.cognitoUserpool.signUp(email, password, [nameAttribute, genderAttribute], [], (error, response) => {
                        if (error)
                            reject({ status: false, error });
                        resolve({
                            status: true,
                            message: 'success',
                            userSub: response === null || response === void 0 ? void 0 : response.userSub,
                            userConfirmed: response === null || response === void 0 ? void 0 : response.userConfirmed
                        });
                    });
                }
                catch (error) {
                    console.log('CognitoService signUp error', error);
                    reject({ status: false, error });
                }
            });
        });
        this.confirmSignUp = ({ email, confirmationCode }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const user = new amazon_cognito_identity_js_1.CognitoUser({
                        Username: email,
                        Pool: this.cognitoUserpool
                    });
                    user.confirmRegistration(confirmationCode, false, (error, response) => {
                        if (error)
                            reject({ status: false, error });
                        resolve({ status: true, message: 'success' });
                    });
                }
                catch (error) {
                    console.log('CognitoService confirmSignup error', error);
                    reject({ status: false, error });
                }
            });
        });
        this.signIn = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.getCognitoUser(email);
                    const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
                        Username: email,
                        Password: password
                    });
                    this.cognitoUser.authenticateUser(authenticationDetails, {
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
        this.resendConfirmationCode = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.getCognitoUser(email);
                    this.cognitoUser.resendConfirmationCode((error) => {
                        if (error)
                            reject({ status: false, error });
                        resolve({ status: true, message: 'success' });
                    });
                }
                catch (error) {
                    console.log('CognitoService resendConfirmationCode error', error);
                    reject({ status: false, message: 'failed' });
                }
            }));
        });
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.getCognitoUser(email);
                    this.cognitoUser.forgotPassword({
                        onSuccess: (data) => {
                            var _a;
                            resolve({
                                status: true,
                                message: `verification code sent: ${(_a = data === null || data === void 0 ? void 0 : data.CodeDeliveryDetails) === null || _a === void 0 ? void 0 : _a.Destination}`
                            });
                        },
                        onFailure: (error) => reject({ status: false, error })
                    });
                }
                catch (error) {
                    reject({ status: false, error });
                    console.log('CognitoService forgotPassword error', error);
                }
            }));
        });
        this.confirmPassword = ({ email, newPassword, verificationCode }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.getCognitoUser(email);
                    this.cognitoUser.confirmPassword(verificationCode, newPassword, {
                        onSuccess: (data) => {
                            resolve({
                                status: true,
                                message: data
                            });
                        },
                        onFailure: (error) => reject({ status: false, error })
                    });
                }
                catch (error) {
                    reject({ status: false, error });
                    console.log('CognitoService confirmPassword error', error);
                }
            }));
        });
        this.changePassword = ({ email, oldPassword, newPassword }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.getCognitoUser(email);
                    this.cognitoUser.changePassword(oldPassword, newPassword, (error) => {
                        if (error)
                            reject({ status: false, error: error.message });
                        resolve({ status: true, message: 'success' });
                    });
                }
                catch (error) {
                    console.log('CongnitoService changePassword error', error);
                }
            }));
        });
        this.cognitoUserpool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: config_1.default.cognitoUserpoolId,
            ClientId: config_1.default.cognitoClientId
        });
        this.cognitoUser;
    }
}
exports.CognitoService = CognitoService;
