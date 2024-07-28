'use client';

import {usePrivy} from '@privy-io/react-auth';

export default function LoginButton() {
  const {ready, authenticated, login, user} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    return (
        <button disabled={disableLogin} onClick={login}>
            Log in
        </button>
    );
    }

  if (ready && authenticated) {
    // Replace this code with however you'd like to handle an authenticated user
    console.log("User is logged in", user);
    return <p className="text-gray-600 font-semibold">Logged in</p>;
  }
}
