import { Button } from '@material-ui/core';
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo
                    src="https://i.pinimg.com/originals/fd/d8/97/fdd89706e35f9bc4493559caef4f1122.png"
                />
                <Button onClick={signIn} variant="outline">Sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 50px 100px;
    border-radius: 20px;
    box-shadow: 6px 6px 13px -3px #e6e6e682;
`;

const Logo = styled.img`
    width: 200px;
    margin-bottom: 30px;
`;