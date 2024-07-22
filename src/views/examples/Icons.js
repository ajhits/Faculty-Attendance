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
    const transformedData = [];
  
    // Transforming the data
    for (const [date, devices] of Object.entries(dummyData)) {
        for (const [key, deviceData] of Object.entries(devices)) {
            const { data, name, temp, time } = deviceData;
            transformedData.push({
                key: key,
                name: name,
                temperature: temp || "N/A",
                status: data || "N/A",
                time: time || "N/A",
                date: new Date(date), // Convert date string to Date object
            });
        }
    }
  
    // Example filtering: Filter out entries with 'N/A' in time field
    const filteredData = transformedData.filter(item => item.time !== "N/A");
  
    // Example sorting: Sort by date (descending) and time (descending)
    filteredData.sort((a, b) => {
        // Compare dates (descending order)
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
  
        // If dates are the same, compare times (descending order)
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
  
        return 0;
    });
  
    return filteredData.map(item => ({
        ...item,
        // Format date as "Month Day, Year" (e.g., "July 22, 2024")
        date: item.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }));
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
