function validateAddresses() {
	const input = document.getElementById(addressInput).value;
	const resultsDiv = document.getElementById("results");
	const copyButton = document.getElementById("copyButton");
	resultsDiv.innerHTML = "";

	const addresses = input.split(/[\n,]/).map(addr => addr.trim()).filter(addr => addr);

	let validAdresses = [];

	addresses.forEach(address => {
		const result = document.createElement("p");

		//validate if address starts with 0x
		if (!address.startsWith("0x") || address.length !==42) {
			result.innerHTML = '❌ Invalid - ${address} (Must start with '0x' and be 42 characters)';
			result.classList.add("invalid");
		}
		else{
			//confirm if the rest of the address is valid hexadecimal
			const hexPart = address.slice(2);
			const hexRegex = /^[0-9a-fA-f]{40}$/;
			if (hexRegex.test(hexPart)) {
				result.innerHTML = '✅ Valid - ${address}';
				validAdresses.push(address);

			}
			else{
				result.innerHTML = `❌ Invalid — ${address} (Must contain only hexadecimal characters)`;
				result.classList.add("invalid");

			}
		}
		resultsDiv.appendChild(result);

	
});

	//create a copy button if addresses are valid
	copyButton.disabled = validAddresses.length ===0;
	copyButton.dataset.validAdresses = validAddresses.join("\n");
	if (validAdresses) {
		navigator.clipboard.writeText(validAdresses).then(() => {
			alert("Valid addresses copied to clipboard!");
		})
	}