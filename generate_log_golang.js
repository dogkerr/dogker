//  ini buat load testing
// biar graph network,cpu, ram nginx di grafananya naik
// cara install k6: https://k6.io/docs/get-started/installation/
// cara run: k6 run load_testing.js
import http from 'k6/http'
import {sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export let options = {
    stages: [
        { duration: '10s', target: 100}, // dari 0 virutalUser/second ke  4 virtualUser/second selama 30 detik
        { duration: '20s', target: 150},
        { duration: '10s', target: 150},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% request harus kurang dari 1s
    },
}

// trend
const user1infoTrend = new Trend('List_user1info');
const user1errorTrend = new Trend('List_user1error');
const user1warnTrend = new Trend('List_user1warn');
const user1fatalTrend = new Trend('List_user1fatal');
const user1debugTrend = new Trend('List_user1debug');

const user2infoTrend = new Trend('List_user2info');
const user2errorTrend = new Trend('List_user2error');
const user2warnTrend = new Trend('List_user2warn');
const user2fatalTrend = new Trend('List_user2fatal');
const user2debugTrend = new Trend('List_user2debug');


// Error rate
const user1infoErrorRate = new Rate('List_user1info_Error_Rate');
const user1errorErrorRate = new Rate('List_user1error_Error_Rate');
const user1warnErrorRate = new Rate('List_user1warn_Error_Rate');
const user1fatalErrorRate = new Rate('List_user1fatal_Error_Rate');
const user1debugErrorRate = new Rate('List_user1debug_Error_Rate');

const user2infoErrorRate = new Rate('List_user2info_Error_Rate');
const user2errorErrorRate = new Rate('List_user2error_Error_Rate');
const user2warnErrorRate = new Rate('List_user2warn_Error_Rate');
const user2fatalErrorRate = new Rate('List_user2fatal_Error_Rate');
const user2debugErrorRate = new Rate('List_user2debug_Error_Rate');


function getUrl(user_no) {
    let urls  = {
        info: "http://103.175.219.0:"+ user_no + "/info",
        error:  "http://103.175.219.0:"+ user_no + "/error",
        warn:  "http://103.175.219.0:"+ user_no + "/warn",
        fatal:  "http://103.175.219.0:"+ user_no + "/fatal",
        debug:  "http://103.175.219.0:"+ user_no + "/debug",
    }
    return urls
}

export default () => {
    const userOneUrls = getUrl("8358");
    const userTwoUrls = getUrl("8535");

    const requests = {
        'user1_info': {
          method: 'GET',
          url: userOneUrls.info,
        },
        'user1_error': {
          method: 'POST',
          url: userOneUrls.error,
          body: {},
        },
        'user1_warn': {
            method: 'GET',
            url: userOneUrls.warn,
        },
        'user1_fatal': {
            method: 'GET',
            url: userOneUrls.fatal,
        },
        'user1_debug': {
            method: 'GET',
            url: userOneUrls.debug,
        },
        'user2_info': {
            method: 'GET',
            url: userTwoUrls.info,
        },
        'user2_error': {
            method: 'POST',
            url: userTwoUrls.error,
            body: {},
        },
        'user2_warn': {
            method: 'GET',
            url: userTwoUrls.warn,
        },
        'user2_fatal': {
            method: 'GET',
            url: userTwoUrls.fatal,
        },
        'user2_debug': {
            method: 'GET',
            url: userTwoUrls.debug,
        }  
      };


      const responses = http.batch(requests);

      // user 1 request all endpoints
      const user1infoResp = responses['user1_info'];
      check(user1infoResp, {
        'status is 200': (r) => r.status === 200,
      }) || user1infoErrorRate.add(1);

      user1infoTrend.add(user1infoResp.timings.duration)

      // error request 
      const user1errorResp = responses['user1_error'];
      check(user1errorResp, {
        'status is 200': (r) => r.status === 200,
      }) || user1errorErrorRate.add(1);

      user1errorTrend.add(user1errorResp.timings.duration)

      // warn
      const user1warnResp = responses['user1_warn'];
      check(user1warnResp, {
        'status is 200': (r) => r.status === 200,
      }) || user1warnErrorRate.add(1);

      user1warnTrend.add(user1warnResp.timings.duration)


      // fatal
      const user1fatalResp = responses['user1_fatal'];
      check(user1fatalResp, {
        'status is 200': (r) => r.status === 200,
      }) || user1fatalErrorRate.add(1);

      user1fatalTrend.add(user1fatalResp.timings.duration)

      // debug
      const user1debugResp = responses['user1_debug'];
      check(user1debugResp, {
        'status is 200': (r) => r.status === 200,
      }) || user1debugErrorRate.add(1);

      user1debugTrend.add(user1debugResp.timings.duration)






       // user 2 request all endpoints
       const user2infoResp = responses['user2_info'];
       check(user2infoResp, {
         'status is 200': (r) => r.status === 200,
       }) || user2infoErrorRate.add(1);
 
       user2infoTrend.add(user2infoResp.timings.duration)
 
       // error request 
       const user2errorResp = responses['user2_error'];
       check(user2errorResp, {
         'status is 200': (r) => r.status === 200,
       }) || user2errorErrorRate.add(1);
 
       user2errorTrend.add(user2errorResp.timings.duration)
 
       // warn
       const user2warnResp = responses['user2_warn'];
       check(user2warnResp, {
         'status is 200': (r) => r.status === 200,
       }) || user2warnErrorRate.add(1);
 
       user2warnTrend.add(user2warnResp.timings.duration)
 
 
       // fatal
       const user2fatalResp = responses['user2_fatal'];
       check(user2fatalResp, {
         'status is 200': (r) => r.status === 200,
       }) || user2fatalErrorRate.add(1);
 
       user2fatalTrend.add(user2fatalResp.timings.duration)
 
       // debug
       const user2debugResp = responses['user2_debug'];
       check(user2debugResp, {
         'status is 200': (r) => r.status === 200,
       }) || user2debugErrorRate.add(1);
 
       user2debugTrend.add(user2debugResp.timings.duration)
 
 
    sleep(1);
}
