<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return ImageResource::collection(
            Image::query()->select('*')->paginate(10)
          );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request)
    {
        //
        $data = $request->validated();
        $image = Image::create($data);
        return response()->json(['message' => 'Thêm ảnh cho sản phẩm thành công'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($product_id)
    {
        $data = Image::query()->where('product_id', $product_id)->get();
        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
