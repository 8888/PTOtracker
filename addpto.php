<?php
include 'database.php';
include 'session.php';
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

            $insert_time_used = "INSERT INTO pto_used (year, month, day, hours) VALUES ('$year', '$month', '$day', '$hours')";
            $result = mysqli_query($db, $insert_time_used); #all that is returned is if it was successfull or not

            if ($result) {
                echo 'Add successful!<br>';
                echo 'Year: ' . $year;
                echo ' Month: ' . $month;
                echo ' Day: ' . $day;
                echo ' Hours: ' . $hours;
            } else {
                echo "Error! Add failed!";
            };

            mysqli_close($db);
        ?>
    </body>
</html>