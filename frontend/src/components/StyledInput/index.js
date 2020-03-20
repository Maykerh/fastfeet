import React from "react";

import { StyledInput, Label } from "./styles";

export default props => {
    if (props.labelText) {
        return (
            <>
                <Label for={props.name}>{props.labelText}</Label>
                <StyledInput {...props} />
            </>
        );
    }
    return <StyledInput {...props} />;
};
