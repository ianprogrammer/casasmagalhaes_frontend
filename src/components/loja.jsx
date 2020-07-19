import React from 'react'
import { List, Button } from 'semantic-ui-react'
import ModalLoja from '../pages/modais/modal-loja'
import ModalProduto from '../pages/modais/modal-produto'
import ListaProdutos from '../pages/modais/lista-produtos'

class LojaComponent extends React.Component {

  state = {
    openModal: false
  }

  modalClose = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { id, nome, nomeFantasia,cnpj} = this.props.data
    
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group size='medium'>
            <Button color='red' onClick={() => { this.props.removeLoja(id) }}>Deletar Loja</Button>
            <Button.Or text="ou" />
            <ModalLoja editar='Editar' loadLojas={this.props.loadLojas} alterarLoja={this.props.alterarLoja} data={this.props.data} modalClose={this.modalClose} 
            id={id}
            nome={nome}
            nomeFantasia={nomeFantasia}
            cnpj={cnpj}
            />
            <Button.Or />
            <ModalProduto addProduto={this.props.addProduto} loadLojas={this.props.loadLojas} idLoja={id}/>
            <Button.Or />
            <ListaProdutos alteraProduto={this.props.alteraProduto} loadLojas={this.props.loadLojas} idLoja={id}/>
            
          </Button.Group>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{nome}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}











export default LojaComponent