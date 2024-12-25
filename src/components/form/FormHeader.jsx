import styles from './form.module.scss';

const FormHeader = ({title}) => {
    return(
        <>
            <div className={styles.header}>{title}</div>
        </>
    );
};

export default FormHeader;
