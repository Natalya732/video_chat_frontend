import toast from "react-hot-toast";

const backendApiUrl = process.env.REACT_APP_BACKEND_URL;

export const handleNumericInputKeyDown = (event) => {
  let key = event.key;

  if (
    key === "Backspace" ||
    key === "Tab" ||
    key === "Delete" ||
    key.toLowerCase() === "arrowleft" ||
    key.toLowerCase() === "arrowright" ||
    key.toLowerCase() === "arrowup" ||
    key.toLowerCase() === "arrowdown" ||
    (event.ctrlKey && (key == "v" || key == "V"))
  )
    return;

  if (!/[0-9]/.test(key)) {
    event.returnValue = false;

    if (event.preventDefault) event.preventDefault();
  }
};

export const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const copyToClipboard = (text, hideToast = false) => {
  if (!text) return;
  if (!hideToast) toast.success("Copied");
  navigator.clipboard.writeText(text);
};

export const getDebounceFunc = () => {
  let timeout;

  return (func, time = 200) => {
    clearTimeout(timeout);

    timeout = setTimeout(func, time);
  };
};

export const getThrottlingFunc = () => {
  let isThrottling = false;

  return (func, time = 200) => {
    if (isThrottling) return;
    isThrottling = true;

    setTimeout(() => {
      func();
      isThrottling = false;
    }, time);
  };
};

export const generateUniqueString = (idLength = 10) =>
  (Date.now() + parseInt(Math.random() * 99999999999))
    .toString(16)
    .slice(-1 * idLength);

export const errorToastLogger = (
  functionName,
  message,
  error,
  preventToast = false,
  neutralToast = false
) => {
  if (message) {
    if (typeof message !== "object" && !preventToast) {
      if (neutralToast) toast("" + message);
      else toast.error("" + message);
    }
    console.error(`Error at ${functionName} : ${error ? error : message}`);
    return;
  }

  console.error(`Error at ${functionName} : ${error ? error : ""}`);
};

export const handleLogout = async () => {
  localStorage.removeItem("app-token");

  if (!window.location.href.includes("auth")) window.location.replace("/auth");
};

export const fetchWrapper = async ({
  path = "",
  payload = "",
  headers = {},
  requestType = "",
  isPublic = false,
  usePathAsUrl = false,
}) => {
  const url = usePathAsUrl ? path : backendApiUrl + path;
  const fetchOptions = {
    method: requestType || (payload ? "POST" : "GET"),
    headers: {
      ...headers,
    },
  };

  if (!isPublic) {
    const token = localStorage.getItem("app-token");
    if (!token) {
      handleLogout();
      toast.error("Not logged in!");
      return;
    }

    fetchOptions.headers["Authorization"] = token;
  }

  if (payload && typeof payload === "object") {
    fetchOptions.body = JSON.stringify(payload);
    fetchOptions.headers["Content-Type"] = "application/json";
  }

  return fetch(url, fetchOptions);
};

export const makeApiCall = async ({
  functionName = "",
  defaultErrorMessage = "",
  fetchWrapperOptions = {
    path: "",
    payload: "",
    headers: {},
    requestType: "",
    isPublic: false,
    sendPayloadAsItIs: false,
    usePathAsUrl: false,
  },
  preventToast = false,
  neutralToast = false,
}) => {
  try {
    const response = await fetchWrapper({
      ...fetchWrapperOptions,
    });
    const data = await response.json();

    if (!data?.success) {
      errorToastLogger(
        functionName,
        data?.error?.message || defaultErrorMessage,
        data?.error,
        preventToast,
        neutralToast
      );
      return false;
    }
    return data;
  } catch (err) {
    errorToastLogger(functionName, defaultErrorMessage, err);
    return false;
  }
};

export function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const validateEmail = (email) => {
  if (!email) return false;
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validatePassword = (pass) => {
  if (!pass) return false;
  return /^(?=.*[0-9])(?=.*[!@#$%^&+*])[a-zA-Z0-9!@#$%^&+*]{6,18}$/.test(pass);
};

export const getDateFormatted = (val, short = false, excludeYear = false) => {
  if (!val) return "";
  const date = new Date(val);
  var day = date.toLocaleString("en-in", { day: "numeric" });
  var month = date.toLocaleString("en-in", {
    month: short ? "short" : "long",
  });
  var year = date.toLocaleString("en-in", { year: "numeric" });

  if (excludeYear) return `${day} ${month}`;
  else return `${day} ${month}, ${year}`;
};

export function getTimeFormatted(value, includeSeconds = false) {
  if (!value) return;

  const date = new Date(value);
  let hours = date?.getHours();
  let minutes = date?.getMinutes();
  let seconds = date?.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime =
    hours + ":" + minutes + (includeSeconds ? `:${seconds} ` : " ") + ampm;

  return strTime;
}
