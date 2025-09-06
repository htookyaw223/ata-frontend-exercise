import React, { useState } from "react";
import { Form, Button, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface SearchFormProps {
  onSearch: (values: any) => void;
  onReset: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onReset }) => {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const disabledEndDate = (current: Dayjs) => {
    if (!startDate) return false;
    return current.isBefore(startDate, "day");
  };

  return (
    <Form layout="inline" form={form} onFinish={onSearch} requiredMark={false}>
      <Form.Item name="period" label="Period" initialValue="Transmission">
        <Select style={{ width: 150 }}>
          <Select.Option value="Transmission">Transmission</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Status" initialValue="Waiting">
        <Select style={{ width: 150 }}>
          <Select.Option value="Waiting">Waiting</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="startDate" label="From" rules={[{ required: true, message: 'Please select start date' }]}>
        <DatePicker placeholder="Select start date" format={'YYYY/MM/DD'} onChange={(date) => setStartDate(date)} style={{ width: 150 }} />
      </Form.Item>

      <Form.Item name="endDate" label="To" rules={[{ required: true, message: 'Please select end date' }]}>
        <DatePicker placeholder="Select end date" disabledDate={disabledEndDate} style={{ width: 150 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ borderRadius: 30 }}>
          Search
        </Button>
        {
          form.isFieldsTouched() &&
          <Button
            onClick={() => {
              form.resetFields();
              setStartDate(null);
              onReset();
            }}
            style={{ marginLeft: 8, borderRadius: 30 }}
          >
            Reset
          </Button>
        }
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
