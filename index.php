<?php
include 'database.php';
?>
<html>
<!doctype HTML>
<html>
	<head>
		<!--<link type="text/css" rel="stylesheet" href="stylesheet.css">!-->
		<title>PTO Tracker</title>
		<script src="ptocalculator.js"></script>
	</head>
	<body>
		<form method="post" action="addpto.php">
			Year: 
			<input type="number" name="year"><br>
			Month: 
			<input type="number" name="month"><br>
			Day: 
			<input type="number" name="day"><br>
			Hours: 
			<input type="number" name="hours" value="7"><br>
			<input type="submit" name="submit"><br>
		</form><br>

        <table id="tableDisplay" border="1">
            <tr>
                <td></td>
                <td><p>Year</p></td>
                <td><p>6 weeks</p></td>
                <td><p>Current Month</p></td>
            </tr>
            <tr>
                <td><p>Full days</p></td>
                <td><p id="FDyear"></p></td>
                <td><p id="FD6weeks"></p></td>
                <td><p id="FDmonth"></p></td>
            </tr>
            <tr>
                <td><p>Total days</p></td>
                <td><p id="TDyear"></p></td>
                <td><p id="TD6weeks"></p></td>
                <td><p id="TDmonth"></p></td>
            </tr>
        </table>

		<?php
			$dbc = mysqli_connect(DATABASE_SERVERNAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_TABLE_PTO) 
                or die('Error connecting to mySQL server.');

            $total_time_used = mysqli_query($dbc, "CALL pto_tracker.time_used_get()")
            	or die("Query failed");

            echo "<table border='1'>";
            echo "<tr>";
            echo "<td><h1>Total Time Used</h1></td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Year</td>";
            echo "<td>Month</td>";
            echo "<td>Day</td>";
            echo "<td>Hours</td>";
            echo "</tr>";
            while ($row = mysqli_fetch_array($total_time_used)) {
                echo "<tr>";
                echo "<td>".$row[0]."</td>";
                echo "<td>".$row[1]."</td>";
                echo "<td>".$row[2]."</td>";
                echo "<td>".$row[3]."</td>";
                echo "</tr>";

                $year = $row[0];
                $month = $row[1];
                $day = $row[2];
                $hours = $row[3];
                echo "<script type='text/javascript'>";
                echo "submitLeave('$year', '$month', '$day', '$hours');";
                echo "updateLeave();";
                echo "</script>";
            };
            echo "</table><br>";

            mysqli_close($dbc);
		?>
	</body>
</html>