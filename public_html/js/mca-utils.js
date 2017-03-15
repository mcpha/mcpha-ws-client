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

