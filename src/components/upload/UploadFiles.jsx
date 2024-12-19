import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import firebaseConfig from "../../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database"
import "firebase/compat/storage"


const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const UploadFiles = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const loggedUser = localStorage.getItem("user");

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const ref = database.ref("Notes").child("Users").child(loggedUser).child("Files");

        ref.on("value", (snapshot) => {
            const files = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                files.push({
                    id: childKey,
                    title: childData.title,
                    description: childData.description,
                    fileUrl: childData.fileUrl
                });
            });
            setFiles(files);
        });
    }, []);

    const handleAddFile = (event) => {
        event.preventDefault();

        const storageRef = firebase.storage().ref('Notes').child('files');
        const file = document.getElementById('file').files[0];
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then((snapshot) => {
            console.log('File uploaded successfully');
            fileRef.getDownloadURL().then((url) => {
                const database = firebase.database();
                const ref = database.ref("Notes").child("Users").child(loggedUser).child("Files");
                ref.push({ title, description, fileUrl: url });
                setTitle("");
                setDescription("");
                document.getElementById('file').value = null;
            })
        });

        alert("file added!");
    }

    const handleDeleteFile = (id, fileUrl) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
          // Delete from Firebase Storage
          const storageRef = firebase.storage().refFromURL(fileUrl);
          storageRef.delete().then(() => {
            console.log('File deleted successfully');
          }).catch((error) => {
            console.error('Error deleting file:', error);
          });
      
          // Delete from Firebase Database
          const database = firebase.database();
          const ref = database.ref("Notes").child("Users").child(loggedUser).child("Files").child(id);
          ref.remove();
          alert("File deleted!");
        }
      };
      
      
    const handleViewFile = (fileUrl) => {
        window.open(fileUrl, "_blank");
    }

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container>
                    <div className="container shadow p-4 w-75 mb-5 border rounded">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)}
                                className="form-control" id="title" placeholder="Enter Title" value={title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="file" />
                        </div>
                        <div className="text-end">
                            <button type="button" className="btn btn-success" onClick={handleAddFile}>Add</button>
                        </div>
                    </div>
                    <div className="container">
                        <table className="table table-bordered table-striped rounded ">
                            <thead>
                                <tr className='text-center'>
                                    <th style={{ width: "7%" }}>Sr No</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th style={{ width: "18%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file, index) => (
                                    <tr key={file.id}>
                                        <td>{index + 1}</td>
                                        <td>{file.title}</td>
                                        <td>{file.description}</td>
                                        <td>
                                            <div className="text-center">
                                                <button className="btn btn-primary me-2 btn-sm" onClick={() => handleViewFile(file.fileUrl)}>View</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFile(file.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Grid>
            </Box>
        </Box>
    );
}

export default UploadFiles;