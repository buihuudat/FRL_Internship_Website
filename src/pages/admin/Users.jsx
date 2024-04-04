import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../slice/userSlice";
import moment from "moment";
import UpdateUserModal from "../../components/updateUserModal";
import { useEffect, useState } from "react";
import { userApi } from "../../utils/api/userApi";

export default function Users() {
  const dispatch = useDispatch();
  const handleEdit = (user) => {
    dispatch(setModal({ show: true, data: user }));
  };

  const modal = useSelector((state) => state.user.modal);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await userApi.getUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getUsers();
  }, []);

  return isLoading ? (
    <LinearProgress color="error" />
  ) : (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên tài khoản</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Số điện thoại</TableCell>
            <TableCell align="right">Giới tính</TableCell>
            <TableCell align="right">Ngày sinh</TableCell>
            <TableCell align="right">Quyền hạn</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.length &&
            users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user?.username}
                </TableCell>
                <TableCell align="right">{user?.email}</TableCell>
                <TableCell align="right">{user?.phone}</TableCell>
                <TableCell align="right">{user?.gender}</TableCell>
                <TableCell align="right">
                  {moment(user.birthday).format("l")}
                </TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditNoteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <UpdateUserModal />
    </TableContainer>
  );
}
