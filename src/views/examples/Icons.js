import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import * as XLSX from "xlsx";

const Icons = () => {
  // Example data for the table
  const [data] = useState([
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
    switch (option) {
      case "daily":
        sorted.sort((a, b) => (a.date > b.date ? 1 : -1));
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
          const monthA = new Date(a.date).getMonth();
          const monthB = new Date(b.date).getMonth();
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
                  </select>
                </div>
                <Button color="success" onClick={handleDownloadExcel}>
                  Download as Excel
                </Button>
                <div className="table-responsive">
                  <table ref={tableRef} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Temperature (°C)</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((device, index) => (
                        <tr key={index}>
                          <td>{device.name}</td>
                          <td>{device.temperature}</td>
                          <td>{device.timeIn}</td>
                          <td>{device.timeOut}</td>
                          <td>{device.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
