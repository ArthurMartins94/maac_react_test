// dependências de layout
import Users from "layouts/users";
import UserCreate from "layouts/users/userCreate";
import UserUpdate from "layouts/users/userUpdate";
import BankAccUpdate from "layouts/users/bankAccUpdate";

// ícones
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users/>,
  },
  {
    key: "userCreate",
    route: "/users/userCreate",
    component: <UserCreate/>,
  },
  {
    key: "userUpdate",
    route: "/users/userUpdate",
    component: <UserUpdate/>,
  },
  {
    key: "bankAccUpdate",
    route: "/users/bankAccUpdate",
    component: <BankAccUpdate/>,
  },
];

export default routes;
