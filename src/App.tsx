import React from "react";
import { Flex, Typography } from "antd";
import SearchForm from "./components/SearchForm";
import OrdersTable from "./components/OrdersTable";
import { useOrders } from "./hooks/useOrders";

const { Text } = Typography;

const App: React.FC = () => {
  const { filteredOrders, filterOrders } = useOrders();

  // handle search form submission
  const handleSearch = (values: any) => {
    filterOrders({
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };
  // reset search form
  const onReset = () => {
    filterOrders({});
  }

  return (
    <div style={{ padding: 20 }}>
      <Flex justify="space-between" align="center" wrap='wrap-reverse'>
        <div>
          <Text strong style={{ fontSize: 24 }}>
            Search
          </Text>
          <br />
          <Text type="secondary">Search results: </Text>
          <b>{filteredOrders.length}</b>
        </div>

        {/* filter search form */}
        <SearchForm onSearch={handleSearch} onReset={onReset} />
      </Flex>
      {/* orders table */}
      <OrdersTable data={filteredOrders} />
    </div>
  );
};

export default App;
