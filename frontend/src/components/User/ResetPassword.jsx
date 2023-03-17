import React, { Fragment, useState, useEffect } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import './ResetPassword.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Main/Loader/Loader';
import { Navbar } from '../Main/Homepage/Navbar';
import { useAlert } from 'react-alert';
import { clearErrors, resetPassword } from '../../actions/userAction';

import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('password', Password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Updated Successfully');
      navigate('/login');
    }
  }, [dispatch, error, alert, success, navigate]);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="resetpass">Reset Password</h1>
          <div className="resetMainPassword">
            <div className="resetPassword">
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="resetpasswords">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={Password}
                    required
                    className="passwordInput"
                  />
                </div>
                <div className="resetpasswords">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    className="passwordInput"
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
