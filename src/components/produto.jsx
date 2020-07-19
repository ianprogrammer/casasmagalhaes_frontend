import React from 'react'
import { List, Button,  } from 'semantic-ui-react'
import ModalProduto from '../pages/modais/modal-produto'


class ProdutoComponent extends React.Component {

  state = {
    openModal: false
  }

  modalClose = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { id, nome, preco } = this.props.data

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group size='medium'>
            <Button color='red' onClick={() => { this.props.removeProduto(id) }}>Deletar Item</Button>
            <ModalProduto editar='Editar'
              id={id}
              nome={nome}
              preco={preco}
              alteraProduto={this.props.alteraProduto}
              loadLojas={this.props.loadLojas}

            />
          </Button.Group>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{nome}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}











export default ProdutoComponent