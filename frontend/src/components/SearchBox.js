import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const { t } = useTranslation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t('Search Products')}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                {t('Search')}
            </Button>
        </Form>
    );
};

export default SearchBox;
