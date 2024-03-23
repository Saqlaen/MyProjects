import { signInWithGooglePopUp } from "../../../Utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp();
        console.log( response );
    }

    return(
        <>
            <h1>I am SignIn Compoent</h1>
            <button onClick={ logGoogleUser }> LOG ME IN </button>
        </>
    )
}

export default SignIn;