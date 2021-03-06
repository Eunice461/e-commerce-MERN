import React, { useEffect } from 'react'
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { deleteClient, getUsers } from '../../redux/apiCalls';

export default function UserList() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.client.users);

	useEffect(() => {
		getUsers(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteClient(id, dispatch);
	};
	const columns = [
		{ field: "_id", headerName: "ID", width: 220 },
		{
			field: "user",
			headerName: "User",
			width: 200,
			renderCell: (params) => {
				return (
					<div className='userListUser'>
						<img className='userListImg' src={params.row.img} alt='' />
						{params.row.username}
					</div>
				);
			},
		},
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row.id}>
							<button className='userListEdit'>Edit</button>
						</Link>
						<DeleteOutline
							className='userListDelete'
							onClick={() => handleDelete(params.row.id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className='userList'>
			<DataGrid
				rows={users}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={8}
				checkboxSelection
			/>
		</div>
	);
}