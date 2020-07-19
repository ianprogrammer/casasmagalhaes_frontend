
import React from 'react'
import { Grid, Icon, Segment, Header, List } from 'semantic-ui-react'
import LojaComponent from '../components/loja'
import { getLojas, deletarLoja, criaLoja, editaLoja, adcionaProduto, editaProduto } from '../services/api'
import ModalLoja from './modais/modal-loja'

class MainPage extends React.Component {

  constructor() {
    super()
    this.state = {
      lojas: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.loadLojas()
  }

  loadLojas = async () => {
    const lojas = await getLojas()
    this.setState({ lojas: lojas.data, isLoading: false })
  }

  removeLoja = async (LojaId) => {
    await deletarLoja(LojaId)
    await this.loadLojas()
  }


  adicionaLoja = async (cnpj, nome, nomeFantasia) => {
    await criaLoja(cnpj, nome, nomeFantasia)
  }
  alterarLoja = async (id, cnpj, nome, nomeFantasia) => {
    await editaLoja(id, cnpj, nome, nomeFantasia)
  }

  addProduto = async (idLoja, nome, preco) => {
    await adcionaProduto(idLoja, nome, preco)
  }



  updateProduto = async (idProduto, nome, preco) => {
    await editaProduto(idProduto, nome, preco)
  }



  openModal = () => {

  }

  render() {
    const { isLoading, lojas } = this.state
    return (
      <div style={{ width: '70vw', marginTop: '200px', alignSelf: 'center' }}>
        <Grid columns={1} id="usuarios" stackable>
          <Grid.Column>
            <Segment clearing secondary size='tiny'>
              <Header floated='right'>
                <Segment.Inline>

                  <ModalLoja criaLoja={this.adicionaLoja} loadLojas={this.loadLojas} />
                </Segment.Inline>
              </Header>
              <Header as='h3' floated='left'>
                <Icon name='shopping bag' />
                <Header.Content>
                  Cadastro de Lojas
            </Header.Content>
              </Header>
            </Segment>
            <Segment loading={isLoading} basic className="segment-class" >
              <List animated verticalAlign='middle' size='large'>
                {
                  lojas ?
                    lojas.map((data, i) => (
                      <LojaComponent key={Math.random().toString() + i.toString()}
                        loadLojas={this.loadLojas}
                        data={data}
                        alterarLoja={this.alterarLoja}
                        removeLoja={this.removeLoja}
                        addProduto={this.addProduto}
                        alteraProduto={this.updateProduto}
                      />
                    ))
                    : []
                }
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default MainPage