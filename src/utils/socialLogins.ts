import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { showError } from './helperFunction';

const logInWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            webClientId: "984504273759-fq6nl2ofql7g72i993j21hgbsp085h28.apps.googleusercontent.com",
            offlineAccess: true,
        });
        await GoogleSignin.signOut();
        const { data } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(data?.idToken as string);
        const userCredential = await signInWithCredential(getAuth(), googleCredential);
        const firebaseIdToken = await userCredential.user.getIdToken();
        return firebaseIdToken;
    } catch (error) {
        console.log(error, "error in google login");
        showError('Google login failed');
        return null;
    }
}

export { logInWithGoogle };