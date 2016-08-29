<?php
    include 'database.php';
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // username and password sent from form
        $myusername = mysqli_real_escape_string($db, $_POST['username']);
        $mypassword = mysqli_real_escape_string($db, $_POST['password']);

        $sql_auth = "SELECT username FROM login WHERE username = '$myusername' and password = '$mypassword'";
        $result = mysqli_query($db,$sql_auth);
        $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        $active = $row['active'];

        $count = mysqli_num_rows($result);
        if ($count == 1) {
            $_SESSION['login_user'] = $myusername;
            header("location: index.php");
        } else {
            $error = "Your username and password is invalid";
        };

    }

    mysqli_close($db);
?>
<!doctype HTML>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <form action="" method="post">
            <label>Username: </label><input type="text" name="username"><br>
            <label>Password: </label><input type="text" name="password"><br>
            <input type="submit" value="submit"><br>
        </form>
    </body>
</html>