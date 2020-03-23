import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { logout } from "../../store/modules/auth/actions";

import {
    Container,
    Header,
    HeaderMenu,
    HeaderControls,
    ContentContainer,
} from "./styles";

import logo from "../../assets/fastfeet-logo.png";

export default ({ children }) => {
    const userData = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const activePage = useLocation().pathname.replace("/", "");

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <Container>
            <Header>
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <HeaderMenu activePage={activePage}>
                    <Link id="orders" to="/orders">
                        ENCOMENDAS
                    </Link>
                    <Link id="deliverymans" to="/deliverymans">
                        ENTREGADORES
                    </Link>
                    <Link id="recipients" to="/recipients">
                        DESTINATÁRIOS
                    </Link>
                    <Link id="problems" to="/problems">
                        PROBLEMAS
                    </Link>
                </HeaderMenu>
                <HeaderControls>
                    <div>
                        <div>{userData.name}</div>
                        <div onClick={() => handleLogout()}>
                            Sair do sistema
                        </div>
                    </div>
                </HeaderControls>
            </Header>
            <ContentContainer>{children}</ContentContainer>
        </Container>
    );
};
