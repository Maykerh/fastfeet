import { createGlobalStyle } from "styled-components";

// import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');

	html,
	body,
	#root {
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: auto;
	}

	body {
        background-color: #f5f5f5;
		-webkit-font-smoothing: antialiased;
	}

	body,
	input,
	button {
		font: 14px 'Roboto', sans-serif;
	}

	button {
        cursor: pointer;
    }

	a {
		text-decoration: none;
	}
`;

export default GlobalStyle;
