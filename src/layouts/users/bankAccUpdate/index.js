// react dom
import { useState } from "react";
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

// Axius api
import api from "../../../services/api";

const SelectStyle ={
  padding: 12,
};

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

function BankAccUpdate() {
  const navigate = useNavigate();
  
  const backUserUpdate = (userId) => {
    let path = `/users/userUpdate/${userId}`;
    navigate(path);
  }

  const [bank, setBank, setAcc] = useState();

  const id = useParams();

  const updateUserAcc = (id) => {
    api
      .put(`/bank_accounts/${id}`, bankFields.state)
      .then((response) => setBank(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    backUserUpdate(bankFields.state.app_user_id);
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

  const loadUserAccData = () => {
    bankFields.state = api.get(`/bank_accounts/${id}`)
      .then((response) => setAcc(response.data))
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

  //loadUserAccData();
  //loadBanks();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <MDButton variant="gradient" color="info" onClick={backUserUpdate(bankFields.state.app_user_id)}>
          voltar
        </MDButton>
      </MDBox>
      <MDBox py={3}>
        <Card>
          <Grid pt={2} px={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Atualizar Dados da Conta
            </MDTypography>
            <MDButton variant="gradient" color="info" onClick={updateUserAcc(id)}>
              Atualizar
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
    </DashboardLayout>
  );
}

export default BankAccUpdate;