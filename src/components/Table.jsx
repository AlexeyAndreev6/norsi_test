import * as React from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

function Table({ data, clickEdit }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70, type: "number" },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 130,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "job",
      headerName: "Job",
      width: 150,
    },
    {
      field: "sex",
      headerName: "Sex",
    },
    {
      field: "",
      headerName: "Edit",
      renderCell: () => {
        return (
          <IconButton
            onClick={clickEdit}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = data;

  return (
    <div className="table">
      <div style={{ height: 795, width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[20]}
          pageSize={20}
          disableColumnMenu={true}
          disableColumnFilter={true}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
}

export default Table;
