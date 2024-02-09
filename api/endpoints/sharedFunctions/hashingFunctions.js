import bcryptjs from 'bcrypt'

export async function comparePasswords (password, hash) {
    const result = await bcryptjs.compare(password, hash) // process.env.PEPPER
    return result
}

export async function hashPassword (password) {
    const saltRounds = 10
    const salt = await bcryptjs.genSalt(saltRounds)
    const hash = await bcryptjs.hash(password, salt) // process.env.PEPPER
    return hash
}

