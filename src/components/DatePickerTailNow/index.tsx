import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

import './index.less';

const tillNowConfig = {
  text: '至今',
};

export const DatePickerTillNow = (props: any) => {
  console.log('props', props);

  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  /**
   * 若value有值，则判断是否是否有 tillNow 属性；
   * 若value无值，则返回undefined；
   */
  const value = useMemo(() => {
    console.log('props?.value::', props?.value);
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
      // 点击某个具体日期时，清除 tillNow 属性
      (value as any).tillNow = undefined;
    }

    props?.onChange(value);
    setOpen(false);
  };

  // 点击至今按钮
  const handleClickSoFar = () => {
    const day = dayjs() as any;
    day.tillNow = true; // 使用 tillNow 属性标记为「至今」
    if (ref.current) {
      console.log('ref.current', ref.current);
      (ref.current as any).blur();
    }
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
      <Input placeholder="结束日期" value={value} className="till-now-input" />
      <DatePicker
        {...props}
        showNow={false}
        onChange={handleChange}
        // ref={ref}
        open={open}
        onOpenChange={(o) => {
          console.log('open', o);
          setOpen(o);
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

export const ExampleDatePicker = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const dd = dayjs() as any;
    dd.tillNow = true;
    form.setFieldValue('date', dd);
  }, []);

  const handleClick = () => {
    const values = form.getFieldsValue();
    if (values?.date) {
      // 若有 tillNow 属性，则将其设置为接口需要的格式
      console.log('submit values', values, values.date);
      values.date = dayjs(
        values.date.tillNow ? '2099-12-31' : values.date,
      ).format('YYYY-MM-DD');
    }
    console.log(values);
  };

  return (
    <Form form={form} labelCol={{ span: 5 }}>
      <Form.Item name="date" label="日期选择">
        <DatePickerTillNow />
      </Form.Item>
      <Button onClick={handleClick}>提交</Button>
    </Form>
  );
};
