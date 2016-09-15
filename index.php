<?php
include 'database.php';
include 'session.php';
?>
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
			<input type="number" min="2000" max="9999" name="year" id="year_input"><br>
			Month: 
			<input type="number" min="1" max="12" name="month" id="month_input"><br>
			Day: 
			<input type="number" min="1" max="31" name="day" id="day_input"><br>
			Hours: 
			<input type="number" step="0.01" min="0.01" max="24" name="hours" value="7"><br>
            <button type="button" onclick="set_as_today()">Today</button>
			<input type="submit" name="submit"><br>
		</form><br>

        <table id="tableDisplay" border="1">
            <tr>
                <td></td>
                <td><p>12 Months</p></td>
                <td><p>Current Year</p></td>
                <td><p>6 weeks</p></td>
                <td><p>Current Month</p></td>
            </tr>
            <tr>
                <td><p>Full days</p></td>
                <td><p id="FD12months"></p></td>
                <td><p id="FDyear"></p></td>
                <td><p id="FD6weeks"></p></td>
                <td><p id="FDmonth"></p></td>
            </tr>
            <tr>
                <td><p>Total days</p></td>
                <td><p id="TD12months"></p></td>
                <td><p id="TDyear"></p></td>
                <td><p id="TD6weeks"></p></td>
                <td><p id="TDmonth"></p></td>
            </tr>
        </table>
		<?php
            $total_time_used = mysqli_query($db, "CALL pto_tracker.time_used_get()")
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
                echo "<td>".$row['year']."</td>";
                echo "<td>".$row['month']."</td>";
                echo "<td>".$row['day']."</td>";
                echo "<td>".$row['hours']."</td>";
                echo "</tr>";

                $year = $row['year'];
                $month = $row['month'];
                $day = $row['day'];
                $hours = $row['hours'];
                echo "<script type='text/javascript'>";
                echo "submitLeave('$year', '$month', '$day', '$hours');";
                echo "updateLeave();";
                echo "</script>";
            };
            echo "</table><br>";

            mysqli_close($db);
		?>
        <br><a href="/ptotracker/adduser.php">Add a new user</a>
	</body>
</html>