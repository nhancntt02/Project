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
        $news = News::select('news_id', 'news_title', 'news_category', 'news_date_update', 'news_name_author', 'news_url_thumbnail')->get();
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
        ]);

        News::create($data);
        return response()->json(['message' => 'News created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($news_id)
    {
        $data = News::find($news_id);
        if($data->isEmpty()){
            return response()->json(['message' => 'News not found'], 404);
        } else {
            return response()->json($data, 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }
}

