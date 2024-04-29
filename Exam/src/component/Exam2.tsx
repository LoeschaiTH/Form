import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Space,
  Table,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import i18n from "../i18n";

const Page2: React.FC = () => {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const { Option } = Select;
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const [value, setValue] = useState(1);
  const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);

  type TableRowSelection<T> = TableProps<T>["rowSelection"];

  interface DataType {
    key: React.ReactNode;
    name: string;
    sex: string;
    phoneNumber: string;
    nationality: string;
    children?: DataType[];
    description?: string; // เพิ่ม description เข้าไป
    prefix?: string; // เพิ่ม prefix เข้าไป
    showChildren?: boolean;
    idCard : string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "เพศ",
      dataIndex: "sex",
      key: "sex",
      width: "12%",
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "phoneNumber",
      width: "30%",
      key: "phoneNumber",
    },
    {
      title: "สัญชาติ",
      dataIndex: "nationality",
      width: "10%",
      key: "nationality",
    },
    {
      title: "รายละเอียด",
      dataIndex: "description",
      width: "30%",
      key: "description",
      render: (_, record) => (
        <div>
          {record.description || (
            <div>
              <div>{`(${record.prefix})`}  {record.phoneNumber}</div>
              <div>เพศ {record.sex}</div>
              <div>รหัสบัตรประชาชน {record.idCard}</div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "จัดการ",
      dataIndex:"manage",
      width: "10%",
      key: "manage",
    },
  ];


  const handleSubmit = async () => {
    const formDataValues = await form.getFieldsValue();
    console.log("data",formDataValues)
    
    const idNumber = `${formDataValues.idNumberPart1}-${formDataValues.idNumberPart2}-${formDataValues.idNumberPart3}-${formDataValues.idNumberPart4}-${formDataValues.idNumberPart5}`;
    const newData: DataType = {
      key: tableData.length + 1,
      name: `${formDataValues.nameTitles} ${formDataValues.name} ${formDataValues.surname}`,
      sex: formDataValues.sex,
      phoneNumber: formDataValues.phoneNumber,
      nationality: formDataValues.nationality,
      description: formDataValues.description,
      prefix: formDataValues.prefix,
      idCard : idNumber
    };
    setTableData([...tableData, newData]);
  };
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  

  return (
    <div style={{ width: "100vw", height: "150vh" }}>
      <Select
        defaultValue="en"
        style={{ width: 80, marginLeft: "1900px", marginTop: "20px" }}
        onChange={changeLanguage}
      >
        <Option value="en">EN</Option>
        <Option value="th">TH</Option>
      </Select>
      <h2 style={{ marginLeft: "50px" }}>{t("form")}</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          form={form}
          onFinish={handleSubmit}
          style={{
            maxWidth: "1800px",
            maxHeight: "800px",
            border: "2px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <Space size={120} style={{ paddingTop: "50px" }}>
            <Form.Item
              label="คำนำหน้า"
              name="nameTitles"
              rules={[{ required: true, message: "Please input!" }]}
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 16 }}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: "10px",
              }}
            >
              <Select style={{ width: "120px" }}>
                <Select.Option value="นาย">{t("Mr")}</Select.Option>
                <Select.Option value="นาง">{t("Mrs")}</Select.Option>
                <Select.Option value="นางสาว">{t("Miss")}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="ชื่อ"
              name="name"
              rules={[{ required: true, message: "Please input!" }]}
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 16 }}
            >
              <Input style={{ width: "400px" }} />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="surname"
              rules={[{ required: true, message: "Please input!" }]}
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 16 }}
            >
              <Input style={{ width: "400px" }} />
            </Form.Item>
          </Space>

          <Space>
            <Form.Item
              label="วัดเกิด"
              name="date"
              rules={[{ required: true, message: "Please input!" }]}
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 15 }}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: "45px",
              }}
            >
              <DatePicker style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item
              label="สัญชาติ"
              name="nationality"
              rules={[{ required: true, message: "Please input!" }]}
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 16 }}
            >
              <Select style={{ width: "400px" }}>
                <Select.Option value="ไทย">ไทย</Select.Option>
                <Select.Option value="อังกฤษ">อังกฤษ</Select.Option>
              </Select>
            </Form.Item>
          </Space>

          <div>
            <Space>
              <Form.Item
                label="เลขประจำตัวประชาชน"
                name="idNumberPart1"
                rules={[
                  { required: false, message: "Please input ID number!" },
                ]}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginBottom: "50px",
                }}
                labelCol={{ span: 20 }}
              >
                <Input style={{ width: "80px" }} maxLength={1} />
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name="idNumberPart2"
                  style={{
                    paddingLeft: "50px",
                  }}
                >
                  <Input style={{ width: "150px" }} maxLength={4} />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name="idNumberPart3"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <Input style={{ width: "150px" }} maxLength={5} />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Form.Item name="idNumberPart4">
                  <Input style={{ width: "100px" }} maxLength={2} />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Form.Item name="idNumberPart5">
                  <Input style={{ width: "80px" }} maxLength={1} />
                </Form.Item>
              </Form.Item>
            </Space>
          </div>

          <Form.Item
            label="เพศ"
            name="sex"
            style={{ display: "flex", justifyContent: "start" }}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Radio.Group value={value} style={{ width: "500px" }}>
              <Radio value={"ชาย"}>ผู้ชาย</Radio>
              <Radio value={"หญิง"}>ผู้หญิง</Radio>
              <Radio value={"ไม่ระบุ"}>ไม่ระบุ</Radio>
            </Radio.Group>
          </Form.Item>

          <Space>
            <Form.Item
              label="หมายเลขโทรศัพท์"
              name="prefix"
              rules={[{ required: true, message: "Please select prefix!" }]}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: "50px",
              }}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
            >
              <Select style={{ width: "120px", marginLeft: "10px" }}>
                <Select.Option value="+66">+66</Select.Option>
                <Select.Option value="+1">+1</Select.Option>
                <Select.Option value="+44">+44</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input phone number !" },
              ]}
              style={{ width: "700px" }}
            >
              <Input
                style={{ width: "300px" }}
                placeholder="เบอร์โทรศัพท์"
                maxLength={10}
              />
            </Form.Item>
          </Space>

          <Form.Item
            label="หนังสือเดินทาง"
            name="passport"
            rules={[{ required: false }]}
            style={{
              display: "flex",
              justifyContent: "start",
              paddingLeft: "38px",
            }}
          >
            <Input
              style={{ width: "400px", margin: "8px" }}
              placeholder="หมายเลขหนังสือเดินทาง"
            />
          </Form.Item>

          <Space size={50}>
            <Form.Item
              label="เงินเดือนที่คาดหวัง"
              name="budget"
              rules={[{ required: true, message: "Please input budget !" }]}
              style={{ width: "700px" }}
            >
              <Input
                maxLength={10}
                style={{ width: "calc(100% - 90px)", marginLeft: "20px" }}
                placeholder="เงินเดือนที่คาดหวัง"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space size={30}>
                <Button type="primary" htmlType="reset">
                  ล้างข้อมูล
                </Button>
                <Button type="primary" htmlType="submit" >
                  ส่งข้อมูล
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <div
          style={{
            width: "1800px",
            height: "800px",
          }}
        >
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection, checkStrictly }}
            dataSource={tableData}
            style={{
              maxWidth: "1800px",
              maxHeight: "800px",
            }}
          />
        </div>
      </div>

      <Link to="/">{t("home")}</Link>
    </div>
  );
};

export default Page2;
