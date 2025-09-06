import type { ColumnsType } from "antd/es/table";
import type { Order } from "../constants/mockData";
import { Avatar, Button, Typography } from "antd";
import dayjs from "dayjs";
import { EllipsisOutlined } from "@ant-design/icons";
import waitingIcon from '../assets/waiting-icon.png';

const { Link } = Typography;

export const columns: ColumnsType<Order> = [
  {
    title: "Account",
    dataIndex: "account",
    key: "account",
    render: (_, record) => <Link>{record.account}</Link>,
    sorter: (a, b) => a.account.localeCompare(b.account),
  },
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    sorter: (a, b) => a.operation.localeCompare(b.operation),
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    sorter: (a, b) => a.symbol.localeCompare(b.symbol),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    responsive: ["md"],
  },
  {
    title: "Qty.",
    dataIndex: "qty",
    key: "qty",
    responsive: ["md"],
    sorter: (a, b) => a.qty - b.qty,
  },
  {
    title: "Filled Qty",
    dataIndex: "filledQty",
    key: "filledQty",
    responsive: ["md"],
    sorter: (a, b) => a.filledQty - b.filledQty,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    responsive: ["md"],
    render: (text) => <span>{text.toFixed(2)}</span>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <> <Button shape="circle" color="primary" size="small" icon={<Avatar size={16} src={waitingIcon} />} /> {text}</>,
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    responsive: ["md"],
    render: (text) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    sorter: (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: "Expiration",
    dataIndex: "expiredDate",
    key: "expiredDate",
    responsive: ["md"],
    render: (text) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    sorter: (a, b) =>
      new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime(),
  },
  {
    title: "No. Ref.",
    dataIndex: "referenceNo",
    key: "referenceNo",
    responsive: ["md"],
    sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo),
  },
  {
    title: "Ext. Ref.",
    dataIndex: "extRefNumber",
    key: "extRefNumber",
    responsive: ["md"],
    sorter: (a, b) => a.extRefNumber.localeCompare(b.extRefNumber),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (_) => <Button size="small" color="primary" style={{ borderRadius: 20, backgroundColor: '#e4edf7ff' }} icon={<EllipsisOutlined />} />,
    responsive: ["md"],
  },
];
