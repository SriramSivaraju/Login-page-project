const loginForm = document.querySelector('form');
const submitButton = document.querySelector('button');

loginForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    submitButton.innerText = "Processing...";   

    const nameText = document.querySelector('#name').value;
    const emailText = document.querySelector('#email').value;
    const phoneText = document.querySelector('#phone').value;

    const userData = {
        name: nameText,
        email: emailText,
        phone: phoneText,
    };

    fetch('https://hypoglycemic-zaida-splurgily.ngrok-free.dev/open-sesame', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userData)
    }) 

    .then(response => response.json())
    .then(data => {
        alert(data.message || "Login Successful!");

        submitButton.innerText = 'Login';

        submitButton.disabled = false ;
    });

    //console.log("We grabbed:",nameText, emailText, phoneText);
});