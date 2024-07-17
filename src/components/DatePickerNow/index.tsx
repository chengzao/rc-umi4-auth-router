import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputRef,
} from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useState } from 'react';

const tillNowConfig = {
  text: '至今',
};

type CustomInputProps = React.ComponentProps<typeof Input>;

const CustomInput = forwardRef<InputRef, CustomInputProps>((props, ref) => {
  return (
    <Input
      {...props}
      value={props.value}
      ref={ref}
      style={{ cursor: 'pointer', border: 'none' }}
    />
  );
});

const DatePickerNow = (props: DatePickerProps) => {
  const [date, setDate] = useState<any>(
    dayjs(props.value).format('YYYY-MM-DD'),
  );

  const [open, setOpen] = useState(false);

  const handleChange = (value: dayjs.Dayjs) => {
    const day = value ? dayjs(value).format('YYYY-MM-DD') : undefined;
    setDate(day);

    if (props?.onChange) {
      props.onChange(value, day || '');
    }
  };

  const handleClickSoFar = () => {
    const day = dayjs();
    setDate(tillNowConfig.text);
    if (props?.onChange) {
      props.onChange(day, tillNowConfig.text);
    }

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
    console.log('submit values', values);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      initialValues={{ name: 'test', date: dayjs('2012-12-31') }}
    >
      <Form.Item
        name="date"
        label="日期选择"
        rules={[{ required: true, message: 'Please select your date!' }]}
      >
        <DatePickerNow />
      </Form.Item>
      <Button onClick={handleClick}>提交</Button>
    </Form>
  );
};
