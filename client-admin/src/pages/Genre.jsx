import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Genre() {
  const [genres, setGenres] = useState([]);
  const [genreBeingEdited, setGenreBeingEdited] = useState(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/find-all`)
      .then((res) => res.json())
      .then((genres) => setGenres(genres));
  }, []);

  const handleDelete = (genreId) => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/delete-genre/${genreId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setGenres(genres.filter((genre) => genre.id !== genreId));
      }
    });
  };

  const handleEdit = (genre) => {
    setGenreBeingEdited(genre);
  };

  const handleSave = (genreId, newGenreName) => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/edit-genre/${genreId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ genreName: newGenreName }),
    })
      .then((res) => res.text())
      .then((message) => {
        if (message === "Genre has been successfully edited") {
          setGenres(genres.map((genre) => (genre.id === genreId ? { ...genre, genreName: newGenreName } : genre)));
          setGenreBeingEdited(null);
        }
        alert(message); // menampilkan pesan dari backend sebagai alert
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the genre.");
      });
  };

  const handleAddGenre = () => {
    if (newGenre.trim() === "") return;

    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/add-genre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ genreName: newGenre }),
    })
      .then((res) => res.json())
      .then((addedGenre) => {
        setGenres([...genres, addedGenre]);
        setNewGenre(""); // Clear input field after adding
      });
  };

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Genres</h1>

        {/* Add Genre Form */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Add New Genre</label>
          <div className="flex space-x-2">
            <input type="text" className="p-2 border border-gray-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="New genre name" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} />
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleAddGenre}>
              Add
            </button>
          </div>
        </div>

        {/* Genre Table */}
        <section className="max-w-[1170] w-1/2 my-[30px] mx-auto bg-[#11326f] rounded overflow-hidden border border-white">
          <TableContainer component={Paper} style={{ background: "transparent" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#0c1632]">
                <TableRow className="text-white">
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {genres.map((genre) => (
                  <TableRow key={genre.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell style={{ color: "white", fontWeight: "bold" }}>
                      {genreBeingEdited === genre ? (
                        <form className="space-y-2" onSubmit={() => handleSave(genre.id, newGenreName)}>
                          <div>
                            <label className="block text-sm font-medium">Current name:</label>
                            <p className="text-white">{genre.genreName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium">New name:</label>
                            <input
                              type="text"
                              className="mt-1 p-2 block w-full border text-slate-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={genre.genreName}
                              onChange={(e) => setNewGenreName(e.target.value)}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleSave(genre.id, newGenreName)}>
                              Save
                            </button>
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400" onClick={() => setGenreBeingEdited(null)}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <span className="text-white">{genre.genreName}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {genreBeingEdited === genre ? (
                        <></>
                      ) : (
                        <div className="flex space-x-2">
                          {/* Edit */}
                          <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={() => handleEdit(genre)}>
                            Edit
                          </button>

                          {/* Delete */}
                          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDelete(genre.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Genre;
