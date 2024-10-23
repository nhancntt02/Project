import { useRef, useState } from "react";
import axiosClient from "../axios-client";
export default function AddNews() {

    const [imgURL, setImgURl] = useState([]);
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const now = new Date();
        const payload = {
            news_title: titleRef.current.value,
            news_content: contentRef.current.value,
            news_name_author: authorRef.current.value,
            news_category: categoryRef.current.value,
            news_url_thumbnail: imageRef.current.value,
            news_date_update: now.toISOString().substr(0, 10),
            views: 0,
            favourites: 0,
            status: 1,
        }

        try {
            const res = await axiosClient.post('upload/news', payload);
            if(res.status == 200){
                alert(res.data);
                titleRef.current.value = ""
                contentRef.current.value = ""
                authorRef.current.value = ""
                imageRef.current.value = ""
                setImgURl("");
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showImg = (event) => {
        setImgURl(event.target.value);
    }

    return (
        <div className="container">
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
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
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    ref={titleRef}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
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
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="category" className="block text-gray-700 font-medium">
                                    Thể loại <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    ref={categoryRef}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Sản phẩm">Sản phẩm</option>
                                    <option value="Công nghệ">Công nghệ</option>
                                    <option value="Trải nghiệm">Trải nghiệm</option>
                                    <option value="Mẹo hay">Mẹo hay</option>
                                </select>
                            </div>

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
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                                {imgURL ? (
                                    <img src={imgURL} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <span className="text-gray-400">Preview image here</span>
                                )}
                            </div>
                            <div>
                                <button onClick={onSubmit} className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-800">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}