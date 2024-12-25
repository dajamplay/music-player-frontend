import styles from './form.module.scss';

const FormError = ({error}) => {
    return(
        <>
            {error &&
                <div className={styles.error}>{error[0]}</div>
            }
        </>
    );
};

export default FormError;
