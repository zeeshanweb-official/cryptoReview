let HOST = "http://24.255.40.217:8080";
export function GetData() {
  return fetch(HOST + "/data/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
export function getLoginToken(email, password) {
  return fetch(HOST + "/auth/v2/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
export function forgotPasswordJourney(email) {
  return fetch(HOST + "/auth/v2/forgot_password", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getSignUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  captcha
) {
  return fetch(HOST + "/auth/v2/signup", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      captcha: captcha,
      confirmPassword: confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
