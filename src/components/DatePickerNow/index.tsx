import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useState } from 'react';

const tillNowConfig = {
  text: '至今',
};

const CustomInput = forwardRef((props: any, ref: any) => {
  return <Input {...props} value={props.value} ref={ref} />;
});

const DatePickerNow = (props: any) => {
  const [date, setDate] = useState<any>(
    dayjs(props.value).format('YYYY-MM-DD'),
  );

  const [open, setOpen] = useState(false);

  const handleChange = (value: dayjs.Dayjs) => {
    console.log('change', value);
    if (value) {
      setDate(dayjs(value).format('YYYY-MM-DD'));
    } else {
      setDate(undefined);
    }
    props?.onChange(value);
  };

  const handleClickSoFar = () => {
    const day = dayjs() as any;
    setDate(tillNowConfig.text);
    props?.onChange(day);
    setTimeout(() => {
      setOpen(false);
    }, 0);
  };

  return (
    <div>
      <DatePicker
        {...props}
        showNow={false}
        onChange={handleChange}
        open={open}
        onOpenChange={setOpen}
        components={{
          input: forwardRef((props, ref) => {
            return (
              <CustomInput
                {...props}
                value={date}
                ref={ref}
                placeholder="结束日期"
              />
            );
          }),
        }}
        renderExtraFooter={() => (
          <div className="till-now-footer" style={{ textAlign: 'center' }}>
            <Button type="link" onClick={handleClickSoFar}>
              {tillNowConfig.text}
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export const ExampleDatePicker2 = () => {
  const [form] = Form.useForm();

  const handleClick = () => {
    const values = form.getFieldsValue();
    if (values?.date) {
      console.log('submit values', values);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      initialValues={{ name: 'test', date: dayjs('2012-12-31') }}
    >
      <Form.Item name="date" label="日期选择">
        <DatePickerNow />
      </Form.Item>
      <Form.Item name="name">
        <Input></Input>
      </Form.Item>
      <Button onClick={handleClick}>提交</Button>
    </Form>
  );
};
