// react dom
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Axius api
import api from "../../../services/api";

const fields = {
  state: {
    name: undefined,
    cpf: undefined,
    email: undefined,
  }
}

function UserCreate() {
  const navigate = useNavigate();
  
  const backHome = () => {
    let path = `/users`;
    navigate(path);
  }

  const setUser = useState();

  const submit = () => {
    api
      .post("/users", fields.state)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    backHome();
  }

  const handleChange = (event) => {
    if(event.target.name === "name"){
      fields.state.name = event.target.value;
    } else if(event.target.name === "cpf") {
      fields.state.cpf = event.target.value;
    } else if(event.target.name === "email") {
      fields.state.email = event.target.value;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <MDButton variant="gradient" color="info" onClick={backHome}>
          voltar
        </MDButton>
      </MDBox>
      <MDBox py={3}>
        <Card>
          <Grid pt={2} px={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Cadastro
            </MDTypography>
            <MDButton variant="gradient" color="info" onClick={submit}>
              salvar
            </MDButton>
          </Grid>
          <Grid container item px={3}>
            <MDBox width="100%" component="form" method="post" autocomplete="off">
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item md={4}>
                    <MDInput 
                      type="name"
                      label="Nome"
                      name="name"
                      value={fields.state.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MDInput
                      type="text"
                      label="CPF"
                      name="cpf"
                      value={fields.state.cpf}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MDInput
                      type="email"
                      label="email"
                      name="email"
                      value={fields.state.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </MDBox>  
            </MDBox>
          </Grid>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserCreate;