# Ethereum Wallet Validator

A web application that validates a list of Ethereum wallet addresses. Users can input multiple addresses (one per line or comma-separated), and the app checks if each address:
- Starts with "0x".
- Is 42 characters long.
- Contains only hexadecimal characters (0–9, a–f, A–F) after "0x".

Invalid addresses are highlighted in red, and valid addresses can be copied to the clipboard.

## Testing Locally
1. Open `index.html` in a web browser (e.g., Chrome).
2. Enter Ethereum addresses in the textarea (e.g., `0x1234567890abcdef1234567890abcdef12345678`).
3. Click "Validate" to see results (✅ for valid, ❌ for invalid).
4. Click "Copy Valid Addresses" to copy valid addresses (if any).

## Deployment
Deployed on Vercel: https://eth-wallet-validator-ok5gxfb4i-onahis-projects.vercel.app/

## Technologies
- HTML, CSS, JavaScript (vanilla) 
