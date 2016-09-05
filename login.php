<?php
    include 'database.php';
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // username and password sent from form
        $myusername = mysqli_real_escape_string($db, $_POST['username']);
        $mypassword = mysqli_real_escape_string($db, $_POST['password']);

        $sql_auth = "SELECT username, password FROM login WHERE username = '$myusername'";
        $result = mysqli_query($db,$sql_auth);
        if ($result) {
            $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
            if (password_verify($mypassword, $row['password'])) {
                $_SESSION['login_user'] = $myusername;
                header("location: index.php");
            } else {
                $error = "Your username and password is invalid";
            };
        } else {
            $error = "Your username and password is invalid";
        };
    };
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
            <label>Password: </label><input type="password" name="password"><br>
            <input type="submit" value="submit"><br>
        </form>
    </body>
</html>