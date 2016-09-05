<?php
    include 'database.php';
    include 'session.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $add_new_user = "INSERT INTO login (username, password) VALUES ('$username', '$hashed_password')";
        $result = mysqli_query($db, $add_new_user);

        if ($result) {
            echo "User " . $username . " added succesfully";
        } else {
            echo "Add failed";
        };
    };
?>
<!doctype HTML>
<html>
    <head>
        <title>Add a new user</title>
    </head>
    <body>
        <a href="/ptotracker/index.php">HOME</a><br>
        <form method="post" action="">
            <label>Username: </label><input type="text" name="username"><br>
            <label>Passsword: </label><input type="password" name="password"><br>
            <input type="submit" value="submit"><br>
        </form>
    </body>
</html>