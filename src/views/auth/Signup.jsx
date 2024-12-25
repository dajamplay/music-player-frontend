import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../../axios/axios.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import styles from './Auth.module.scss';
import FormContainer from "@/components/form/FormContainer.jsx";
import FormLabel from "@/components/form/FormLabel.jsx";
import FormError from "@/components/form/FormError.jsx";
import FormInput from "@/components/form/FormInput.jsx";
import FormFooter from "@/components/form/FormFooter.jsx";
import FormButton from "@/components/form/FormButton.jsx";
import FormHeader from "@/components/form/FormHeader.jsx";

export default function() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient.post('/signup', payload).then( ({data}) => {
            alert('Thanks for registration.');
            setUser(data.user);
            setToken(data.token);
        }).catch( err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    };

    return(
        <>
            <div className={styles.form_container}>
                <FormContainer onFormSubmit={onSubmit}>
                    <FormHeader title='Регистрация'/>

                    <FormLabel>Имя</FormLabel>
                    <FormError error={errors?.name}/>
                    <FormInput refprop={nameRef} type="text" placeholder="Введите имя"/>

                    <FormLabel>Почта</FormLabel>
                    <FormError error={errors?.email}/>
                    <FormInput refprop={emailRef} type="email" placeholder="Введите почту"/>

                    <FormLabel>Пароль</FormLabel>
                    <FormError error={errors?.password}/>
                    <FormInput refprop={passwordRef} type="password" placeholder="Введите пароль"/>

                    <FormLabel>Пароль повторно</FormLabel>
                    <FormError error={errors?.password_confirmation}/>
                    <FormInput refprop={passwordConfirmationRef} type="password" placeholder="Введите пароль повторно"/>

                    <FormFooter>
                        <FormButton>Регистрация</FormButton>
                        <Link to="/login">Вход</Link>
                    </FormFooter>

                </FormContainer>
            </div>
        </>
    );
}
