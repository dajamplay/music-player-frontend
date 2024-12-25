import styles from './form.module.scss';

const FormButton = ({children}, props) => {
    return(
        <>
            <button className={styles.button} {...props}>{children}</button>
        </>
    );
}

export default FormButton;
