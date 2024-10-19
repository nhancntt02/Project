import { useEffect } from "react";
import { useState } from "react"
import axiosClient from "../axios-client";
import { FaEdit, FaEye } from "react-icons/fa";
import { useRef } from "react";
export default function News() {
    const [news, setNews] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        getNews();
    }, [])

    const getNews = async () => {
        try {
            const res = await axiosClient.get('/fullnews');
            setNews(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const limitWords = (text, wordLimit) => {
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div className="container">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý tin tức</div>
            </div>

            <div className="flex justify-between items-center px-4">
                <div className="text-2xl font-bold">
                    Danh sách tất cả bài đăng tin tức
                </div>
                <div className="my-4  flex gap-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder=""
                            className="p-2 border min-w-[100px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={searchRef}
                        />
                        <button
                            onClick={() => {}}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => {  }}
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >Thêm tin tức</button>
                    </div>
                </div>
            </div>

            <div className="px-2">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-blue-400 text-white border-b">
                            <th className="px-4 py-2 border text-left font-medium">ID</th>
                            <th className="px-4 py-2 border text-left font-medium">Tiêu đề</th>
                            <th className="px-4 py-2 border text-center font-medium text-nowrap">Hình ảnh</th>
                            <th className="px-4 py-2 border text-left font-medium">Nội dung ngắn</th>
                            <th className="px-4 py-2 border text-left font-medium">Tác giả</th>
                            <th className="px-4 py-2 border text-left font-medium">Ngày đăng</th>
                            <th className="px-1 py-2 border text-center font-medium">Lượt xem</th>
                            <th className="px-1 py-2 border text-center font-medium">Lượt thích</th>
                            <th className="px-1 py-2 border text-left font-medium">Tình trạng</th>
                            <th className="px-1 py-2 border text-center font-medium">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{item.news_id}</td>
                                    <td className="px-4 py-2 border font-bold max-w-sm">{item.news_title}</td>
                                    <td className="border p-1">
                                        <img src={item.news_url_thumbnail} alt="" className="w-full h-20 object-cover rounded" />
                                    </td>
                                    <td className="px-1 truncate-text max-w-lg">{item.news_content}</td>
                                    <td className="px-2 py-1 border">{item.news_name_author}</td>
                                    <td className="px-1 border text-nowrap">{item.news_date_update}</td>
                                    <td className="px-2 py-1 border">{item.views}</td>
                                    <td className="px-2 py-1 border">{item.favourites}</td>
                                    <td className="px-2 py-1 border">
                                        {
                                            item.status == 1 ? (
                                                <span className="bg-red-500 text-white px-2 py-1 rounded">Khóa</span>
                                            ) : (
                                                <span className="bg-green-500 text-white px-2 py-1 rounded text-nowrap">Hiển thị</span>
                                            )
                                        }
                                    </td>
                                    <td className="">
                                        <div className="flex justify-center gap-2">
                                            <button className="text-yellow-500 hover:text-yellow-700 text-xl">
                                                <FaEdit />
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700  text-xl">
                                                <FaEye />
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}