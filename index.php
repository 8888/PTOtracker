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
		<?php
			$dbc = mysqli_connect('mysql.betterin30days.com', 'betterin30days', 'createcollect88', 'pto_tracker') 
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
            }
            echo "</table><br>";

            echo "<table border='1'>";
            echo "<tr>";
            echo "<td></td>";
            echo "<td>Year</td>";
            echo "<td>6 weeks</td>";
            echo "<td>Current Month</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Full days</td>";
            echo "<td>FDyear</td>";
            echo "<td>FD6weeks</td>";
            echo "<td>FDmonth</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Total days</td>";
            echo "<td>TDyear</td>";
            echo "<td>TD6weeks</td>";
            echo "<td>TDmonth</td>";
            echo "</tr>";
            echo "</table>";

            mysqli_close($dbc);
		?>
	</body>
</html>