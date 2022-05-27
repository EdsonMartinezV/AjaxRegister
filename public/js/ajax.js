(() => {
    const xhr = new XMLHttpRequest(),
        $xhr = document.getElementById('xhr'),
        $emailInput = document.getElementById('emailInput'),
        $emailField = document.getElementById('emailField'),
        $fragment = document.createDocumentFragment(),
        $message = document.createElement('p');

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText)
            console.log(xhr.status)
            console.log(xhr.readyState)
            const data = JSON.parse(xhr.responseText)
            data.forEach((item) => {
                const $li = document.createElement('li')
                $li.textContent = item.email
                $fragment.appendChild($li)
            })
            $xhr.appendChild($fragment)
        } else {
            let message = xhr.statusText || 'Something went wrong'
            $xhr.textContent = xhr.status+" "+message
        }
    })
    
    
    $emailInput.addEventListener("keyup", (e) => {
        if (xhr.readyState !== 4) return
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            data.forEach((item) => {
                if (item.email === $emailInput.value) {
                    $message.textContent = "Esta dirección de correo ya está registrada"
                    $emailField.appendChild($message)
                }
            })
        }
    })

    $emailInput.addEventListener("keydown", (e) => {
        if (xhr.readyState !== 4) return
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            data.forEach((item) => {
                if (item.email !== $emailInput.value) {
                    if ($emailField.contains($message)) {
                        $emailField.removeChild($message)
                    }
                }
            })
        }
    })

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users")
    xhr.send();
})();