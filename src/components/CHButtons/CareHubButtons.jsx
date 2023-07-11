import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const CHButton = styled(Button)`
    background-color: #3B9488;
    &:hover{
        background-color: #2A9CD1;
    };
`;

const CHTableIconButton = styled(IconButton)`
    &:hover{
        box-shadow: 10px 10px 56px -4px rgba(0,0,0,0.75);
    };
`;

export { CHButton, CHTableIconButton }