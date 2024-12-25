import styles from './form.module.scss';

const Form = ({children, onFormSubmit}, props) => {
    return(
        <form onSubmit={onFormSubmit} className={styles.form} {...props}>
            {children}
        </form>
    );
};

export default Form;
