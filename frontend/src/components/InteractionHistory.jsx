import { useEffect, useMemo, useState } from "react";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import {
  getInteractions,
  deleteInteraction,
  updateInteraction,
} from "../services/interactionService";

import ViewInteractionDialog from "./ViewInteractionDialog";
import EditInteractionDialog from "./EditInteractionDialog";


export default function InteractionHistory() {

  const [rows, setRows] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Dialog states
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Selected interaction
  const [selectedInteraction, setSelectedInteraction] =
    useState(null);


  // Load interactions
  const loadData = async () => {

    try {

      const data = await getInteractions();

      setRows(data);

    } catch (err) {

      console.error(err);

    }

  };


  useEffect(() => {

    loadData();

  }, []);



  // Search filter
  const filteredRows = useMemo(() => {

    return rows.filter((row) => {

      const doctor =
        row.hcp_name?.toLowerCase() || "";

      return doctor.includes(
        search.toLowerCase()
      );

    });

  }, [rows, search]);



  // View
  const handleView = (interaction) => {

    setSelectedInteraction(interaction);

    setOpenView(true);

  };



  // Edit
  const handleEdit = (interaction) => {

    setSelectedInteraction(interaction);

    setOpenEdit(true);

  };



  // Save Edit
  const handleSave = async (updatedData) => {

    try {

      await updateInteraction(
        selectedInteraction.id,
        updatedData
      );


      setOpenEdit(false);

      loadData();


      alert(
        "Interaction Updated Successfully"
      );


    } catch (err) {

      console.error(err);

      alert("Update Failed");

    }

  };



  // Delete
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this interaction?"))
      return;


    try {

      await deleteInteraction(id);

      loadData();

      alert("Deleted Successfully");


    } catch (err) {

      console.error(err);

      alert("Delete Failed");

    }

  };



  return (

    <Paper
      sx={{
        padding: 3,
        margin: 2
      }}
    >

      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Interaction History
      </Typography>


      {/* Search */}

      <TextField

        fullWidth

        label="Search Doctor"

        placeholder="Type Doctor Name..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        sx={{
          mb: 2
        }}

      />



      <Table>


        <TableHead>

          <TableRow>

            <TableCell>
              Doctor
            </TableCell>


            <TableCell>
              Specialty
            </TableCell>


            <TableCell>
              Date
            </TableCell>


            <TableCell>
              Actions
            </TableCell>


          </TableRow>

        </TableHead>



        <TableBody>


          {
            filteredRows.map((row)=>(


              <TableRow key={row.id}>


                <TableCell>
                  {row.hcp_name}
                </TableCell>


                <TableCell>
                  {row.specialty || "-"}
                </TableCell>


                <TableCell>
                  {row.date || "-"}
                </TableCell>


                <TableCell>


                  <Stack
                    direction="row"
                    spacing={1}
                  >


                    <Button

                      variant="outlined"

                      size="small"

                      onClick={() =>
                        handleView(row)
                      }

                    >
                      View
                    </Button>



                    <Button

                      variant="contained"

                      size="small"

                      onClick={() =>
                        handleEdit(row)
                      }

                    >
                      Edit
                    </Button>



                    <Button

                      variant="outlined"

                      color="error"

                      size="small"

                      onClick={() =>
                        handleDelete(row.id)
                      }

                    >
                      Delete
                    </Button>



                  </Stack>


                </TableCell>



              </TableRow>


            ))
          }



        </TableBody>


      </Table>



    </Paper>

  );

}