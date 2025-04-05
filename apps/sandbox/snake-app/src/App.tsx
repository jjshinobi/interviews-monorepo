import styled from "styled-components";

const AppContainer = styled.div`
    width: 50%;
    margin: auto;
`

const CenteredHeader = styled.h1`
    text-align: center;
`

const App = () => {
  return (
    <AppContainer>
        <CenteredHeader>Hello, World!</CenteredHeader>
    </AppContainer>
  )
}

export default App
