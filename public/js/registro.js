// frontend/public/js/register.js
const url='http://localhost:3000/api/auth/registro';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, usuario, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            showModal();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al registrarse');
    }
});

  // Mostrar el modal
  function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');

  // Redirigir al hacer clic en "Aceptar"
  document.getElementById('acceptButton').addEventListener('click', () => {
    window.location.href = '../html/login.html';
  });
}
