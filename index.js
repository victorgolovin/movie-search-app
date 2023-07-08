fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
        title: 'новая задача',
        completed: false
    }),
    headers: {
        'content-type': 'application/json'
    }
})
    .then(Response => Response.json())
    .then(json => console.log(json))


//--------------------------

const params = new URLSearchParams(location.search);

const id = params.get('id');

console.log(id);

fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(Response => Response.json())
    .then(json => console.log(json))