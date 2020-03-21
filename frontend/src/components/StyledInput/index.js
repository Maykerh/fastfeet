import React from "react";

import { Wrapper, StyledInput, Label } from "./styles";

export default props => {
    console.log(props);
    if (props.labelText) {
        return (
            <Wrapper>
                <Label for={props.name}>{props.labelText}</Label>
                <StyledInput {...props} />
            </Wrapper>
        );
    }
    return <StyledInput {...props} />;
};
