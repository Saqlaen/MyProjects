import { signInWithGooglePopUp, createUserDocWithAuth } from "../../../Utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocWithAuth( user );
    }

    return(
        <>
            <h1>I am SignIn Compoent</h1>
            <button onClick={ logGoogleUser }> LOG IN with google pop up </button>
        </>
    )
}

export default SignIn;