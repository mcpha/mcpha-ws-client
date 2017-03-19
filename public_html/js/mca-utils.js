/* 
 * Copyright 2017 John Preston<byhisdeeds@gmail.com>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


//
//
//
function show_busy_indicator(show) {
  if (show) {
    $('body').removeClass('loaded');
  } else {
    $('body').addClass('loaded');
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
}


//
// Initial mca chart options
//
function default_mca_chart_options() {
  return {
    lines: {
      show: true,
      steps: true
    },
    points: {
      show: false
    },
    axisLabels: {
      show: true
    },
    xaxes: [{
      axisLabel: 'Channel'
    }],
    yaxes: [{
      position: 'right',
      axisLabel: 'Counts'
    }],
    xaxis: {
      panRange: false,
      tickDecimals: 0,
      tickSize: 2000,
      min: 0,
      max: 16384,
      transform: function (x) {
        return x;
      }
    },
    yaxis: {
      panRange: false,
      labelWidth: 140,
      reserveSpace: true,
      position: "right",
      max: 100,
      min: 0,
      ticks: null, //[0.1,1,10,100,1000],
      transform: null//function(v) {
        //  return Math.log(v+0.0001); /*move away from zero*/
        //},
        //tickDecimals: 3,
        //tickFormatter: function (v, axis) {
        //  return "10" + (Math.round( Math.log(v)/Math.LN10)).toString().sup();
        //}
    },
    grid: {
      backgroundColor: "#999",
      hoverable: true,
      clickable: true,
      autoHighlight: false
    },
    crosshair: {
      mode: "x"
    },
    zoom: {
      interactive: true
    },
    pan: {
      interactive: false
    },
    selection: {
      mode: null
    }
  };
}

//
// Initial oscilloscope chart options
//
function default_osc_chart_options() {
  return {
    lines: {
      show: true,
      steps: true
    },
    points: {
      show: false
    },
    axisLabels: {
      show: true
    },
    xaxes: [{
      axisLabel: 'Time (&#181;s)'
    }],
    yaxes: [{
      position: 'right',
      axisLabel: 'Volts'
    }],
    xaxis: {
      panRange: false,
      tickDecimals: 0,
      transform: function (x) {
        return x;
      }
    },
    yaxis: {
      range_index: 0,
      panRange: false,
      labelWidth: 140,
      reserveSpace: true,
      position: "right",
      ticks: null,
      transform: null
    },
    grid: {
      backgroundColor: "#999",
      hoverable: true,
      clickable: true,
      autoHighlight: false
    },
    crosshair: {
      mode: "x"
    },
    zoom: {
      interactive: true
    },
    pan: {
      interactive: false
    },
    selection: {
      mode: null
    }
  };
}

//
// Send commands to device
//
function mcpha_send(code, chan, data, func) {
  if (wsock !== null) {
    // send command
    var buffer = new ArrayBuffer(16);
    var dataInt = new Uint32Array(buffer);
    var dataFloat = new Float64Array(buffer, 8);

    dataInt[0] = code;
    dataInt[1] = chan;
    dataFloat[0] = data;
    wsock.send(buffer, {binary: true});

    // if command is start acquisition then save timestamp
    if (code === MCPHA_COMMAND_SET_TIMER_MODE && data === 1) {
      acqdat[chan] = Date.now();
      log_status_message("Starting acquisition at "+formatISODate(acqdat[chan]), true);
    }
  }
}

