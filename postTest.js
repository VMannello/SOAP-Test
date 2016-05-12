const http = require('http');

var variableReqs = {};
variableReqs.clockIn = {
    'body': '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ClockIn xmlns="http://tempuri.org/"><EmployeeID>10013</EmployeeID><Password>VMannello85</Password><StationID>1094</StationID></ClockIn></s:Body></s:Envelope>',
    'SOAPAction': '"http://tempuri.org/ISSLIPService/ClockIn"'
};

variableReqs.clockOut = {
    'body': '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ClockOut xmlns="http://tempuri.org/"><EmployeeID>10013</EmployeeID><Password>VMannello85</Password></ClockOut></s:Body></s:Envelope>',
    'SOAPAction': '"http://tempuri.org/ISSLIPService/ClockOut"'
};

variableReqs.lunchIn = {
    'body': '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ClockOnDetail xmlns="http://tempuri.org/"><EmployeeID>10013</EmployeeID><Password>VMannello85</Password><LineItemID>-1</LineItemID><StatusID>203</StatusID><PartID>-1</PartID></ClockOnDetail></s:Body></s:Envelope>',
    'SOAPAction': '"http://tempuri.org/ISSLIPService/ClockOnDetail"'
};

variableReqs.lunchOut = {
    'body': '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ClockOnDetail xmlns="http://tempuri.org/"><EmployeeID>10013</EmployeeID><Password>VMannello85</Password><LineItemID>-1</LineItemID><StatusID>1094</StatusID><PartID>-1</PartID></ClockOnDetail></s:Body></s:Envelope>',
    'SOAPAction': '"http://tempuri.org/ISSLIPService/ClockOnDetail"'
};

function makePost(details) {
    var postRequest = {
        host: "192.168.1.6",
        path: "/productionterminal/SSLIPService.svc",
        port: 80,
        method: "POST",
        headers: {
            'Referer': 'http://192.168.1.6/productionterminal/ClientBin/NewProductionTerminalSilverlight.xap',
            'Accept-Encoding': 'identity',
            'Content-Type': 'text/xml; charset=utf-8',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Accept-Language': 'en-us',
            'SOAPAction': details.SOAPAction,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:44.0) Gecko/20100101 Firefox/44.0',
            'Content-Length': Buffer.byteLength(details.body)
        }
    };

    var buffer = "";

    var req = http.request(postRequest, function(res) {

        console.log(res.statusCode);
        var buffer = "";
        res.on("data", function(data) {
            buffer = buffer + data;
        });
        res.on("end", function(data) {
            console.log(buffer);
        });

    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(details.body);
    req.end();
}

switch (process.argv[2]) {
    case 'clockIn':
      makePost(variableReqs.clockIn);
    break;

    case 'clockOut':
      makePost(variableReqs.clockOut);
    break;

    case 'lunchIn':
      makePost(variableReqs.lunchIn);
    break;

    case 'lunchOut':
      makePost(variableReqs.lunchOut);
    break;

    default:
      process.exit();
    break;
}
