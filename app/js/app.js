$.get("js/data.json", function (data) {
  createChart(data);
});

$(document).ready(function () {
  var options = $.extend({}, $.datepicker.regional["en-US"], {
    dateFormat: "mm/dd/yy",
  });
  $("#datepickerCalendar").datepicker(options);
});

function createChart(data) {
  const ctx = $("#myChart")[0].getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.chartLabels,
      datasets: [
        {
          label: "",
          data: data.chartData,
          borderColor: "rgb(248, 82, 58)",
          borderWidth: 3,
          pointStyle: "cross",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    },
  });
}

$("#circle-a").circleProgress({
  value: 0.75,
  size: 150,
  fill: {
    gradient: ["red", "orange"],
  },
});

$(document).ready(function () {
  clockUpdate();
  setInterval(clockUpdate, 1000);
});

function clockUpdate() {
  var date = new Date();
  $(".digital-clock").css({ color: "#fff", "text-shadow": "0 0 6px #ff0" });
  function addZero(x) {
    if (x < 10) {
      return (x = "0" + x);
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return (x = x - 12);
    } else if (x == 0) {
      return (x = 12);
    } else {
      return x;
    }
  }

  var h = addZero(twelveHour(date.getHours()));
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  $(".digital-clock").text(h + ":" + m + ":" + s);
}
