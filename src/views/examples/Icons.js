import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
 
  Input,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import * as XLSX from "xlsx";
import { getHistory } from "../../firebase/Database";
import useAuth from "../../firebase/Auth/StatusLogin";
import { LogoutSession } from "../../firebase/Auth/Authentication";

const Icons = () => {
  const { userDetails } = useAuth();

  // Example data for the table
  const [data,setData] = useState([
    {
      name: "Device 1",
      temperature: 25,
      timeIn: "10:00",
      timeOut: "17:00",
      date: "2024-04-11",
    },
    {
      name: "Device 2",
      temperature: 26,
      timeIn: "11:00",
      timeOut: "18:00",
      date: "2024-04-18",
    },
    {
      name: "Device 3",
      temperature: 24,
      timeIn: "12:00",
      timeOut: "19:00",
      date: "2024-05-02",
    },
    // Add more data as needed
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("daily");
  const tableRef = useRef(null);

  const filterNoMatchData = (dummyData) => {
    const filteredData = Object.entries(dummyData).reduce((acc, [date, data]) => {
        const filtered = Object.keys(data).reduce((obj, key) => {
            if (key !== "No match detected") {
                obj[key] = data[key];
            }
            return obj;
        }, {});
        acc[date] = filtered;
        return acc;
    }, {});

    const transformedData = [];

    for (const [date, devices] of Object.entries(filteredData)) {
        for (const [deviceName, deviceData] of Object.entries(devices)) {
            const { "Time In": timeIn, "Time Out": timeOut, temp } = deviceData;
            transformedData.push({
                name: deviceName,
                temperature: temp || "N/A",
                timeIn: timeIn || "N/A",
                timeOut: timeOut || "N/A",
                date: date,
            });
        }
    }

    return transformedData;
  };

  React.useEffect(()=>{

    if (userDetails.name === null){
      LogoutSession()
    }

    getHistory()
    .then(data=>{

      setData(filterNoMatchData(data).filter(data=>data.name === userDetails.name))
      setFilteredData(filterNoMatchData(data).filter(data=>data.name === userDetails.name))
    
    }).catch(error=>console.log(error))

  },[userDetails.name])


  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
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
      const timeInMatch = device.timeIn.includes(term);
      const timeOutMatch = device.timeOut.includes(term);
      const temperatureMatch = device.temperature.toString().includes(term);
      return (
        nameMatch || dateMatch || timeInMatch || timeOutMatch || temperatureMatch
      );
    });
    setFilteredData(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filteredData];
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
                        <th>Temperature (°C)</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((device, index) => (
                        <tr key={index}>
                          <td>{device.temperature}</td>
                          <td>{device.timeIn}</td>
                          <td>{device.timeOut}</td>
                          <td>{device.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <br />
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
