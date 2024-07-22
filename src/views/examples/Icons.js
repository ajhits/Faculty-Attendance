import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  // Col,
  Input,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import * as XLSX from "xlsx";
import { getHistory } from "../../firebase/Database";


// TABLES ======================================================================= //
const Icons = () => {


  // const [dummyData] = useState({
  //   "April 14 2024": {
  //     "Art lisboa": {
  //       "Time In": "01:38 AM",
  //       "Time Out": "01:36 AM",
  //       "temp": "27.77"
  //     },
  //     "No match detected": {
  //       "-NvNM64t2MigaMtA_5ts": {
  //         "Time In": "12:48 AM"
  //       },
  //       "-NvNM66c7g6F-syHHLNM": {
  //         "temp": "27.8"
  //       },
  //       "-NvNP0kmgCd2tumb4ZZe": {
  //         "Time In": "01:01 AM"
  //       },
  //       "-NvNP0rKxC8AwUJxUAkk": {
  //         "temp": "27.8"
  //       },
  //       "-NvNPMSl-OFf_j__0pgc": {
  //         "Time In": "01:02 AM"
  //       },
  //       "-NvNPMXBzVR4WEDj1-Vr": {
  //         "temp": "27.8"
  //       },
  //       "-NvNUGU3CtL7cPxtah_L": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUGWnqCHG07iE1x5a": {
  //         "temp": "29.05"
  //       },
  //       "-NvNUL8RmHY4x9r6W6OP": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNULAL24fqz7Bw2Uld": {
  //         "temp": "28.85"
  //       },
  //       "-NvNUMc7b6pJ4W3sAX_n": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUMf-pZwNNXlKVM0L": {
  //         "temp": "29.05"
  //       },
  //       "-NvNUNOd_4eARedJjFTP": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUNRU-9cwDPVndz6N": {
  //         "temp": "28.77"
  //       },
  //       "-NvNUNW_BA53zmZVME2z": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUN_NnGBq9QK_alF1": {
  //         "temp": "28.77"
  //       },
  //       "-NvNUOnQAaIsdREmpT3J": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUOqqCjtffVt29ebV": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUR6q3J92ySGtO7km": {
  //         "Time In": "01:25 AM"
  //       },
  //       "-NvNURA4DdoQh3LeasIx": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUT2olJFdsiU7ORtl": {
  //         "Time In": "01:25 AM"
  //       },
  //       "-NvNUT5GnLXTWcxsSA_S": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUfznin-FIJaig6Xo": {
  //         "Time Out": "01:26 AM"
  //       },
  //       "-NvNVBnobSw_qw12DbdS": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVBtiLGBtKzyfP3lw": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVC2JlPwQXg3FXaql": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVC8epSMQ9vGHvM8Y": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVD1t_Qxp6KRPW9kw": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVD5iQQHrBLtcrEb5": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVDCRHlwKjwe548pg": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVDDcWsIJsNuvRA7n": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVDG4nhKpEqTFtztC": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVDH_uc7xirBnmooT": {
  //         "temp": "27.83"
  //       },
  //       "-NvNW9f3LDgWob5E6lvG": {
  //         "Time Out": "01:32 AM"
  //       },
  //       "-NvNWFVoKPdX5bSu4gAa": {
  //         "Time Out": "01:33 AM"
  //       },
  //       "-NvNWUtAsDorQCKAO2KB": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWV8xEAYAKH9ky2vW": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWVcxdp5avsJF5dTt": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWvx8Sj3o8UGLtYJ9": {
  //         "Time Out": "01:35 AM"
  //       }
  //     }
  //   },
  //   "April 12 2024": {
  //     "Art lisboa": {
  //       "Time In": "01:38 AM",
  //       "Time Out": "01:36 AM",
  //       "temp": "27.77"
  //     },
  //     "No match detected": {
  //       "-NvNM64t2MigaMtA_5ts": {
  //         "Time In": "12:48 AM"
  //       },
  //       "-NvNM66c7g6F-syHHLNM": {
  //         "temp": "27.8"
  //       },
  //       "-NvNP0kmgCd2tumb4ZZe": {
  //         "Time In": "01:01 AM"
  //       },
  //       "-NvNP0rKxC8AwUJxUAkk": {
  //         "temp": "27.8"
  //       },
  //       "-NvNPMSl-OFf_j__0pgc": {
  //         "Time In": "01:02 AM"
  //       },
  //       "-NvNPMXBzVR4WEDj1-Vr": {
  //         "temp": "27.8"
  //       },
  //       "-NvNUGU3CtL7cPxtah_L": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUGWnqCHG07iE1x5a": {
  //         "temp": "29.05"
  //       },
  //       "-NvNUL8RmHY4x9r6W6OP": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNULAL24fqz7Bw2Uld": {
  //         "temp": "28.85"
  //       },
  //       "-NvNUMc7b6pJ4W3sAX_n": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUMf-pZwNNXlKVM0L": {
  //         "temp": "29.05"
  //       },
  //       "-NvNUNOd_4eARedJjFTP": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUNRU-9cwDPVndz6N": {
  //         "temp": "28.77"
  //       },
  //       "-NvNUNW_BA53zmZVME2z": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUN_NnGBq9QK_alF1": {
  //         "temp": "28.77"
  //       },
  //       "-NvNUOnQAaIsdREmpT3J": {
  //         "Time In": "01:24 AM"
  //       },
  //       "-NvNUOqqCjtffVt29ebV": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUR6q3J92ySGtO7km": {
  //         "Time In": "01:25 AM"
  //       },
  //       "-NvNURA4DdoQh3LeasIx": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUT2olJFdsiU7ORtl": {
  //         "Time In": "01:25 AM"
  //       },
  //       "-NvNUT5GnLXTWcxsSA_S": {
  //         "temp": "28.71"
  //       },
  //       "-NvNUfznin-FIJaig6Xo": {
  //         "Time Out": "01:26 AM"
  //       },
  //       "-NvNVBnobSw_qw12DbdS": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVBtiLGBtKzyfP3lw": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVC2JlPwQXg3FXaql": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVC8epSMQ9vGHvM8Y": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVD1t_Qxp6KRPW9kw": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVD5iQQHrBLtcrEb5": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVDCRHlwKjwe548pg": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVDDcWsIJsNuvRA7n": {
  //         "Time In": "01:28 AM"
  //       },
  //       "-NvNVDG4nhKpEqTFtztC": {
  //         "temp": "27.83"
  //       },
  //       "-NvNVDH_uc7xirBnmooT": {
  //         "temp": "27.83"
  //       },
  //       "-NvNW9f3LDgWob5E6lvG": {
  //         "Time Out": "01:32 AM"
  //       },
  //       "-NvNWFVoKPdX5bSu4gAa": {
  //         "Time Out": "01:33 AM"
  //       },
  //       "-NvNWUtAsDorQCKAO2KB": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWV8xEAYAKH9ky2vW": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWVcxdp5avsJF5dTt": {
  //         "Time Out": "01:34 AM"
  //       },
  //       "-NvNWvx8Sj3o8UGLtYJ9": {
  //         "Time Out": "01:35 AM"
  //       }
  //     }
  //   }
  // })


  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("daily");
  const tableRef = useRef(null);

  // Example data for the table
const [data,setData] = useState([
  {
    name: "Device 1",
    temp: 25,
    timeIn: "10:00",
    timeOut: "17:00",
    date: "April 11 2024",
  },
  {
    name: "Device 2",
    temperature: 26,
    timeIn: "11:00",
    timeOut: "18:00",
    date: "April 12 2024",
  },
  {
    name: "Device 3",
    temperature: 24,
    timeIn: "12:00",
    timeOut: "19:00",
    date: "January 13 2024",
  },
  // Add more data as needed
]);
const [filteredData, setFilteredData] = useState([]);

  const filterNoMatchData = (dummyData) => {

    const transformedData = [];

    for (const [date, devices] of Object.entries(dummyData)) {


        for (const [key, deviceData] of Object.entries(devices)) {

            const { data,name,temp,time } = deviceData;
            transformedData.push({
                key: key,
                name: name,
                temperature: temp || "N/A",
                status: data || "N/A",
                time: time || "N/A",
                date: date,
            });
        }
    }

    return transformedData;
  };


  React.useEffect(()=>{

    getHistory()
    .then(data=>{
      setData(filterNoMatchData(data))
      setFilteredData(filterNoMatchData(data))
    }).catch(error=>console.log(error))

  },[])

  
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      filterData(searchTerm);
    }
  };

  const filterData = (term) => {


    const filtered = data.filter((device) => {



      const nameMatch = device.name.toLowerCase().includes(term);
      const dateMatch = device.date.includes(term);
      const status = device.status.toLowerCase().includes(term);
      const temperatureMatch = device.temperature.toString().toLowerCase().includes(term);
      return (
        nameMatch || dateMatch || status || temperatureMatch
      );
    });


    setFilteredData(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...data];
    const currentDate = new Date(); // Get current date
  
    switch (option) {
      case "daily":
        // Filter by current date
        sorted = sorted.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate.getDate() === currentDate.getDate() &&
                 itemDate.getMonth() === currentDate.getMonth() &&
                 itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case "weekly":
        // Filter by current week
        const currentWeekNumber = getWeekNumber(currentDate);
        sorted = sorted.filter(item => {
          const itemWeekNumber = getWeekNumber(new Date(item.date));
          return itemWeekNumber === currentWeekNumber;
        });
        break;
      case "monthly":
        // Filter by current month
        const currentMonth = currentDate.getMonth();
        sorted = sorted.filter(item => {
          const itemMonth = new Date(item.date).getMonth();
          return itemMonth === currentMonth;
        });
        break;

      default:
        break;
    }
    
    // After filtering, sort the filtered data
    switch (option) {
      case "daily":
        sorted.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
        break;
      case "weekly":
        sorted.sort((a, b) => {
          const weekA = getWeekNumber(a.date);
          const weekB = getWeekNumber(b.date);
          return weekA - weekB;
        });
        break;
      case "monthly":
        sorted.sort((a, b) => {
          const monthA = new Date(a.date).getDate();
          const monthB = new Date(b.date).getDate();
          return monthA - monthB;
        });
        break;
        case "all":
          sorted = data
        break;
      default:
        break;
    }
  
    setFilteredData(sorted);
  };
  

  const getWeekNumber = (dateString) => {
    const date = new Date(dateString);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    return result;
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Entry Logs</h3>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <Input
                    type="text"
                    placeholder="Search by name, date, time, or temperature"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="daily">Sort by Daily</option>
                    <option value="weekly">Sort by Weekly</option>
                    <option value="monthly">Sort by Monthly</option>
                    <option value="all">clear</option>
                  </select>
                </div>
   
                <div className="table-responsive">
                  <table ref={tableRef} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Temperature (°C)</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((device, index) => (
                        <tr key={index}>
                          <td>{device.name}</td>
                          <td>{device.temperature}</td>
                          <td>{device.status}</td>
                          <td>{device.time}</td>
                          <td>{device.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <br/>
                <Button color="success" onClick={handleDownloadExcel}>
                  Download as Excel
                </Button>

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
