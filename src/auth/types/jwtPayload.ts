export type JwtPayload = {
    email: string,
    userId: number,
    blocked: boolean,
    role: string,
}

export type JwtPayloadWithAccessToken = JwtPayload & {refreshToken: string}