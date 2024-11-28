require('dotenv').config();
const axios = require('axios');

// Function to check if a contract is verified
async function checkVerificationStatus(contractAddress) {
    // BscScan API URL
    const apiUrl = 'https://api.bscscan.com/api';

    // API parameters
    const params = {
        module: 'contract',
        action: 'getsourcecode',
        address: contractAddress, // Contract address to check
        apikey: process.env.BSCSCAN_API_KEY, // Your BscScan API key
    };

    try {
        // Send a GET request to BscScan API
        const response = await axios.get(apiUrl, { params });

        // Parse the response
        const data = response.data;

        if (data.status === '1' && data.result[0].SourceCode) {
            console.log(`Contract at ${contractAddress} is verified.`);
            console.log('Contract Name:', data.result[0].ContractName);
            console.log('Compiler Version:', data.result[0].CompilerVersion);
            console.log('Optimization Used:', data.result[0].OptimizationUsed);
            console.log('ConstructorArguments Used:', data.result[0].ConstructorArguments);
            console.log('LicenseType Used:', data.result[0].LicenseType);
        } else {
            console.log(`Contract at ${contractAddress} is not verified.`);
        }
    } catch (error) {
        console.error('Error checking verification status:', error.message);
    }
}


checkVerificationStatus('0xb8C2Ef462Bdc9585a02b85c5B403a3b13869aC92'); 
