const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

// Create a new note
app.post('/create-note', function (req, res) {
  const { title, datetime, note } = req.body;
  const queryStr = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  const values = [title, datetime, note];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: err.sqlMessage });
    } else {
      res.status(200).json({ success: true, message: 'Sukses membuat note', data: values });
    }
  });
});

// Get all notes
app.get('/get-notes', function (req, res) {
  const queryStr = 'SELECT * FROM notes';

  conn.query(queryStr, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: err.sqlMessage });
    } else {
      res.status(200).json({ success: true, message: 'Sukses menampilkan semua notes', data: results });
    }
  });
});

// Get a single note by ID
app.get('/get-note-by-id', function (req, res) {
    const { id } = req.query;
    
    // Ensure `id` is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing id parameter' });
    }
  
    const queryStr = 'SELECT * FROM notes WHERE id = ?';
    const values = [id];
  
    conn.query(queryStr, values, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Note not found' });
      }
  
      res.status(200).json({ success: true, message: 'Sukses menampilkan note', data: results[0] });
    });
  });
  
// Update a note
app.put('/update-note', function (req, res) {
  const { id, title, datetime, note } = req.body;
  const queryStr = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  const values = [title, datetime, note, id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: err.sqlMessage });
    } else {
      res.status(200).json({ success: true, message: 'Sukses mengubah note', data: values });
    }
  });
});

// Delete a note
app.delete('/delete-note', function (req, res) {
  const { id } = req.body;
  const queryStr = 'DELETE FROM notes WHERE id = ?';
  const values = [id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: err.sqlMessage });
    } else {
      res.status(200).json({ success: true, message: 'Sukses menghapus note', data: "note has succesfuly deleted" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
