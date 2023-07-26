let secretKey;

async function generateKey() {
    try {
        secretKey = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt", "decrypt"]
        );
        alert('Key has been generated!');
    } catch (error) {
        console.error('Error generating key:', error);
    }
}

async function downloadKey() {
    try {
        const exportedKey = await window.crypto.subtle.exportKey('jwk', secretKey);
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportedKey));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "key.txt");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    } catch (error) {
        console.error('Error downloading key:', error);
    }
}

document.getElementById('generate').addEventListener('click', generateKey);
document.getElementById('download').addEventListener('click', downloadKey);

document.getElementById('import').addEventListener('change', async function(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const contents = event.target.result;
        const importedKey = JSON.parse(contents);

        try {
            secretKey = await window.crypto.subtle.importKey(
                'jwk', 
                importedKey, 
                { name: "AES-GCM", length: 256 }, 
                true, 
                ["encrypt", "decrypt"]
            );
            alert('Key has been imported successfully!');
        } catch (error) {
            console.error('Error importing key:', error);
        }
    };

    reader.readAsText(file);
});

document.getElementById('encrypt').addEventListener('click', async function() {
    const plaintext = document.getElementById('input').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    try {
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            secretKey,
            data
        );
        const buffer = new Uint8Array(encrypted);
        const combined = [...iv, ...buffer];
        document.getElementById('output').value = btoa(String.fromCharCode.apply(null, combined));
    } catch (error) {
        console.error('Error encrypting:', error);
    }
});

document.getElementById('decrypt').addEventListener('click', async function() {
    const encryptedData = document.getElementById('input').value;
    const decodedData = atob(encryptedData);
    const iv = new Uint8Array(decodedData.substring(0, 12).split('').map(char => char.charCodeAt(0)));
    const data = new Uint8Array(decodedData.substring(12).split('').map(char => char.charCodeAt(0)));

    try {
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            secretKey,
            data        );
        const decoder = new TextDecoder();
        document.getElementById('output').value = decoder.decode(new Uint8Array(decrypted));
    } catch (error) {
        console.error('Error decrypting:', error);
    }
});

document.getElementById('copy-output').addEventListener('click', function() {
    const outputText = document.getElementById('output').value;
    navigator.clipboard.writeText(outputText);
});
