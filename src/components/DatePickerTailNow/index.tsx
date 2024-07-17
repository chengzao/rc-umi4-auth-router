import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import './index.less';

const tillNowConfig = {
  text: '至今',
};

export const DatePickerTillNow = (props: any) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    if (props?.value) {
      if (!dayjs.isDayjs(props.value)) {
        throw new Error('value is not dayjs');
      }
      if (props.value.tillNow) {
        return tillNowConfig.text;
      }
      const format = props.format || 'YYYY-MM-DD';
      return dayjs(props.value).format(format);
    }
    return undefined;
  }, [props?.value]);

  const handleChange = (value: dayjs.Dayjs) => {
    if (value) {
      (value as any).tillNow = undefined;
    }
    props?.onChange(value);
    setOpen(false);
  };

  const handleToday = () => {
    const day = dayjs() as any;
    day.tillNow = true;
    Promise.resolve()
      .then(() => {
        props?.onChange(day);
      })
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <div className="dp-till-now">
      <DatePicker
        {...props}
        showNow={false}
        onChange={handleChange}
        open={open}
        onOpenChange={setOpen}
        renderExtraFooter={() => (
          <div className="till-now-footer" style={{ textAlign: 'center' }}>
            <Button type="link" onClick={handleToday}>
              {tillNowConfig.text}
            </Button>
          </div>
        )}
      />
      <Input placeholder="结束日期" value={value} className="till-now-input" />
    </div>
  );
};

export const ExampleDatePicker = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const date = dayjs() as any;
    date.tillNow = true;
    form.setFieldValue('date', date);
  }, []);

  const handleClick = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };

  return (
    <Form form={form} labelCol={{ span: 5 }}>
      <Form.Item
        name="date"
        label="日期选择"
        rules={[{ required: true, message: 'Please select your date!' }]}
      >
        <DatePickerTillNow />
      </Form.Item>
      <Button onClick={handleClick}>提交</Button>
    </Form>
  );
};
