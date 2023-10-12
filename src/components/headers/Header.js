import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Search from "../topbars/Search";
const Header = ({ title, subTitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box mb="5px" >
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{
                        m: " 0 0 5px 0",
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subTitle}
                </Typography>
            </Box>
            <Box display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                height="50px"
                >
 
                <Search />
            </Box>
        </Box>
    );
};

export default Header;