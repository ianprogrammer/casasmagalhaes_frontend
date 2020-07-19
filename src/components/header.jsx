import React from 'react'
import { Message, Icon,Button} from 'semantic-ui-react'

const HeaderLojas = () => (
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      <Button inverted color='green'>
        Editar
          </Button>
    </Message.Content>
  </Message>
)

export default HeaderLojas