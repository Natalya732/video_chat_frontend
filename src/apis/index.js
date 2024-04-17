import { makeApiCall } from "@/utils/util";

export const getCurrentUser = async () => {
  const path = `/user/me`;

  return await makeApiCall({
    functionName: "getCurrentUser",
    defaultErrorMessage: "Failed to get user details",
    fetchWrapperOptions: {
      path,
    },
  });
};
