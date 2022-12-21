import React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuList from "@mui/material/MenuList";

function Menu({setModalActive}) {
  return (
    <div className="menu">
      <Paper>
        <MenuList>
          <MenuItem sx={{ py: 2 }} onClick={() => setModalActive(true)}>
            <PersonAddIcon sx={{ mr: 2 }} />
            Новый сотрудник
          </MenuItem>
          <MenuItem sx={{ py: 2 }}>
            <ListAltIcon sx={{ mr: 2 }} />
            Список сотрудников
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}

export default Menu;
