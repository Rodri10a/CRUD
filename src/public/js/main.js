// Muestra u oculta un formulario.
// Recibe el id del formulario como parametro.
// classList.toggle('hidden') agrega la clase 'hidden' si no la tiene,
// o la quita si ya la tiene. Asi un solo boton muestra/oculta.
function toggleForm(id) {
  document.getElementById(id).classList.toggle('hidden')
}

// DOMContentLoaded: espera a que TODO el HTML este cargado en el navegador
// antes de ejecutar el codigo de adentro.
// Sin esto, podria intentar buscar botones que aun no existen en la pagina.
document.addEventListener('DOMContentLoaded', () => {

  // --- VOTAR TOPICS ---
  // querySelectorAll busca TODOS los elementos con la clase 'vote-topic-btn'
  // forEach recorre cada boton encontrado
  document.querySelectorAll('.vote-topic-btn').forEach(btn => {
    // addEventListener('click') -> cuando hagan click en este boton, ejecuta esta funcion
    btn.addEventListener('click', async () => {
      // btn.dataset.id lee el atributo data-id del HTML
      // Ejemplo: <button data-id="5"> -> id = "5"
      const id = btn.dataset.id
      // fetch envia un POST al servidor SIN recargar la pagina (AJAX)
      // Es como un formulario invisible que envia datos en segundo plano
      const res = await fetch(`/topics/${id}/vote`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      // res.json() convierte la respuesta del servidor de texto JSON a un objeto JS
      // El controller devuelve { success: true, votes: 6 }
      const data = await res.json()
      // Si el voto fue exitoso, actualiza el texto de votos en pantalla
      // sin recargar la pagina completa
      if (data.success) document.getElementById(`votes-${id}`).textContent = `${data.votes} votos`
    })
  })

  // --- VOTAR LINKS ---
  // Mismo mecanismo que topics pero con dos parametros
  document.querySelectorAll('.vote-link-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      // Desestructuracion: extrae data-topic-id y data-link-id del boton
      // Ejemplo: <button data-topic-id="3" data-link-id="7">
      // -> topicId = "3", linkId = "7"
      const { topicId, linkId } = btn.dataset
      // Envia el voto al servidor usando ambos ids en la URL
      const res = await fetch(`/topics/${topicId}/links/${linkId}/vote`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      // Actualiza solo el contador de votos de ese link especifico
      if (data.success) document.getElementById(`link-votes-${linkId}`).textContent = `${data.votes} votos`
    })
  })

})
