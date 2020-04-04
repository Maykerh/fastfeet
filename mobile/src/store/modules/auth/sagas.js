import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const id = payload;

        const response = yield call(api.get, `deliverymans/${id}`);

        const deliveryman = response.data;

        if (!deliveryman) {
            Alert.alert(
                'Falha na autenticação',
                'Id de entregador não encontrado'
            );

            yield put(signFailure());

            return;
        }

        yield put(signInSuccess(deliveryman));
    } catch (err) {
        Alert.alert('Falha na autenticação', 'Verifique seus dados');
        yield put(signFailure());
    }
}

export default all([
    // takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