//
//
//
function init_device_state() {
  // initialise device state
  mcpha_send(MCPHA_COMMAND_SET_SAMPLE_RATE, 0, 4);

  mcpha_send(MCPHA_COMMAND_SET_PHA_DELAY, 0, 100);

  // MCA 1
  mcpha_send(MCPHA_COMMAND_SET_PHA_MIN_THRESHOLD, 0,
    parseInt(localStorage.getItem(MCPHA_MCA_LLD)));

  mcpha_send(MCPHA_COMMAND_SET_PHA_MAX_THRESHOLD, 0,
    parseInt(localStorage.getItem(MCPHA_MCA_ULD)));

  // set whether mca channel 1 has negative input
  mcpha_send(MCPHA_COMMAND_SET_NEGATOR_MODE, 0,
    localStorage.getItem(MCPHA_MCA_1_IN_NEG) === " true" ? 1 : 0);

  // request timer value
  mcpha_send(MCPHA_COMMAND_GET_TIMER, 0, 0);

  // request histogram data
  mcpha_send(MCPHA_COMMAND_GET_HISTOGRAM_DATA, 0, 0);

  // MCA 2
  mcpha_send(MCPHA_COMMAND_SET_PHA_MIN_THRESHOLD, 1,
    parseInt(localStorage.getItem(MCPHA_MCA_LLD)));

  mcpha_send(MCPHA_COMMAND_SET_PHA_MAX_THRESHOLD, 1,
    parseInt(localStorage.getItem(MCPHA_MCA_ULD)));

  // set whether mca channel 1 has negative input
  mcpha_send(MCPHA_COMMAND_SET_NEGATOR_MODE, 1,
    localStorage.getItem(MCPHA_MCA_2_IN_NEG) === " true" ? 1 : 0);

  // request timer value
  mcpha_send(MCPHA_COMMAND_GET_TIMER, 1, 0);

  // request histogram data
  mcpha_send(MCPHA_COMMAND_GET_HISTOGRAM_DATA, 1, 0);

  // Oscilloscope
  // reset oscilloscope
  //mcpha_send(MCPHA_COMMAND_RESET_OSCILLOSCOPE, 0, 0);
  
  // set whether mca channel 1 has negative input
  //mcpha_send(MCPHA_COMMAND_SET_NEGATOR_MODE, 0, localStorage.getItem(MCPHA_MCA_1_IN_NEG) === "true" ? 1 : 0);
  
  // set whether mca channel 2 has negative input
  //mcpha_send(MCPHA_COMMAND_SET_NEGATOR_MODE, 1, localStorage.getItem(MCPHA_MCA_2_IN_NEG) === "true" ? 1 : 0);

  // set trigger source
  if (localStorage.getItem(MCPHA_OSC_TRIG_SOURCE) === "1") {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_SOURCE, 0, 0);
  } else {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_SOURCE, 1, 0);
  }

  // set trigger mode
  if (localStorage.getItem(MCPHA_OSC_TRIG_MODE) === "n") {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_MODE, 0, 0);
  } else {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_MODE, 1, 0);
  }

  // set trigger edge
  if (localStorage.getItem(MCPHA_OSC_TRIG_EDGE) === "r") {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_SLOPE, 0, 0);
  } else {
    mcpha_send(MCPHA_COMMAND_SET_TRIGGER_SLOPE, 1, 0);
  }

  // set trigger level
  mcpha_send(MCPHA_COMMAND_SET_TRIGGER_LEVEL, 0,
  parseInt(localStorage.getItem(MCPHA_OSC_TRIG_LEVEL)));

  // Set number of samples to skip before trigger
  mcpha_send(MCPHA_COMMAND_SET_NUMBER_OF_SAMPLES_BEFORE_TRIGGER, 0, 1000);
}

//
// log messages to screen and message log
//
function log_status_message(msg, onscreen) {
  if (onscreen !== 'undefined' && onscreen !== null && onscreen) {
    Materialize.toast(msg, TOAST_DELAY, 'toast-css');
  }
  // add to log element
  $("<span>" + msg + "<span><br/>").appendTo('#messages');
}


//
//
//
function update_mca_acquisition_buttons_text(active) {
  $('#enableacq').html(active ? STOP_ACQUISITION_TEXT : START_ACQUISITION_TEXT);
  if (active) {
    $('#net-traffic').addClass("infinite");
    $('#net-traffic').addClass("white-text");
  } else {
    $('#net-traffic').removeClass("infinite");
    $('#net-traffic').removeClass("white-text");
    log_status_message("Stopping mca acquisition", true);
  }
}


