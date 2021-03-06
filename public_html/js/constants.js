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

const START_ACQUISITION_TEXT = "<i style='line-height:inherit' class='material-icons right'>play_arrow</i>Start";
const STOP_ACQUISITION_TEXT = "<i style='line-height:inherit' class='material-icons right'>stop</i>Stop";
const GET_OSCILLOSCOPE_DATA_TEXT = "<i style='line-height:inherit' class='material-icons right'>play_arrow</i>Get Oscilloscope Data";
const CANCEL_OSCILLOSCOPE_ACQUISITION_TEXT = "<i style='line-height:inherit' class='material-icons right'>stop</i>Cancel Oscilloscope Data";

const DEVICE_CONNECTION = "device-connection";

const MCPHA_SIDEBAR_OPEN = "mcpha_sidebar_open";
const MCPHA_SELECTED_TAB = "mcpha_selected_tab";
const MCPHA_DEC_FACTOR = "mcpha_dec_factor";
const MCPHA_DEVICE_ADDR = "mcpha_device_addr";
const MCPHA_CONNECT_DEVICE = "mcpha_connect_device";
const MCPHA_MCA_DATAFILE = "mcpha_mca_datafile";
const MCPHA_MCA_DATAFORMAT = "mcpha_mca_dataformat";
const MCPHA_MCA_SAMPLE_DESC = "mcpha_mca_sample_desc";
const MCPHA_MCA_DETECTOR_DESC = "mcpha_mca_detector_desc";
const MCPHA_MCA_1_SAMDESC = "mcpha_mca_1_samdesc";
const MCPHA_MCA_1_DETDESC = "mcpha_mca_1_detdesc";
const MCPHA_MCA_1_DATAFILE = "mcpha_mca_1_datafile";
const MCPHA_MCA_1_DATAFORMAT = "mcpha_mca_1_dataformat";
const MCPHA_MCA_1_IN_NEG = "mcpha_mca_1_in_neg";
const MCPHA_MCA_1_ACQ_TIME = "mcpha_mca_1_acq_time";
const MCPHA_MCA_1_TRIG_MODE = "mcpha_mca_1_trig_mode";
const MCPHA_MCA_1_TRIG_SOURCE = "mcpha_mca_1_trig_source";
const MCPHA_MCA_1_TRIG_EDGE = "mcpha_mca_1_trig_edge";
const MCPHA_MCA_1_TRIG_LEVEL = "mcpha_mca_1_trig_level";
const MCPHA_MCA_1_ROI_1_START = "mcpha_mca_1_roi1_start";
const MCPHA_MCA_1_ROI_1_END = "mcpha_mca_1_roi1_end";
const MCPHA_MCA_1_ROI_2_START = "mcpha_mca_1_roi2_start";
const MCPHA_MCA_1_ROI_2_END = "mcpha_mca_1_roi2_end";
const MCPHA_MCA_1_ROI_3_START = "mcpha_mca_1_roi3_start";
const MCPHA_MCA_1_ROI_3_END = "mcpha_mca_1_roi3_end";
const MCPHA_MCA_2_SAMDESC = "mcpha_mca_2_samdesc";
const MCPHA_MCA_2_DETDESC = "mcpha_mca_2_detdesc";
const MCPHA_MCA_2_DATAFILE = "mcpha_mca_2_datafile";
const MCPHA_MCA_2_DATAFORMAT = "mcpha_mca_2_dataformat";
const MCPHA_MCA_2_IN_NEG = "mcpha_mca_2_in_neg";
const MCPHA_MCA_2_ACQ_TIME = "mcpha_mca_2_acq_time";
const MCPHA_MCA_2_TRIG_MODE = "mcpha_mca_2_trig_mode";
const MCPHA_MCA_2_TRIG_SOURCE = "mcpha_mca_2_trig_source";
const MCPHA_MCA_2_TRIG_EDGE = "mcpha_mca_2_trig_edge";
const MCPHA_MCA_2_TRIG_LEVEL = "mcpha_mca_2_trig_level";
const MCPHA_MCA_2_ROI_1_START = "mcpha_mca_2_roi1_start";
const MCPHA_MCA_2_ROI_1_END = "mcpha_mca_2_roi1_end";
const MCPHA_MCA_2_ROI_2_START = "mcpha_mca_2_roi2_start";
const MCPHA_MCA_2_ROI_2_END = "mcpha_mca_2_roi2_end";
const MCPHA_MCA_2_ROI_3_START = "mcpha_mca_2_roi3_start";
const MCPHA_MCA_2_ROI_3_END = "mcpha_mca_2_roi3_end";
const MCPHA_OSC_1_IN = "mcpha_osc_1_in";
const MCPHA_OSC_2_IN = "mcpha_osc_2_in";
const MCPHA_OSC_TRIG_MODE = "mcpha_osc_trig_mode";
const MCPHA_OSC_TRIG_SOURCE = "mcpha_osc_trig_source";
const MCPHA_OSC_TRIG_EDGE = "mcpha_osc_trig_edge";
const MCPHA_OSC_TRIG_LEVEL = "mcpha_osc_trig_level";
const MCPHA_MCA_LLD = "mcpha_mca_lld";
const MCPHA_MCA_ULD = "mcpha_mca_uld";
const MCPHA_MCA_Y_SCALE = "mcpha_mca_y_scale";
const MCPHA_MCA_AUTO_Y_SCALE = "mcpha_mca_auto_y_scale";
const TOAST_DELAY = 4000;
const WEBSOCKET_CONNECTED = 1;
const WEBSOCKET_CONNECTING = 2;
const WEBSOCKET_DISCONNECTED = 3;
const WEBSOCKET_ERROR = 4;

