import React, { useState } from "react";
import { Table, Button, Flex, Typography, Card, Divider, Row, Col, Alert } from "antd";
import { DownOutlined, ExportOutlined, RightOutlined } from "@ant-design/icons";
import { formatNumberWithCommas, warningsList, type Order } from "../constants/mockData";
import { columns } from "./tableColumns";
const { Link, Text } = Typography;

interface OrdersTableProps {
  data: Order[];
}
const cardProps = {
  style: { margin: 0, padding: 5 },
  bodyStyle: { padding: 10, },
}
const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: Order) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
    } else {
      setExpandedRowKeys([]);
    }
  };
  const customExpandIcon = (props: any) => {
    return props.expanded ? (
      <DownOutlined onClick={(e) => props.onExpand(props.record, e)} />
    ) : (
      <RightOutlined onClick={(e) => props.onExpand(props.record, e)} />
    );
  };

  return (
    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record: Order) => (
          <Card
            {...cardProps}
          >
            <Flex justify="space-between" align="start" wrap="wrap" style={{ marginBottom: 10 }}>
              <div>
                <Link strong>
                  {record.accountHolderName} {record?.marginAccount}
                </Link>
                <Button
                  variant="outlined" color='primary' style={{ marginLeft: 10, borderRadius: 30 }}
                  icon={<ExportOutlined />}
                >
                  Full review details
                </Button>
              </div>
              <div>
                <Button type="primary" style={{ marginRight: 10, borderRadius: 30 }}>
                  Accept
                </Button>
                <Button danger style={{ borderRadius: 30 }}>Reject</Button>
              </div>
            </Flex>
            <Divider />
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                Net Amount: <Text strong>{formatNumberWithCommas(record.netAmount)} USD</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                Price: <Text strong>{record.price.toFixed(2)}</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                Exchange Rate: <Text strong>{record.exchangeRate}</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                O/S Limit: <Text strong>{record.osLimit}</Text>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                Reference Number: <Text strong>{record.referenceNo}</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                Date/Time: <Text strong>{record.date}</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                Telephone: <Text strong>{record.telephone}</Text>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                User ID: <Text strong>{record.userId}</Text>
              </Col>
            </Row>
            <Alert
              style={{ marginTop: 10 }}
              message={
                <>
                  <b>Warnings:</b>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    {warningsList.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </>
              }
              type="warning"
            />
          </Card>
        ),
        expandIcon: customExpandIcon,
        onExpand: (expanded, record) => {
          handleExpand(expanded, record);
        },
        expandedRowKeys: expandedRowKeys,
      }}
      scroll={{ x: true }}
    />
  );
};

export default OrdersTable;
