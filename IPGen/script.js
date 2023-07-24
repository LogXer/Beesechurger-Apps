const generateIPv4 = () => new Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
const generateIPv6 = () => new Array(8).fill(0).map(() => Math.floor(Math.random() * 65536).toString(16)).join(':');

const isValidIPv4 = ip => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
}

const isValidIPv6 = ip => {
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(ip);
}

window.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.querySelector('#generate-btn');
    const ipAddress = document.querySelector('#ip-address');

    generateBtn.addEventListener('click', () => {
        const ipType = document.querySelector('input[name="ip-type"]:checked').value;
        let generatedIP;
        do {
            generatedIP = ipType === 'ipv4' ? generateIPv4() : generateIPv6();
        } while (!(ipType === 'ipv4' ? isValidIPv4(generatedIP) : isValidIPv6(generatedIP)));
        ipAddress.value = generatedIP;
    });
});
