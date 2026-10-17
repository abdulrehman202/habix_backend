import bcrypt from 'bcrypt';

export default (async (plainTextPassword)=>{
 const saltRounds = 10;
    // Generates a secure salt and hashes the password in one step
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword
});