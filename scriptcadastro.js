

let codigo = document.getElementById('codigo');
let produto = document.getElementById('produto');
let categoria = document.getElementById('categoria');
let quantidade = document.getElementById('quantidade');
let valor = document.getElementById('valor');
let fotoInput = document.getElementById('foto');

let idProduto = document.getElementById('idProduto');

let dadoProduto = document.getElementById('dadoProduto');
let dadoCategoria = document.getElementById('dadoCategoria');
let dadoQuantidade = document.getElementById('dadoQuantidade');
let dadoValor = document.getElementById('dadoValor');
let imgPreview = document.getElementById('imgPreview');

let cadastrarProduto = document.getElementById('cadastrarProduto');
let buscarProduto = document.getElementById('buscarProduto');
let atualizarProduto = document.getElementById('atualizarProduto');
let deletarProduto = document.getElementById('deletarProduto');


async function AddProduto() {
    const foto = fotoInput.files[0];

    if (!foto) {
        alert('Por favor, selecione uma imagem.');
        return;
    }

    const produtoRef = doc(collection(db, "produtos"), codigo.value);
    const fotoRef = storageRef(storage, `produtos/${foto.name}`);

    try {
        await uploadBytes(fotoRef, foto);
        await setDoc(produtoRef, {
            codigo: codigo.value,
            produto: produto.value,
            categoria: categoria.value,
            quantidade: quantidade.value,
            valor: valor.value,
            foto: foto.name 
        });

        codigo.value = '';
        produto.value = '';
        categoria.value = '';
        quantidade.value = '';
        valor.value = '';
        fotoInput.value = '';
        imgPreview.src = ''; 
        alert("Produto Cadastrado!");
    } catch (error) {
        console.error("Erro ao cadastrar produto: ", error);
        alert('Produto Não Cadastrado!');
    }
}


async function PesquisarProduto() {
    const produtoRef = doc(db, "produtos", idProduto.value);

    try {
        const produtoSnap = await getDoc(produtoRef);

        if (produtoSnap.exists()) {
            const produtoData = produtoSnap.data();
            dadoProduto.value = produtoData.produto;
            dadoCategoria.value = produtoData.categoria;
            dadoQuantidade.value = produtoData.quantidade;
            dadoValor.value = parseFloat(produtoData.valor).toFixed(2);


            if (produtoData.foto) {
                const fotoRef = storageRef(storage, `produtos/${produtoData.foto}`);
                const fotoURL = await getDownloadURL(fotoRef);
                imgPreview.src = fotoURL;
            } else {
                imgPreview.src = ''; 
            }

            alert('Produto Localizado!');
        } else {
            alert("O produto não existe");
        }
    } catch (error) {
        console.error("Erro ao pesquisar produto: ", error);
        alert('Erro ao pesquisar produto!');
    }
}
async function AtualizarProdutos() {
    const produtoRef = doc(db, "produtos", idProduto.value);
    const novaFoto = fotoInput.files[0];

    try {

        if (novaFoto) {

            const produtoSnap = await getDoc(produtoRef);
            if (produtoSnap.exists()) {
                const produtoData = produtoSnap.data();
                if (produtoData.foto) {
                    const fotoRef = storageRef(storage, `produtos/${produtoData.foto}`);
                    await deleteObject(fotoRef);
                }
            }

to
            const fotoRef = storageRef(storage, `produtos/${novaFoto.name}`);
            await uploadBytes(fotoRef, novaFoto);

 
            await updateDoc(produtoRef, {
                foto: novaFoto.name
            });
        }

        await updateDoc(produtoRef, {
            produto: dadoProduto.value,
            categoria: dadoCategoria.value,
            quantidade: dadoQuantidade.value,
            valor: dadoValor.value
        });

        alert('Produto Atualizado!');
    } catch (error) {
        console.error("Erro ao atualizar produto: ", error);
        alert('Algo deu errado!');
    }
}

async function DeletarProdutos() {
    const produtoRef = doc(db, "produtos", idProduto.value);

    try {
  
        const produtoSnap = await getDoc(produtoRef);
        if (produtoSnap.exists()) {
            const produtoData = produtoSnap.data();
            if (produtoData.foto) {
                const fotoRef = storageRef(storage, `produtos/${produtoData.foto}`);
                await deleteObject(fotoRef);
            }
        }

    
        await deleteDoc(produtoRef);
        idProduto.value = '';
        dadoProduto.value = '';
        dadoCategoria.value = '';
        dadoQuantidade.value = '';
        dadoValor.value = '';
        imgPreview.src = '';

        alert('Produto Deletado!');
    } catch (error) {
        console.error("Erro ao deletar produto: ", error);
        alert('Algo deu errado!');
    }
}


cadastrarProduto.addEventListener('click', (e) => {
    e.preventDefault();
    AddProduto();
});

buscarProduto.addEventListener('click', (e) => {
    e.preventDefault();
    PesquisarProduto();
});

atualizarProduto.addEventListener('click', (e) => {
    e.preventDefault();
    AtualizarProdutos();
});

deletarProduto.addEventListener('click', (e) => {
    e.preventDefault();
    DeletarProdutos();
});
