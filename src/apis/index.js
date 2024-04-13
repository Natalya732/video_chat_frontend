import { makeApiCall } from "@/utils/util";

export const getUserDetails = async (uid) => {
  const path = `/users/${uid}`;

  return await makeApiCall({
    functionName: "getUserDetails",
    defaultErrorMessage: "Failed to get user details",
    fetchWrapperOptions: {
      path,
    },
  });
};
