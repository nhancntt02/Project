import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { FaSearch } from "react-icons/fa";

export default function News() {
    const [news, setNews] = useState([]);
    const [seen, setSeen] = useState();
    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const res = await axiosClient.get('/news');
            setNews(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const detailNews = (index) => {
        setSeen(news[index]);
    }

    return (
        <div className="container h-screen bg-bgheader-300">
            <div className="flex">
                <div className="basis-2/3 p-4">
                    <div className="grid grid-cols-2">
                        {
                            news.map((item, index) => (
                                <div key={index} className="border m-8 max-h-[450px] shadow-md rounded-t-sm bg-white relative">
                                    <img src={item.news_url_thumbnail} alt="" className="w-full mx-auto object-cover h-[200px] rounded-t-sm" />
                                    <div className="p-8">

                                        <div className="text-center text-xs text-gray-400 mb-2"><span>Ngày {new Date(item.news_date_update).getDate()} tháng {new Date(item.news_date_update).getMonth() + 1} năm {new Date(item.news_date_update).getFullYear()}</span></div>
                                        <div className="text-center font-bold mb-4">{item.news_title}</div>
                                        <div onClick={() => detailNews(index)} className="absolute bottom-2 left-[50%] -translate-x-[50%] hover:cursor-pointer hover:text-blue-500">Xem chi tiết</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="basis-1/3 h-[500px] border-l p-6">
                    <div className="h-full">
                        <div className="flex justify-center">
                            <input type="text" className="border px-4 py-2 w-full" placeholder="Bạn muốn tìm gì" />
                            <div className="text-white bg-gray-700 p-4 text-xl">
                                <FaSearch className="hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="mt-12">
                            <div>
                                <div className="flex gap-4">
                                    <div className="bg-blue-500 w-[8px] "></div>
                                    <div className="text-2xl font-semibold">  Danh mục tin tức</div>
                                </div>
                                <div className="ml-6">
                                    <div className="mt-4 hover:cursor-pointer hover:text-blue-500">Sản phẩm</div>
                                    <div className="mt-2 hover:cursor-pointer hover:text-blue-500">Công nghệ</div>
                                    <div className="mt-2 hover:cursor-pointer hover:text-blue-500">Trải nghiệm</div>
                                    <div className="mt-2 hover:cursor-pointer hover:text-blue-500">Mẹo hay</div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex gap-4">
                                    <div className="bg-blue-500 w-[8px] "></div>
                                    <div className="text-2xl font-semibold">Tin tức vừa xem</div>
                                </div>
                                {
                                    seen && (
                                        <div className=" mx-6 mt-4 flex gap-2">
                                            <div className="basis-1/3 p-1">
                                                <img src={seen.news_url_thumbnail} alt="" className="object-cover"/>
                                            </div>

                                            <div className="text-xs basis-2/3">{seen.news_title}</div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

} 