//
// Enable/Disable toolbar button
//
function update_toolbar_buttons(enable) {
  var tab = localStorage.getItem(MCPHA_SELECTED_TAB);
  if (tab === null || tab.startsWith("mca")) {
    if (enable) {
      $('#roi1').removeClass('disabled');
      $('#roi2').removeClass('disabled');
      $('#roi3').removeClass('disabled');
      $('#rois').removeClass('disabled');
      $('#enableacq').removeClass('disabled');
      $('#cleartimer').removeClass('disabled');
      $('#cleardata').removeClass('disabled');
      $('#fullextent').removeClass('disabled');
      $('#zoomin').removeClass('disabled');
      $('#zoomout').removeClass('disabled');
      $('#pan').removeClass('disabled');
      $('#linscale').removeClass('disabled');
      $('#logscale').removeClass('disabled');
      $('#download').removeClass('disabled');
    } else {
      $('#roi1').addClass('disabled');
      $('#roi2').addClass('disabled');
      $('#roi3').addClass('disabled');
      $('#rois').addClass('disabled');
      $('#enableacq').addClass('disabled');
      $('#cleartimer').addClass('disabled');
      $('#cleardata').addClass('disabled');
      $('#fullextent').addClass('disabled');
      $('#zoomin').addClass('disabled');
      $('#zoomout').addClass('disabled');
      $('#pan').addClass('disabled');
      $('#linscale').addClass('disabled');
      $('#logscale').addClass('disabled');
      $('#download').addClass('disabled');
    }
  } else if (tab === "log") {
  } else if (tab === "osc") {
    if (enable) {
      $('#getoscdata').removeClass('disabled');
    } else {
      $('#getoscdata').addClass('disabled');
    }
  }
}

        
//
// Initialise sidebar
//
function init_sidebar() {
  // hide all sidebars
  $('#mca-1-sidebar').css('display', 'none');
  $('#mca-2-sidebar').css('display', 'none');
  $('#osc-sidebar').css('display', 'none');
  $('#log-sidebar').css('display', 'none');

  //
  // Install tab click handler to show/hide sidebar menu
  //
  $('#mca-1').on('click', function () {
    select_tab("mca-1");
  });
  $('#mca-2').on('click', function () {
    select_tab("mca-2");
  });
  $('#osc').on('click', function () {
    select_tab("osc");
  });
  $('#log').on('click', function () {
    select_tab("log");
  });

  // restore sidebar if it last was open
  var p = localStorage.getItem(MCPHA_SIDEBAR_OPEN);
  show_sidebar(p !== null);
}

//
//
//
function show_sidebar(show) {
  if (show) {
    $('#slide-menu').addClass('open-side-nav');
    $('#slide-body').addClass('open-body-nav');
  } else {
    $('#slide-menu').removeClass('open-side-nav');
    $('#slide-body').removeClass('open-body-nav');
  }
}

        
//
// Return a text string representing the device connection status
//
function devstatus_string(code) {
  return (code === WEBSOCKET_DISCONNECTED) ? "is disconnected" :
    (code === WEBSOCKET_CONNECTING) ? "is connecting" :
    (code === WEBSOCKET_CONNECTED) ? "is connected" :
    (code === WEBSOCKET_ERROR) ? "connection error" :
    "unknown";
}


//
// Select div contaijner based on tab selection
//
function select_tab(tab) {
  // save this as the current selected tab
  localStorage.setItem(MCPHA_SELECTED_TAB, tab);
  // hide unselected tabs and show selected tab
  if (tab === "mca-1" || tab === null) {
    // hide/unhide relevant sidebar
    $('#mca-1-sidebar').css('display', 'inline');
    $('#mca-2-sidebar').css('display', 'none');
    $('#osc-sidebar').css('display', 'none');
    $('#log-sidebar').css('display', 'none');
    // show relevant container
    $('#mca-toolbar').css('display', 'inline');
    $('#osc-toolbar').css('display', 'none');
    $('#mca-container').css('display', 'inline');
    $('#osc-container').css('display', 'none');
    $('#log-container').css('display', 'none');
    // show tab selection bar
    $('#mca-1').addClass("selectedtab");
    $('#mca-2').removeClass("selectedtab");
    $('#osc').removeClass("selectedtab");
    $('#log').removeClass("selectedtab");
    // update cursor panel
    $("#acqtime_s").text(localStorage.getItem(MCPHA_MCA_1_ACQ_TIME));
  } else if (tab === "mca-2") {
    // hine/unhide relevant sidebar
    $('#mca-1-sidebar').css('display', 'none');
    $('#mca-2-sidebar').css('display', 'inline');
    $('#osc-sidebar').css('display', 'none');
    $('#log-sidebar').css('display', 'none');
    // show relevant container
    $('#mca-toolbar').css('display', 'inline');
    $('#osc-toolbar').css('display', 'none');
    $('#mca-container').css('display', 'inline');
    $('#osc-container').css('display', 'none');
    $('#log-container').css('display', 'none');
    // show tab selection bar
    $('#mca-1').removeClass("selectedtab");
    $('#mca-2').addClass("selectedtab");
    $('#osc').removeClass("selectedtab");
    $('#log').removeClass("selectedtab");
    // update cursor panel
    $("#acqtime_s").text(localStorage.getItem(MCPHA_MCA_2_ACQ_TIME));
  } else if (tab === "osc") {
    // hine/unhide relevant sidebar
    $('#mca-1-sidebar').css('display', 'none');
    $('#mca-2-sidebar').css('display', 'none');
    $('#osc-sidebar').css('display', 'inline');
    $('#log-sidebar').css('display', 'none');
    // show relevant container
    $('#mca-toolbar').css('display', 'none');
    $('#osc-toolbar').css('display', 'inline');
    $('#mca-container').css('display', 'none');
    $('#osc-container').css('display', 'inline');
    $('#log-container').css('display', 'none');
    // show tab selection bar
    $('#mca-1').removeClass("selectedtab");
    $('#mca-2').removeClass("selectedtab");
    $('#osc').addClass("selectedtab");
    $('#log').removeClass("selectedtab");
  } else if (tab === "log") {
    // hine/unhide relevant sidebar
    $('#mca-1-sidebar').css('display', 'none');
    $('#mca-2-sidebar').css('display', 'none');
    $('#osc-sidebar').css('display', 'none');
    $('#log-sidebar').css('display', 'inline');
    // show relevant container
    $('#mca-toolbar').css('display', 'none');
    $('#osc-toolbar').css('display', 'none');
    $('#mca-container').css('display', 'none');
    $('#osc-container').css('display', 'none');
    $('#log-container').css('display', 'inline');
    // show tab selection bar
    $('#mca-1').removeClass("selectedtab");
    $('#mca-2').removeClass("selectedtab");
    $('#osc').removeClass("selectedtab");
    $('#log').addClass("selectedtab");
  }
  // if websocket connection establed then we enable toolbar buttons
  if (wsock !== null) {console.log("readystate="+wsock.readyState);}
  if (wsock !== null && wsock.readyState === 1) {
    // update toolbar buttons
    update_toolbar_buttons(true);
    update_chart();
  }
}


