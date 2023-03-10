import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { Form, Input, Rate } from "antd";
import { EvaluationCartComponet } from "../../components";
import { toast } from "react-toastify";

function EvaluationTab(props: {
  productId: string;
  isAuthenticated: boolean;
  setAddEvaluationSuccess: any;
}) {
  const [dataAllEvaluation, setDataAllEvaluation] = useState<any>([]);
  const [dataUserEvaluation, setDataUserEvaluation] = useState<any>([]);
  const [postEvaluationSucceed, setPostEvaluationSucceed] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props?.isAuthenticated) {
          const userEvaluation = await axiosConfig.get(
            `${process.env.REACT_APP_API_URL}evaluation/${props?.productId}`
          );
          setDataUserEvaluation(userEvaluation?.data);
        }
        const allEvaluation = await axios.get(
          `${process.env.REACT_APP_API_URL}evaluation/all/${props?.productId}`
        );
        setDataAllEvaluation(allEvaluation?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props?.productId, props?.isAuthenticated, postEvaluationSucceed]);

  const onFinish = async (values: any) => {
    if (dataUserEvaluation.length) {
      try {
        await axiosConfig.patch(
          `${process.env.REACT_APP_API_URL}evaluation/${dataUserEvaluation[0].id}`,
          {
            productId: parseInt(props?.productId),
            comment: values.comment,
            rating: values.rating,
          }
        );
        props?.setAddEvaluationSuccess();
        setPostEvaluationSucceed(!postEvaluationSucceed);
        toast.success("Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      await axiosConfig.post(`${process.env.REACT_APP_API_URL}evaluation`, {
        productId: parseInt(props?.productId),
        comment: values.comment,
        rating: values.rating,
      });
      props?.setAddEvaluationSuccess();
      setPostEvaluationSucceed(!postEvaluationSucceed);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  return (
    <div>
      <div className="flex">
        {props?.isAuthenticated && (
          <Form
            name="basic"
            onFinish={onFinish}
            className="flex flex-col"
            initialValues={{
              rating: 5,
            }}
          >
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please select star" }]}
            >
              <Rate allowHalf />
            </Form.Item>
            <Form.Item
              label="Evaluation"
              name="comment"
              rules={[
                { required: true, message: "Please input your evaluation!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </Form.Item>
          </Form>
        )}
      </div>
      <div className="max-h-[500px] overflow-y-scroll">
        {dataAllEvaluation.map((element: any, index: number) => {
          return <EvaluationCartComponet key={index} data={element} />;
        })}
      </div>
    </div>
  );
}

export default EvaluationTab;
