import styles from './form.module.scss';

const FormFooter = ({children}) => {
    return(
        <div className={styles.footer}>
            {children}
        </div>
    );
};

export default FormFooter;
