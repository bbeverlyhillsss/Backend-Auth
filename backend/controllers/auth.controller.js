import catchAsync from '../utils/catch.async.js'
import {loginService, logoutService, refreshService, registerService} from '../services/auth.servise.js'

const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000 //30d

export const register = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body
    const userData = await registerService(name, email, password)

    res.cookie("refreshToken", userData.refreshToken, {
        maxAge: REFRESH_TOKEN_MAX_AGE,
        httpOnly: true
    })

    return res.status(201).json(userData)
})

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const userData = await loginService(email, password)

    res.cookie("refreshToken", userData.refreshToken, {
        maxAge: REFRESH_TOKEN_MAX_AGE,
        httpOnly: true
    })

    return res.status(200).json(userData)
})

export const logout = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies
    await logoutService(refreshToken)
    res.clearCookie("refreshToken")

    return res.status(200).json({ message: " Logout is successfully."})
})

export const refresh = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies
    const userData = await refreshService(refreshToken)

    res.cookie("refreshtoken", userData.refreshToken, {
         maxAge: REFRESH_TOKEN_MAX_AGE,
        httpOnly: true
    })

    return res.status(200).json(userData)
})