import styles from './form.module.scss';

const FormLabel = ({children, errors}, props) => {
    return(
        <>
            <label className={styles.label} {...props}>{children}</label>
        </>
    );
}

export default FormLabel;
