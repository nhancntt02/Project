import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { FaCalendar, FaSearch, FaUser, FaRegCalendarAlt, FaEye, FaRegEye, FaHeart, FaChevronUp } from "react-icons/fa";

export default function News() {
    const [news, setNews] = useState([]);
    const [seen, setSeen] = useState();
    const [arr, setArr] = useState([]);
    const [detail, setDetail] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const res = await axiosClient.get('/news');
            setNews(res.data);
            setArr(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const detailNews = async (index) => {
        news[index].views += 1;
        setSeen(news[index]);
        setDetail(true);
        await axiosClient.put(`/update/view/news/${news[index].news_id}`);

    }

    const likeNews = async () => {
        const temp = {
            ...seen,
            favourites: seen.favourites += 1
        }
        setSeen(temp);
        await axiosClient.put(`/update/favourite/news/${seen.news_id}`);
    }



    const filterType = (text) => {
        const dataFilter = arr.filter(i => i.news_category == text);
        setNews(dataFilter);
    }

    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[Đđ]/g, 'd');
    }

    const searchNews = () => {
        const search = removeVietnameseTones(searchRef.current.value).toLowerCase();
        if (search == "") {
            setNews(arr);
        } else {
            const dataSearch = arr.filter(i => removeVietnameseTones(i.news_title).toLowerCase().includes(search));
            setNews(dataSearch);
        }

    }

    return (
        <div className="container bg-bgheader-300">
            <div className="flex">
                <div className="basis-2/3 p-4">
                    {
                        seen && detail && (<div>
                            <div className="p-4 relative">
                                <img src={seen.news_url_thumbnail} alt="" className="object-cover w-full" />
                                <h2 className="text-xl font-bold mt-4">{seen.news_title}</h2>
                                <div className="flex gap-4 text-sm my-4">
                                    <div className="flex gap-2 items-center border-r-2 px-2"><FaUser /><span>Tác giả: {seen.news_name_author}</span></div>
                                    <div className="flex gap-2 items-center border-r-2 px-2"><FaRegCalendarAlt /><span className=""> Ngày {new Date(seen.news_date_update).getDate()} tháng {new Date(seen.news_date_update).getMonth() + 1} năm {new Date(seen.news_date_update).getFullYear()}</span>  </div>
                                    <div className="flex gap-2 items-center border-r-2 px-2"><FaRegEye /><span>{seen.views} Lượt xem</span> </div>
                                    <div className="flex gap-2 items-center"><FaHeart onClick={likeNews} className="text-red-500 hover:cursor-pointer" /><span>{seen.favourites} Lượt thích</span></div>
                                </div>
                                <div>
                                    <p className="mb-8">{seen.news_content}</p>
                                </div>
                                <div className="group">
                                    <FaChevronUp className="absolute left-[50%] -translate-x-[50%] bottom-6 hidden group-hover:flex text-gray-700" />
                                    <div onClick={() => setDetail(false)} className="absolute bottom-2 left-[50%] -translate-x-[50%] hover:cursor-pointer">Thu gọn</div>
                                </div>
                            </div>
                        </div>)
                    }
                    {
                        !detail && (
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
                            </div>)
                    }
                </div>
                <div className="basis-1/3 h-[80vh] border-l p-6">
                    <div className="h-full">
                        <div className="flex justify-center">
                            <input ref={searchRef} type="text" className="border px-4 py-2 w-full" placeholder="Bạn muốn tìm gì" />
                            <div className="text-white bg-gray-700 p-4 text-xl">
                                <FaSearch onClick={searchNews} className="hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="mt-12">
                            <div>
                                <div className="flex gap-4">
                                    <div className="bg-blue-500 w-[8px] "></div>
                                    <div className="text-2xl font-semibold">  Danh mục tin tức</div>
                                </div>
                                <div className="ml-6">
                                    <div onClick={() => filterType("Sản phẩm")} className="mt-4 hover:cursor-pointer hover:text-blue-500">Sản phẩm</div>
                                    <div onClick={() => filterType("Công nghệ")} className="mt-2 hover:cursor-pointer hover:text-blue-500">Công nghệ</div>
                                    <div onClick={() => filterType("Trải nghiệm")} className="mt-2 hover:cursor-pointer hover:text-blue-500">Trải nghiệm</div>
                                    <div onClick={() => filterType("Mẹo hay")} className="mt-2 hover:cursor-pointer hover:text-blue-500">Mẹo hay</div>
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
                                                <img src={seen.news_url_thumbnail} alt="" className="object-cover" />
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