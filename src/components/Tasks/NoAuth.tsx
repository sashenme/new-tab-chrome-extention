import React from "react";
import GoogleIcon from "../../assets/icons/GoogleIcon";

const NoAuth: React.FC<{getAuth: ()=>void}> = ({getAuth}) => {
  return (
    <div className="px-6">
      <h1 className="text-3xl font-semibold">Google Tasks</h1>
      <p className="text-sm text-gray-300 mb-8">
        Please authenticate with your Google account to list your Google Tasks
        here
      </p>
      <button
        type="button"
        onClick={getAuth}
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <GoogleIcon />
        Sign in with Google
      </button>
    </div>
  );
};

export default NoAuth;
