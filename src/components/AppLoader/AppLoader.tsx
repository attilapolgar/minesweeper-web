import React, { ReactElement } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default function AppLoader(): ReactElement {
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  )
}
