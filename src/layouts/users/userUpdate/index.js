// react dom
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Dados
import bankAccTableData from "layouts/users/data/bankAccTableData";

// Axius api
import api from "../../../services/api";

const SelectStyle ={
  padding: 12,
};

const userFields = {
  state: {
    name: undefined,
    cpf: undefined,
    email: undefined,
  }
}

const bankFields = {
  state: {
    account_name: undefined,
    agency: undefined,
    agency_digit: undefined,
    account_number: undefined,
    account_digit: undefined,
    account_type: undefined,
    app_user_id: undefined,
    app_bank_id: undefined,
  }
}

const banks = [];

function UserUpdate() {
  const navigate = useNavigate();
  
  const backHome = () => {
    let path = `/users`;
    navigate(path);
  };

  const [bank, setBank, setAcc, setUser] = useState();

  const id = useParams();

  const updateUser = () => {
    api
      .put(`/users/${id}`, userFields.state)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
  };

  const submitBankAcc = () => {
    bankFields.state.app_user_id = id;
    api
      .post("/bank_accounts", bankFields.state)
      .then((response) => setAcc(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
  }

  const handleUserChange = (event) => {
    if(event.target.name === "name"){
      userFields.state.name = event.target.value;
    } else if(event.target.name === "cpf") {
      userFields.state.cpf = event.target.value;
    } else if(event.target.name === "email") {
      userFields.state.email = event.target.value;
    }
  };

  const handleBankChange = (event) => {
    if(event.target.name === "account_name"){
      bankFields.state.account_name = event.target.value;
    } else if(event.target.name === "agency") {
      bankFields.state.agency = event.target.value;
    } else if(event.target.name === "agency_digit") {
      bankFields.state.agency_digit = event.target.value;
    } else if(event.target.name === "account_number"){
      bankFields.state.account_number = event.target.value;
    } else if(event.target.name === "account_digit") {
      bankFields.state.account_digit = event.target.value;
    } else if(event.target.name === "account_type") {
      bankFields.state.account_type = event.target.value;
    }
    setBank(event.target.value);
  };

  const { columns, rows } = bankAccTableData();

  const loadUserData = () => {
    userFields.state = api.get(`/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
  };

  const loadBanks = () => {
    banks = api.get("/banks")
      .then((response) => setAcc(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
  };

  //loadUserData();
  //loadBanks();

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
              Atualização
            </MDTypography>
            <MDButton variant="gradient" color="info" onClick={updateUser}>
              Atualizar
            </MDButton>
          </Grid>
          <Grid container item px={3}>
            <MDBox width="100%" component="form" method="post" autocomplete="off">
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item md={4}>
                    <MDInput 
                      type="text"
                      label="Nome"
                      name="name"
                      value={userFields.state.name}
                      onChange={handleUserChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MDInput
                      type="text"
                      label="CPF"
                      name="cpf"
                      value={userFields.state.cpf}
                      onChange={handleUserChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MDInput
                      type="text"
                      label="email"
                      name="email"
                      value={userFields.state.email}
                      onChange={handleUserChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </MDBox>  
            </MDBox>
          </Grid>
        </Card>
        <MDBox pt={3}>
          <Card>
            <Grid pt={2} px={3} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium">
                Contas
              </MDTypography>
              <MDButton variant="gradient" color="info" onClick={submitBankAcc}>
                salvar
              </MDButton>
            </Grid>
            <Grid container item pt={2} px={3}>
              <MDBox width="100%" component="form" method="post" autocomplete="off">
                <MDBox px={3} pb={2}>
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                      <TextField 
                        select
                        value={bank}
                        onChange={handleBankChange}
                        label="Banco"
                        SelectProps={{
                          style: SelectStyle,
                        }}
                        fullWidth
                      >
                        {banks.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <MDInput
                        type="text"
                        label="Nome da Conta"
                        name="account_name"
                        value={bankFields.state.account_name}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4}>
                      <MDInput
                        type="text"
                        label="Tipo da Conta"
                        name="account_type"
                        value={bankFields.state.account_type}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox px={3} pb={2}>
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                      <MDInput
                        type="text"
                        label="Número da Agência"
                        name="agency"
                        value={bankFields.state.agency}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2}>
                      <MDInput
                        type="text"
                        label="Digito da Agência"
                        name="agency_digit"
                        value={bankFields.state.agency_digit}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox> 
                <MDBox px={3} pb={3}>
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                      <MDInput
                        type="text"
                        label="Número da Conta"
                        name="account_number"
                        value={bankFields.state.account_number}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2}>
                      <MDInput
                        type="text"
                        label="Digito da Conta"
                        name="account_digit"
                        value={bankFields.state.account_digit}
                        onChange={handleBankChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox> 
              </MDBox>
            </Grid>
          </Card>
        </MDBox>
        <MDBox pt={3}>
          <Card>
            <Grid pt={2} px={3} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium">
                Lista de Contas
              </MDTypography>
            </Grid>
            <Grid pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={true}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </Grid>
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserUpdate;