`% extends templates/include/page.php %`
`% block extra_head %`
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        function getData() {
            var promises = [];

            $.getJSON('https://samland.minersonline.tk/docs/census/all.json', function(data) {
                Object.keys(data).forEach(function(key) {
                    promises.push($.getJSON(data[key]["url"]));
                });

                $.when.apply($, promises).then(function(){
                    var stats = [];
                    var ethnicStats = [];

                    stats.push(["Day", "Total Population", "Employed", "Homeless"]);
                    ethnicStats.push(["Day", "Adults", "Children", "Plains", "Taiga", "Snowy"]);

                    for(var i = 0; i < arguments.length; i++){
                        var list = arguments[i][0]["data"]
                        var employRate = 0;
                        var homelessRate = 0;
                        var childRate = 0;
                        var audltRate = 0;
                        var taigaRate = 0;
                        var plainsRate = 0;
                        var sonwRate = 0;
                        for (var key in list) {
                            if (list.hasOwnProperty(key)) {
                                var pop = list[key]
                                if (pop["home"] == undefined) {
                                    homelessRate += 1;
                                }
                                if (pop["job"].length != 0) {
                                    employRate += 1;
                                }
                                if (pop["age"] == "adult") {
                                    audltRate += 1;
                                } else {
                                    childRate += 1;
                                }
                                if (pop["type"] == "minecraft:plains") {
                                    plainsRate += 1;
                                }
                                if (pop["type"] == "minecraft:snow") {
                                    sonwRate += 1;
                                }
                                if (pop["type"] == "minecraft:taiga") {
                                    taigaRate += 1;
                                }
                            }
                        }

                        stats.push([
                            arguments[i][0]["day"], 
                            Object.keys(list).length,
                            employRate,
                            homelessRate
                        ]);
                        ethnicStats.push([
                            arguments[i][0]["day"], 
                            audltRate,
                            childRate,
                            plainsRate,
                            taigaRate,
                            sonwRate
                        ]);
                    }

                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable(stats);
                        var options = {
                            title: 'Villager Population',
                            legend: { position: 'bottom' }
                        };
                        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
                        chart.draw(data, options);

                        var ethnicData = google.visualization.arrayToDataTable(ethnicStats);
                        var ethnicOptions = {
                            title: 'Villager Ethnics',
                            legend: { position: 'bottom' }
                        };
                        var ethnicChart = new google.visualization.LineChart(document.getElementById('curve_chart2'));
                        ethnicChart.draw(ethnicData, ethnicOptions);
                    }
                });
            });
        }
        getData();
    </script>
`% endblock %`

`% block content %`
    <h1>Villager statistics</h1>
    <div id="curve_chart" style="width: 900px; height: 500px"></div>
    <div id="curve_chart2" style="width: 900px; height: 500px"></div>
`% endblock %`