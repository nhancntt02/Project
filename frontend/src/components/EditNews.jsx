import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import SuccessNotification from "./SuccessNotification";
export default function EditNews({ news_id }) {

    const [news, setNews] = useState();
    const [imgURL, setImgURl] = useState(null);
    const [success, setSuccess] = useState(false);
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();


    useEffect(() => {
        getNews();
    }, [])


    const getNews = async () => {
        try {
            const res = await axiosClient.get(`/getnews/${news_id}`);
            setNews(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            ...news,
            news_title: titleRef.current.value,
            news_content: contentRef.current.value,
            news_name_author: authorRef.current.value,
            news_category: categoryRef.current.value,
            news_url_thumbnail: imageRef.current.value,
        }

        try {
            const res = await axiosClient.put(`/update/news/${news_id}`, payload);
            handleSuccess();
        } catch (error) {
            console.log(error);
        }
    }

    const showImg = (event) => {
        setImgURl(event.target.value);
    }

    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000); // Ẩn thông báo sau 2 giây
    };

    return (
        <div className="container">
            {success && <SuccessNotification />}
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mt-2 text-gray-900 mb-6">
                    Thêm tin tức mới
                </h1>
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left side - Input fields */}
                        <div className="md:col-span-1 space-y-4">
                            {/* Title input */}
                            <div>
                                <label htmlFor="title" className="block text-gray-700 font-medium">
                                    Tiêu đề của bài viết <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    type="text"
                                    name="title"
                                    id="title"
                                    rows="2"
                                    ref={titleRef}
                                    defaultValue={news?.news_title}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            {/* Content input */}
                            <div>
                                <label htmlFor="content" className="block text-gray-700 font-medium">
                                    Nội dung bài viết <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    ref={contentRef}
                                    defaultValue={news?.news_content}
                                    rows="6"
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            {/* Author input */}
                            <div>
                                <label htmlFor="author" className="block text-gray-700 font-medium">
                                    Tác giả <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    ref={authorRef}
                                    defaultValue={news?.news_name_author}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            { news && <div>
                                <label htmlFor="category" className="block text-gray-700 font-medium">
                                    Thể loại <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    ref={categoryRef}
                                    defaultValue={news?.news_category}  // Đặt sẵn option theo news.news_category
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Sản phẩm">Sản phẩm</option>
                                    <option value="Công nghệ">Công nghệ</option>
                                    <option value="Trải nghiệm">Trải nghiệm</option>
                                    <option value="Mẹo hay">Mẹo hay</option>
                                </select>

                            </div>}

                        </div>

                        {/* Right side - Image URL input and preview */}
                        <div className="md:col-span-1 space-y-4">
                            <div>
                                <label htmlFor="image" className="block text-gray-700 font-medium">
                                    URL của ảnh bài viết <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    onChange={showImg}
                                    ref={imageRef}
                                    defaultValue={news?.news_url_thumbnail}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                                {imgURL ? (
                                    <img src={imgURL} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <img src={news?.news_url_thumbnail} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                )}
                            </div>
                            <div>
                                <button onClick={onSubmit} className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-800">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}