import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <>
      <InputBase wi sx={{ ml: 2, flex: 1}} placeholder="Search" />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default Search;