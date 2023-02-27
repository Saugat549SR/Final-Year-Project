import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearErrors, register } from '../../actions/userAction';
import styles from './styles.module.css';
import Loader from '../Main/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Signup = () => {
  const dispatch = useDispatch();
  const [ss, setss] = useState();
  const alert = useAlert();
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    avatar: '',
    avatarPreview: null,
  });
  const { error, loading } = useSelector((state) => state.user);

  const { firstName, lastName, email, password } = user;
  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('firstName', firstName);
    myForm.set('lastName', lastName);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('image', ss);
    console.log(myForm);
    // for (let key of myForm.keys()) {
    //   console.log(key + ': ' + myForm.get(key));
    // }
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      setss(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div className={styles.img}>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1> Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form
              className={styles.form_container}
              onSubmit={registerSubmit}
              encType="multipart/form-data"
            >
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={registerDataChange}
                value={firstName}
                required
                className={styles.input}
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={registerDataChange}
                value={lastName}
                required
                className={styles.input}
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={registerDataChange}
                value={email}
                required
                className={styles.input}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={registerDataChange}
                value={password}
                required
                className={styles.input}
              />
              <div id={styles.registerImage}>
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <button type="submit" className={styles.green_btn}>
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
