import { useState } from 'react';
import styless from './styless.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpForm = () => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [data] = useState({
    otpCode: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/users/register';
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/users/resendOTPVerification';
      const { data: res } = await axios.post(url, data);
      handleSubmit();
      setMsg(res.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={styless.container}>
      <form className={styless.form_container} onSubmit={handleSubmit}>
        <h1>Enter Otp to verify</h1>

        <input
          type="text"
          placeholder="Otp Number"
          name="otp"
          maxLength="4"
          value={data.otpCode}
          required
          className={styless.input}
        />
        <h6 className={styless.h6}>
          verification code is sent to your email...
        </h6>
        {error && <div className={styless.error_msg}>{error}</div>}
        {msg && <div className={styless.success_msg}>{msg}</div>}

        {/* <Link to="/main"> */}
        <button type="submit" className={styless.green_btn}>
          Submit
        </button>
        {/* </Link> */}

        <button
          type="button"
          onClick={handleClick}
          className={styless.button_btn}
        >
          Resend
        </button>
      </form>
    </div>
  );
};

export default OtpForm;