const TIMER_FREQ = 125000000.0;
const TIME_PER_TICK = 1.0 / TIMER_FREQ;
const OSC_Y_AXIS_CONV_FACTOR = 10.0 / 32768.0;
const OSC_X_AXIS_CONV_FACTOR = 1000;
const SHIFT_CODE = 56;
const SHIFT_CHAN = 52;
const MCPHA_COMMAND_RESET_TIMER = 0;
const MCPHA_COMMAND_RESET_HISTOGRAM = 1;
const MCPHA_COMMAND_RESET_OSCILLOSCOPE = 2;
const MCPHA_COMMAND_RESET_GENERATOR = 3;
const MCPHA_COMMAND_SET_SAMPLE_RATE = 4;
const MCPHA_COMMAND_SET_NEGATOR_MODE = 5;
const MCPHA_COMMAND_SET_BASELINE_MODE = 6;
const MCPHA_COMMAND_SET_BASELINE_LEVEL = 7;
const MCPHA_COMMAND_SET_PHA_DELAY = 8;
const MCPHA_COMMAND_SET_PHA_MIN_THRESHOLD = 9;
const MCPHA_COMMAND_SET_PHA_MAX_THRESHOLD = 10;
const MCPHA_COMMAND_SET_TIMER_VALUE = 11;
const MCPHA_COMMAND_SET_TIMER_MODE = 12;
const MCPHA_COMMAND_GET_TIMER = 13;
const MCPHA_COMMAND_GET_HISTOGRAM_DATA = 14;
const MCPHA_COMMAND_SET_TRIGGER_SOURCE = 15;  /* set trigger source (0 for channel 1, 1 for channel 2) */
const MCPHA_COMMAND_SET_TRIGGER_SLOPE = 16;   /* set trigger slope (0 for rising, 1 for falling) */
const MCPHA_COMMAND_SET_TRIGGER_MODE = 17;    /* set trigger mode (0 for normal, 1 for auto) */
const MCPHA_COMMAND_SET_TRIGGER_LEVEL = 18;
const MCPHA_COMMAND_SET_NUMBER_OF_SAMPLES_BEFORE_TRIGGER = 19;
const MCPHA_COMMAND_SET_TOTAL_NUMBER_OF_SAMPLES_TO_ACQUIRE = 20;
const MCPHA_COMMAND_START_OSCILLOSCOPE = 21;
const MCPHA_COMMAND_GET_OSCILLOSCOPE_STATUS = 22;
const MCPHA_COMMAND_GET_OSCILLOSCOPE_DATA = 23;

