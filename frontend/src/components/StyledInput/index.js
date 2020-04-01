import React from "react";

import { Wrapper, StyledInput, Label } from "./styles";

export default props => {
    if (props.labelText) {
        return (
            <Wrapper>
                <Label htmlFor={props.name}>{props.labelText}</Label>
                <StyledInput {...props} />
            </Wrapper>
        );
    }
    return <StyledInput {...props} />;
};
