import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();
    const { permiss } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    useEffect(() => {
        getProducts();
        getImages();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/products');
            console.log(res.data.data);
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pin:', error);
            setError(error);
            setLoading(false);
        }
    };
    const getImages = () => {
        setLoading(true);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setError(error);
                setLoading(false);
            });
    }

    const editProduct = async (product_id) => {
        navigate(`/editproduct/${product_id}`);
    }

    const deleteProduct = async (product_id) => {
        confirm("Bạn muốn xóa sản phẩm " + product_id);
        try {
            const res = axiosClient.delete(`delete/product/${product_id}`);
            alert(res.data.message);
            getProducts();
        } catch (error) {
            console.log(error);
        }

    }

    // Tìm kiếm sản phẩm
    const searchProduct = async () => {
        const data = searchRef.current.value;
        try {
            const res = await axiosClient.post(`/search/product/${data}`);
            setProducts(res.data.products);

        } catch (error) {
            console.log(error);
        }
    }
    // Chuyển sang trang chi tiết sản phẩm
    const infoProduct = (product_id) => {
        navigate(`/infoproduct/${product_id}`);
    }
    // Transport add product
    const addProduct = () => {
        navigate('/add');
    }

    const totalPages = Math.ceil(products.length / productsPerPage);

    // Get the customers for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    return (
        <div className="">
            {
                loading ? (
                    <p></p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <div className="container h-screen ">
                        <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý sản phẩm</div>
                        </div>



                        <div className="px-4 w-full mx-auto">
                            <div className="flex justify-between bg-bgheader-400 my-4 px-4 items-center">
                                <div className="text-2xl font-bold px-2">
                                    Danh sách sản phẩm
                                </div>
                                <div className="my-4  flex gap-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Nhập tên sản phẩm muốn tìm kiếm"
                                            className="p-2 border min-w-[280px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ref={searchRef}
                                        />
                                        <button
                                            onClick={searchProduct}
                                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                    {
                                        permiss?.QMAX == 1 && (
                                            <div className="flex items-center">
                                                <button
                                                    onClick={addProduct}
                                                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                                >Thêm sản phẩm</button>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                            {
                                (products.length > 0) ?
                                    (

                                        <div className="overflow-auto">
                                            <div className=" w-full">
                                                <div className="bg-blue-400 text-lg font-bold">
                                                    <div className="grid grid-cols-12">
                                                        <div className="border py-2 text-center">STT</div>
                                                        <div className="border py-2 text-center">Mã</div>
                                                        <div className=" col-span-2 border py-2 text-center">Tên sản phẩm</div>
                                                        <div className=" col-span-2 border py-2 text-center">Hình ảnh</div>
                                                        <div className=" col-span-2 border py-2 text-center">Nhà sản xuất</div>
                                                        <div className=" col-span-2 border py-2 text-center">Trạng thái</div>
                                                        <div className="border py-2 text-center">Số lượng</div>
                                                        <div className="border py-2 "></div>
                                                    </div>
                                                </div>
                                                <div className="bg-white">
                                                    {currentProducts.map((b, index) => (
                                                        <div key={index} className="hover:bg-bgheader-400 grid grid-cols-12">
                                                            <div className="border text-center "  >
                                                                <div className="px-1">
                                                                    {index + 1 + (currentPage-1)*productsPerPage}
                                                                </div>
                                                            </div>
                                                            <div className="border text-center " >
                                                                <div className="px-1">
                                                                    {b.product_id}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-2 border " >
                                                                <div className="px-1 font-semibold">
                                                                    {b.product_name}
                                                                </div>
                                                            </div>
                                                            <div className=" col-span-2 border flex justify-center " >
                                                                <img onClick={() => infoProduct(b.product_id)} src={images.find(image => image.product_id == b.product_id)?.image_value || 'N/A'} alt="" className="w-20 hover:cursor-pointer" />
                                                            </div>
                                                            <div className="col-span-2 border  " >
                                                                <div className="px-1">
                                                                    {b.brand?.brand_name || 'N/A'}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-2 border  " >
                                                                <div className="px-1">
                                                                    {b.product_status || 'N/A'}
                                                                </div>
                                                            </div>
                                                            <div className="border text-left">
                                                                <div className="px-1 text-right">
                                                                    {b.product_quantity}
                                                                </div>
                                                            </div>

                                                            <div className="border" >
                                                                {
                                                                    permiss?.QMAX == 1 && (
                                                                        <div className="flex justify-around">
                                                                            <button onClick={() => editProduct(b.product_id)} className="text-yellow-300 text-xl hover:text-yellow-400 "><FaEdit /></button>
                                                                            <button onClick={() => deleteProduct(b.product_id)} className="text-red-400 text-xl hover:text-red-600"><FaTrash /></button>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4 items-center mt-2">
                                                <button
                                                    onClick={prevPage}
                                                    disabled={currentPage === 1}
                                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                                                >
                                                    Trước
                                                </button>
                                                <div className="border p-2 font-bold">{currentPage}</div>
                                                <button
                                                    onClick={nextPage}
                                                    disabled={currentPage === totalPages}
                                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                                                >
                                                    Sau
                                                </button>
                                            </div>
                                        </div>

                                    ) :
                                    (
                                        <p className="text-3xl font-bold text-center text-yellow-400 mt-20">
                                            Hiện không có sản phẩm  "{searchRef.current?.value}" bạn đang tìm kiếm!
                                        </p>
                                    )
                            }
                        </div>

                    </div>

                )
            }

        </div>
    );
}