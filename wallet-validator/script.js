function validateAddresses() {
  const input = document.getElementById("addressInput").value;
  const resultsDiv = document.getElementById("results");
  const copyButton = document.getElementById("copyButton");
  resultsDiv.innerHTML = "";
  
  // Split input by newlines or commas, trim whitespace, and filter out empty entries
  const addresses = input.split(/[\n,]/).map(addr => addr.trim()).filter(addr => addr);

  let validAddresses = [];

  addresses.forEach(address => {
    const result = document.createElement("p");
    
    // Check if address starts with "0x" and is 42 characters
    if (!address.startsWith("0x") || address.length !== 42) {
      result.innerHTML = `❌ Invalid — ${address} (Must start with '0x' and be 42 characters)`;
      result.classList.add("invalid");
    } else {
      // Check if the rest is valid hexadecimal
      const hexPart = address.slice(2);
      const hexRegex = /^[0-9a-fA-F]{40}$/;
      if (hexRegex.test(hexPart)) {
        result.innerHTML = `✅ Valid — ${address}`;
        validAddresses.push(address);
      } else {
        result.innerHTML = `❌ Invalid — ${address} (Must contain only hexadecimal characters)`;
        result.classList.add("invalid");
      }
    }
    resultsDiv.appendChild(result);
  });

  // Enable copy button if there are valid addresses
  copyButton.disabled = validAddresses.length === 0;
  copyButton.dataset.validAddresses = validAddresses.join("\n");
}

function copyValidAddresses() {
  const copyButton = document.getElementById("copyButton");
  const validAddresses = copyButton.dataset.validAddresses;
  if (validAddresses) {
    navigator.clipboard.writeText(validAddresses).then(() => {
      alert("Valid addresses copied to clipboard!");
    });
  }
}