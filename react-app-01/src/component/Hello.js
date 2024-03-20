import Message from "./Message";
import styles from './Hello.module.css';
export default function Hello() {
    return (
        <div>
            <h1 className={styles.csstest}>hello</h1>
            <Message />
            <Message />
            <Message />
        </div >
    )
}