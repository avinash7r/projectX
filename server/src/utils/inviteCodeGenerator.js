import crypto from 'crypto';

/**
 * Generate a unique invite code
 * @param {number} length - Length of the invite code (default 8)
 * @returns {string} Unique invite code
 */
export const generateInviteCode = (length = 8) => {
    // Use cryptographically secure random bytes
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convert to hexadecimal
        .slice(0, length) // Trim to desired length
        .toUpperCase(); // Convert to uppercase

    return randomBytes;
};

/**
 * Validate invite code format
 * @param {string} code - Invite code to validate
 * @returns {boolean} Whether the code is valid
 */
export const validateInviteCode = (code) => {
    // Regex for alphanumeric codes
    const inviteCodeRegex = /^[A-Z0-9]{8}$/;
    return inviteCodeRegex.test(code);
};
