document.getElementById('resendButton').addEventListener('click', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        document.getElementById('responseMessage').innerHTML = '<p style="color:red;">Token is missing!</p>';
        return;
    }

    try {
        const response = await fetch('/auth/resend-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('responseMessage').innerHTML = `<p style="color:green;">${data.message}</p>`;
        } else {
            document.getElementById('responseMessage').innerHTML = `<p style="color:red;">${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerHTML = `<p style="color:red;">There was an error, please try again.</p>`;
    }
});