//
//
//
function update_chart() {
  // don't actually render the chart untill initialisation is complete
  if (!init_complete) return;
  var tab = localStorage.getItem(MCPHA_SELECTED_TAB);
  if (tab === "mca-1") {
    chart = $.plot("#mca-chart",
                   [mca1_data,
                   {data:mca1_cursor_data, points:{show: true, symbol: "bar"}, color:"#f00"},
                   {data:mca1_rois[0].data, color:"#a22"},
                   {data:mca1_rois[1].data, color:"#a22"},
                   {data:mca1_rois[2].data, color:"#a22"}],
                   mca1_options);
    $("#roi1_counts").text(mca1_rois[0].count);
    $("#roi2_counts").text(mca1_rois[1].count);
    $("#roi3_counts").text(mca1_rois[2].count);
    $("#cursor").text(mca1_cursor_data[0][0]);
    $("#counts").text(mca1_cursor_data[0][1]);
  } else if (tab === "mca-2") {
    chart = $.plot("#mca-chart",
                   [mca2_data,
                   {data:mca2_cursor_data, points:{show: true}, color:"#f00"},
                   {data:mca2_rois[0].data, color:"#a22"},
                   {data:mca2_rois[1].data, color:"#a22"},
                   {data:mca2_rois[2].data, color:"#a22"}],
                   mca2_options);
    $("#roi1_counts").text(mca2_rois[0].count);
    $("#roi2_counts").text(mca2_rois[1].count);
    $("#roi3_counts").text(mca2_rois[2].count);
    $("#cursor").text(mca2_cursor_data[0][0]);
    $("#counts").text(mca2_cursor_data[0][1]);
  } else if (tab === "osc") {
    var d = [];
    if (localStorage.getItem(MCPHA_OSC_1_IN) === "true") {
      d.push(osc1_data);
    }
    if (localStorage.getItem(MCPHA_OSC_2_IN) === "true") {
      d.push(osc2_data);
    }
    chart = $.plot("#osc-chart", d, osc_options);
  }
}


//
//
//
function update_mca1_chart() {
  if (localStorage.getItem(MCPHA_SELECTED_TAB) === 'mca-1') {
    update_chart();
  }
}

//
//
//
function update_mca2_chart() {
  if (localStorage.getItem(MCPHA_SELECTED_TAB) === 'mca-2') {
    update_chart();
  }
}

//
//
//
function update_osc_chart() {
  if (localStorage.getItem(MCPHA_SELECTED_TAB) === 'osc') {
    update_chart();
  }
}

//
//
//
function init_tabs() {
  select_tab(localStorage.getItem(MCPHA_SELECTED_TAB));
}

//
//
//
function update_cursor_pos(adj) {
  var tab = localStorage.getItem(MCPHA_SELECTED_TAB);
  if (tab === "mca-1") {
    mca1_cursor += adj;
    mca1_cursor_data[0][0] = mca1_cursor;
    mca1_cursor_data[0][1] = mca1_data[mca1_cursor][1];
  } else if (tab === "mca-2") {
    
  }
  
  update_chart();
}
