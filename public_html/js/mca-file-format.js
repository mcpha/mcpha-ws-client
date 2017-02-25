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

function dump_mca_data(data, format, filename) {
  if (format === "ortec-chn") {
    return dump_mca_data_ortec_chn(data, filename);
  } else if (format === "plain-txt") {
    return dump_mca_data_plain_text(data, filename);
  } else if (format === "json-txt") {
    return dump_mca_data_json_text(data, filename);
  }
}

function dump_mca_data_json_text(data, filename) {
  var obj = {
    file:  filename+".json",
    payload: "data:text/json,{'x':1234}"
  };
  return obj;
}

function dump_mca_data_plain_text(data, filename) {
  var obj = {
    file:  filename+".txt",
    payload: "data:text/plain,abcdefg"
  };
  return obj;
}

function dump_mca_data_ortec_chn(data, filename) {
  var obj = {
    file:  filename+".chn",
    payload: "data:application/octet-stream;base64," + uint_8_to_base_64(new Uint8Array([65, 66, 67, 68]))
  };
  return obj;
}

