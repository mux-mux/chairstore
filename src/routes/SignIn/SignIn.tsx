import {
  UserAuth,
  signInWithGooglePopup,
  createUserDocument,
} from '../../utils/firebase/firebase';

import SignUp from '../../components/SignUp/SignUp';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    const userAuth: UserAuth = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
    };

    const userDocRef = await createUserDocument(userAuth, {});
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
