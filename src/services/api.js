import axios from 'axios'
const URL_API = 'http://localhost:8000'


export const getLojas = async () => {

  const lojas = await axios.get(`${URL_API}/lojas`)
  return lojas
}


export const deletarLoja = async (lojaId) => {
  await axios.delete(`${URL_API}/loja/${lojaId}`)
}

export const criaLoja = async (cnpj, nome, nomeFantasia) => {
  await axios.post(`${URL_API}/loja`, { cnpj, nome, nomeFantasia })
}


export const editaLoja = async (id, cnpj, nome, nomeFantasia) => {
  await axios.put(`${URL_API}/loja/${id}`, { cnpj, nome, nomeFantasia })
}


export const adcionaProduto = async (idLoja, nome, preco) => {
  await axios.post(`${URL_API}/loja/${idLoja}/produto`, { nome, preco })
}


export const editaProduto = async (id, nome, preco) => {
  await axios.put(`${URL_API}/produto/${id}`, { nome, preco: parseInt(preco) })
}

export const deletaProduto = async (idProduto) => {
  await axios.delete(`${URL_API}/produto/${idProduto}`)
}

export const listaProdutos = async (idLoja) =>{
  // console.log(idLoja)
  return await axios.get(`${URL_API}/loja/${idLoja}`)
}