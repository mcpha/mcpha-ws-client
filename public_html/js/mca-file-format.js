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

function dump_mca_data(data, rois, format, num, sdesc, ddesc, filename) {
  if (format === "ortec-chn") {
    return dump_mca_data_ortec_chn(data, rois, num, sdesc, ddesc, filename);
  } else if (format === "plain-txt") {
    return dump_mca_data_plain_text(data, rois, num, sdesc, ddesc, filename);
  } else if (format === "json-txt") {
    return dump_mca_data_json_text(data, rois, num, sdesc, ddesc, filename);
  }
}

function dump_mca_data_json_text(data, rois, num, sdesc, ddesc, filename) {
  var json = {};
  var d = [];
  for (var i=0; i<data.length; i++) {
    d.push(data[i][1]);
  }
  json.data = d;
  json.nchannels = data.length;
  json.mca = num;
  json.sample = sdesc;
  json.detector = ddesc;
  json.roi = [{count: rois[0].count},{count: rois[1].count},{count: rois[2].count}];
  var obj = {
    file:  filename+".json",
    payload: "data:text/json," + JSON.stringify(json)
  };
  return obj;
}

function dump_mca_data_plain_text(data, rois, num, sdesc, ddesc, filename) {
  var buf = "data:text/plain,# MCA #" + num + " with " + data.length +
            " channels%0D# Sample description%0D" + sdesc+
            "%0D# Detector description%0D" + ddesc+
            "%0D# ROI data%0D" +
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

/***************
typedef struct {
  short code;
  short mcanum;
  short segnum;
  char startsec[2];
  long realtime;
  long livetime;
  char startdate[8];
  char starttime[4];
  short chnoff;
  short numchn;
} MAESTRO_HDR;

typedef struct {
  short code;
  short resv1;
  float ecoff;
  float ecslp;
  float ecqua;
  float pkoff;
  float pkslp;
  float pkqua;
  char resv3[228];
  char ddlen;
  char detdes[63];
  char sdlen;
  char samdes[63];
  char resv4[128];
} MAESTRO_FTR_NEW;
  // The number of the year, may be a two or four digit value,
  // with values between 0-69 mapping to 2000-2069 and 70-100 to 1970-2000
******************/

function dump_mca_data_ortec_chn(data, rois, num, sdesc, ddesc, filename) {
  var buf = new ArrayBuffer(512+32+(data.length*4));
  var v = new DataView(buf);
  // File type -1 for .chn
  v.setInt16(0, -1, true);
  // MCA number
  v.setInt16(2, num, true);
  // MCA segment number
  v.setInt16(4, 0, true);
  // Acquisition start seconds in ascii (char [2])
  v.setUint8(6, 48);
  v.setUint8(7, 52);
  // Realtime (float)
  v.setUint32(8, 16022, true);
  // Livetime (float)
  v.setUint32(12, 15000, true);
  // Start date (char[8] - 'DDMMMYYY')
  v.setUint8(16, 49);
  v.setUint8(17, 54);
  v.setUint8(18, 65);
  v.setUint8(19, 112);
  v.setUint8(20, 114);
  v.setUint8(21, 48);
  v.setUint8(22, 57);
  v.setUint8(23, 49);
  // Start time (char[4] - 'HHMM')
  v.setUint8(24, 49);
  v.setUint8(25, 51);
  v.setUint8(26, 51);
  v.setUint8(27, 55);
  // Channel offset
  v.setUint16(28, 0, true);
  // Number channels
  v.setUint16(30, data.length, true);
  // channel data
  var idx = 32;
  for (var i=0; i<data.length; i++) {
    v.setUint32(idx, data[i][1], true);
    idx += 4;
  }
  var foff = 32 + (data.length * 4);
  // File format footer signature - New format=-102, old format=-101 
  v.setUint16(foff, -102, true);
  // energy calibration coefficient offset
  //v.setFloat32(foff+4, 0);
  // energy calibration coefficient oslope
  //v.setFloat32(foff+8, 0);
  // Detector description length
  v.setUint8(foff+256, ddesc.length);
  // Detector description text (64 characters max)
  for (var i=0; i<ddesc.length && i<63; i++) {
    v.setUint8(foff+257+i, ddesc.charCodeAt(i));
  }
  // Sample description length
  v.setUint8(foff+320, sdesc.length);
  // Sample description text (64 characters max)
  for (var i=0; i<sdesc.length && i<63; i++) {
    v.setUint8(foff+321+i, sdesc.charCodeAt(i));
  }
  
  var obj = {
    file:  filename+".chn",
    payload: "data:application/octet-stream;base64," + uint_8_to_base_64(new Uint8Array(buf))
  };
  return obj;
}

