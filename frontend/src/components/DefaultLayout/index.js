import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/modules/auth/actions";

import { Container, Header, HeaderMenu, HeaderControls } from "./styles";

import logo from "../../assets/fastfeet-logo.png";

export default ({ children }) => {
    const userData = useSelector(state => state.auth.profile);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <Container>
            <Header>
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <HeaderMenu>
                    <div>
                        <a href="/orders">ENCOMENDAS</a>
                    </div>
                    <div>
                        <a href="/deliverymans">ENTREGADORES</a>
                    </div>
                    <div>
                        <a href="/recipients">DESTINATÁRIOS</a>
                    </div>
                    <div>
                        <a href="/problems">PROBLEMAS</a>
                    </div>
                </HeaderMenu>
                <HeaderControls>
                    <div>Admin fastFeet</div>
                    <div onClick={() => handleLogout()}>Sair do sistema</div>
                </HeaderControls>
            </Header>
            {children}
        </Container>
    );
};
