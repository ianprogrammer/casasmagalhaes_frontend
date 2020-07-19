import React, { Component } from 'react';
import { Modal, Header, Form, Button, Icon, Input, Message } from 'semantic-ui-react';


class ModalProduto extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    errors: [],
    form: {
      id: '',
      nome: '',
      preco: '',
      idLoja: ''
    }
  }
  constructor(props) {
    super();
    this.dadosForm = this.dadosForm.bind(this)
    this.cadastrar = this.cadastrar.bind(this)
  }

  dadosForm(event) {

    let form = this.state.form
    form[event.target.name] = event.target.value;
    this.setState({
      form: form
    })
  }

  componentDidMount() {
    this.addListeners()

  }

  componentWillUnmount() {
    this.removeListeners()
  }

  cadastrar = async () => {
    const { nome, preco } = this.state.form
    const { idLoja } = this.props
    this.setState({ isLoading: true })
    await this.props.addProduto(idLoja, nome, preco)
    await this.props.loadLojas()
    this.setState({
      modalOpen: false, isLoading: false, form: {
        id: '',
        nome: '',
        preco: '',
        idLoja: ''
      }
    })
  }

  
  editar = async () => {

    const { id, nome, preco } = this.state.form
    this.setState({ isLoading: true })
    // console.log(id, nome, preco)
    await this.props.alteraProduto(id, nome, preco)
    await this.props.loadLojas()
    this.setState({
      modalOpen: false, isLoading: false, form: {
        id: '',
        nome: '',
        preco: '',
        idLoja: ''
      }
    })
  }



  addListeners = () => {

    if (this.props.editar) {

      this.setState({
        form: {

          id: this.props.id,
          nome: this.props.nome,
          preco: this.props.preco,
        }
      })
    }

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
    const { isLoading, errors } = this.state
    return (
      <Modal onClose={() => this.setState({ modalOpen: false })} open={this.state.modalOpen} centered trigger={<Button onClick={() => this.setState({ modalOpen: true })} color={this.props.editar ? 'blue' : 'green'} content={this.props.editar ? 'Editar Produto' : 'Adicionar Produto'} />} closeIcon>
        <Header icon='user' content={this.props.editar ? 'Editar produto' : 'Adicionar produto'} />

        <Modal.Content>
          {this.displayErros(errors)}
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                name='nome'
                id='form-input-control-nome'
                control={Input}
                value={this.state.form.nome}
                label='Nome'
                placeholder='Digite o nome...'
                onChange={this.dadosForm}
              />
            </Form.Group>


            <Form.Group widths='equal'>
              <Form.Field
                name='preco'
                id='form-input-control-senha'
                control={Input}
                value={this.state.form.preco}
                label='Preco'
                type="number"
                placeholder='Preço'
                onChange={this.dadosForm}
              />
            </Form.Group>

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.setState({
            modalOpen: false
          })} color='red'>
            <Icon name='remove' /> Cancelar
                    </Button>

          {
            this.props.editar ?
              <Button onClick={this.editar} loading={isLoading} color='green'>
                <Icon name='checkmark' /> Editar
                            </Button>
              :
              <Button onClick={this.cadastrar} loading={isLoading} color='green'>
                <Icon name='checkmark' /> Criar
                            </Button>
          }

        </Modal.Actions>
      </Modal>
    )
  }

}

export default ModalProduto