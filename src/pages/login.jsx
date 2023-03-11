import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useNavigate,
    Link,
} from 'react-router-dom';
import {
	EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
    validateEmail,
    validatePassword,
} from '../utils';
import {
    SET_AUTH_LOGIN_DATA,
    readAuthLogin,
} from '../services/actions/auth';
import styles from './login.module.css';

export function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data: {
            email,
            password,
        },
        request,
    } = useSelector((state) => state.auth.login);

    const onFormSubmit = React.useCallback(
        (event) => {

            event.preventDefault();

            if (
                email 
                && password
                && validateEmail(email)
                && validatePassword(password)
            ) {

                (
                    async () => {
                        if (await dispatch(readAuthLogin({ email, password }))) {
                            navigate('/', {replace: true});
                        }
                    }
                )();

            }

        }
        , [
            dispatch,
            navigate,
            email,
            password,
        ]
    );

    const onInputChange = React.useCallback(
        (event) => {
            dispatch({
                type: SET_AUTH_LOGIN_DATA,
                payload: {
                    [event.target.name]: event.target.value,
                },
            });
        }
        , [ dispatch ]
    );

    return (
        <React.Fragment>
            <main
                className={styles.wrapper}
            >
                <form
                    onSubmit={onFormSubmit}
                >
                    <article
                        className={styles.container}
                    >
                        <h1
                            className="text text_type_main-medium"
                        >
                            Вход
                        </h1>
                        <EmailInput
                            name={'email'}
                            value={email}
                            onChange={onInputChange}
                            disabled={request}
                            placeholder={'E-mail'}
                            isIcon={false}
                            extraClass="mt-6"
                        />
                        <PasswordInput
                            name={'password'}
                            value={password}
                            onChange={onInputChange}
                            disabled={request}
                            extraClass="mt-6"
                        />
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={request}
                            size="medium"
                            extraClass="mt-6"
                        >
                            Войти
                        </Button>
                        <p
                            className="text text_type_main-default text_color_inactive mt-20"
                        >
                            Вы &mdash; новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                        </p>
                        <p
                            className="text text_type_main-default text_color_inactive mt-4"
                        >
                            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                        </p>
                    </article>
                </form>
            </main>
        </React.Fragment>
    );

}