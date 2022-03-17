import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getTokenInStorage, decodeToken } from './services/api'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Kanban from './pages/Kanban'
import Task from './pages/Task'
import Profile from './pages/Profile'
import TaskList from './pages/TaskList'
import UserList from './pages/UserList'
import CategoriesList from './pages/CategoriesList'
import DefaultLayout from './templates/default'

const AdminRoutes = ({ component: Component, auth, ...attrs }) => {

  const token = getTokenInStorage();
  const permission = decodeToken(token).permission === auth;

  return token && permission ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  ) : (
    <Redirect to="/404" />
  )
}

const PrivateRoute = ({ component: Component, auth, ...attrs }) => {

  const token = getTokenInStorage();
  // const token = true;

  return token ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  ) : (
    <Redirect to="/app/404" />
  )
}

const Teste = () => {
  return (
    <>teste</>
  )
}

function AllRoutes() {
  return (
    <Switch>
      {/* <Route path="/dashboard" exact element={<Login />} /> */}
      <Route path="/app" exact component={Login} />
      {/* <Route exact path="/app/dashboard" component={Dashboard} /> */}
      <PrivateRoute exact path="/app/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/app/kanban" component={Kanban} />
      <PrivateRoute exact path="/app/categories" component={CategoriesList} />
      <AdminRoutes exact path="/app/users" auth="ROLE_ADMIN" component={UserList} />
      <AdminRoutes exact path="/app/users/new" auth="ROLE_ADMIN" component={Task} />
      <PrivateRoute exact path="/app/users/edit/:id" component={Task} />
      <PrivateRoute exact path="/app/tasks/new" component={Task} />
      <PrivateRoute exact path="/app/tasks/edit/:id" component={Task} />
      <PrivateRoute exact path="/app/profile/edit" component={Profile} />
      <PrivateRoute exact path="/app/tasks" component={TaskList} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default AllRoutes;