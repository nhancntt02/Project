<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::select('*')->where('status', 0)->get();
        return response($news, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'news_title' => 'required',
            'news_content' => 'required',
            'news_url_thumbnail' => 'nullable',
            'news_category' => 'required',
            'news_date_update' => 'required',
            'news_name_author' => 'required',
            'views' => 'nullable',
            'favorites' => 'nullable',
            'status' => 'nullable'
        ]);

        News::create($data);
        return response()->json('Thêm bài viết tin tức mới thành công', 200);
    }


    public function getFull()
    {
        $news = News::select('*')->get();
        return response($news, 200);
    }
    /**
     * Display the specified resource.
     */
    public function show($news_id)
    {
        $data = News::find($news_id);
        if (!$data) {
            return response()->json(['message' => 'News not found'], 404);
        } else {
            return response()->json($data, 200);
        }
    }


    public function update(Request $request, $news_id){
        $data = $request->validate([
            'news_title' => 'required',
            'news_content' => 'required',
            'news_url_thumbnail' => 'nullable',
            'news_category' => 'required',
            'news_date_update' => 'required',
            'news_name_author' => 'required',
            'views' => 'nullable',
            'favorites' => 'nullable',
            'status' => 'nullable'
        ]);

        $new = News::find($news_id);
        if (!$new) {
            return response()->json(['message' => 'News not found'], 404);
        } else {
            $new->update($data);
            return response()->json('Cập nhật thành công', 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateViews($news_id)
    {
        $data = News::find($news_id);
        if (!$data) {
            return response()->json(['message' => 'News not found'], 404);
        } else {
            $data->views += 1;
            $data->save();
            return response()->json(['message' => 'News updated successfully'], 200);
        }
    }


    public function updateFavourites($news_id)
    {
        $data = News::find($news_id);
        if (!$data) {
            return response()->json(['message' => 'News not found'], 404);
        } else {
            $data->favourites += 1;
            $data->save();
            return response()->json(['message' => 'News updated successfully'], 200);
        }
    }

    public function updateStatus(Request $request)
    {
        $news_id = $request->input('news_id');
        $news = News::find($news_id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        } else {
            $news->status = $request->input('status');
            $news->save();
            return response()->json(['message' => 'News status updated successfully'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }
}

