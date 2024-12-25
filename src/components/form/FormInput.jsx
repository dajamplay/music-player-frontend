import styles from './form.module.scss';

const FormInput = (props) => {
    return(
        <>
            <input ref={props?.refprop} className={styles.input} {...props}/>
        </>
    );
};

export default FormInput;
