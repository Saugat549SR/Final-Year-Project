import { useState } from 'react';
import styles from './styles.module.css';

const ForgotPassword = () => {
  const [email] = useState('');

  return (
    <div className={styles.container}>
      <form className={styles.form_container}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.green_btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;