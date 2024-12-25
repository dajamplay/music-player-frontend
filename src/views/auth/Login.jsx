import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios/axios.js";
import FormInput from "../../components/form/FormInput.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import FormLabel from "../../components/form/FormLabel.jsx";
import styles from './Auth.module.scss';
import FormError from "@/components/form/FormError.jsx";
import FormFooter from "@/components/form/FormFooter.jsx";
import FormContainer from "@/components/form/FormContainer.jsx";
import FormHeader from "@/components/form/FormHeader.jsx";

export default function() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/login', payload).then( ({data}) => {
            console.log(data);
            setUser(data.user);
            setToken(data.token);
        }).catch( err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    if (err.response.data.message) {
                        setErrors({
                            email: [err.response.data.message],
                            password: [err.response.data.message],
                        });
                    }
                }
            }
        });
    };

    return(
        <div className={styles.form_container}>
            <FormContainer onFormSubmit={onSubmit}>
                <FormHeader title='Вход'/>

                <FormLabel>Почта</FormLabel>
                <FormError error={errors?.email}/>
                <FormInput refprop={emailRef} type="email" placeholder="Введите почту"/>

                <FormLabel>Пароль</FormLabel>
                <FormError error={errors?.password}/>
                <FormInput refprop={passwordRef} type="password" placeholder="Введите почту"/>

                <FormFooter>
                    <FormButton>Вход</FormButton>
                    <Link to="/signup">Регистрация</Link>
                </FormFooter>

            </FormContainer>
        </div>
    );
}


