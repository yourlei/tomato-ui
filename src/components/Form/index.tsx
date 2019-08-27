import React from "react";
import { Form, Input, Button } from "antd";
import { WrappedFormUtils } from "antd/es/form/Form";

export interface FormUtil {
    form?: WrappedFormUtils;
}

const FormItem = Form.Item;