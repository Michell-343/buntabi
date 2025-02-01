const url = 'https://buntabi.vercel.app/api/admin/usuarios';

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '../index.html';
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken.role;

  async function obtenerUsuarios() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No autorizado o error al obtener usuarios');
      }

      const users = await response.json();
      mostrarUsuarios(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      document.getElementById('user-list').innerHTML = '<p>No tienes permisos para ver los usuarios o ocurrió un error.</p>';
    }
  }

  function mostrarUsuarios(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.usuario}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button onclick="mostrarFormularioEdicion('${user._id}', '${user.nombre}', '${user.apellido}', '${user.usuario}', '${user.email}', '${user.role}')">Editar</button>
          <button onclick="eliminarUsuario('${user._id}')">Eliminar</button>
        </td>
      `;
      userList.appendChild(tr);
    });
  }

  window.mostrarFormularioEdicion = function (nombre, apellido, usuario, email, role) {
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-nombre').value = nombre;
    document.getElementById('edit-apellido').value = apellido;
    document.getElementById('edit-usuario').value = usuario;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-role').value = role;
  };

  window.editarUsuario = async function () {
    const id = document.getElementById('edit-id').value;
    const nombre = document.getElementById('edit-nombre').value;
    const apellido = document.getElementById('edit-apellido').value;
    const usuario = document.getElementById('edit-usuario').value;
    const email = document.getElementById('edit-email').value;
    const role = document.getElementById('edit-role').value;

    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      body: JSON.stringify({ id, nombre, apellido, usuario, email, role })
      });


      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      alert('Usuario actualizado correctamente');
      document.getElementById('edit-form').style.display = 'none';
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  window.eliminarUsuario = async function (id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el usuario');
        }

        alert('Usuario eliminado correctamente');
        obtenerUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  if (userRole === 'admin') {
    obtenerUsuarios();
  }


});
