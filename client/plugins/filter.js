import Vue from "vue";
import moment from "moment";

Vue.filter("formatTruncate", function (text, length, suffix) {
  if (text) {
    return (
      text.slice(0, length) + (length < text.length ? suffix || "..." : "")
    );
  } else {
    return text;
  }
});

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm:ss");
  } else {
    return "null";
  }
});

Vue.filter("formatDateHoursAgo", function (value) {
  if (value) {
    return moment(String(value)).fromNow();
  } else {
    return "null";
  }
});
