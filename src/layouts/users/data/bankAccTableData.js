// react dom
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// Axius api
import api from "../../../services/api";

const field = {
  name: undefined,
  editUserAcc: undefined,
  delUserAcc: undefined,
}

export default function Data() {
  const navigate = useNavigate();

  const [setUsersAccList] = useState();

  const userId = useParams();

  const reloadPage = () => {
    let path = `/users/userUpdate/${userId}`;
    navigate(path);
  };

  const editUserAccPage = (id) => {
    let path = `/users/bankAccUpdate/${id}`;
    navigate(path);
  };

  const deleteUserAcc = (id) => {
    api
      .delete(`/bank_accounts/${id}`)
      .then((response) => setUsersAccList(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    reloadPage();
  };

  const loadUsers = (userId) => {
    const accList = [];
    accList = api.get(`/users/${userId}/bankaccounts`)
      .then((response) => setUsersAccList(response.data))
      .catch((err) => {
        console.log("Erro: " + err);
      });
    accList.map(res => {
      res.field.editUserAcc = res.id;
      res.field.delUserAcc = res.id;
      return res;
    })
  };
  
  //loadUserAcc(userId);

  return {
    columns: [
      { Header: "nome da conta", accessor: "name", width: "80%", align: "left" },
      { Header: "edição", accessor: "edit", align: "center" },
      { Header: "deletar", accessor: "del", align: "center" },
    ],

    rows: [
      {
        name: field.name,
        edit: (
          <MDButton 
            variant="gradient"
            color="info"
            //onClick={editUserAccPage(field.editUserAcc)}
          >
            Editar
          </MDButton>
        ),
        del: (
          <MDButton
            variant="gradient"
            color="info"
            //onClick={deleteUserAcc(field.delUserAcc)}
          >
            Deletar
          </MDButton>
        ),
      },
    ],
  };
}