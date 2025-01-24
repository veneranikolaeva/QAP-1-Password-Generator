const { program } = require('commander');

// Function to generate password
const generatePassword = (length, useUppercase, useNumbers, useSymbols) => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// CLI setup
program
    .version('1.0.0')
    .option('-l, --length <number>', 'Length of password', parseInt)
    .option('--uppercase', 'Include uppercase letters')
    .option('--numbers', 'Include numbers')
    .option('--symbols', 'Include symbols')
    .action(() => {
        const length = program.length || 8; // Default length is 8
        const useUppercase = !!program.uppercase;
        const useNumbers = !!program.numbers;
        const useSymbols = !!program.symbols;

        //Debugging output
        console.log('Length:', program.length);
        console.log('Use Uppercase:', program.uppercase);
        console.log('Use Numbers:', program.numbers);
        console.log('Use Symbols:', program.symbols);

        // Validate length
        if (length <= 0) {
            console.error('Password length must be greater than 0');
            process.exit(1);
        }

        const password = generatePassword(length, useUppercase, useNumbers, useSymbols);
        console.log(`Generated Password: ${password}`);
    });

program.parse(process.argv);