<html>
    <head>
        <title>PTO Tracker</title>
    </head>
    <body>
        <?php 
            $date = $_POST['inputDate'];
            $hours = $_POST['inputHours'];

            echo 'Add successful.<br />';
            echo 'Date: ' . $date;
            echo 'Hours: ' . $hours;


            $dbc = mysqli_connect('mysql.betterin30days.com', 'USERNAME', 'PASSWORD', 'pto_tracker') 
                or die('Error connecting to mySQL server.');

            $insert_time_used = "INSERT INTO pto_used (date, hours) VALUES ('$date', '$hours')";
            $result = mysqli_query($dbc, $insert_time_used); #all that is returned is if it was successfull or not

            $total_time_used = mysqli_query($dbc, "CALL pto_tracker.time_used_get()") or die("Query failed");
            echo "<table border='1'><tr><td><p>Date</p><td><p>Hours</p></td></tr>";
            while ($row = mysqli_fetch_array($total_time_used)) {
                echo "<tr><td>" . $row[0] . "</td><td>" . $row[1] . "</td></tr>";
            }
            echo "</table>";

            mysqli_close($dbc);
        ?>
    </body>
</html>