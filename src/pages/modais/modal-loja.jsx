import React, { Component } from 'react';
import { Modal, Header, Form, Button, Icon, Input, Message } from 'semantic-ui-react';


class ModalLoja extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    errors: [],
    form: {
      id: '',
      nome: '',
      nomeFantasia: '',
      cnpj: ''
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
    const { nome, nomeFantasia, cnpj } = this.state.form
    this.setState({ isLoading: true })
    await this.props.criaLoja(cnpj, nome, nomeFantasia)
    await this.props.loadLojas()
    this.setState({
      modalOpen: false, isLoading: false, form: {
        id: '',
        nome: '',
        nomeFantasia: '',
        cnpj: ''
      }
    })
  }



  editar = async () => {

    const { nome, nomeFantasia, cnpj } = this.state.form
    const { id } = this.props.data
    this.setState({ isLoading: true })
    await this.props.alterarLoja(id, cnpj, nome, nomeFantasia)
    await this.props.loadLojas()
    this.setState({
      modalOpen: false, isLoading: false, form: {
        id: '',
        nome: '',
        nomeFantasia: '',
        cnpj: ''
      }
    })
  }

  addListeners = () => {

    if (this.props.editar) {

      this.setState({
        form: {

          id: this.props.id,
          nome: this.props.nome,
          nomeFantasia: this.props.nomeFantasia,
          cnpj: this.props.cnpj
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
      <Modal onClose={() => this.setState({ modalOpen: false })} open={this.state.modalOpen} centered style={{ height: 'auto', position: 'relative' }} trigger={<Button onClick={() => this.setState({ modalOpen: true })} color={this.props.editar ? 'blue' : 'green'} content={this.props.editar ? 'Editar Loja' : 'Criar Loja'} />} closeIcon>
        <Header icon='user' content={this.props.editar ? 'Editar Loja' : 'Criar Loja'} />

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
                name='nomeFantasia'
                id='form-input-control-senha'
                control={Input}
                value={this.state.form.nomeFantasia}
                label='Nome Fantasia'
                placeholder='Digite o nome fantasia..'
                onChange={this.dadosForm}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                name='cnpj'
                id='form-input-control-email'
                control={Input}
                type="number"
                value={this.state.form.cnpj}
                label='CNPJ'
                placeholder=''
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

export default ModalLoja