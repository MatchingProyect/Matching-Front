import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
    <Link to = './login'>
      <Container sx={ { ..._styled.container } } >
          <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702602441/logoPrincipal_k03wos.svg" alt="Logo Matching" />
      </Container>    
    </Link>
    </div>

  )
}

const _styled = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#203144',
    }
}

export default LandingPage