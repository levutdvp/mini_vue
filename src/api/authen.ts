import api from "./api"
type LoginParams = {
    email:string,
    password :string
}
export const LoginApi = (user: LoginParams) => {
    return api.post<{accessToken: string}>('auth/login', user)
}

