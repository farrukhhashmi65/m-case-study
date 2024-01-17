import 'react-native';
import { call, takeLatest, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as Actions from '../../actions/userRegistrationActions';
import {
    watchUserRegistrationSaga,
    registerUser,
    registerUserAPI,
} from '../userRegistrationSaga';
import { Endpoints, Network } from '../../../networking';


describe('watchUserRegistrationSaga', () => {
    test('watchUserRegistrationSaga()', () => {
        const generator = watchUserRegistrationSaga();
        expect(generator.next().value).toEqual(
            takeLatest(
                Actions.REGISTER_USER_REQUEST,
                registerUser,
            ),
        );
    });
});

/** Testing registerUser,
 */
describe('registerUser()', () => {
    const data = {
        username: "abcdef",
        password: 'AB2334WE@',
        firstName: "Farrukh",
        lastName: 'Hashmi'
    };
    const action = Actions.registerUserRequest(data);
    const generator = cloneableGenerator(registerUser)(action);
    expect(generator.next().value).toEqual(call(registerUserAPI, action));

    test('Response is successful from registerUser', () => {
        const response = {
            status: 200,
            data: {
                data: {}
            },
        };

        const clone = generator.clone();
        expect(clone.next(response).value).toEqual(
            put(Actions.registerUserSuccess(response)),
        );
    });

    test('An Exception is thrown in registerUserAPI', () => {
        const error = {
            status: 400
        };
        const clone = generator.clone();
        expect(clone.throw(error).value).toEqual(
            put(Actions.registerUserFailure(error)),
        );
    });
});

describe('Request for registerUserAPI', () => {
    test('Request for registerUserAPI', () => {
        const action = Actions.registerUserRequest({
            username: "abcdef",
            password: 'AB2334WE@',
            firstName: "Farrukh",
            hashmi: 'Hashmi'
        });
        const config = {
            method: 'POST',
            url: Endpoints.POST_REGISTER_USER,
            data: action.payload,
        };
        const spy = jest
            .spyOn(Network, 'makeNetworkCall')
            .mockImplementation(() => Promise.resolve());
            registerUserAPI(action);
        expect(spy).toHaveBeenCalledWith(config);
    });
});
