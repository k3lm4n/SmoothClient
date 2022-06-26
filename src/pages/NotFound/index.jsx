import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.main}>
          <h1>404</h1>
          <p>
            Não encontramos a página que você estava procurando. 
			Talvez nosso FAQ ou Comunidade pode ajudar?
          </p>
          <span onClick={() => history.push("/home")}>Voltar ao ínicio</span>
        </div>
      </div>
      <div className={styles.right}>
        <img src="./images/record.svg" alt="record" className={styles.record} />
        <img
          src="./images/record-arm.svg"
          alt="record-arm"
          className={styles.record_arm}
        />
      </div>
    </div>
  );
};

export default NotFound;
