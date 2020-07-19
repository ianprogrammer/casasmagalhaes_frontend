import React, { Component } from 'react';
import { Modal, Header,  Button, Icon,  Message, Segment, List } from 'semantic-ui-react';
import { listaProdutos, deletaProduto } from '../../services/api'
import ProdutoComponent from '../../components/produto'

class ListaProdutos extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    errors: [],
    produtos: []
  }
  constructor(props) {
    super();


  }



  componentDidMount() {
    this.loadProdutos()
  }

  loadProdutos = async () => {
    // console.log(this.props)
    const { idLoja } = this.props
    const result = await listaProdutos(idLoja)
    this.setState({ produtos: result.data.produtos })
  }

  removeProduto = async (idProduto)=>{
    await deletaProduto(idProduto)
    await this.loadProdutos()
  }

  componentWillUnmount() {
    this.removeListeners()
  }


  removeListeners = () => {


  }
  displayErros = errors => errors.map((error, i) => (
    <Message
      error key={i}
      header='Algo deu errado :('
      content={error}
    />

  ))
  render() {
    const { isLoading, errors, produtos } = this.state
    // console.log(this.props)
    return (
      <Modal onClose={() => this.setState({ modalOpen: false })} open={this.state.modalOpen} centered trigger={<Button onClick={() => this.setState({ modalOpen: true })} color='orange' content='Editar Produtos' />} closeIcon>
        <Header icon='user' content='Lista de Produtos' />

        <Modal.Content>
          {this.displayErros(errors)}
          <Segment loading={isLoading} basic className="segment-class" >
            <List animated verticalAlign='middle' size='large'>

              {
                produtos ?
                  produtos.map((data, i) => (
                    <ProdutoComponent data={data}  loadLojas={this.props.loadLojas} alteraProduto={this.props.alteraProduto} removeProduto={this.removeProduto} key={Math.random().toString() + i.toString()} />
                  ))
                  : []
              }
            </List>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.setState({
            modalOpen: false
          })} color='red'>
            <Icon name='remove' /> Cancelar
                    </Button>



        </Modal.Actions>
      </Modal>
    )
  }

}

export default ListaProdutos