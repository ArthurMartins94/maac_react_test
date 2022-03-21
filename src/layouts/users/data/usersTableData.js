// react dom
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// Axius api
import api from "../../../services/api";

const field = {
  name: undefined,
  accounts: undefined,
  editUser: undefined,
  delUser: undefined,
}

export default function Data() {
  const navigate = useNavigate();

  const [setUsersList] = useState();

  const reloadPage = () => {
    let path = `/users`;
    navigate(path);
  };

  const editUserPage = (id) => {
    let path = `/users/${id}`;
    navigate(path);
  };

  const deleteUser = (id) => {
    api
      .delete(`/users/${id}`)
      .then((response) => setUsersList(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    reloadPage();
  };

  const loadAcc = (id) => {
    field.accounts = api
      .get(`/users/${id}/bank_accounts`)
      .then((response) => setUsersList(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
  };

  const loadUsers = () => {
    const usersList = [];
    usersList = api.get("/users")
      .then((response) => setUsersList(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    usersList.map(res => {
      res.field.accounts = loadAcc(res.id);
      res.field.editUser = res.id;
      res.field.delUser = res.id;
      return res;
    })
  };

  //loadUsers();

  return {
    columns: [
      { Header: "nome", accessor: "name", width: "40%", align: "left" },
      { Header: "contas", accessor: "accounts", width: "40%", align: "center" },
      { Header: "edição", accessor: "edit", align: "center" },
      { Header: "deletar", accessor: "del", align: "center" },
    ],

    rows: [
      {
        name: field.name,
        accounts: field.accounts,
        edit: (
          <MDButton 
            variant="gradient"
            color="info"
            //onClick={editUserPage(field.editUser)}
          >
            Editar
          </MDButton>
        ),
        del: (
          <MDButton
            variant="gradient"
            color="info"
            //onClick={deleteUser(field.delUser)}
          >
            Deletar
          </MDButton>
        ),
      },
    ],
  };
}