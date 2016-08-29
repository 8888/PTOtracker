<?php
include 'database.php';
?>
<html>
    <head>
        <title>PTO Tracker</title>
    </head>
    <body>
        <a href="/ptotracker/index.php">HOME</a><br>
        <?php 
            $year = $_POST['year'];
            $month = $_POST['month'];
            $day = $_POST['day'];
            $hours = $_POST['hours'];

            echo 'Add successful!<br>';
            echo 'Year: ' . $year;
            echo ' Month: ' . $month;
            echo ' Day: ' . $day;
            echo ' Hours: ' . $hours;

            $dbc = mysqli_connect(DATABASE_SERVERNAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_TABLE_PTO) 
                or die('Error connecting to mySQL server.');

            $insert_time_used = "INSERT INTO pto_used (year, month, day, hours) VALUES ('$year', '$month', '$day', '$hours')";
            $result = mysqli_query($dbc, $insert_time_used); #all that is returned is if it was successfull or not

            mysqli_close($dbc);
        ?>
    </body>
</html>