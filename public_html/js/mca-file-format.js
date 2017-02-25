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

function dump_mca_data(data, rois, format, filename) {
  if (format === "ortec-chn") {
    return dump_mca_data_ortec_chn(data, rois, filename);
  } else if (format === "plain-txt") {
    return dump_mca_data_plain_text(data, rois, filename);
  } else if (format === "json-txt") {
    return dump_mca_data_json_text(data, rois, filename);
  }
}

function dump_mca_data_json_text(data, rois, filename) {
  var json = {};
  var d = [];
  for (var i=0; i<data.length; i++) {
    d.push(data[i][1]);
  }
  json.data = d;
  json.nchannels = data.length;
  json.description = "MCA channel data";
  json.roi = [{count: rois[0].count},{count: rois[1].count},{count: rois[2].count}];
  var obj = {
    file:  filename+".json",
    payload: "data:text/json," + JSON.stringify(json)
  };
  return obj;
}

function dump_mca_data_plain_text(data, rois, filename) {
  var buf = "data:text/plain,# MCA data for " + data.length +
            " channels%0D# ROI data%0D" +
            rois[0].count + "%0D" +
            rois[1].count + "%0D" +
            rois[2].count + "%0D# Channel data";
  for (var i=0; i<data.length; i++) {
    buf += "%0D" + data[i][1];
  }
  var obj = {
    file:  filename+".txt",
    payload: buf
  };
  return obj;
}

function dump_mca_data_ortec_chn(data, rois, filename) {
  var obj = {
    file:  filename+".chn",
    payload: "data:application/octet-stream;base64," + uint_8_to_base_64(new Uint8Array([65, 66, 67, 68]))
  };
  return obj;
}

