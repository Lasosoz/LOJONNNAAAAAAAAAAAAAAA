
function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }else{
        return true;
    }
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password")
}

function login(){
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        window.location.href = "home.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário nao encontrado";
    }
    return error.message;
}

function registrar(){
    firebase.auth().createUserWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        window.location.href = "home.html";
    }).catch(error => {
        alert('Erro! Conta existente ou erro no preenchimento dos dados.');
    })
}

function logout() {
    firebase.auth().signOut()
      .then(() => {
  
        updateUIOnAuthStateChanged(null);
      })
      .catch((error) => {
  
        console.log("Erro ao fazer logout:", error);
      });
  }

 // script.js

async function carregarProdutos() {
    try {
        const produtosContainer = document.getElementById('produtos-container');
        const produtosSnapshot = await db.collection("produtos").get();

        produtosContainer.innerHTML = '';

        produtosSnapshot.forEach(async (doc) => {
            const produto = doc.data();

            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto-item');

            let imageUrl = '';

            if (produto.foto) {
                try {
                    const fotoRef = storage.ref(`produtos/${produto.foto}`);
                    imageUrl = await fotoRef.getDownloadURL();
                } catch (error) {
                    console.error("Erro ao obter URL da imagem: ", error);
                }
            }

            produtoElement.innerHTML = `
                <img class="produto-img" src="${imageUrl || 'placeholder.jpg'}" alt="${produto.produto}">
                <h3>${produto.produto}</h3>
                <p>Categoria: ${produto.categoria}</p>
                <p>Quantidade: ${produto.quantidade}</p>
                <p>Preço: R$ ${parseFloat(produto.valor).toFixed(2)}</p>
                <button class="btn-add-carrinho" onclick="adicionarAoCarrinho('${doc.id}')">Colocar no Carrinho</button>
            `;

            produtosContainer.appendChild(produtoElement);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos: ", error);
    }
}

window.onload = carregarProdutos;

function adicionarAoCarrinho(produtoId) {
    alert(`Produto ${produtoId} adicionado ao carrinho!`);
}
