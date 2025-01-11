import bcrypt from 'bcrypt';

export const genHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}