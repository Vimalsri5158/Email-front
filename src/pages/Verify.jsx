/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "../config";

const Verify = () => {
  const [params] = useSearchParams();
  const [isVerified, setVerified] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const verifyUser = async () => {
    try {
      setLoading(true);
      await fetch(`${backendUrl}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: params.get('token') }),
      });
      setVerified(true);
    } catch (e) {
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      {isLoading && 'Verifying, please wait...'}
      {!isLoading && isVerified && "User ID and password verified, please login. Back to your gmail home Page"}
      {!isLoading && !isVerified && 'Unable to verify, please try again later.'}
    </div>
  );
};

export default Verify;
