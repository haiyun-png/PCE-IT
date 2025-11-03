<?php
$servername = "localhost"; 
$username = "root";        
$password = "";          
$dbname = "todolist_db";  

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $todo_name = $conn->real_escape_string($_POST['todo-name']);
    $todo_description = $conn->real_escape_string($_POST['todo-description']);
    $todo_deadline = $conn->real_escape_string($_POST['todo-deadline']);
    $is_completed = 0;

    $sql = "INSERT INTO tasks (name, description, deadline, is_completed) 
            VALUES ('$todo_name', '$todo_description', '$todo_deadline', '$is_completed')";

    if ($conn->query($sql) === TRUE) {
        echo "Tugas baru berhasil ditambahkan! Anda akan diarahkan kembali...";
        header("refresh:3; url=index.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>