import http from 'k6/http'
import {sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';


export let options = {
    stages: [
        { duration: '20s', target: 10000}, // dari 0 virutalUser/second ke  4 virtualUser/second selama 30 detik
        // { duration: '3s', target: 10}, 
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% request harus kurang dari 1s
    },
}


export default () => {
    const params = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbnRhbmciLCJpYXQiOjE3MTUxNTUzOTksImV4cCI6MTcxNTI0MTc5OSwic3ViIjoiNWJlMmE3MDctYjdlOC00OGM0LTg4YmQtNGRmOGI4ZDVkY2IzIn0.-Uv7w9nJEu3XV_zPad0n_kj0BoihMtOCPd5Ktk7GOlSibqtGMnlPCvUkn0WdxDOF5tnBWwyCYrYvr1o52SUEMA'
        },
    }

    // const res = http.get("http://localhost:8888/api/v1/containers", params)
    // check(res, {'200': (r) => r.status === 200})

    // const res = http.get("http://localhost:8888/api/v1/containers/1jiuksazvn71upjttxisun1fv", params)
    // check(res, {'200': (r) => r.status === 200})
    
    const res = http.get("http://localhost:3001/users?id=f0a87a58-b2cb-445b-a8a0-66208ffb5b5b")
    check(res, {'200': (r) => r.status === 200})



    sleep(1);
}