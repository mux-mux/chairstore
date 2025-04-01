import { UserAuth } from '../../utils/firebase/firebase';
import {
  signInWithGooglePopup,
  createUserDocument,
} from '../../utils/firebase/firebase';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    const userAuth: UserAuth = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
    };

    const userDocRef = await createUserDocument(userAuth);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