const ROI_HIGHLIGHT = "lighten-3";

const CURSOR_MODE_ZOOMIN = "zi";
const CURSOR_MODE_ZOOMOUT = "zo";
const CURSOR_MODE_PAN = "pan";
const CURSOR_MODE_CLEAR_ALL = "";
const CURSOR_MODE_SETROI_1 = "r1";
const CURSOR_MODE_SETROI_2 = "r2";
const CURSOR_MODE_SETROI_3 = "r3";
const CURSOR_MODE_CLEAR_ROIS = "cr";

const HIGHLIGHT_BUTTON = "lighten-3";

const MCA_YRANGE_MIN = 10;
const MCA_YRANGE_MAX = 4000000000;

var VERT_LIN_RANGE = [], VERT_LOG_RANGE = [];

// initalise vertical range array if empty
if (VERT_LIN_RANGE.length === 0) {
  var t = [1, 2, 5];
  var n, i = 0, f = MCA_YRANGE_MIN;
  do
  {
    if ((i+1) > t.length)
    {
      i = 0;
      f *= 10;
    }
    n = (f * t[i++]) + 0.0001;
    VERT_LIN_RANGE.push(n);
    if (i === 1) {
      VERT_LOG_RANGE.push(n);
    }
  }
  while (n < MCA_YRANGE_MAX);
}

// initialise ticks arfray
var YAXIS_LOG_TICKS = new Array();
for (var i=0; i<VERT_LOG_RANGE.length; i++) {
  var t = {
    ymax: VERT_LOG_RANGE[i],
    ticks: VERT_LOG_RANGE.slice((i<3)?0:i-3,(i<3)?3:i+1)
  };
  YAXIS_LOG_TICKS[i] = t;
}


// initialise ticks arfray
var YAXIS_LIN_TICKS = new Array();
for (var i=0; i<VERT_LIN_RANGE.length; i++) {
  var t = {
    ymax: VERT_LIN_RANGE[i],
    ticks: VERT_LIN_RANGE.slice((i<3)?0:i-3,(i<3)?3:i+1)
  };
  YAXIS_LIN_TICKS[i] = t;
}

// websocket connection object
var wsock = null;

// Device connection status
var devstatus = WEBSOCKET_DISCONNECTED;
;

// MCA chartist and options
var chart,
    auto_y_scale,
    init_complete = false,
    acqdat = [0, 0];
var mca1_timer = null,
    mca1_acqtime = 0,
    mca1_rois = [{start:-1,end:-1,count:0,data:[]},{start:-1,end:-1,count:0,data:[]},{start:-1,end:-1,count:0,data:[]}],
    mca1_prev_ymax = -1,
    mca1_ymax = 0;
var mca1_data = [[0, 0], [16384, 0]],
    mca1_options = null,
    mca1_cursor = {channel: 0, data: [[0,0]]}, mca1_cursor_mode = null;
var mca2_timer = null,
    mca2_acqtime = 0,
    mca2_rois = [{start:-1,end:-1,count:0,data:[]},{start:-1,end:-1,count:0,data:[]},{start:-1,end:-1,count:0,data:[]}],
    mca2_prev_ymax = -1,
    mca2_ymax = 0;
var mca2_data = [[0, 0], [16384, 0]],
    mca2_options = null,
    mca2_cursor = {channel: 0, data: [[0,0]]}, mca2_cursor_mode = null;
var osc1_data = [[0, 0], [65536, 0]],
    osc2_data = [[0,0],[65536,0]],
    osc_options = null,
    osc_cursor_mode;
var mca1_acq = false,
    mca2_acq = false,
    osc_acq = false;

