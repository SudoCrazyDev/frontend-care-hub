import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function PatientFieldSearcher(){
    return(
        <TextField 
            className="text-capitalize" 
            variant="outlined" 
            fullWidth={true}
            InputProps={{
                endAdornment: (
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                )
            }}
        />
    );
};