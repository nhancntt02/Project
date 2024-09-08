import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function TestFileUpload() {
    const {user} = useStateContext();
    const userId = localStorage.getItem('userId');

    const [img, setImg] = useState();

    const getFile = async () => {
        const response = await axiosClient.get(`/file/user/${userId}`);
        try{
            const image = await axiosClient.get(`/file/${response.data.file_name}`,{
                responseType: 'blob',
            });
            setImg(URL.createObjectURL(image.data));
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getFile();
    },[]);

    const uploadFile = async (value) => {
        const f = value.file;
        const fd = new FormData();
        fd.append('file', f);
        const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
        try{
            const res = axiosClient.post(`/file/${user.id}`,fd,config);
            getFile();
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            {img ? 
                <img src={img} alt="uploaded image"/>
                :
                <p>No image uploaded</p>
            }
            <Formik
                initialValues={{
                    file: null,
                }}
                onSubmit={uploadFile}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => {
                                setFieldValue('file', event.currentTarget.files[0]);
                            }}
                        />
                        <button type="submit">Lưu</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}