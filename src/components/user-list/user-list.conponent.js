import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { deleteUserRequest, loadAllUsersRequest } from "../../store/users";
import { Button } from "../UI";

import styles from "./user-list.module.scss";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, errors } = useSelector((state) => state.userSlice);
  const removeUserHandler = (id) => dispatch(deleteUserRequest(id));

  useEffect(() => {
    dispatch(loadAllUsersRequest());
  }, [dispatch]);

  const renderUsersList = users ? (
    users.map(({ id, name, phone }) => (
      <div key={id} className={styles.userList__user}>
        <div>
          <div className={styles.userList__user}>{name}</div>
          <div className={styles.userList_phone}>{phone}</div>
        </div>
        <div>
          <Button
            label="X"
            onClick={removeUserHandler.bind(null, id)}
            isCircle
          />
        </div>
      </div>
    ))
  ) : (
    <div>Список пустой</div>
  );

  const renderError = errors && <div className={styles.userList}>{errors}</div>;

  return (
    <div className={styles.userList}>
      <h2>Список пользователей</h2>
      {renderError}
      {renderUsersList}
    </div>
  );
};

UserList.propTypes = {
  // Список пользователей
  users: PropTypes.array,
};

export default UserList;
