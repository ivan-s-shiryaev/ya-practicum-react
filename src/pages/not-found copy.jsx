import React from 'react';
import {
    Link,
} from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import styles from './not-found.module.css';

export function NotFound404() {

    return (
        <React.Fragment>
            <AppHeader />
                <main
                    className={styles.wrapper}
                >
                    <article
                        className={styles.container}
                    >
                        <h1
                            className="text text_type_main-medium"
                        >
                            Здесь ничего нет...
                        </h1>
                        <p
                            className="text text_type_main-default text_color_inactive mt-20"
                        >
                            Вернитесь на <Link to="/">главную страницу</Link>
                        </p>
                    </article>
                </main>
        </React.Fragment>
    );

}