import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

function SignInWithGoogle({ setMail, setName }) {
    const [loading, setLoading] = useState(false);

    function googleLogin() {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (results) => {
            setName(results.user.displayName);
            setMail(results.user.email);
            console.log(results)
        });
        setLoading(false);
    }

    return (
        <button onClick={googleLogin} disabled={loading}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d="M23.49 12.27c-.23-1.35-1.1-2.56-2.41-3.11-.97-.38-2.05-.48-3.1-.48-1.13 0-2.26.15-3.34.47-1.18.38-2.32.96-3.34 1.71-.81.6-1.49 1.3-2.02 2.1-.53.8-.82 1.7-.82 2.66 0 1.22.43 2.35 1.18 3.29.76.95 1.82 1.71 3.03 2.22-.95.69-1.83 1.51-2.49 2.49-.66.99-1.03 2.08-1.12 3.23-.08 1.14.14 2.26.56 3.24.42.98 1.05 1.84 1.88 2.57.83.74 1.81 1.26 2.82 1.53 1.03.28 2.06.26 3.09-.07 1.08-.35 2.05-.95 2.83-1.83.79-.9 1.38-1.91 1.74-3.03.34-1.08.49-2.23.39-3.38-.12-1.18-.52-2.32-1.11-3.34-.58-1.02-1.35-1.97-2.23-2.73-1.01-.83-2.14-1.58-3.32-2.2z" />
            </svg>
            Proceed With Google
        </button>
    )
}

export default SignInWithGoogle;