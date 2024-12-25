import styles from './Button.module.scss';

const Button = (props) => {
    return(
        <>
            <button {...props} className={styles.button}>
                {props.title ?? 'Клик'}
            </button>
        </>
    );
}

export default Button;
